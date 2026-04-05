import React from 'react';

interface DialogBoxProps {
  title: string;
  children: React.ReactNode;
  onNext?: () => void;
  nextText?: string;
  className?: string;
}

export const DialogBox: React.FC<DialogBoxProps> = ({ title, children, onNext, nextText = "PRESS ENTER OR CLICK OUTSIDE", className }) => {
  return (
    <div 
      className={className}
      style={{
        backgroundColor: 'var(--ega-blue)',
        border: '4px double var(--ega-white)',
        color: 'var(--ega-white)',
        padding: '20px',
        width: '90%',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '8px 8px 0px rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: 'var(--ega-yellow)', margin: 0, fontSize: '1.2rem' }}>
        *** {title} ***
      </h2>
      
      <div style={{ fontSize: '0.8rem', lineHeight: '1.8' }}>
        {children}
      </div>

      {onNext && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            style={{
              backgroundColor: 'var(--ega-black)',
              border: '2px solid var(--ega-white)',
              color: 'var(--ega-yellow)',
              padding: '10px 20px',
            }}
          >
            {nextText}
          </button>
        </div>
      )}
    </div>
  );
};
