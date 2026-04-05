import React from 'react';
import devopsLogo from '../assets/devops.png';
import bg98 from '../assets/98.png';

export const DesktopWallpaper: React.FC = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundImage: `url(${bg98})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 0,
    }}>
      
      <img src={devopsLogo} alt="DevOps" style={{ width: '500px', height: '300px', opacity: 0.7, marginBottom: '20px' }} />

      <h1 style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        color: '#d0d8e0',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textAlign: 'center',
        padding: '0 10px'
      }}>
        Abhiram Sreekumar
      </h1>
      <h2 style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 'clamp(1rem, 3vw, 2rem)',
        color: '#b0b8c0',
        margin: 0,
        letterSpacing: '0.2em',
        textAlign: 'center',
        padding: '0 10px'
      }}>
        DevOps Engineer
      </h2>
    </div>
  );
};
