import React from 'react';
import { resumeData } from '../../data/resume';

export const InternetExplorer: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Times New Roman', Times, serif"
    }}>
      {/* IE Toolbar */}
      <div style={{
        backgroundColor: '#C0C0C0',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        borderBottom: '1px solid #808080',
        fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
        fontSize: '12px',
        color: '#000000'
      }}>
        <div style={{ display: 'flex', gap: '10px', padding: '2px 5px' }}>
          <span style={{ cursor: 'pointer' }}><u>F</u>ile</span>
          <span style={{ cursor: 'pointer' }}><u>E</u>dit</span>
          <span style={{ cursor: 'pointer' }}><u>V</u>iew</span>
          <span style={{ cursor: 'pointer' }}><u>F</u>avorites</span>
          <span style={{ cursor: 'pointer' }}><u>T</u>ools</span>
          <span style={{ cursor: 'pointer' }}><u>H</u>elp</span>
        </div>
        <div style={{ display: 'flex', gap: '5px', padding: '2px 5px', borderTop: '1px solid #FFFFFF' }}>
          <button style={{ fontWeight: 'bold' }}>&lt; Back</button>
          <button style={{ fontWeight: 'bold' }}>Forward &gt;</button>
          <button>Stop</button>
          <button>Refresh</button>
          <button>Home</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '2px 5px', borderTop: '1px solid #FFFFFF' }}>
          <span style={{ color: '#000000' }}>Address</span>
          <input 
            type="text" 
            value="https://randomsasi.com" 
            readOnly 
            style={{ flex: 1, padding: '2px', border: '1px solid #808080', color: '#000' }} 
          />
        </div>
      </div>

      {/* HTML Content Render */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#E6E6FA',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'10\' height=\'10\' viewBox=\'0 0 10 10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'%23dcdcdc\'/%3E%3C/svg%3E")',
        color: '#000000'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', padding: '30px', border: '1px solid #000', boxShadow: '5px 5px 0px rgba(0,0,0,0.5)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
            <div>
              <h1 style={{ margin: 0, color: '#000080', fontSize: '28px' }}>{resumeData.about.name}</h1>
              <h3 style={{ margin: '5px 0 0 0', fontStyle: 'italic', fontWeight: 'normal' }}>{resumeData.about.title}</h3>
            </div>
            <a href="/resume.pdf" download="Abhiram_Sreekumar_Resume.pdf" style={{ textDecoration: 'none' }}>
              <button style={{
                cursor: 'pointer', backgroundColor: '#e0e0e0', color: '#000', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderBottomColor: '#000', borderRightColor: '#000', padding: '10px', fontWeight: 'bold'
              }}>
                 💾 Download PDF
              </button>
            </a>
          </div>

          <p style={{ marginTop: '20px', fontSize: '14px' }}>
            <b>Location:</b> {resumeData.about.location} <br/>
            <b>Website:</b> <a href={`https://${resumeData.about.website}`} target="_blank" rel="noreferrer">{resumeData.about.website}</a> <br/>
            <b>Email:</b> <a href={`mailto:${resumeData.about.email}`}>{resumeData.about.email}</a> <br/>
            <b>LinkedIn:</b> <a href={`https://${resumeData.about.linkedin}`} target="_blank" rel="noreferrer">{resumeData.about.linkedin}</a> <br/>
            <b>GitHub:</b> <a href={`https://${resumeData.about.github}`} target="_blank" rel="noreferrer">{resumeData.about.github}</a>
          </p>

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Summary</h2>
          <p style={{ lineHeight: '1.6' }}>{resumeData.about.summary}</p>

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Professional Experience</h2>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem', color: '#000080' }}>{exp.role}</h3>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>{exp.company} - {exp.location} <span style={{ float: 'right', fontWeight: 'normal', color: '#555' }}>{exp.period}</span></p>
              <ul style={{ lineHeight: '1.6', marginTop: '0' }}>
                {exp.bullets.map((bullet, i) => <li key={i} style={{ marginBottom: '5px' }}>{bullet}</li>)}
              </ul>
            </div>
          ))}

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Projects</h2>
          {resumeData.projects.map((proj, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{proj.name}</h3>
              <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" style={{ fontSize: '14px' }}>{proj.link}</a>
              <p style={{ margin: '5px 0 0 0', lineHeight: '1.5' }}>{proj.description}</p>
            </div>
          ))}

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Skills & Technologies</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', lineHeight: '1.6' }}>
            <tbody>
              <tr>
                <td style={{ width: '150px', fontWeight: 'bold', verticalAlign: 'top' }}>Languages:</td>
                <td>{resumeData.skills.languages.join(', ')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Tools:</td>
                <td>{resumeData.skills.tools.join(', ')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', verticalAlign: 'top' }}>Cloud Platforms:</td>
                <td>{resumeData.skills.cloud.join(', ')}</td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Certifications</h2>
          <ul style={{ lineHeight: '1.6' }}>
            {resumeData.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
          </ul>

          <h2 style={{ color: '#8B0000', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Education</h2>
          <p style={{ margin: 0 }}><b>{resumeData.education.degree}</b></p>
          <p style={{ margin: '5px 0' }}>{resumeData.education.university}</p>
          <p style={{ margin: 0, color: '#555' }}>{resumeData.education.period}</p>

          <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '40px', color: '#888' }}>
             <i>Best viewed in Netscape Navigator 4.0 or Internet Explorer 5.</i>
          </p>
        </div>
      </div>
    </div>
  );
};
