import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import LandingPage from './LandingPage'
import ScanPage from './ScanPage'
import DashboardPage from './DashboardPage'
import ChartsPage from './ChartsPage'
import { Zap } from 'lucide-react'

function Navigation() {
  const navigate = useNavigate();

  return (
    <header className="neo-nav">
      {/* Left: Brand Logo */}
      <div 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#000000',
          border: '2px solid #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '2px 2px 0px #000000'
        }}>
          <Zap size={22} color="#ffe17c" fill="#ffe17c" />
        </div>
        <span style={{ 
          fontFamily: 'var(--font-heading)', 
          fontWeight: 800, 
          fontSize: '1.4rem', 
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#000000'
        }}>
          SENTINEL<span style={{ color: '#000000' }}>.ML</span>
        </span>
      </div>

      {/* Center: Horizontal Links in bold Satoshi */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link-neo active" : "nav-link-neo"}>Home</NavLink>
        <NavLink to="/scan" className={({isActive}) => isActive ? "nav-link-neo active" : "nav-link-neo"}>Scanner</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link-neo active" : "nav-link-neo"}>Metrics</NavLink>
        <NavLink to="/charts" className={({isActive}) => isActive ? "nav-link-neo active" : "nav-link-neo"}>Charts</NavLink>
      </nav>

      {/* Right: Action Button */}
      <div>
        <button 
          onClick={() => navigate('/scan')}
          className="btn-brutal"
          style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem', boxShadow: '4px 4px 0px #000000' }}
        >
          Launch Scanner
        </button>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--primary-yellow)' }}>
        <Navigation />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/charts" element={<ChartsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
