import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import PlayerPanel from './components/PlayerPanel';
import Controls from './components/Controls';
import { fetchRandomPokemon } from './utils/api';

const GRID_SIZES = [4, 6, 8];

export default function App() {
  const [gridSize, setGridSize] = useState(4);
  const [numPlayers, setNumPlayers] = useState(1);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([0, 0]);
  const [turn, setTurn] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    async function setupGame() {
      setLoading(true);
      const numPairs = (gridSize * gridSize) / 2;
      const pokemons = await fetchRandomPokemon(numPairs);
      let deck = pokemons.flatMap(p => [
        { ...p, uniqueId: `${p.id}-a`, isFlipped: false, isMatched: false },
        { ...p, uniqueId: `${p.id}-b`, isFlipped: false, isMatched: false }
      ]);
      deck = deck.sort(() => Math.random() - 0.5);
      setCards(deck);
      setScores([0, 0]);
      setTurn(0);
      setGameOver(false);
      setLoading(false);
    }
    setupGame();
  }, [gridSize, numPlayers]);

  function handleMatch(player) {
    setScores(prev => {
      const newScores = [...prev];
      newScores[player]++;
      return newScores;
    });
  }

  function handleGameOver() {
    setGameOver(true);
  }

  return (
    <div className="app-container">
      <h1>Memory Game</h1>
      <Controls
        gridSize={gridSize}
        setGridSize={setGridSize}
        numPlayers={numPlayers}
        setNumPlayers={setNumPlayers}
        disabled={loading}
      />
      <PlayerPanel
        numPlayers={numPlayers}
        scores={scores}
        turn={turn}
      />
      {loading ? <div>Loading...</div> : (
        <GameBoard
          cards={cards}
          setCards={setCards}
          gridSize={gridSize}
          numPlayers={numPlayers}
          turn={turn}
          setTurn={setTurn}
          onMatch={handleMatch}
          onGameOver={handleGameOver}
          gameOver={gameOver}
        />
      )}
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
}
