import React, { useState } from 'react';
import './App.css';

const pointsData = [
    { id: 1, type: 'arbuste de Valentine', disease: 'rage des plantes', date: '23/03/2024 18h40', x: 50, y: 100 },
    // Ajoutez d'autres points avec leurs données et positions x, y ici
];

const Point = ({ data, onHover }) => {
    const style = {
        left: `${data.x}px`,
        top: `${data.y}px`,
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: data.disease ? 'red' : 'green',
        cursor: 'pointer'
    };

    return <div style={style} onMouseOver={() => onHover(data)} onMouseOut={() => onHover(null)} />;
};

const InfoBox = ({ data }) => {
    if (!data) return null;

    const style = {
        position: 'absolute',
        left: `${data.x + 20}px`, // Position to the right of the point
        top: `${data.y - 20}px`, // Position above the point
        width: '200px',
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: 'white',
        zIndex: 100
    };

    return (
        <div style={style}>
            <div>Type de plante: {data.type}</div>
            <div>Maladie: {data.disease}</div>
            <div>Date: {data.date}</div>
            <button>infos et traitements</button>
        </div>
    );
};

const InteractiveMap = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    return (
        <div style={{ position: 'relative' }}>
            {pointsData.map((point) => (
                <Point key={point.id} data={point} onHover={setHoveredPoint} />
            ))}
            <InfoBox data={hoveredPoint} />
        </div>
    );
};

export default InteractiveMap;