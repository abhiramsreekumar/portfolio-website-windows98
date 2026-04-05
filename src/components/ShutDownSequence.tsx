import React, { useEffect, useState } from 'react';
import windowsLogo from '../assets/windows98-logo.png';

interface ShutDownSequenceProps {
  action: 'shutdown' | 'restart';
}

export const ShutDownSequence: React.FC<ShutDownSequenceProps> = ({ action }) => {
  const [phase, setPhase] = useState<'black1' | 'image' | 'black-restart' | 'crt-off' | 'black-final'>('black1');

  useEffect(() => {
    // Phase 1: Black for 0.2s
    const t1 = setTimeout(() => {
      setPhase('image');
      
      // Phase 2: Show image for 5s
      setTimeout(() => {
        setPhase('crt-off');
        
        // Phase 3: CRT Animation finishes, go completely black
        setTimeout(() => {
           if (action === 'restart') {
             setPhase('black-restart');
             setTimeout(() => {
               window.location.reload();
             }, 2000);
           } else {
             setPhase('black-final');
           }
        }, 600); // 600ms CRT animation duration
      }, 5000);
    }, 200);

    return () => {
      clearTimeout(t1);
    };
  }, [action]);

  if (phase === 'black1') {
    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', backgroundColor: 'black', zIndex: 999999 }}></div>;
  }

  if (phase === 'black-restart') {
    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', backgroundColor: 'black', zIndex: 999999 }}></div>;
  }

  const renderImagePhase = () => (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', 
      backgroundColor: '#a7c7df', zIndex: 999999, 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
    }}>
      <img src={windowsLogo} alt="Windows 98 Logo" style={{ maxWidth: '80%', height: 'auto', marginBottom: '40px' }} />
      <span style={{ fontFamily: "'MS Sans Serif', Tahoma, sans-serif", fontSize: 'clamp(16px, 4vw, 24px)', fontWeight: 'bold' }}>
        {action === 'shutdown' ? 'Windows is shutting down...' : 'Windows is Restarting...'}
      </span>
    </div>
  );

  if (phase === 'image') {
    return renderImagePhase();
  }

  if (phase === 'crt-off') {
    return (
      <>
        <style>
          {`
            @keyframes crt-off {
              0% {
                transform: scale(1, 1);
                filter: brightness(1) contrast(1);
              }
              50% {
                transform: scale(1, 0.005);
                filter: brightness(10) contrast(5);
              }
              100% {
                transform: scale(0, 0.005);
                filter: brightness(0);
              }
            }
          `}
        </style>
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', backgroundColor: 'black', zIndex: 999999, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
           <div style={{ width: '100vw', height: '100dvh', animation: 'crt-off 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards', overflow: 'hidden' }}>
             {renderImagePhase()}
           </div>
        </div>
      </>
    );
  }

  if (phase === 'black-final') {
    return (
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh', 
        backgroundColor: 'black', zIndex: 999999,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        color: '#FFFFFF', fontFamily: "monospace"
      }}>
         <h1 style={{ marginBottom: '40px', color: '#00FF00', fontSize: 'clamp(20px, 5vw, 40px)', textAlign: 'center' }}>
           Hope You Liked the Windows 98 Portfolio Site, Thank you
         </h1>
         <button 
           onClick={() => window.location.reload()}
           style={{ 
             padding: '10px 30px', 
             fontSize: '16px', 
             cursor: 'pointer',
             backgroundColor: '#C0C0C0', 
             borderTop: '2px solid #FFFFFF', borderLeft: '2px solid #FFFFFF', 
             borderRight: '2px solid #000000', borderBottom: '2px solid #000000',
             color: '#000000',
             fontWeight: 'bold',
             fontFamily: "'MS Sans Serif', Tahoma, sans-serif"
           }}
         >
           Go back Home
         </button>
      </div>
    );
  }

  return null;
};
