import React from 'react';

export default function PlayerPanel({ numPlayers, scores, turn }) {
  return (
    <div className="player-panel">
      {numPlayers === 1 ? (
        <div>Score: {scores[0]}</div>
      ) : (
        <>
          <div className={turn === 0 ? 'active' : ''}>Player 1: {scores[0]}</div>
          <div className={turn === 1 ? 'active' : ''}>Player 2: {scores[1]}</div>
        </>
      )}
    </div>
  );
}
