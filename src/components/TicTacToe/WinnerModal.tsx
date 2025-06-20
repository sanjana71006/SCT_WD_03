import React, { useEffect, useState } from 'react';
import { GameStatus, Player, GridSize } from '../../types/game';
import { Trophy, Users, RotateCcw, X } from 'lucide-react';

interface WinnerModalProps {
  gameStatus: GameStatus;
  winner: Player;
  gameMode: 'pvp' | 'ai';
  gridSize: GridSize;
  onPlayAgain: () => void;
  onClose: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  gameStatus,
  winner,
  gameMode,
  gridSize,
  onPlayAgain,
  onClose
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameStatus === 'won') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  if (gameStatus === 'playing') return null;

  const getWinnerMessage = () => {
    if (gameStatus === 'draw') {
      return "It's a Draw!";
    }
    
    if (gameMode === 'pvp') {
      return `Player ${winner} Wins!`;
    }
    
    return winner === 'X' ? 'You Win! 🎉' : 'AI Wins! 🤖';
  };

  const getWinnerIcon = () => {
    if (gameStatus === 'draw') {
      return <Users className="w-16 h-16 text-slate-400 dark:text-slate-500" />;
    }
    return <Trophy className="w-16 h-16 text-yellow-500" />;
  };

  const getWinnerColor = () => {
    if (gameStatus === 'draw') return 'text-slate-600 dark:text-slate-300';
    if (winner === 'X') return 'text-blue-600 dark:text-blue-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSubMessage = () => {
    if (gameStatus === 'draw') {
      return `Great game on the ${gridSize}×${gridSize} grid! Nobody wins this time.`;
    }
    
    if (gameMode === 'ai') {
      return winner === 'X' 
        ? `Excellent strategy on the ${gridSize}×${gridSize} grid!`
        : `The AI got you this time on the ${gridSize}×${gridSize} grid. Try again!`;
    }
    
    return `Congratulations on winning the ${gridSize}×${gridSize} game!`;
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in border border-slate-200 dark:border-slate-700">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Confetti Effect */}
          {showConfetti && gameStatus === 'won' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 animate-bounce ${
                    i % 4 === 0 ? 'bg-yellow-400' :
                    i % 4 === 1 ? 'bg-blue-400' :
                    i % 4 === 2 ? 'bg-red-400' : 'bg-green-400'
                  }`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center relative">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {getWinnerIcon()}
            </div>

            {/* Winner Message */}
            <h2 className={`text-3xl font-bold mb-2 ${getWinnerColor()}`}>
              {getWinnerMessage()}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {getSubMessage()}
            </p>

            {/* Buttons */}
            <div className="flex space-x-3 justify-center">
              <button
                onClick={onPlayAgain}
                className="
                  flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700
                  text-white rounded-lg transition-colors duration-200 shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50
                "
              >
                <RotateCcw size={18} />
                <span>Play Again</span>
              </button>
              
              <button
                onClick={onClose}
                className="
                  px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 
                  text-slate-700 dark:text-slate-300 rounded-lg
                  transition-colors duration-200 shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};