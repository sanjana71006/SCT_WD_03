import { useCallback, useRef, useState } from 'react';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!soundEnabled) return;
    
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [soundEnabled, getAudioContext]);

  const playMoveSound = useCallback(() => {
    playTone(800, 0.1, 'square');
  }, [playTone]);

  const playWinSound = useCallback(() => {
    const notes = [523, 659, 784, 1047]; // C, E, G, C
    notes.forEach((note, index) => {
      setTimeout(() => playTone(note, 0.3), index * 100);
    });
  }, [playTone]);

  const playDrawSound = useCallback(() => {
    playTone(400, 0.5, 'triangle');
  }, [playTone]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  return {
    soundEnabled,
    playMoveSound,
    playWinSound,
    playDrawSound,
    toggleSound
  };
};