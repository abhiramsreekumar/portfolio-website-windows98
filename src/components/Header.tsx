import React from 'react';
import { sound } from '../utils/soundEngine';

interface HeaderProps {
  score: number;
  level: number;
  daves: number;
  gun: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({ score, level, daves, gun, soundEnabled, onToggleSound }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: 'var(--ega-black)',
      borderBottom: '4px solid var(--ega-red)',
      color: 'var(--ega-white)',
      fontSize: '14px',
      height: '50px',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 100,
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <span>SCORE: {score.toString().padStart(5, '0')}</span>
        <span>LEVEL: {level.toString().padStart(2, '0')}</span>
        <span>DAVES: {daves}</span>
        <span>GUN: {gun ? 'YES' : 'NO'}</span>
      </div>
      
      <button 
        onClick={() => {
          sound.init(); // Initialize audio context on first user interaction
          onToggleSound();
        }}
        style={{
          backgroundColor: 'transparent',
          color: soundEnabled ? 'var(--ega-green)' : 'var(--ega-dark-gray)',
          border: 'none',
          fontFamily: 'inherit',
          cursor: 'pointer',
          padding: '5px',
          pointerEvents: 'auto',
          zIndex: 1001,
        }}
      >
        [SOUND: {soundEnabled ? 'ON' : 'OFF'}]
      </button>
    </div>
  );
};
