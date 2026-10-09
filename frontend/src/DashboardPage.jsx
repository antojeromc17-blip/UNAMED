import React, { useEffect, useState } from 'react'
import { Activity, Cpu, Clock, Zap } from 'lucide-react'
import metricsData from './model_metrics.json'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    // In a real app we'd fetch this from the backend. 
    // For now we just import the JSON directly since it's built statically.
    // Sort by F1 Score descending
    const sorted = [...metricsData].sort((a, b) => b.f1_score - a.f1_score)
    setMetrics(sorted)
  }, [])

  const bestModel = metrics.length > 0 ? metrics[0] : null

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Training Metrics</h1>
      
      {bestModel && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Zap size={18} /> Best Model
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{bestModel.model}</h2>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Activity size={18} /> Accuracy
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: 'var(--primary)' }}>
              {(bestModel.accuracy * 100).toFixed(2)}%
            </h2>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Cpu size={18} /> Inference Time
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
              {(bestModel.prediction_time_seconds * 1000).toFixed(1)} ms
            </h2>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Clock size={18} /> Training Time
            </div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
              {bestModel.training_time_seconds.toFixed(1)} s
            </h2>
          </div>

        </div>
      )}

      <div className="glass-panel" style={{ padding: '2rem', overflowX: 'auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Model Comparison Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Algorithm</th>
              <th>Accuracy</th>
              <th>Precision</th>
              <th>Recall</th>
              <th>F1 Score</th>
              <th>FPR</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, idx) => (
              <tr key={m.model}>
                <td style={{ color: idx === 0 ? 'var(--primary)' : 'inherit', fontWeight: idx===0?'bold':'normal' }}>
                  #{idx + 1}
                </td>
                <td style={{ fontWeight: idx===0?'bold':'normal' }}>{m.model}</td>
                <td>{(m.accuracy * 100).toFixed(2)}%</td>
                <td>{(m.precision * 100).toFixed(2)}%</td>
                <td>{(m.recall * 100).toFixed(2)}%</td>
                <td style={{ color: idx===0?'var(--primary)':'inherit' }}>{(m.f1_score * 100).toFixed(2)}%</td>
                <td style={{ color: m.fpr > 0.1 ? 'var(--danger)' : 'inherit' }}>
                  {(m.fpr * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
