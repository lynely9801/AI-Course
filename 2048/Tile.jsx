import React from 'react';
import './Tile.css';

export default function Tile({ value }) {
  return (
    <div className={`tile tile-${value || 'empty'}`}>{value !== 0 ? value : ''}</div>
  );
}
