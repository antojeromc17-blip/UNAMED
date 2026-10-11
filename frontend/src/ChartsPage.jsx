import React from 'react'
import { Zap } from 'lucide-react'

export default function ChartsPage() {
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
            VISUAL ANALYTICS
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '0.8rem', color: '#000000' }}>
          PERFORMANCE VISUALIZATIONS
        </h1>
        <p style={{ maxWidth: '680px', fontSize: '1.1rem', color: '#171e19', marginBottom: '2.5rem', fontWeight: 500 }}>
          Empirical evaluation curves generated during model training with Matplotlib & Seaborn validating LightGBM superiority.
        </p>

        {/* Charts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          
          {/* Chart 1: ROC Curves */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '1.8rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              ROC Curves (Receiver Operating Characteristic)
            </h2>
            <p style={{ color: '#52525b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Shows trade-off between True Positive Rate and False Positive Rate. Higher Area Under Curve (AUC) is better.
            </p>
            <div style={{ border: '2px solid #000000', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <img src="/charts/roc_curves.png" alt="ROC Curves" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

          {/* Chart 2: Confusion Matrices */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '1.8rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Confusion Matrices (All 5 Models)
            </h2>
            <p style={{ color: '#52525b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Details exact counts of correctly classified vs misclassified files (False Positives and False Negatives).
            </p>
            <div style={{ border: '2px solid #000000', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <img src="/charts/confusion_matrices.png" alt="Confusion Matrices" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

          {/* Chart 3: Model Comparison Bar Chart */}
          <div style={{
            gridColumn: '1 / -1',
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '1.8rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
              Model Comparison (Bar Chart)
            </h2>
            <p style={{ color: '#52525b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Direct side-by-side comparison across Accuracy, Precision, Recall, F1 Score, and ROC-AUC.
            </p>
            <div style={{ border: '2px solid #000000', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <img src="/charts/model_comparison_bar.png" alt="Model Comparison" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
