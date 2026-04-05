import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../Header';
import { Level } from '../Level';
import { Dave } from '../Dave';
import { DialogBox } from '../DialogBox';
import { sound } from '../../utils/soundEngine';
import { gameLevels } from '../../data/levels';
import { useGameEngine } from '../../hooks/useGameEngine';
import { resumeData } from '../../data/resume';

export const DangerousDaveApp: React.FC = () => {
  const SECTIONS = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS'];

  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  const [showContent, setShowContent] = useState(true);
  const [isDeadDialog, setIsDeadDialog] = useState(false);
  
  // Responsive aspect scaling
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / 1000;
        const scaleY = clientHeight / 600;
        setScale(Math.min(scaleX, scaleY));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile detection
  const [isTouchDevice] = useState('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const currentLevel = gameLevels[levelIndex];

  const { player, resetPlayer } = useGameEngine(
    currentLevel.startX,
    currentLevel.startBottom,
    currentLevel.platforms,
    currentLevel.hazards,
    currentLevel.door,
    !showContent && !isDeadDialog
  );

  useEffect(() => {
    if (player.isDead) {
      sound.pickup(); 
      setIsDeadDialog(true);
      setScore(0);
    }
  }, [player.isDead]);

  useEffect(() => {
    if (player.doorReached) {
      sound.levelClear();
      setScore(prev => prev + 1000);
      
      let nextIndex = levelIndex + 1;
      if (nextIndex >= SECTIONS.length) {
         nextIndex = 0;
      }
      setLevelIndex(nextIndex);
      resetPlayer();
    }
  }, [player.doorReached, levelIndex, resetPlayer, SECTIONS.length]);

  const handleStartPlaying = () => {
    sound.init(); 
    setShowContent(false);
    setIsDeadDialog(false);
    resetPlayer(); 
  };

  const handleRespawn = () => {
    setIsDeadDialog(false);
    resetPlayer();
  };

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const simulateKey = (codeStr: string, type: 'keydown' | 'keyup') => {
    const event = new KeyboardEvent(type, { 
      key: codeStr === 'Space' ? ' ' : codeStr, 
      code: codeStr,
      bubbles: true 
    });
    window.dispatchEvent(event);
  };

  const BackgroundContent = () => {
    const currentSection = SECTIONS[levelIndex];

    const isProjects = currentSection === 'PROJECTS';

    const containerStyle: React.CSSProperties = {
      position: 'absolute',
      top: '40px', left: '20px', right: '20px', bottom: '80px',
      zIndex: 5,
      opacity: 0.25,
      color: '#FFFFFF',
      fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: isProjects ? 'flex-end' : 'flex-start',
      alignItems: isProjects ? 'flex-end' : 'center',
      textAlign: isProjects ? 'right' : 'center',
      paddingTop: isProjects ? '0px' : '40px',
      paddingBottom: isProjects ? '20px' : '0px'
    };

    if (currentSection === 'ABOUT') {
      return (
        <div style={containerStyle}>
          <h1 style={{ fontSize: '64px', color: 'var(--ega-light-cyan)', margin: '0 0 10px 0' }}>ABOUT ME</h1>
          <p style={{ fontSize: '28px', margin: '5px 0' }}>{resumeData.about.name}</p>
          <p style={{ fontSize: '24px', margin: '5px 0', color: 'var(--ega-yellow)' }}>{resumeData.about.title}</p>
          <p style={{ fontSize: '20px', maxWidth: '800px', marginTop: '20px', lineHeight: '1.5' }}>{resumeData.about.summary}</p>
        </div>
      );
    }

    if (currentSection === 'EXPERIENCE') {
      return (
        <div style={containerStyle}>
          <h1 style={{ fontSize: '64px', color: 'var(--ega-light-green)', margin: '0 0 30px 0' }}>EXPERIENCE</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {resumeData.experience.slice(0, 3).map((exp, idx) => (
              <div key={idx} style={{ border: '2px dashed var(--ega-light-green)', padding: '15px', width: '250px', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <h3 style={{ fontSize: '20px', color: 'var(--ega-yellow)', margin: '0 0 10px 0' }}>{exp.company}</h3>
                <p style={{ fontSize: '14px', margin: '0', color: 'var(--ega-white)' }}>{exp.role}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentSection === 'PROJECTS') {
      return (
        <div style={containerStyle}>
          <h1 style={{ fontSize: '64px', color: 'var(--ega-light-magenta)', margin: '0 0 20px 0' }}>PROJECTS</h1>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {resumeData.projects.slice(0, 3).map((proj, idx) => (
              <div key={idx} style={{ width: '220px', border: '2px dashed var(--ega-light-magenta)', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--ega-white)', margin: '0 0 5px 0' }}>{proj.name}</h3>
                <p style={{ fontSize: '12px', margin: '0', color: 'var(--ega-light-cyan)' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentSection === 'SKILLS') {
      return (
        <div style={containerStyle}>
          <h1 style={{ fontSize: '64px', color: 'var(--ega-yellow)', margin: '0 0 20px 0' }}>SKILLS & CERTS</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', maxWidth: '800px' }}>
             {[...resumeData.skills.languages, ...resumeData.skills.tools, ...resumeData.skills.cloud].map((skill, i) => (
                <span key={i} style={{ border: '1px solid var(--ega-white)', padding: '8px 12px', fontSize: '18px' }}>{skill}</span>
             ))}
          </div>
          <p style={{ fontSize: '24px', color: 'var(--ega-light-cyan)', marginTop: '40px' }}>{resumeData.education.degree}</p>
          <p style={{ fontSize: '20px', color: 'var(--ega-white)', marginTop: '10px' }}>{resumeData.education.university}</p>
        </div>
      );
    }
    
    return null;
  };

  const renderContent = () => {
    if (isDeadDialog) {
      return (
        <DialogBox title="YOU DIED" onNext={handleRespawn} nextText="[ ENTER ] TO RESPAWN">
          <p style={{ textAlign: 'center', color: 'var(--ega-light-red)' }}>Watch out for water and fire hazards!</p>
          <p style={{ textAlign: 'center' }}>Your score was reset to 0.</p>
        </DialogBox>
      );
    }

    if (showContent) {
      return (
        <DialogBox title="DANGEROUS DAVE" onNext={handleStartPlaying} nextText="[ ENTER ] TO START GAME">
          <h2 style={{ textAlign: 'center', color: 'var(--ega-light-green)', margin: '10px 0' }}>PORTFOLIO EDITION</h2>
          <p style={{ textAlign: 'center' }}>Play through the levels to view my resume.</p>
          <br/>
          <p style={{ color: 'var(--ega-light-cyan)', textAlign: 'center' }}>CONTROLS: Left/Right arrows to walk, Up or Space to jump.</p>
        </DialogBox>
      );
    }

    return null;
  };

  // Internal listener for enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (showContent) {
          handleStartPlaying();
        } else if (isDeadDialog) {
          handleRespawn();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'var(--ega-black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="game-container crt" style={{ position: 'relative', width: '1000px', height: '600px', transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0 }}>
        <Header 
          score={score} 
          level={levelIndex + 1} 
          daves={3} 
          gun={levelIndex > 0} 
          soundEnabled={soundEnabled} 
          onToggleSound={handleToggleSound} 
        />
        
        {BackgroundContent()}

        <Level levelData={currentLevel} />
        
        <Dave 
          x={player.x} 
          bottom={player.bottom} 
          isMoving={player.vx !== 0 || !player.isGrounded} 
          facingRight={player.facingRight} 
          isDead={player.isDead}
        />
        
        <div className="content-layer">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Controls Overlay (Unscaled) */}
      {isTouchDevice && !showContent && !isDeadDialog && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '10px',
          right: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 9999
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onPointerDown={(e) => { e.preventDefault(); simulateKey('ArrowLeft', 'keydown'); }}
              onPointerUp={(e) => { e.preventDefault(); simulateKey('ArrowLeft', 'keyup'); }}
              style={{ width: '50px', height: '50px', opacity: 0.5, borderRadius: '50%', background: 'white' }}
            >
              ◀
            </button>
            <button 
              onPointerDown={(e) => { e.preventDefault(); simulateKey('ArrowRight', 'keydown'); }}
              onPointerUp={(e) => { e.preventDefault(); simulateKey('ArrowRight', 'keyup'); }}
              style={{ width: '50px', height: '50px', opacity: 0.5, borderRadius: '50%', background: 'white' }}
            >
              ▶
            </button>
          </div>
          <button 
            onPointerDown={(e) => { e.preventDefault(); simulateKey('Space', 'keydown'); }}
            onPointerUp={(e) => { e.preventDefault(); simulateKey('Space', 'keyup'); }}
            onPointerCancel={(e) => { e.preventDefault(); simulateKey('Space', 'keyup'); }}
            style={{ width: '60px', height: '60px', opacity: 0.5, borderRadius: '50%', background: 'white', marginRight: '20px' }}
          >
            A
          </button>
        </div>
      )}
    </div>
  );
};
