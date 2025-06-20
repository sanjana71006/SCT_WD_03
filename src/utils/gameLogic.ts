import { Player, WinningLine, GridSize } from '../types/game';

export const getWinningCombinations = (gridSize: GridSize): number[][] => {
  const combinations: number[][] = [];
  const winLength = gridSize; // Need full row/column/diagonal to win
  
  // Rows
  for (let row = 0; row < gridSize; row++) {
    const rowCombination: number[] = [];
    for (let col = 0; col < gridSize; col++) {
      rowCombination.push(row * gridSize + col);
    }
    combinations.push(rowCombination);
  }
  
  // Columns
  for (let col = 0; col < gridSize; col++) {
    const colCombination: number[] = [];
    for (let row = 0; row < gridSize; row++) {
      colCombination.push(row * gridSize + col);
    }
    combinations.push(colCombination);
  }
  
  // Main diagonal (top-left to bottom-right)
  const mainDiagonal: number[] = [];
  for (let i = 0; i < gridSize; i++) {
    mainDiagonal.push(i * gridSize + i);
  }
  combinations.push(mainDiagonal);
  
  // Anti-diagonal (top-right to bottom-left)
  const antiDiagonal: number[] = [];
  for (let i = 0; i < gridSize; i++) {
    antiDiagonal.push(i * gridSize + (gridSize - 1 - i));
  }
  combinations.push(antiDiagonal);
  
  return combinations;
};

export const checkWinner = (board: Player[], gridSize: GridSize): WinningLine | null => {
  const combinations = getWinningCombinations(gridSize);
  
  for (const combination of combinations) {
    const firstCell = board[combination[0]];
    if (firstCell && combination.every(index => board[index] === firstCell)) {
      return {
        indices: combination,
        player: firstCell
      };
    }
  }
  return null;
};

export const checkDraw = (board: Player[]): boolean => {
  return board.every(cell => cell !== null);
};

export const getAvailableMoves = (board: Player[]): number[] => {
  return board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
};

export const createEmptyBoard = (gridSize: GridSize): Player[] => {
  return Array(gridSize * gridSize).fill(null);
};