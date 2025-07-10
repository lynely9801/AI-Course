import React from 'react';
import './Card.css';

export default function Card({ card, onClick }) {
  return (
    <div className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={card.image} alt={card.name} />
        </div>
      </div>
    </div>
  );
}
