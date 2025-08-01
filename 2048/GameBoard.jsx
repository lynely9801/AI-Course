import React from 'react';
import Tile from './Tile';
import './GameBoard.css';

export default function GameBoard({ board }) {
  return (
    <div className="game-board">
      {board.map((row, rIdx) => (
        <div className="board-row" key={rIdx}>
          {row.map((cell, cIdx) => (
            <Tile value={cell} key={cIdx} />
          ))}
        </div>
      ))}
    </div>
  );
}
