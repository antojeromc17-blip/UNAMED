import React, { useState } from 'react';
import { TubesBackground } from './TubesBackground';
import { MousePointer2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [btnHover, setBtnHover] = useState(false);

  return (
    <TubesBackground enableClickInteraction={true}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        padding: '0 1rem',
        position: 'relative',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>
        {/* Main Title Stack matching exact reference typography & drop-shadow */}
        <div style={{ 
          pointerEvents: 'auto', 
          cursor: 'default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            lineHeight: 1,
            margin: 0,
            userSelect: 'none',
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 40px rgba(0,0,0,0.85))'
          }}>
            ML BASED
          </h1>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '-0.025em',
            color: 'rgba(255, 255, 255, 0.92)',
            lineHeight: 1.1,
            margin: 0,
            userSelect: 'none',
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,1)) drop-shadow(0 0 30px rgba(0,0,0,0.85))'
          }}>
            MALWARE DETECTION
          </h2>
        </div>

        {/* Description & Action Button */}
        <div style={{
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          pointerEvents: 'auto'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.82)',
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            maxWidth: '520px',
            lineHeight: 1.5,
            margin: 0,
            filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.9))'
          }}>
            Move your cursor to interact with the 3D tubes. Advanced static analysis engine protecting your system from zero-day threats.
          </p>

          <button
            onClick={() => navigate('/scan')}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2.2rem',
              backgroundColor: btnHover ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '9999px',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              transform: btnHover ? 'scale(1.05)' : 'scale(1)',
              boxShadow: btnHover 
                ? '0 0 30px rgba(255, 255, 255, 0.25), 0 10px 25px rgba(0, 0, 0, 0.6)' 
                : '0 0 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            <span>LAUNCH SCANNER</span>
            <ArrowRight size={18} style={{ transform: btnHover ? 'translateX(4px)' : 'none', transition: 'transform 0.2s ease' }} />
          </button>
        </div>

        {/* Pulse Bottom Hint */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255, 255, 255, 0.55)',
          pointerEvents: 'none',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}>
          <MousePointer2 size={24} />
          <span style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontWeight: 600
          }}>
            CLICK TO RANDOMIZE
          </span>
        </div>
      </div>
    </TubesBackground>
  );
}
