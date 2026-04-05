import React from 'react';
import { LevelData } from '../data/levels';

interface LevelProps {
  levelData: LevelData;
}

export const Level: React.FC<LevelProps> = ({ levelData }) => {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.8,
      zIndex: 10,
      pointerEvents: 'none',
    }}>
      {/* Floor */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: `80px`,
        backgroundImage: `
          linear-gradient(45deg, var(--ega-red) 25%, transparent 25%, transparent 75%, var(--ega-red) 75%, var(--ega-red)),
          linear-gradient(45deg, var(--ega-red) 25%, transparent 25%, transparent 75%, var(--ega-red) 75%, var(--ega-red))
        `,
        backgroundColor: 'var(--ega-brown)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }} />

      {/* Platforms */}
      {levelData.platforms.map((p, i) => (
        <div key={`plat-${i}`} style={{
          position: 'absolute',
          left: `${p.x}px`,
          bottom: `${p.bottom}px`,
          width: `${p.width}px`,
          height: `${p.height}px`,
          backgroundColor: 'var(--ega-red)',
          borderTop: '2px solid var(--ega-light-red)',
          borderBottom: '2px solid var(--ega-dark-gray)',
          backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.2) 50%)',
          backgroundSize: '10px 10px',
        }} />
      ))}

      {/* Hazards */}
      {levelData.hazards.map((h, i) => (
        <div key={`haz-${i}`} style={{
          position: 'absolute',
          left: `${h.x}px`,
          bottom: `${h.bottom}px`,
          width: `${h.width}px`,
          height: `${h.height}px`,
          backgroundColor: h.type === 'fire' ? 'var(--ega-light-red)' : 'var(--ega-blue)',
          borderTop: h.type === 'fire' ? '4px dashed var(--ega-yellow)' : '4px dashed var(--ega-light-cyan)',
          opacity: 0.9,
        }}>
          {h.type === 'fire' ? <span style={{color:'var(--ega-yellow)', fontSize:'10px'}}>FIRE!</span> : ''}
        </div>
      ))}

      {/* The Door */}
      <div style={{
        position: 'absolute',
        left: `${levelData.door.x}px`,
        bottom: `${levelData.door.bottom}px`,
        width: `${levelData.door.width}px`,
        height: `${levelData.door.height}px`,
        backgroundColor: 'var(--ega-light-gray)',
        border: '4px solid var(--ega-black)',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--ega-black)', borderRadius: '50%', alignSelf: 'flex-start', marginLeft: '8px' }}></div>
        <div style={{ fontSize: '10px', marginTop: '10px', color: 'var(--ega-black)' }}>{levelData.id}</div>
      </div>
    </div>
  );
};
