import { Player, AIDifficulty, GridSize } from '../types/game';
import { checkWinner, getAvailableMoves, getWinningCombinations } from './gameLogic';

export const getAIMove = (
  board: Player[], 
  difficulty: AIDifficulty, 
  gridSize: GridSize
): number => {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) return -1;
  
  switch (difficulty) {
    case 'easy':
      return getRandomMove(availableMoves);
    case 'medium':
      return getMediumMove(board, gridSize, availableMoves);
    case 'hard':
      return getHardMove(board, gridSize);
    default:
      return getRandomMove(availableMoves);
  }
};

const getRandomMove = (availableMoves: number[]): number => {
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

const getMediumMove = (board: Player[], gridSize: GridSize, availableMoves: number[]): number => {
  // Try to win first
  const winMove = findWinningMove(board, 'O', gridSize);
  if (winMove !== -1) return winMove;
  
  // Block player from winning
  const blockMove = findWinningMove(board, 'X', gridSize);
  if (blockMove !== -1) return blockMove;
  
  // Take center if available (for odd grid sizes)
  if (gridSize % 2 === 1) {
    const center = Math.floor((gridSize * gridSize) / 2);
    if (board[center] === null) return center;
  }
  
  // Random move
  return getRandomMove(availableMoves);
};

const getHardMove = (board: Player[], gridSize: GridSize): number => {
  const bestMove = minimax(board, 'O', 0, gridSize, -Infinity, Infinity);
  return bestMove.index;
};

const findWinningMove = (board: Player[], player: Player, gridSize: GridSize): number => {
  const availableMoves = getAvailableMoves(board);
  
  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;
    
    if (checkWinner(testBoard, gridSize)?.player === player) {
      return move;
    }
  }
  
  return -1;
};

interface MinimaxResult {
  index: number;
  score: number;
}

const minimax = (
  board: Player[], 
  player: Player, 
  depth: number, 
  gridSize: GridSize,
  alpha: number,
  beta: number,
  maxDepth: number = 6
): MinimaxResult => {
  const availableMoves = getAvailableMoves(board);
  const winner = checkWinner(board, gridSize);
  
  // Terminal states
  if (winner?.player === 'O') return { index: -1, score: 100 - depth };
  if (winner?.player === 'X') return { index: -1, score: depth - 100 };
  if (availableMoves.length === 0) return { index: -1, score: 0 };
  if (depth >= maxDepth) return { index: -1, score: evaluateBoard(board, gridSize) };
  
  let bestMove: MinimaxResult;
  
  if (player === 'O') {
    // Maximizing player
    bestMove = { index: -1, score: -Infinity };
    
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = player;
      
      const result = minimax(newBoard, 'X', depth + 1, gridSize, alpha, beta, maxDepth);
      
      if (result.score > bestMove.score) {
        bestMove = { index: move, score: result.score };
      }
      
      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
  } else {
    // Minimizing player
    bestMove = { index: -1, score: Infinity };
    
    for (const move of availableMoves) {
      const newBoard = [...board];
      newBoard[move] = player;
      
      const result = minimax(newBoard, 'O', depth + 1, gridSize, alpha, beta, maxDepth);
      
      if (result.score < bestMove.score) {
        bestMove = { index: move, score: result.score };
      }
      
      beta = Math.min(beta, result.score);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
  }
  
  return bestMove;
};

const evaluateBoard = (board: Player[], gridSize: GridSize): number => {
  const combinations = getWinningCombinations(gridSize);
  let score = 0;
  
  for (const combination of combinations) {
    const line = combination.map(index => board[index]);
    const oCount = line.filter(cell => cell === 'O').length;
    const xCount = line.filter(cell => cell === 'X').length;
    const emptyCount = line.filter(cell => cell === null).length;
    
    if (oCount > 0 && xCount === 0) {
      score += Math.pow(10, oCount);
    } else if (xCount > 0 && oCount === 0) {
      score -= Math.pow(10, xCount);
    }
  }
  
  return score;
};