import React from 'react';
import { Player, GridSize } from '../../types/game';

interface GameCellProps {
  player: Player;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
  index: number;
  gridSize: GridSize;
}

export const GameCell: React.FC<GameCellProps> = ({
  player,
  onClick,
  disabled,
  isWinningCell,
  index,
  gridSize
}) => {
  const getFontSize = () => {
    switch (gridSize) {
      case 3: return 'text-6xl';
      case 4: return 'text-4xl';
      case 5: return 'text-3xl';
      default: return 'text-6xl';
    }
  };

  const getHoverSize = () => {
    switch (gridSize) {
      case 3: return 'text-4xl';
      case 4: return 'text-2xl';
      case 5: return 'text-xl';
      default: return 'text-4xl';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full h-full bg-white dark:bg-slate-800 
        border-2 border-slate-300 dark:border-slate-600
        rounded-lg transition-all duration-200 ease-in-out
        hover:border-slate-400 dark:hover:border-slate-400 
        hover:bg-slate-50 dark:hover:bg-slate-700
        disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
        group shadow-sm hover:shadow-md
        ${isWinningCell ? 'animate-pulse bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-400 dark:from-yellow-500 dark:to-orange-600' : ''}
        ${player ? 'hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800' : ''}
      `}
      aria-label={`Cell ${index + 1}, ${player || 'empty'}`}
      role="gridcell"
    >
      {player && (
        <span
          className={`
            ${getFontSize()} font-bold transition-all duration-300 ease-in-out
            transform group-hover:scale-110
            ${player === 'X' 
              ? 'text-blue-500 dark:text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
              : 'text-red-500 dark:text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]'
            }
            ${isWinningCell ? 'text-white animate-bounce' : ''}
          `}
        >
          {player}
        </span>
      )}
      
      {!player && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity duration-200">
          <span className={`${getHoverSize()} font-bold text-slate-400 dark:text-slate-500`}>
            +
          </span>
        </div>
      )}
    </button>
  );
};