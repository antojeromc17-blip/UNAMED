import React, { useEffect, useState } from 'react'
import { Activity, Cpu, Clock, Zap, Award, Layers } from 'lucide-react'
import metricsData from './model_metrics.json'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    const sorted = [...metricsData].sort((a, b) => b.f1_score - a.f1_score)
    setMetrics(sorted)
  }, [])

  const bestModel = metrics.length > 0 ? metrics[0] : null

  return (
    <div className="bg-dot-pattern" style={{ minHeight: 'calc(100vh - 80px)', padding: '3.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Badge & Title */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px solid #000000',
          borderRadius: '9999px',
          padding: '0.35rem 1.2rem',
          boxShadow: '2px 2px 0px #000000',
          marginBottom: '1rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Zap size={16} fill="var(--primary-yellow)" color="#000000" />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.85rem' }}>
            BENCHMARK EVALUATION
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '0.8rem', color: '#000000' }}>
          MODEL PERFORMANCE LEADERBOARD
        </h1>
        <p style={{ maxWidth: '680px', fontSize: '1.1rem', color: '#171e19', marginBottom: '2.5rem', fontWeight: 500 }}>
          Empirical evaluation across 5 machine learning architectures trained on the EMBER 2024 static PE dataset.
        </p>

        {/* 4 Stat Cards */}
        {bestModel && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.2rem',
            marginBottom: '2.5rem'
          }}>
            
            {/* Card 1: Top Model (Sage) */}
            <div style={{
              backgroundColor: 'var(--accent-sage)',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
                <Award size={18} /> TOP MODEL
              </div>
              <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{bestModel.model}</h2>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '4px' }}>Recommended Engine</div>
            </div>

            {/* Card 2: Accuracy (Yellow) */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
                <Activity size={18} /> PEAK ACCURACY
              </div>
              <h2 style={{ fontSize: '2.4rem', marginTop: '0.3rem', color: '#000000' }}>
                {(bestModel.accuracy * 100).toFixed(2)}%
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#52525b', fontWeight: 600 }}>Test Subset</div>
            </div>

            {/* Card 3: Inference Latency (Charcoal) */}
            <div style={{
              backgroundColor: 'var(--bg-charcoal)',
              color: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--primary-yellow)', fontWeight: 800 }}>
                <Cpu size={18} /> INFERENCE SPEED
              </div>
              <h2 style={{ fontSize: '2.2rem', marginTop: '0.3rem', color: '#ffffff' }}>
                {(bestModel.prediction_time_seconds * 1000).toFixed(1)} ms
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#b7c6c2', fontWeight: 600 }}>Sub-Second Parse</div>
            </div>

            {/* Card 4: False Positive Rate (White) */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 800 }}>
                <Clock size={18} /> FALSE POSITIVE RATE
              </div>
              <h2 style={{ fontSize: '2.2rem', marginTop: '0.3rem', color: '#000000' }}>
                {(bestModel.fpr * 100).toFixed(2)}%
              </h2>
              <div style={{ fontSize: '0.8rem', color: '#52525b', fontWeight: 600 }}>Zero Alarm Risk</div>
            </div>

          </div>
        )}

        {/* Comparison Table */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '2px solid #000000',
          borderRadius: '1rem',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem',
          overflowX: 'auto'
        }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>
            5-MODEL COMPARATIVE AUDIT
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#000000', color: 'var(--primary-yellow)' }}>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>RANK</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>ALGORITHM</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>ACCURACY</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>PRECISION</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>RECALL</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>F1 SCORE</th>
                <th style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}>FPR</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, idx) => (
                <tr 
                  key={m.model}
                  style={{
                    backgroundColor: idx === 0 ? 'rgba(255, 225, 124, 0.35)' : idx % 2 === 0 ? '#ffffff' : '#fcfcfc',
                    fontWeight: idx === 0 ? 800 : 500
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000' }}>
                    <span style={{
                      backgroundColor: idx === 0 ? 'var(--primary-yellow)' : '#e4e4e7',
                      border: '1px solid #000000',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 800
                    }}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontWeight: 800 }}>
                    {m.model} {idx === 0 && <span style={{ color: '#000000', fontSize: '0.75rem' }}>(RECOMMENDED)</span>}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000' }}>{(m.accuracy * 100).toFixed(2)}%</td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000' }}>{(m.precision * 100).toFixed(2)}%</td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000' }}>{(m.recall * 100).toFixed(2)}%</td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000', fontWeight: 800 }}>{(m.f1_score * 100).toFixed(2)}%</td>
                  <td style={{ padding: '0.85rem 1rem', border: '2px solid #000000', color: m.fpr > 0.1 ? '#ef4444' : '#000000', fontWeight: m.fpr > 0.1 ? 800 : 500 }}>
                    {(m.fpr * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
