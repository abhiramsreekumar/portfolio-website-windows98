import React from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string; // Emoji for simplicity or SVG
  onDoubleClick: (id: string) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, onDoubleClick }) => {
  return (
    <div 
      onDoubleClick={() => onDoubleClick(id)}
      style={{
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        cursor: 'pointer',
        padding: '5px',
        userSelect: 'none'
      }}
      className="desktop-icon"
    >
      <div style={{
        fontSize: '40px',
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))'
      }}>
        {icon}
      </div>
      <div style={{
        color: 'white',
        backgroundColor: 'rgba(0, 0, 128, 0.7)',
        padding: '2px 4px',
        fontSize: '12px',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        textAlign: 'center',
        wordWrap: 'break-word',
        border: '1px dotted transparent',
      }}>
        {label}
      </div>
    </div>
  );
};
