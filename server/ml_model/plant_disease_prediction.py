import sys
import json
import torch
from torchvision.datasets import ImageFolder
import torchvision.transforms as transforms

data_dir = "../input/new-plant-diseases-dataset/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)"

train = ImageFolder(train_dir, transform=transforms.ToTensor())
batch_size=32


def load_model(model_path):
    # Charger le modèle à partir du fichier .pth
    model = torch.load(model_path)
    return model

def predict_image(image_path):
    # Effectuer la prédiction en utilisant votre modèle
    # result = predict(image_path)
    image = ImageFolder(image_path, transform=transforms.ToTensor())
    image_dl = DataLoader(image)
    prediction = model.predict(image_dl)
    return result

if __name__ == '__main__':
    image_path = sys.argv[1]  # Récupérer le chemin de l'image depuis les arguments de la ligne de commande
    model = load_model("./plant-disease-model.pth")
    prediction = model.predict(image_path)
    # Imprimer le résultat en JSON pour que Node.js puisse le lire
    print(json.dumps({'prediction': prediction}))