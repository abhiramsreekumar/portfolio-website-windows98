import React, { useState } from 'react';
import { DesktopWallpaper } from './DesktopWallpaper';
import { DesktopIcon } from './DesktopIcon';
import { WindowFrame } from './WindowFrame';
import { Taskbar } from './Taskbar';
import { Notepad } from './Programs/Notepad';
import { InternetExplorer } from './Programs/InternetExplorer';
import { DangerousDaveApp } from './Programs/DangerousDaveApp';
import { AboutSystem } from './Programs/AboutSystem';
import { resumeData } from '../data/resume';
import notepadPng from '../assets/notepad-5.png';
import pdfPng from '../assets/ie-pdf.png';
import recyclePng from '../assets/recycle-bin.png';

interface WindowState {
  id: string;
  type: 'pdf' | 'notepad' | 'game' | 'about';
  title: string;
  icon: string | React.ReactNode;
  zIndex: number;
  data?: any;
}

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(10);

  const openWindow = (id: string, type: 'pdf' | 'notepad' | 'game' | 'about', title: string, icon: string | React.ReactNode, data?: any) => {
    // Check if already open
    const existing = windows.find(w => w.id === id);
    if (existing) {
      focusWindow(id);
      return;
    }
    
    let windowData = data;
    if (!windowData && type === 'notepad') {
      if (id === 'certs-txt') windowData = getCertsTxt();
      else if (id === 'exp-txt') windowData = getExperienceTxt();
      else if (id === 'skills-txt') windowData = getSkillsTxt();
      else if (id === 'edu-txt') windowData = getEducationTxt();
    }

    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);
    setWindows([...windows, { id, type, title, icon, zIndex: newZ, data: windowData }]);
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null); 
    }
  };

  const focusWindow = (id: string) => {
    if (activeWindowId === id) return;
    
    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
    setActiveWindowId(id);
  };

  // Convert Resume components to strings for Notepad
  const getExperienceTxt = () => {
    return resumeData.experience.map(e => 
      `ROLE: ${e.role}\nCOMPANY: ${e.company}\nLOCATION: ${e.location}\nPERIOD: ${e.period}\n\n` +
      e.bullets.map(b => `- ${b}`).join("\n") + "\n\n"
    ).join("===================================\n\n");
  };

  const getSkillsTxt = () => {
    return `LANGUAGES:\n${resumeData.skills.languages.join(", ")}\n\n` +
           `TOOLS:\n${resumeData.skills.tools.join(", ")}\n\n` +
           `CLOUD:\n${resumeData.skills.cloud.join(", ")}`;
  };
  
  const getEducationTxt = () => {
    return `DEGREE: ${resumeData.education.degree}\n` +
           `UNIVERSITY: ${resumeData.education.university}\n` +
           `PERIOD: ${resumeData.education.period}`;
  };
  
  const getCertsTxt = () => {
    return resumeData.certifications.map(c => `- ${c}`).join("\n");
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100dvh', overflow: 'hidden' }}>
      <DesktopWallpaper />
      
      {/* Desktop Icons Grid */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        flexWrap: 'wrap',
        maxHeight: 'calc(100dvh - 40px)', // Leave space for taskbar
        alignContent: 'flex-start'
      }}>
        <DesktopIcon 
          id="recycle-bin" label="Recycle Bin" icon={<img src={recyclePng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Recycle Bin" />} 
          onDoubleClick={() => {}} 
        />
        <DesktopIcon 
          id="resume-pdf" label="Resume" icon={<img src={pdfPng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Resume" />} 
          onDoubleClick={() => openWindow('resume-pdf', 'pdf', 'Internet Explorer - Resume', <img src={pdfPng} style={{width:16, height:16}} alt="" />)} 
        />
        <DesktopIcon 
          id="exp-txt" label="Experience.txt" icon={<img src={notepadPng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Notepad" />} 
          onDoubleClick={() => openWindow('exp-txt', 'notepad', 'Experience.txt - Notepad', <img src={notepadPng} style={{width:16, height:16}} alt="" />, getExperienceTxt())} 
        />
        <DesktopIcon 
          id="skills-txt" label="Skills.txt" icon={<img src={notepadPng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Notepad" />} 
          onDoubleClick={() => openWindow('skills-txt', 'notepad', 'Skills.txt - Notepad', <img src={notepadPng} style={{width:16, height:16}} alt="" />, getSkillsTxt())} 
        />
        <DesktopIcon 
          id="edu-txt" label="Education.txt" icon={<img src={notepadPng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Notepad" />} 
          onDoubleClick={() => openWindow('edu-txt', 'notepad', 'Education.txt - Notepad', <img src={notepadPng} style={{width:16, height:16}} alt="" />, getEducationTxt())} 
        />
        <DesktopIcon 
          id="certs-txt" label="Certifications.txt" icon={<img src={notepadPng} style={{width: 32, height: 32, pointerEvents: 'none'}} alt="Notepad" />} 
          onDoubleClick={() => openWindow('certs-txt', 'notepad', 'Certifications.txt - Notepad', <img src={notepadPng} style={{width:16, height:16}} alt="" />, getCertsTxt())} 
        />
        <DesktopIcon 
          id="dave-exe" label="DangerousDave.exe" icon="👾" 
          onDoubleClick={() => openWindow('dave-exe', 'game', 'Dangerous Dave Engine', '👾')} 
        />
      </div>

      {/* Render Open Windows */}
      {windows.map(w => (
        <WindowFrame 
          key={w.id} 
          id={w.id} 
          title={w.title} 
          icon={w.icon}
          zIndex={w.zIndex} 
          onClose={closeWindow} 
          onFocus={focusWindow}
          defaultWidth={w.type === 'game' ? 800 : 700}
          defaultHeight={w.type === 'game' ? 600 : 500}
        >
          {w.type === 'pdf' && <InternetExplorer />}
          {w.type === 'notepad' && <Notepad content={w.data} />}
          {w.type === 'game' && <DangerousDaveApp />}
          {w.type === 'about' && <AboutSystem />}
        </WindowFrame>
      ))}

      <Taskbar 
        openWindows={windows} 
        activeWindowId={activeWindowId} 
        onWindowClick={focusWindow} 
        onStartMenuAction={openWindow}
      />
    </div>
  );
};
