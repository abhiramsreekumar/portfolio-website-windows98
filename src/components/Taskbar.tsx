import React, { useState, useEffect, useRef } from 'react';
import startIcon from '../assets/start.png';
import { resumeData } from '../data/resume';

interface TaskbarProps {
  openWindows: { id: string; title: string; icon?: string }[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartMenuAction: (id: string, type: 'pdf' | 'notepad' | 'game', title: string, icon: string, data?: any) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ openWindows, activeWindowId, onWindowClick, onStartMenuAction }) => {
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    if (isStartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartOpen]);

  const handleStartApp = (id: string, type: 'pdf' | 'notepad' | 'game', title: string, icon: string, data?: any) => {
    setIsStartOpen(false);
    onStartMenuAction(id, type, title, icon, data);
  };

  return (
    <>
      {/* Start Menu Popup */}
      {isStartOpen && (
        <div 
          ref={startMenuRef}
          style={{
            position: 'absolute',
            bottom: '35px',
            left: '0px',
            width: '200px',
            backgroundColor: '#C0C0C0',
            borderTop: '2px solid #FFFFFF',
            borderLeft: '2px solid #FFFFFF',
            borderRight: '2px solid #000000',
            borderBottom: '2px solid #000000',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'row',
            fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{
            width: '30px',
            backgroundColor: '#000080',
            color: 'white',
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '5px'
          }}>
            <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontWeight: 'bold' }}>Windows 98</span>
          </div>
          <div style={{ flex: 1, padding: '2px', display: 'flex', flexDirection: 'column' }}>
             <button 
               onClick={() => handleStartApp('resume-pdf', 'pdf', 'Internet Explorer - Resume', '🌐')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               🌐 Resume
             </button>
             <button 
               onClick={() => handleStartApp('dave-exe', 'game', 'Dangerous Dave Engine', '👾')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               👾 Dangerous Dave
             </button>
             <button 
               onClick={() => handleStartApp('exp-txt', 'notepad', 'Experience.txt - Notepad', '📝')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               📝 Experience
             </button>
             <button 
               onClick={() => handleStartApp('skills-txt', 'notepad', 'Skills.txt - Notepad', '📝')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               📝 Skills
             </button>
             <button 
               onClick={() => handleStartApp('edu-txt', 'notepad', 'Education.txt - Notepad', '📝')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               📝 Education
             </button>
             <button 
               onClick={() => handleStartApp('certs-txt', 'notepad', 'Certifications.txt - Notepad', '📝')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               📝 Certifications
             </button>
             <button 
               onClick={() => window.open(`https://${resumeData.about.linkedin}`, '_blank')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               🌐 LinkedIn
             </button>
             <button 
               onClick={() => window.open(`https://${resumeData.about.github}`, '_blank')}
               style={{ border: 'none', background: 'transparent', textAlign: 'left', padding: '5px 10px', width: '100%', cursor: 'pointer' }}>
               🌐 GitHub
             </button>
             <hr style={{ width: '90%', borderTop: '1px solid #808080', borderBottom: '1px solid #FFFFFF' }} />
             <div style={{ padding: '5px 10px', color: '#808080' }}>Shut Down...</div>
          </div>
        </div>
      )}

      {/* Taskbar Main */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '35px',
        backgroundColor: '#C0C0C0',
        borderTop: '2px solid #FFFFFF',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
        zIndex: 9999, // Always on top
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: '12px'
      }}>
        {/* Start Button */}
        <button 
          onClick={() => setIsStartOpen(!isStartOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 'bold',
            padding: '4px 8px',
            backgroundColor: '#C0C0C0',
            borderTop: isStartOpen ? '2px solid #000000' : '2px solid #FFFFFF',
            borderLeft: isStartOpen ? '2px solid #000000' : '2px solid #FFFFFF',
            borderRight: isStartOpen ? '2px solid #FFFFFF' : '2px solid #000000',
            borderBottom: isStartOpen ? '2px solid #FFFFFF' : '2px solid #000000',
            boxShadow: isStartOpen ? 'inset 1px 1px 2px rgba(0,0,0,0.5)' : 'none',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          <img src={startIcon} alt="logo" style={{ width: '16px', height: '16px' }} />
          Start
        </button>

        {/* Open Windows Tabs */}
        <div style={{ display: 'flex', gap: '4px', flex: 1, overflowX: 'auto' }}>
          {openWindows.map(w => (
            <button 
              key={w.id}
              onClick={() => onWindowClick(w.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                maxWidth: '150px',
                backgroundColor: '#C0C0C0',
                borderTop: activeWindowId === w.id ? '2px solid #000000' : '2px solid #FFFFFF',
                borderLeft: activeWindowId === w.id ? '2px solid #000000' : '2px solid #FFFFFF',
                borderRight: activeWindowId === w.id ? '2px solid #FFFFFF' : '2px solid #000000',
                borderBottom: activeWindowId === w.id ? '2px solid #FFFFFF' : '2px solid #000000',
                boxShadow: activeWindowId === w.id ? 'inset 1px 1px 2px rgba(0,0,0,0.5)' : 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {w.icon && <span>{w.icon}</span>}
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray (Clock) */}
        <div style={{
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #FFFFFF',
          borderBottom: '2px solid #FFFFFF',
          padding: '0 10px',
          height: '25px',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '10px',
          gap: '10px'
        }}>
          <button 
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => console.log(err));
              } else {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
              }
            }}
            style={{
               cursor: 'pointer',
               background: '#C0C0C0',
               borderTop: '2px solid #FFFFFF',
               borderLeft: '2px solid #FFFFFF',
               borderRight: '2px solid #000000',
               borderBottom: '2px solid #000000',
               fontWeight: 'bold',
               fontSize: '10px',
               padding: '2px 5px'
            }}
            title="Toggle Fullscreen"
          >
            [FS]
          </button>
          
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </>
  );
};
