import React from 'react';
import './GameOverModal.css';

export default function GameOverModal({ gameOver, won, onRestart }) {
  if (!gameOver && !won) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {won ? <h2>You win!</h2> : <h2>Game Over</h2>}
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}
