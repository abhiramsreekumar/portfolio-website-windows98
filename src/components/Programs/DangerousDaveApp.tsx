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
      setShowContent(true);
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

  const renderContent = () => {
    if (isDeadDialog) {
      return (
        <DialogBox title="YOU DIED" onNext={handleRespawn} nextText="[ ENTER ] TO RESPAWN">
          <p style={{ textAlign: 'center', color: 'var(--ega-light-red)' }}>Watch out for water and fire hazards!</p>
          <p style={{ textAlign: 'center' }}>Your score was reset to 0.</p>
        </DialogBox>
      );
    }

    if (!showContent) return null;

    const currentSection = SECTIONS[levelIndex];

    if (currentSection === 'ABOUT') {
      return (
        <DialogBox title="LEVEL 01: ABOUT ME" onNext={handleStartPlaying} nextText="[ ENTER ] TO START LEVEL">
          <p>NAME: <span className="blink">_</span> {resumeData.about.name}</p>
          <p>TITLE: {resumeData.about.title}</p>
          <p>LOCATION: {resumeData.about.location}</p>
          <br/>
          <p>{resumeData.about.summary}</p>
          <br/>
          <p>EMAIL: {resumeData.about.email}</p>
          <p>LINKEDIN: {resumeData.about.linkedin}</p>
          <p>GITHUB: {resumeData.about.github}</p>
          <br/>
          <p style={{ color: 'var(--ega-light-green)' }}>CONTROLS: Use Left/Right arrows to walk, Up or Space to jump.</p>
        </DialogBox>
      );
    }

    if (currentSection === 'EXPERIENCE') {
      return (
        <DialogBox title="LEVEL 02: EXPERIENCE" onNext={handleStartPlaying} nextText="[ ENTER ] TO START LEVEL">
          <div style={{ maxHeight: '20vh', overflowY: 'auto', paddingRight: '10px' }}>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="exp-card">
                <h3 style={{ color: 'var(--ega-light-green)', margin: '0 0 5px 0' }}>{exp.company}</h3>
                <p style={{ color: 'var(--ega-light-cyan)', margin: '0 0 10px 0' }}>{exp.role} | {exp.period}</p>
                <ul style={{ paddingLeft: '20px', listStyleType: 'square' }}>
                  {exp.bullets.map((b, i) => <li key={i} style={{ marginBottom: '5px' }}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </DialogBox>
      );
    }

    if (currentSection === 'PROJECTS') {
      return (
        <DialogBox title="LEVEL 03: PROJECTS" onNext={handleStartPlaying} nextText="[ ENTER ] TO START LEVEL">
          <div style={{ maxHeight: '20vh', overflowY: 'auto', paddingRight: '10px' }}>
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="project-card">
                <h3 style={{ color: 'var(--ega-light-magenta)' }}>{proj.name}</h3>
                <p><a href={"https://" + proj.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>{proj.link}</a></p>
                <br/>
                <p>{proj.description}</p>
              </div>
            ))}
          </div>
        </DialogBox>
      );
    }

    if (currentSection === 'SKILLS') {
      return (
        <DialogBox title="LEVEL 04: SKILLS & CERTS" onNext={handleStartPlaying} nextText="[ ENTER ] TO START LEVEL">
          <div style={{ maxHeight: '20vh', overflowY: 'auto', paddingRight: '10px' }}>
            <h3 style={{ color: 'var(--ega-yellow)' }}>TECH STACK:</h3>
            <div>
              {[...resumeData.skills.languages, ...resumeData.skills.tools, ...resumeData.skills.cloud].map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
            <br/>
            <h3 style={{ color: 'var(--ega-yellow)' }}>CERTIFICATIONS:</h3>
            {resumeData.certifications.map((cert, i) => (
              <div key={i} className="certification">
                <p>{cert}</p>
              </div>
            ))}
            <br/>
            <h3 style={{ color: 'var(--ega-yellow)' }}>EDUCATION:</h3>
            <p>{resumeData.education.degree}</p>
            <p>{resumeData.education.university}</p>
            <p>{resumeData.education.period}</p>
          </div>
        </DialogBox>
      );
    }
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
