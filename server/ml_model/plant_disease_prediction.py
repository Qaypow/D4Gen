# import sys
# import json
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
#
# def load_keras_model(model_path):
#     # Charger le modèle Keras à partir du fichier .h5
#     model = tf.keras.saving.load_model(model_path)
#     return model
#
# def predict_image_keras(image_path, model):
#     # Charger et prétraiter l'image
#     img = image.load_img(image_path, target_size=(256, 256))
#     img_array = image.img_to_array(img)
#     img_batch = np.expand_dims(img_array, axis=0)
#     img_preprocessed = preprocess_input(img_batch)
#
#     # Effectuer la prédiction
#     predictions = model.predict(img_preprocessed)
#     # Décoder les prédictions
#     # Note: Utilisez decode_predictions uniquement si vous utilisez un modèle pré-entraîné comme ResNet50
#     # Pour des modèles personnalisés, adaptez cette partie pour correspondre à votre cas d'utilisation
#     # decoded_predictions = decode_predictions(predictions, top=1)[0]
#     return predictions # Retourner la classe prédite
#
# if __name__ == '__main__':
#     model_path = model_path = "C:/Users/pierre/Documents/d4gen2024/app/server/ml_model/model.keras"
#     image_path = sys.argv[1]
#     model = load_keras_model(model_path)
#     prediction = predict_image_keras(image_path, model)
#     print(json.dumps({'prediction': prediction}))


import sys
import json
import torch
import torch.nn as nn           # for creating  neural networks
from torchvision import transforms
from torchvision.io import read_image
import torchvision.models as models
from torch.utils.data import DataLoader, Dataset
from PIL import Image

class SimpleResidualBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=3, kernel_size=3, stride=1, padding=1)
        self.relu1 = nn.ReLU()
        self.conv2 = nn.Conv2d(in_channels=3, out_channels=3, kernel_size=3, stride=1, padding=1)
        self.relu2 = nn.ReLU()

    def forward(self, x):
        out = self.conv1(x)
        out = self.relu1(out)
        out = self.conv2(out)
        return self.relu2(out) + x # ReLU can be applied before or after adding the input


class ImageClassificationBase(nn.Module):

    def training_step(self, batch):
        images, labels = batch
        out = self(images)                  # Generate predictions
        loss = F.cross_entropy(out, labels) # Calculate loss
        return loss

    def validation_step(self, batch):
        images, labels = batch
        out = self(images)                   # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = accuracy(out, labels)          # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}

    def validation_epoch_end(self, outputs):
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()       # Combine loss
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {"val_loss": epoch_loss, "val_accuracy": epoch_accuracy} # Combine accuracies

    def epoch_end(self, epoch, result):
        print("Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
            epoch, result['lrs'][-1], result['train_loss'], result['val_loss'], result['val_accuracy']))


def ConvBlock(in_channels, out_channels, pool=False):
    layers = [nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
             nn.BatchNorm2d(out_channels),
             nn.ReLU(inplace=True)]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)


class ResNet9(ImageClassificationBase):
    def __init__(self, in_channels, num_diseases):
        super().__init__()

        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True) # out_dim : 128 x 64 x 64
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))

        self.conv3 = ConvBlock(128, 256, pool=True) # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True) # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))

        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))

    def forward(self, xb): # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out


def load_model(model_path):
    # Charger le modèle à partir du fichier .pth
    #model_complete = torch.load(model_path, map_location=torch.device('cpu'))
    #model_complete.eval()
    #model.eval()  # Mettre le modèle en mode évaluation

    model = ResNet9(3, 38) # we do not specify ``weights``, i.e. create untrained model
    model.load_state_dict(torch.load("C:/Users/pierre/Documents/d4gen2024/app/server/ml_model/model.pth", map_location=torch.device('cpu')))
    model.eval()

    return model

class CustomImageDataset(Dataset):
    def __init__(self, img_path, transform=None):
        self.img_path = img_path
        self.transform = transform

    def __len__(self):
        return 1

    def __getitem__(self, idx):
        image = Image.open(self.img_path).convert("RGB")
        if self.transform:
            image = self.transform(image)
        return image

def predict_image(image_path, model):
    classes = [
        'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy', 'Blueberry___healthy',
        'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
        'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
        'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
        'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
        'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
        'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight', 'Potato___Late_blight',
        'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy', 'Squash___Powdery_mildew',
        'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
        'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
        'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
    ]

    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(256),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    dataset = CustomImageDataset(image_path, transform=transform)
    loader = DataLoader(dataset, batch_size=1)
    predictions = []
    with torch.no_grad():
        for images in loader:
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            result = predicted.item()
            predictions.append(classes[result])
    return predictions

if __name__ == '__main__':
    model_path = "C:/Users/pierre/Documents/d4gen2024/app/server/ml_model/model.pth"
    image_path = sys.argv[1]  # Récupérer le chemin de l'image depuis les arguments de la ligne de commande
    model = load_model(model_path)
    predictions = predict_image(image_path, model)
    # Assurez-vous que 'predictions' est une liste ou une valeur qui peut être sérialisée en JSON
    print(json.dumps({'prediction': predictions}))