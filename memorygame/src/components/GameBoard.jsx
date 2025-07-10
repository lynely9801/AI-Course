import React, { useState, useEffect } from 'react';
import Card from './Card';

export default function GameBoard({ cards, setCards, gridSize, numPlayers, turn, setTurn, onMatch, onGameOver, gameOver }) {
  const [flipped, setFlipped] = useState([]);

  useEffect(() => {
    // Khi có 2 thẻ đang lật ngửa
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].id === cards[second].id) {
        // Nếu giống nhau: đánh dấu matched và cộng điểm
        setTimeout(() => {
          setCards(prevCards => prevCards.map((c, idx) =>
            idx === first || idx === second ? { ...c, isMatched: true } : c
          ));
          onMatch(turn);
          setFlipped([]);
          // Kiểm tra kết thúc game
          if (cards.filter(c => c.isMatched).length + 2 === cards.length) {
            onGameOver();
          }
        }, 500);
      } else {
        // Nếu khác nhau: úp lại sau 1 giây
        setTimeout(() => {
          setCards(prevCards => prevCards.map((c, idx) =>
            idx === first || idx === second ? { ...c, isFlipped: false } : c
          ));
          setFlipped([]);
          if (numPlayers === 2) setTurn(t => 1 - t);
        }, 1000);
      }
    }
  }, [flipped]);

  function handleCardClick(idx) {
    if (gameOver) return;
    if (cards[idx].isFlipped || cards[idx].isMatched || flipped.length === 2) return;
    setCards(prevCards => prevCards.map((c, i) => i === idx ? { ...c, isFlipped: true } : c));
    setFlipped(f => [...f, idx]);
  }

  const style = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`
  };

  return (
    <div className="game-board" style={style}>
      {cards.map((card, idx) => (
        <Card key={card.uniqueId} card={card} onClick={() => handleCardClick(idx)} />
      ))}
    </div>
  );
}
