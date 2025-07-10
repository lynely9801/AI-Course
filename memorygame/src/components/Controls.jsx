import React from 'react';

export default function Controls({ gridSize, setGridSize, numPlayers, setNumPlayers, disabled }) {
  return (
    <div className="controls">
      <label>
        Grid Size:
        <select value={gridSize} onChange={e => setGridSize(Number(e.target.value))} disabled={disabled}>
          <option value={4}>4x4</option>
          <option value={6}>6x6</option>
          <option value={8}>8x8</option>
        </select>
      </label>
      <label>
        Players:
        <select value={numPlayers} onChange={e => setNumPlayers(Number(e.target.value))} disabled={disabled}>
          <option value={1}>1 Player</option>
          <option value={2}>2 Players</option>
        </select>
      </label>
    </div>
  );
}
