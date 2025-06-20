import { useState, useEffect } from 'react';
import { Theme } from '../types/game';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('tic-tac-toe-theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('tic-tac-toe-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
};