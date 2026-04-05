import React, { useState } from 'react';
import shutDownPng from '../assets/shut_down_normal-4.png';

interface ShutDownDialogProps {
  onCancel: () => void;
  onConfirm: (action: 'shutdown' | 'restart') => void;
}

export const ShutDownDialog: React.FC<ShutDownDialogProps> = ({ onCancel, onConfirm }) => {
  const [action, setAction] = useState<'shutdown' | 'restart'>('shutdown');

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100dvh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 99999, // Super high to ensure it covers taskbar
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '350px',
        backgroundColor: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        borderLeft: '2px solid #FFFFFF',
        borderRight: '2px solid #000000',
        borderBottom: '2px solid #000000',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: '12px',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
        color: '#000000'
      }}>
        {/* Title Bar */}
        <div style={{
          background: 'linear-gradient(90deg, #000080, #1084d0)',
          color: 'white',
          padding: '3px 4px',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Shut Down Windows</span>
          <button onClick={onCancel} style={{
            backgroundColor: '#C0C0C0', 
            borderTop: '1px solid #FFFFFF', 
            borderLeft: '1px solid #FFFFFF', 
            borderRight: '1px solid #000000', 
            borderBottom: '1px solid #000000', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            padding: '0 4px', 
            fontSize: '10px'
          }}>
            X
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', gap: '20px' }}>
          <div>
            <img src={shutDownPng} alt="Shutdown" style={{ width: 32, height: 32 }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 15px 0' }}>What do you want the computer to do?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="shutdown_action" 
                  checked={action === 'shutdown'} 
                  onChange={() => setAction('shutdown')} 
                  style={{ margin: 0 }}
                />
                Shut down
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="shutdown_action" 
                  checked={action === 'restart'} 
                  onChange={() => setAction('restart')} 
                  style={{ margin: 0 }}
                />
                Restart
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px 20px 20px', marginTop: '10px' }}>
          <button 
            onClick={() => onConfirm(action)}
            style={{ 
              width: '80px', padding: '4px', cursor: 'pointer', 
              backgroundColor: '#C0C0C0', 
              borderTop: '2px solid #FFFFFF', borderLeft: '2px solid #FFFFFF', 
              borderRight: '2px solid #000000', borderBottom: '2px solid #000000' 
            }}
          >
            OK
          </button>
          <button 
            onClick={onCancel}
            style={{ 
              width: '80px', padding: '4px', cursor: 'pointer', 
              backgroundColor: '#C0C0C0', 
              borderTop: '2px solid #FFFFFF', borderLeft: '2px solid #FFFFFF', 
              borderRight: '2px solid #000000', borderBottom: '2px solid #000000' 
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
