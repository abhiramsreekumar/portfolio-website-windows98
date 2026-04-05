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

      <div style={{
        position: 'absolute',
        bottom: '50px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}>
        <h1 style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          color: '#d0d8e0',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textAlign: 'right',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          Abhiram Sreekumar
        </h1>
        <h2 style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 'clamp(0.8rem, 2vw, 1.5rem)',
          color: '#b0b8c0',
          margin: 0,
          letterSpacing: '0.2em',
          textAlign: 'right',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        }}>
          DevOps Engineer
        </h2>
      </div>
    </div>
  );
};
