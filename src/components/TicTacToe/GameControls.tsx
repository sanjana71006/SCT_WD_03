import React from 'react';
import { GameMode } from '../../types/game';
import { RotateCcw, Users, Bot } from 'lucide-react';

interface GameControlsProps {
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  onResetGame: () => void;
  isAIThinking: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameMode,
  onGameModeChange,
  onResetGame,
  isAIThinking
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Game Mode Toggle */}
      <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => onGameModeChange('pvp')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 justify-center
            ${gameMode === 'pvp' 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
          aria-label="Player vs Player mode"
        >
          <Users size={18} />
          <span className="font-medium">PvP</span>
        </button>
        <button
          onClick={() => onGameModeChange('ai')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 flex-1 justify-center
            ${gameMode === 'ai' 
              ? 'bg-red-600 text-white shadow-lg' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }
          `}
          aria-label="Player vs AI mode"
        >
          <Bot size={18} />
          <span className="font-medium">vs AI</span>
        </button>
      </div>

      {/* New Game Button */}
      <button
        onClick={onResetGame}
        disabled={isAIThinking}
        className="
          flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700
          disabled:bg-emerald-400 disabled:cursor-not-allowed
          text-white rounded-lg transition-colors duration-200 shadow-lg
          focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
        "
        aria-label="Start new game"
      >
        <RotateCcw size={18} className={isAIThinking ? 'animate-spin' : ''} />
        <span>New Game</span>
      </button>

      {/* AI Status */}
      {gameMode === 'ai' && isAIThinking && (
        <div className="text-center p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">AI is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};