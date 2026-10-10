import React from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import LandingPage from './LandingPage'
import ScanPage from './ScanPage'
import DashboardPage from './DashboardPage'
import ChartsPage from './ChartsPage'
import { Shield } from 'lucide-react'

function Navigation() {
  const location = useLocation();
  if (location.pathname === '/') return null;

  return (
    <nav className="nav-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: 'auto' }}>
        <Shield color="var(--orange)" size={32} />
        <strong style={{ letterSpacing: '1px', fontSize: '1.5rem', fontFamily: 'Archivo Black' }}>SENTINEL ML</strong>
      </div>
      <NavLink to="/scan" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Scanner</NavLink>
      <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Metrics</NavLink>
      <NavLink to="/charts" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Charts</NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
