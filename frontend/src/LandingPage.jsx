import React from 'react';
import { TubesBackground } from './TubesBackground';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <TubesBackground>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', textAlign: 'center', padding: '1rem' }}>
        <div style={{ pointerEvents: 'auto', cursor: 'default', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Shield color="#000000" size={100} style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '5rem', color: '#000000', margin: 0 }}>
            ML BASED
          </h1>
          <h2 style={{ fontSize: '4rem', color: '#000000', margin: 0 }}>
            MALWARE DETECTION
          </h2>
        </div>
        
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
          <p style={{ color: '#000000', fontSize: '1.4rem', maxWidth: '700px', fontWeight: 'bold' }}>
            Advanced Static Analysis Engine protecting your system from zero-day threats using structural machine learning.
          </p>
          
          <button 
            onClick={() => navigate('/scan')}
            className="btn"
          >
            Launch Scanner
          </button>
        </div>
      </div>
    </TubesBackground>
  );
}
