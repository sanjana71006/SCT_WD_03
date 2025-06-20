import React from 'react';
import { GameCell } from './GameCell';
import { Player, GridSize } from '../../types/game';
import { checkWinner } from '../../utils/gameLogic';

interface GameBoardProps {
  board: Player[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  gridSize: GridSize;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  disabled,
  gridSize
}) => {
  const winner = checkWinner(board, gridSize);
  const winningIndices = winner?.indices || [];

  const getGridClass = () => {
    return `grid-cols-${gridSize}`;
  };

  const getGridSize = () => {
    switch (gridSize) {
      case 3: return 'max-w-md';
      case 4: return 'max-w-lg';
      case 5: return 'max-w-xl';
      default: return 'max-w-md';
    }
  };

  return (
    <div 
      className={`
        grid ${getGridClass()} gap-2 w-full ${getGridSize()} mx-auto aspect-square p-4 
        bg-slate-100 dark:bg-slate-900 rounded-2xl shadow-2xl
        border border-slate-200 dark:border-slate-700
      `}
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      role="grid"
      aria-label={`${gridSize}x${gridSize} tic-tac-toe game board`}
    >
      {board.map((player, index) => (
        <GameCell
          key={index}
          player={player}
          onClick={() => onCellClick(index)}
          disabled={disabled || player !== null}
          isWinningCell={winningIndices.includes(index)}
          index={index}
          gridSize={gridSize}
        />
      ))}
    </div>
  );
};