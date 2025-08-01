import React, { useEffect } from 'react';
import { useGame2048 } from './useGame2048';
import GameBoard from './GameBoard';
import Tile from './Tile';
import Header from './Header';
import GameOverModal from './GameOverModal';
import { useSwipeable } from 'react-swipeable';
import './App.css';

export default function App() {
  const { board, score, best, gameOver, won, handleMove, restart } = useGame2048();

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') handleMove('up');
      else if (e.key === 'ArrowDown') handleMove('down');
      else if (e.key === 'ArrowLeft') handleMove('left');
      else if (e.key === 'ArrowRight') handleMove('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  // Touch/Swipe controls
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleMove('up'),
    onSwipedDown: () => handleMove('down'),
    onSwipedLeft: () => handleMove('left'),
    onSwipedRight: () => handleMove('right'),
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="app" {...swipeHandlers}>
      <Header score={score} best={best} onRestart={restart} />
      <GameBoard board={board} />
      <GameOverModal gameOver={gameOver} won={won} onRestart={restart} />
    </div>
  );
}
