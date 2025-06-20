import React from 'react';
import { GameState } from '../../types/game';

interface ScoreTrackerProps {
  scores: GameState['scores'];
  currentPlayer: GameState['currentPlayer'];
  gameMode: GameState['gameMode'];
  aiDifficulty: GameState['aiDifficulty'];
  gridSize: GameState['gridSize'];
}

export const ScoreTracker: React.FC<ScoreTrackerProps> = ({
  scores,
  currentPlayer,
  gameMode,
  aiDifficulty,
  gridSize
}) => {
  const getDifficultyColor = () => {
    switch (aiDifficulty) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Score Tracker
        </h2>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {gridSize}×{gridSize} Grid
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className={`
          text-center p-3 rounded-lg transition-all duration-200
          ${currentPlayer === 'X' 
            ? 'bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-600' 
            : 'bg-slate-50 dark:bg-slate-700'
          }
        `}>
          <div className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-1">X</div>
          <div className="text-slate-800 dark:text-white text-lg font-semibold">{scores.X}</div>
          <div className="text-slate-500 dark:text-slate-400 text-xs">
            {gameMode === 'pvp' ? 'Player 1' : 'You'}
          </div>
        </div>
        
        <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
          <div className="text-2xl font-bold text-slate-400 dark:text-slate-500 mb-1">—</div>
          <div className="text-slate-800 dark:text-white text-lg font-semibold">{scores.draws}</div>
          <div className="text-slate-500 dark:text-slate-400 text-xs">Draws</div>
        </div>
        
        <div className={`
          text-center p-3 rounded-lg transition-all duration-200
          ${currentPlayer === 'O' 
            ? 'bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-600' 
            : 'bg-slate-50 dark:bg-slate-700'
          }
        `}>
          <div className="text-2xl font-bold text-red-500 dark:text-red-400 mb-1">O</div>
          <div className="text-slate-800 dark:text-white text-lg font-semibold">{scores.O}</div>
          <div className="text-slate-500 dark:text-slate-400 text-xs">
            {gameMode === 'pvp' ? 'Player 2' : (
              <span>
                AI <span className={getDifficultyColor()}>({aiDifficulty})</span>
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-slate-500 dark:text-slate-400 text-sm mb-2">Current Turn</div>
        <div className={`
          inline-flex items-center space-x-2 px-3 py-2 rounded-full
          ${currentPlayer === 'X' 
            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600' 
            : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600'
          }
        `}>
          <span className="text-lg font-bold">{currentPlayer}</span>
          <span className="text-sm">
            {gameMode === 'pvp' 
              ? (currentPlayer === 'X' ? 'Player 1' : 'Player 2')
              : (currentPlayer === 'X' ? 'Your turn' : 'AI turn')
            }
          </span>
        </div>
      </div>
    </div>
  );
};