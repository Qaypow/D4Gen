import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Correction pour les icônes de marqueur manquantes dans React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const InteractiveMap = () => {
    // Coordonnées pour centrer la carte
    const position = [51.505, -0.09];

    // Données des points (marqueurs)
    const points = [
        { position: [51.505, -0.09], info: "Point 1: Informations" },
        { position: [51.515, -0.1], info: "Point 2: Plus d'informations" },
        // Ajoutez d'autres points ici
    ];

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {points.map((point, idx) => (
                <Marker key={idx} position={point.position}>
                    <Popup>{point.info}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default InteractiveMap;