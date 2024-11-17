// Card.js avec paramètres (nom du titre, nombre de cards)

import React from 'react';
import './styles/card.css';

export default function Card({ title, card }) {
  return (
    <div className="card-container">
      <h1>{title}</h1>
      <div className="cards">
        
      </div>
    </div>
  );
}
