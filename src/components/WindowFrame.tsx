import React, { useState } from 'react';

interface WindowFrameProps {
  id: string;
  title: string;
  icon?: string;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ 
  id, title, icon, onClose, onFocus, zIndex, children, defaultWidth = 600, defaultHeight = 450 
}) => {
  // Simple dragging state
  const [pos, setPos] = useState({ 
    x: Math.random() * 20 + 10, 
    y: Math.random() * 20 + 10 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus(id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as Element).releasePointerCapture(e.pointerId);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div
      onMouseDown={() => onFocus(id)}
      style={{
        position: 'absolute',
        top: isMobile ? 0 : Math.max(0, pos.y),
        left: isMobile ? 0 : Math.max(0, pos.x),
        width: isMobile ? '100vw' : `${defaultWidth}px`,
        height: isMobile ? 'calc(100vh - 35px)' : `${defaultHeight}px`,
        maxWidth: '100vw',
        maxHeight: 'calc(100vh - 35px)',
        backgroundColor: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        borderLeft: '2px solid #FFFFFF',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif"
      }}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          background: 'linear-gradient(90deg, #000080, #1084d0)',
          color: 'white',
          padding: '3px 4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
          <span>{title}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(id); }}
          onPointerDown={(e) => e.stopPropagation()} // Prevent dragging from close button
          style={{
            backgroundColor: '#C0C0C0',
            borderTop: '1px solid #FFFFFF',
            borderLeft: '1px solid #FFFFFF',
            borderRight: '1px solid #000000',
            borderBottom: '1px solid #000000',
            fontWeight: 'bold',
            padding: '1px 5px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          X
        </button>
      </div>

      {/* Internal Content Area */}
      <div style={{
        flex: 1,
        borderTop: '2px solid #808080',
        borderLeft: '2px solid #808080',
        borderRight: '2px solid #FFFFFF',
        borderBottom: '2px solid #FFFFFF',
        margin: '2px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden', // Let children handle their own scrolling
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  );
};
