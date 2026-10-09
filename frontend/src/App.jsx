import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import ScanPage from './ScanPage'
import DashboardPage from './DashboardPage'
import ChartsPage from './ChartsPage'
import { Shield } from 'lucide-react'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav-bar glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: 'auto', paddingLeft: '1rem' }}>
          <Shield color="var(--primary)" />
          <strong style={{ letterSpacing: '1px' }}>Sentinel ML</strong>
        </div>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Scanner</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Metrics</NavLink>
        <NavLink to="/charts" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Charts</NavLink>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<ScanPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/charts" element={<ChartsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
