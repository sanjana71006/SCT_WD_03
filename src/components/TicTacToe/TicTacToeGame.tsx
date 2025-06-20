import React, { useEffect, useState } from 'react';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameSettings } from './GameSettings';
import { ScoreTracker } from './ScoreTracker';
import { WinnerModal } from './WinnerModal';
import { useGameState } from '../../hooks/useGameState';
import { useSound } from '../../hooks/useSound';
import { useTheme } from '../../hooks/useTheme';

export const TicTacToeGame: React.FC = () => {
  const {
    gameState,
    makeMove,
    makeAIMove,
    resetGame,
    setGameMode,
    setAIDifficulty,
    setGridSize,
    resetScores
  } = useGameState();

  const {
    soundEnabled,
    playMoveSound,
    playWinSound,
    playDrawSound,
    toggleSound
  } = useSound();

  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  // Handle AI moves
  useEffect(() => {
    if (gameState.gameMode === 'ai' && gameState.currentPlayer === 'O' && gameState.gameStatus === 'playing') {
      setIsAIThinking(true);
      const delay = gameState.aiDifficulty === 'easy' ? 300 : 
                    gameState.aiDifficulty === 'medium' ? 600 : 1000;
      
      const timer = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false);
      }, delay);

      return () => {
        clearTimeout(timer);
        setIsAIThinking(false);
      };
    } else {
      setIsAIThinking(false);
    }
  }, [gameState.gameMode, gameState.currentPlayer, gameState.gameStatus, gameState.aiDifficulty, makeAIMove]);

  // Handle sound effects
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      playWinSound();
    } else if (gameState.gameStatus === 'draw') {
      playDrawSound();
    }
  }, [gameState.gameStatus, playWinSound, playDrawSound]);

  const handleCellClick = (index: number) => {
    if (isAIThinking) return;
    
    const success = makeMove(index);
    if (success) {
      playMoveSound();
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    setIsAIThinking(false);
  };

  const handleGameModeChange = (mode: 'pvp' | 'ai') => {
    setGameMode(mode);
    setIsAIThinking(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Tic-Tac-Toe
            </h1>
            <GameSettings
              isOpen={settingsOpen}
              onToggle={() => setSettingsOpen(!settingsOpen)}
              aiDifficulty={gameState.aiDifficulty}
              onAIDifficultyChange={setAIDifficulty}
              gridSize={gameState.gridSize}
              onGridSizeChange={setGridSize}
              theme={theme}
              onThemeToggle={toggleTheme}
              soundEnabled={soundEnabled}
              onSoundToggle={toggleSound}
              onResetScores={resetScores}
            />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Challenge a friend or test your skills against AI
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-500">
            <span>{gameState.gridSize}×{gameState.gridSize} Grid</span>
            {gameState.gameMode === 'ai' && (
              <>
                <span>•</span>
                <span className={`capitalize ${
                  gameState.aiDifficulty === 'easy' ? 'text-green-600 dark:text-green-400' :
                  gameState.aiDifficulty === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {gameState.aiDifficulty} AI
                </span>
              </>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Score Tracker */}
          <div className="order-2 lg:order-1">
            <ScoreTracker
              scores={gameState.scores}
              currentPlayer={gameState.currentPlayer}
              gameMode={gameState.gameMode}
              aiDifficulty={gameState.aiDifficulty}
              gridSize={gameState.gridSize}
            />
          </div>

          {/* Game Board */}
          <div className="order-1 lg:order-2">
            <GameBoard
              board={gameState.board}
              onCellClick={handleCellClick}
              disabled={gameState.gameStatus !== 'playing' || isAIThinking}
              gridSize={gameState.gridSize}
            />
          </div>

          {/* Game Controls */}
          <div className="order-3">
            <GameControls
              gameMode={gameState.gameMode}
              onGameModeChange={handleGameModeChange}
              onResetGame={handlePlayAgain}
              isAIThinking={isAIThinking}
            />
          </div>
        </div>

        {/* Winner Modal */}
        <WinnerModal
          gameStatus={gameState.gameStatus}
          winner={gameState.winner}
          gameMode={gameState.gameMode}
          gridSize={gameState.gridSize}
          onPlayAgain={handlePlayAgain}
          onClose={handlePlayAgain}
        />

        {/* Settings Backdrop */}
        {settingsOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};