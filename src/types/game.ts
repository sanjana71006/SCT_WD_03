export type Player = 'X' | 'O' | null;
export type GameMode = 'pvp' | 'ai';
export type GameStatus = 'playing' | 'won' | 'draw';
export type AIDifficulty = 'easy' | 'medium' | 'hard';
export type GridSize = 3 | 4 | 5;
export type Theme = 'light' | 'dark';

export interface GameState {
  board: Player[];
  currentPlayer: Player;
  gameStatus: GameStatus;
  winner: Player;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  gridSize: GridSize;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

export interface WinningLine {
  indices: number[];
  player: Player;
}

export interface GameSettings {
  theme: Theme;
  soundEnabled: boolean;
  aiDifficulty: AIDifficulty;
  gridSize: GridSize;
}