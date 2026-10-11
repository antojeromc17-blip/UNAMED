import React, { useState } from 'react'
import { Zap, ZoomIn, X, Download, Layers, ShieldCheck, Activity, Info, BarChart2 } from 'lucide-react'
import metricsData from './model_metrics.json'

export default function ChartsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [activeTab, setActiveTab] = useState('all') // 'all', 'roc', 'cm', 'bar', 'interactive'
  const [selectedModel, setSelectedModel] = useState('LightGBM')

  const currentModelData = metricsData.find(m => m.model === selectedModel) || metricsData[3]

  const total = (currentModelData.true_negatives || 0) + 
                (currentModelData.false_positives || 0) + 
                (currentModelData.false_negatives || 0) + 
                (currentModelData.true_positives || 0)

  return (
    <div className="bg-dot-pattern" style={{ minHeight: 'calc(100vh - 80px)', padding: '3.5rem 1.5rem 6rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
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
            STATISTICAL VISUALIZATIONS
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '0.8rem', color: '#000000' }}>
          PERFORMANCE & ERROR ANALYSIS
        </h1>
        <p style={{ maxWidth: '780px', fontSize: '1.1rem', color: '#171e19', marginBottom: '2.5rem', fontWeight: 500 }}>
          High-resolution ROC curves, 2x3 confusion matrix heatmaps, and interactive diagnostic matrices evaluated on 24,979 test binaries from the EMBER 2024 benchmark.
        </p>

        {/* View Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'all', label: '📊 All Visualizations' },
            { id: 'roc', label: '📈 ROC Curves' },
            { id: 'interactive', label: '🔬 Interactive Matrix Auditor' },
            { id: 'bar', label: '⚖️ Model Comparison' }
          ].map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: isActive ? 'var(--bg-charcoal)' : '#ffffff',
                  color: isActive ? 'var(--primary-yellow)' : '#000000',
                  border: '2px solid #000000',
                  borderRadius: '0.6rem',
                  padding: '0.6rem 1.2rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? '2px 2px 0px #000000' : 'var(--shadow-sm)',
                  transform: isActive ? 'translate(2px, 2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* 1. INTERACTIVE MATRIX AUDITOR SECTION */}
        {(activeTab === 'all' || activeTab === 'interactive') && (
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '3rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{
                  backgroundColor: 'var(--primary-yellow)',
                  border: '2px solid #000000',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginRight: '8px'
                }}>INTERACTIVE AUDITOR</span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
                  Model Confusion Matrix Inspector
                </h2>
                <p style={{ color: '#52525b', fontSize: '0.95rem' }}>
                  Select an algorithm below to inspect exact sample counts, False Positive Rates, and detection percentages.
                </p>
              </div>

              {/* Model Pill Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {metricsData.map(m => {
                  const isSel = selectedModel === m.model
                  return (
                    <button
                      key={m.model}
                      onClick={() => setSelectedModel(m.model)}
                      style={{
                        backgroundColor: isSel ? '#000000' : '#ffffff',
                        color: isSel ? 'var(--primary-yellow)' : '#000000',
                        border: '2px solid #000000',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 0.9rem',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: isSel ? '2px 2px 0px #000000' : '2px 2px 0px #000000',
                        transform: isSel ? 'translate(1px, 1px)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {m.model}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Matrix Display Box */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}>
              
              {/* 2x2 Clean Table */}
              <div style={{
                backgroundColor: '#f8fafc',
                border: '2px solid #000000',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ textAlign: 'center', fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
                  PREDICTED CLASS
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr', gap: '0.5rem', alignItems: 'center' }}>
                  {/* Row 1 Header */}
                  <div></div>
                  <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.85rem', backgroundColor: '#e2e8f0', padding: '6px', border: '1px solid #000000', borderRadius: '4px' }}>
                    BENIGN
                  </div>
                  <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.85rem', backgroundColor: '#e2e8f0', padding: '6px', border: '1px solid #000000', borderRadius: '4px' }}>
                    MALWARE
                  </div>

                  {/* Row 2: Actual Benign */}
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', backgroundColor: '#e2e8f0', padding: '8px', border: '1px solid #000000', borderRadius: '4px', textAlign: 'center' }}>
                    ACTUAL<br/>BENIGN
                  </div>
                  
                  {/* True Negative */}
                  <div style={{
                    backgroundColor: '#dcfce7',
                    border: '2px solid #16a34a',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>TRUE NEGATIVES</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#14532d' }}>
                      {(currentModelData.true_negatives || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>
                      {((currentModelData.true_negatives || 0) / total * 100).toFixed(1)}% of all files
                    </div>
                  </div>

                  {/* False Positive */}
                  <div style={{
                    backgroundColor: '#fee2e2',
                    border: '2px solid #dc2626',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#991b1b' }}>FALSE POSITIVES</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#7f1d1d' }}>
                      {(currentModelData.false_positives || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b91c1c' }}>
                      {((currentModelData.false_positives || 0) / total * 100).toFixed(1)}% (False Alarms)
                    </div>
                  </div>

                  {/* Row 3: Actual Malware */}
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', backgroundColor: '#e2e8f0', padding: '8px', border: '1px solid #000000', borderRadius: '4px', textAlign: 'center' }}>
                    ACTUAL<br/>MALWARE
                  </div>

                  {/* False Negative */}
                  <div style={{
                    backgroundColor: '#fee2e2',
                    border: '2px solid #dc2626',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#991b1b' }}>FALSE NEGATIVES</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#7f1d1d' }}>
                      {(currentModelData.false_negatives || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b91c1c' }}>
                      {((currentModelData.false_negatives || 0) / total * 100).toFixed(1)}% (Missed Threats)
                    </div>
                  </div>

                  {/* True Positive */}
                  <div style={{
                    backgroundColor: '#dcfce7',
                    border: '2px solid #16a34a',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534' }}>TRUE POSITIVES</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#14532d' }}>
                      {(currentModelData.true_positives || 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>
                      {((currentModelData.true_positives || 0) / total * 100).toFixed(1)}% (Identified)
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Side: Key Rates & Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  backgroundColor: 'var(--primary-yellow)',
                  border: '2px solid #000000',
                  borderRadius: '0.75rem',
                  padding: '1.2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>MODEL ACCURACY</div>
                  <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                    {(currentModelData.accuracy * 100).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Overall correctly classified binary percentage
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--accent-sage)',
                  border: '2px solid #000000',
                  borderRadius: '0.75rem',
                  padding: '1.2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>FALSE POSITIVE RATE (FPR)</div>
                  <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                    {(currentModelData.fpr * 100).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                    Only {currentModelData.false_positives} benign files falsely flagged out of {currentModelData.true_negatives + currentModelData.false_positives}
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-charcoal)',
                  color: '#ffffff',
                  border: '2px solid #000000',
                  borderRadius: '0.75rem',
                  padding: '1.2rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-yellow)', fontWeight: 800 }}>RECALL / DETECTION RATE</div>
                  <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                    {(currentModelData.recall * 100).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#b7c6c2', fontWeight: 600 }}>
                    Successfully caught {currentModelData.true_positives} malware files out of {currentModelData.true_positives + currentModelData.false_negatives}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. ROC CURVES (FULL WIDTH) */}
        {(activeTab === 'all' || activeTab === 'roc') && (
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '2.2rem',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '3rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span style={{
                  backgroundColor: 'var(--primary-yellow)',
                  border: '2px solid #000000',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginRight: '8px'
                }}>ROC ANALYSIS</span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
                  Receiver Operating Characteristic (ROC) Curves
                </h2>
                <p style={{ color: '#52525b', fontSize: '0.95rem' }}>
                  Plots True Positive Rate vs False Positive Rate. Higher Area Under Curve (AUC) indicates superior discrimination.
                </p>
              </div>

              <button
                onClick={() => setSelectedImage({ src: '/charts/roc_curves.png', title: 'ROC Curves' })}
                className="btn-brutal"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                <ZoomIn size={16} />
                <span>Zoom Fullscreen</span>
              </button>
            </div>

            <div 
              style={{ 
                border: '2px solid #000000', 
                borderRadius: '0.75rem', 
                overflow: 'hidden', 
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                maxWidth: '900px',
                margin: '0 auto'
              }}
              onClick={() => setSelectedImage({ src: '/charts/roc_curves.png', title: 'ROC Curves' })}
            >
              <img 
                src="/charts/roc_curves.png" 
                alt="ROC Curves" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem', color: '#71717a', fontSize: '0.85rem', justifyContent: 'center' }}>
              <Info size={16} />
              <span>LightGBM achieved AUC of 0.9963, representing near-ideal separation between safe and malicious binaries.</span>
            </div>
          </div>
        )}

        {/* 4. MODEL COMPARISON BAR CHART (5 COMPREHENSIVE METRICS) */}
        {(activeTab === 'all' || activeTab === 'bar') && (
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '2.2rem',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span style={{
                  backgroundColor: 'var(--primary-yellow)',
                  border: '2px solid #000000',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginRight: '8px'
                }}>5-METRIC AUDIT</span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
                  Comprehensive 5-Metric Comparison
                </h2>
                <p style={{ color: '#52525b', fontSize: '0.95rem' }}>
                  Side-by-side evaluation across <strong>Accuracy</strong>, <strong>Precision</strong>, <strong>Recall</strong>, <strong>F1 Score</strong>, and <strong>ROC-AUC</strong> for all 5 models.
                </p>
              </div>

              <button
                onClick={() => setSelectedImage({ src: '/charts/model_comparison_bar.png', title: 'Model Comparison' })}
                className="btn-brutal"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                <ZoomIn size={16} />
                <span>Zoom Fullscreen</span>
              </button>
            </div>

            <div 
              style={{ 
                border: '2px solid #000000', 
                borderRadius: '0.75rem', 
                overflow: 'hidden', 
                backgroundColor: '#ffffff',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedImage({ src: '/charts/model_comparison_bar.png', title: 'Model Comparison' })}
            >
              <img 
                src="/charts/model_comparison_bar.png" 
                alt="5-Metric Model Comparison Bar Chart" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>

            {/* 5 Metrics Explanation Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.8rem',
              marginTop: '1.5rem',
              paddingTop: '1.2rem',
              borderTop: '2px solid #000000'
            }}>
              <div style={{ padding: '0.8rem', backgroundColor: '#fffbeb', border: '1px solid #000000', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#b45309' }}>● Accuracy</span>
                <p style={{ fontSize: '0.8rem', color: '#78350f', marginTop: '4px' }}>Overall fraction of safe and malicious files correctly classified.</p>
              </div>

              <div style={{ padding: '0.8rem', backgroundColor: '#f1f5f9', border: '1px solid #000000', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#334155' }}>● Precision</span>
                <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px' }}>How many flagged files were genuinely malware (minimizing false alarms).</p>
              </div>

              <div style={{ padding: '0.8rem', backgroundColor: '#eff6ff', border: '1px solid #000000', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1d4ed8' }}>● Recall</span>
                <p style={{ fontSize: '0.8rem', color: '#1e40af', marginTop: '4px' }}>Fraction of real malware caught (vital for eliminating missed threats).</p>
              </div>

              <div style={{ padding: '0.8rem', backgroundColor: '#faf5ff', border: '1px solid #000000', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#7e22ce' }}>● F1 Score</span>
                <p style={{ fontSize: '0.8rem', color: '#6b21a8', marginTop: '4px' }}>Harmonic mean balancing precision and recall into a single metric.</p>
              </div>

              <div style={{ padding: '0.8rem', backgroundColor: '#ecfdf5', border: '1px solid #000000', borderRadius: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#047857' }}>● ROC-AUC</span>
                <p style={{ fontSize: '0.8rem', color: '#065f46', marginTop: '4px' }}>Diagnostic area under curve measuring discriminative power.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX / FULLSCREEN MODAL */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '3px solid #000000',
            borderRadius: '1rem',
            boxShadow: '12px 12px 0px #000000',
            maxWidth: '1200px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              backgroundColor: 'var(--primary-yellow)',
              borderBottom: '2px solid #000000',
              padding: '1rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                {selectedImage.title} (Full Resolution)
              </h3>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a 
                  href={selectedImage.src} 
                  download 
                  className="btn-brutal"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', boxShadow: '2px 2px 0px #000000' }}
                >
                  <Download size={14} />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => setSelectedImage(null)}
                  className="btn-brutal"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', backgroundColor: '#ef4444', color: '#ffffff', boxShadow: '2px 2px 0px #000000' }}
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', overflow: 'auto', display: 'flex', justifyContent: 'center', backgroundColor: '#ffffff' }}>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                style={{ maxWidth: '100%', maxHeight: '72vh', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
