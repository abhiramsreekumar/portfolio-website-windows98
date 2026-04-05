import React from 'react';

interface DaveProps {
  x: number;
  bottom: number;
  isMoving: boolean;
  facingRight: boolean;
  isDead: boolean;
}

export const Dave: React.FC<DaveProps> = ({ x, bottom, isMoving, facingRight, isDead }) => {
  if (isDead) {
    return (
      <div style={{
        position: 'absolute',
        bottom: `${bottom}px`,
        left: `${x}px`,
        width: '32px',
        height: '40px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--ega-yellow)',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 50,
      }}>
        *POP*
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${bottom}px`,
        left: `${x}px`,
        width: '32px',
        height: '40px',
        transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 50,
      }}
    >
      <div style={{
        width: '24px',
        height: '24px',
        backgroundColor: 'var(--ega-red)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: '#FFDAB9'
        }}></div>
         <div style={{
          position: 'absolute',
          top: '4px', right: '4px', width: '4px', height: '4px', backgroundColor: 'var(--ega-black)'
        }}></div>
      </div>
      <div style={{
        width: '20px',
        height: '16px',
        backgroundColor: 'var(--ega-blue)',
        display: 'flex',
        gap: '4px',
        animation: isMoving ? 'walk 0.2s infinite alternate steps(2)' : 'none',
      }}>
        <div style={{ width: '8px', height: '100%', backgroundColor: 'var(--ega-white)' }}></div>
        <div style={{ width: '8px', height: '100%', backgroundColor: 'var(--ega-white)' }}></div>
      </div>
      
      <style>
        {`
          @keyframes walk {
            0% { transform: translateY(0); }
            100% { transform: translateY(-4px); }
          }
        `}
      </style>
    </div>
  );
};
