// Custom hook for 2048 game logic
import { useState, useEffect, useCallback } from 'react';

const BOARD_SIZE = 4;
const START_TILES = 2;
const WIN_TILE = 2048;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getEmptyCells(board) {
  const empty = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) empty.push([r, c]);
    }
  }
  return empty;
}

function addRandomTile(board) {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return board;
  const [r, c] = empty[getRandomInt(empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = value;
  return newBoard;
}

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
}

function initBoard() {
  let board = createEmptyBoard();
  for (let i = 0; i < START_TILES; i++) {
    board = addRandomTile(board);
  }
  return board;
}

function transpose(board) {
  return board[0].map((_, i) => board.map(row => row[i]));
}

function reverse(board) {
  return board.map(row => [...row].reverse());
}

function moveRowLeft(row) {
  let arr = row.filter(x => x !== 0);
  let merged = [];
  let score = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      merged.push(arr[i] * 2);
      score += arr[i] * 2;
      i++;
    } else {
      merged.push(arr[i]);
    }
  }
  while (merged.length < BOARD_SIZE) merged.push(0);
  return { row: merged, score };
}

function move(board, direction) {
  let moved = false;
  let score = 0;
  let newBoard;
  if (direction === 'left') {
    newBoard = board.map(row => {
      const { row: newRow, score: rowScore } = moveRowLeft(row);
      if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
      score += rowScore;
      return newRow;
    });
  } else if (direction === 'right') {
    newBoard = board.map(row => {
      const reversed = [...row].reverse();
      const { row: newRow, score: rowScore } = moveRowLeft(reversed);
      const finalRow = newRow.reverse();
      if (JSON.stringify(row) !== JSON.stringify(finalRow)) moved = true;
      score += rowScore;
      return finalRow;
    });
  } else if (direction === 'up') {
    let transposed = transpose(board);
    transposed = transposed.map(row => {
      const { row: newRow, score: rowScore } = moveRowLeft(row);
      if (JSON.stringify(row) !== JSON.stringify(newRow)) moved = true;
      score += rowScore;
      return newRow;
    });
    newBoard = transpose(transposed);
  } else if (direction === 'down') {
    let transposed = transpose(board);
    transposed = transposed.map(row => {
      const reversed = [...row].reverse();
      const { row: newRow, score: rowScore } = moveRowLeft(reversed);
      const finalRow = newRow.reverse();
      if (JSON.stringify(row) !== JSON.stringify(finalRow)) moved = true;
      score += rowScore;
      return finalRow;
    });
    newBoard = transpose(transposed);
  }
  return { board: newBoard, moved, score };
}

function hasMoves(board) {
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (board[r][c] === 0) return true;
      if (c < BOARD_SIZE - 1 && board[r][c] === board[r][c + 1]) return true;
      if (r < BOARD_SIZE - 1 && board[r][c] === board[r + 1][c]) return true;
    }
  }
  return false;
}

function hasWon(board) {
  return board.some(row => row.includes(WIN_TILE));
}

export function useGame2048() {
  const [board, setBoard] = useState(initBoard());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('bestScore') || 0));
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (score > best) {
      setBest(score);
      localStorage.setItem('bestScore', score);
    }
  }, [score, best]);

  const handleMove = useCallback((direction) => {
    if (gameOver || won) return;
    const { board: newBoard, moved, score: addScore } = move(board, direction);
    if (!moved) return;
    const withTile = addRandomTile(newBoard);
    setBoard(withTile);
    setScore(s => s + addScore);
    if (hasWon(withTile)) setWon(true);
    else if (!hasMoves(withTile)) setGameOver(true);
  }, [board, gameOver, won]);

  const restart = useCallback(() => {
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
    setWon(false);
  }, []);

  return {
    board,
    score,
    best,
    gameOver,
    won,
    handleMove,
    restart,
  };
}
