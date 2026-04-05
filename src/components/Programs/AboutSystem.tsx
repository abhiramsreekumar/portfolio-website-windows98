import React from 'react';
import { resumeData } from '../../data/resume';

export const AboutSystem: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#C0C0C0',
      padding: '20px',
      fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
      fontSize: '12px',
      color: '#000000',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '2px solid #808080', paddingBottom: '15px' }}>
        <div style={{ fontSize: '48px', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>💻</div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#000080' }}>Windows 98 Retro Themed Portfolio</h2>
          <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>System Version v3.3.6</p>
        </div>
      </div>
      
      <div style={{ padding: '0 10px' }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Registered to:</p>
        <p style={{ margin: '0 0 2px 20px' }}>{resumeData.about.name}</p>
        <p style={{ margin: '0 0 15px 20px' }}>{resumeData.about.title}</p>
        
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Development:</p>
        <p style={{ margin: '0 0 15px 20px' }}>Created with the help of Google Antigravity</p>
        
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Infrastructure & Deployment:</p>
        <ul style={{ margin: '0 0 15px 20px', paddingLeft: '20px' }}>
          <li>Hosted in AWS using an S3 Bucket and AWS CloudFront</li>
          <li>Continuous Integration & Deployment via GitHub Actions</li>
        </ul>
        
        <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Source Code:</p>
        <p style={{ margin: '0 0 0 20px' }}>
          <a href={`https://github.com/abhiramsreekumar/portfolio-website-react-vite`} target="_blank" rel="noreferrer" style={{ color: '#0000FF' }}>
            GitHub Repository
          </a>
        </p>
      </div>
    </div>
  );
};
