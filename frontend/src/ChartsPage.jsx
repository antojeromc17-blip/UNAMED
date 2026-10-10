import React from 'react'

export default function ChartsPage() {
  return (
    <div className="container">
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Performance Visualizations</h1>
      <p style={{ color: 'var(--text-muted-light)', marginBottom: '2rem' }}>
        These charts were generated during Phase 2 training using matplotlib and seaborn. 
        They visually prove the superiority of the LightGBM model.
      </p>

      <div className="charts-grid">
        <div className="glass-panel chart-card">
          <h2>ROC Curves (Receiver Operating Characteristic)</h2>
          <p style={{ color: 'var(--text-muted-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Shows the trade-off between True Positive Rate and False Positive Rate. Higher Area Under Curve (AUC) is better.
          </p>
          <img src="/charts/roc_curves.png" alt="ROC Curves" className="chart-img" />
        </div>

        <div className="glass-panel chart-card">
          <h2>Confusion Matrices</h2>
          <p style={{ color: 'var(--text-muted-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Details exactly how many files were classified correctly vs incorrectly (False Positives / False Negatives).
          </p>
          <img src="/charts/confusion_matrices.png" alt="Confusion Matrices" className="chart-img" />
        </div>

        <div className="glass-panel chart-card">
          <h2>Model Comparison (Bar Chart)</h2>
          <p style={{ color: 'var(--text-muted-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Direct comparison of all metrics across all 5 models.
          </p>
          <img src="/charts/model_comparison_bar.png" alt="Model Comparison" className="chart-img" />
        </div>
      </div>
    </div>
      </div>
  )
}
