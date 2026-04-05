import React from 'react';

interface NotepadProps {
  content: string | React.ReactNode;
}

export const Notepad: React.FC<NotepadProps> = ({ content }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: '14px',
      padding: '10px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      boxSizing: 'border-box',
      color: '#000000'
    }}>
      {/* Fake menu bar */}
      <div style={{
        backgroundColor: '#f0f0f0',
        borderBottom: '1px solid #ccc',
        padding: '2px 5px',
        marginBottom: '10px',
        position: 'sticky',
        top: '-10px',
        display: 'flex',
        gap: '15px',
        fontSize: '12px',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif"
      }}>
        <span style={{cursor:'pointer'}}><u>F</u>ile</span>
        <span style={{cursor:'pointer'}}><u>E</u>dit</span>
        <span style={{cursor:'pointer'}}><u>S</u>earch</span>
        <span style={{cursor:'pointer'}}><u>H</u>elp</span>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
};
