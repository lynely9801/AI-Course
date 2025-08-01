import React from 'react';
import './Header.css';

export default function Header({ score, best, onRestart }) {
  return (
    <div className="header">
      <div className="title">2048</div>
      <div className="scores">
        <div className="score">Score: {score}</div>
        <div className="best">Best: {best}</div>
      </div>
      <button className="restart-btn" onClick={onRestart}>Restart</button>
    </div>
  );
}
