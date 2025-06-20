import { useState, useCallback } from 'react';
import { GameState, GameMode, Player, AIDifficulty, GridSize } from '../types/game';
import { createEmptyBoard, checkWinner, checkDraw } from '../utils/gameLogic';
import { getAIMove } from '../utils/aiLogic';

const createInitialGameState = (gridSize: GridSize = 3, aiDifficulty: AIDifficulty = 'medium'): GameState => ({
  board: createEmptyBoard(gridSize),
  currentPlayer: 'X',
  gameStatus: 'playing',
  winner: null,
  gameMode: 'pvp',
  aiDifficulty,
  gridSize,
  scores: {
    X: 0,
    O: 0,
    draws: 0
  }
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const makeMove = useCallback((index: number) => {
    if (gameState.board[index] || gameState.gameStatus !== 'playing') {
      return false;
    }

    setGameState(prev => {
      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;
      
      const winner = checkWinner(newBoard, prev.gridSize);
      const isDraw = !winner && checkDraw(newBoard);
      
      let newGameStatus = prev.gameStatus;
      let newWinner = prev.winner;
      let newScores = prev.scores;
      
      if (winner) {
        newGameStatus = 'won';
        newWinner = winner.player;
        newScores = {
          ...prev.scores,
          [winner.player!]: prev.scores[winner.player!] + 1
        };
      } else if (isDraw) {
        newGameStatus = 'draw';
        newScores = {
          ...prev.scores,
          draws: prev.scores.draws + 1
        };
      }
      
      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        gameStatus: newGameStatus,
        winner: newWinner,
        scores: newScores
      };
    });
    
    return true;
  }, [gameState.board, gameState.gameStatus, gameState.gridSize]);

  const makeAIMove = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentPlayer !== 'O') {
      return;
    }

    const delay = gameState.aiDifficulty === 'easy' ? 300 : 
                  gameState.aiDifficulty === 'medium' ? 600 : 1000;

    setTimeout(() => {
      const aiMoveIndex = getAIMove(gameState.board, gameState.aiDifficulty, gameState.gridSize);
      if (aiMoveIndex !== -1) {
        makeMove(aiMoveIndex);
      }
    }, delay);
  }, [gameState.board, gameState.gameStatus, gameState.currentPlayer, gameState.aiDifficulty, gameState.gridSize, makeMove]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: createEmptyBoard(prev.gridSize),
      currentPlayer: 'X',
      gameStatus: 'playing',
      winner: null
    }));
  }, []);

  const setGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      board: createEmptyBoard(prev.gridSize),
      currentPlayer: 'X',
      gameStatus: 'playing',
      winner: null
    }));
  }, []);

  const setAIDifficulty = useCallback((difficulty: AIDifficulty) => {
    setGameState(prev => ({
      ...prev,
      aiDifficulty: difficulty
    }));
  }, []);

  const setGridSize = useCallback((size: GridSize) => {
    setGameState(prev => ({
      ...createInitialGameState(size, prev.aiDifficulty),
      gameMode: prev.gameMode,
      scores: prev.scores
    }));
  }, []);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: {
        X: 0,
        O: 0,
        draws: 0
      }
    }));
  }, []);

  return {
    gameState,
    makeMove,
    makeAIMove,
    resetGame,
    setGameMode,
    setAIDifficulty,
    setGridSize,
    resetScores
  };
};