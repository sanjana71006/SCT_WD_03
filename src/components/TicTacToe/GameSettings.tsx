import React from 'react';
import { Settings, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { AIDifficulty, GridSize, Theme } from '../../types/game';

interface GameSettingsProps {
  isOpen: boolean;
  onToggle: () => void;
  aiDifficulty: AIDifficulty;
  onAIDifficultyChange: (difficulty: AIDifficulty) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  theme: Theme;
  onThemeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onResetScores: () => void;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  isOpen,
  onToggle,
  aiDifficulty,
  onAIDifficultyChange,
  gridSize,
  onGridSizeChange,
  theme,
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  onResetScores
}) => {
  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={onToggle}
        className={`
          flex items-center justify-center p-3 rounded-xl transition-all duration-200 shadow-lg
          ${isOpen 
            ? 'bg-blue-600 text-white' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
          }
          border border-slate-200 dark:border-slate-600
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
        `}
        aria-label="Game settings"
      >
        <Settings size={20} className={isOpen ? 'rotate-45' : ''} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 z-50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Game Settings</h3>
          
          {/* AI Difficulty */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              AI Difficulty
            </label>
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
              {(['easy', 'medium', 'hard'] as AIDifficulty[]).map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onAIDifficultyChange(difficulty)}
                  className={`
                    flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize
                    ${aiDifficulty === difficulty
                      ? difficulty === 'easy' 
                        ? 'bg-green-500 text-white shadow-lg'
                        : difficulty === 'medium'
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-red-500 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }
                  `}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Size */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Grid Size
            </label>
            <div className="flex space-x-2">
              {([3, 4, 5] as GridSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => onGridSizeChange(size)}
                  className={`
                    flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${gridSize === size
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }
                  `}
                >
                  {size}×{size}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Sound Controls */}
          <div className="flex space-x-3 mb-4">
            <button
              onClick={onThemeToggle}
              className="
                flex items-center space-x-2 flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 
                hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 
                rounded-lg transition-colors duration-200
              "
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span className="text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={onSoundToggle}
              className="
                flex items-center space-x-2 flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 
                hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 
                rounded-lg transition-colors duration-200
              "
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="text-sm">{soundEnabled ? 'On' : 'Off'}</span>
            </button>
          </div>

          {/* Reset Scores */}
          <button
            onClick={onResetScores}
            className="
              w-full px-3 py-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 
              text-red-700 dark:text-red-400 rounded-lg transition-colors duration-200 text-sm font-medium
            "
          >
            Reset All Scores
          </button>
        </div>
      )}
    </div>
  );
};