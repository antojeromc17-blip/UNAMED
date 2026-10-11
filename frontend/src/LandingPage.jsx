import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Binary, 
  Zap, 
  Check, 
  ArrowRight, 
  Activity, 
  Lock, 
  FileCode, 
  Code2, 
  Globe, 
  Terminal,
  Database,
  BarChart3,
  Server
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section className="bg-dot-pattern" style={{ borderBottom: '2px solid #000000', padding: '5rem 2rem 5.5rem 2rem' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              boxShadow: '2px 2px 0px #000000',
              marginBottom: '1.5rem'
            }}>
              <span style={{ 
                backgroundColor: 'var(--primary-yellow)', 
                color: '#000000', 
                fontWeight: 800, 
                fontSize: '0.75rem', 
                padding: '2px 8px', 
                borderRadius: '9999px',
                border: '1px solid #000000'
              }}>MINI PROJECT</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem' }}>
                MACHINE LEARNING FOR CYBERSECURITY
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              lineHeight: 1.1, 
              marginBottom: '1.5rem', 
              color: '#000000' 
            }}>
              WINDOWS MALWARE DETECTION SYSTEM
            </h1>

            <p style={{ 
              fontSize: '1.15rem', 
              lineHeight: 1.6, 
              color: '#171e19', 
              marginBottom: '2.5rem', 
              maxWidth: '560px',
              fontWeight: 500
            }}>
              A machine learning based web application that inspects Windows executable binaries (.exe, .dll, .sys) without running them. It extracts 2,568 structural PE features and predicts whether a file is Safe or Malware across 5 trained classifiers.
            </p>

            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/scan')}
                className="btn-brutal"
              >
                <span>Launch File Scanner</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-brutal-secondary"
              >
                <span>View Model Comparison</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Mockup Card */}
          <div>
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '1rem',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}>
              {/* Header Bar */}
              <div style={{
                backgroundColor: '#000000',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57', border: '1px solid rgba(0,0,0,0.2)' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#febc2e', border: '1px solid rgba(0,0,0,0.2)' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28c840', border: '1px solid rgba(0,0,0,0.2)' }} />
                
                <div style={{ 
                  margin: '0 auto', 
                  backgroundColor: '#272727', 
                  color: 'rgba(255,255,255,0.7)', 
                  padding: '3px 18px', 
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}>
                  localhost:5173/scan
                </div>
              </div>

              {/* Content Area */}
              <div style={{ padding: '1.5rem', backgroundColor: '#fcfcfc', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  
                  {/* Sage Panel */}
                  <div style={{
                    backgroundColor: 'var(--accent-sage)',
                    border: '2px solid #000000',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>BEST ACCURACY</div>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>96.88%</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>LightGBM Classifier</div>
                  </div>

                  {/* Charcoal Panel */}
                  <div style={{
                    backgroundColor: 'var(--bg-charcoal)',
                    color: '#ffffff',
                    border: '2px solid #000000',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-yellow)', fontWeight: 800, textTransform: 'uppercase' }}>EXTRACTED FEATURES</div>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>2,568</div>
                    <div style={{ fontSize: '0.75rem', color: '#b7c6c2' }}>PE Structural Traits</div>
                  </div>
                </div>

                {/* System Status */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #000000',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>5 TRAINED MODELS READY</span>
                  </div>
                  <span style={{ 
                    backgroundColor: 'var(--primary-yellow)', 
                    border: '2px solid #000000', 
                    padding: '2px 8px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800 
                  }}>
                    FASTAPI ONLINE
                  </span>
                </div>

                {/* Models Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['LightGBM', 'Random Forest', 'Decision Tree', 'Logistic Regression', 'Naive Bayes'].map((m, i) => (
                    <span key={i} style={{
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #000000',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROJECT OVERVIEW: WHAT WE BUILT */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: 'var(--primary-yellow)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px',
              display: 'inline-block'
            }}>PROJECT SCOPE</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.8rem', color: '#000000', fontWeight: 800 }}>
              WHAT WE BUILT IN THIS MINI PROJECT
            </h2>
            <p style={{ maxWidth: '700px', margin: '0.5rem auto 0 auto', color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
              A complete end-to-end software system combining feature engineering, machine learning classification, and an interactive web dashboard.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            
            {/* Component 1 */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: 'var(--primary-yellow)', border: '2px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Binary size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>1. Static Feature Extractor</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                Parses Windows PE files without executing them. Extracts 2,568 features including byte histograms, section entropy, imported DLL functions, and printable string patterns.
              </p>
            </div>

            {/* Component 2 */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: 'var(--accent-sage)', border: '2px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Cpu size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>2. 5 Machine Learning Models</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                Trained and evaluated 5 distinct algorithms on a balanced dataset of 100,000 files: LightGBM, Random Forest, Decision Tree, Logistic Regression, and Gaussian Naive Bayes.
              </p>
            </div>

            {/* Component 3 */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: '#e2e8f0', border: '2px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Server size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>3. FastAPI Backend Service</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                Built a Python REST API that pre-caches trained models in RAM for sub-50ms inference, accepts multipart file uploads, and streams real-time scan metrics.
              </p>
            </div>

            {/* Component 4 */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ width: '42px', height: '42px', backgroundColor: 'var(--primary-yellow)', border: '2px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <BarChart3 size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>4. Interactive Web Interface</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
                Created a React frontend with a file dropzone, live scanning throughput metrics, individual model results breakdown, and interactive confusion matrices.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. HOW THE SYSTEM WORKS (4 SIMPLE STEPS) */}
      <section style={{ backgroundColor: 'var(--bg-charcoal)', padding: '5.5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          
          <span style={{
            backgroundColor: 'var(--primary-yellow)',
            color: '#000000',
            border: '2px solid #000000',
            padding: '0.3rem 1rem',
            fontWeight: 800,
            fontSize: '0.8rem',
            borderRadius: '9999px',
            display: 'inline-block'
          }}>HOW IT WORKS</span>
          
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.8rem', color: '#ffffff', marginBottom: '3.5rem', fontWeight: 800 }}>
            THE 4-STEP DETECTION PIPELINE
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                step: "01",
                title: "Upload Binary",
                desc: "User uploads a Windows PE file (.exe, .dll, or .sys). The backend reads the bytes into memory without executing any code."
              },
              {
                step: "02",
                title: "Extract Features",
                desc: "Thrember and pefile extract 2,568 numerical features: section entropy, byte distribution, imported functions, and string patterns."
              },
              {
                step: "03",
                title: "Run ML Models",
                desc: "The feature vector is passed to the selected trained model (or all 5 models concurrently) for rapid probability scoring."
              },
              {
                step: "04",
                title: "View Verdict",
                desc: "The web UI displays whether the file is SAFE or MALWARE, along with confidence percentages and processing latency."
              }
            ].map((s, idx) => (
              <div key={idx} style={{
                backgroundColor: '#202923',
                border: '2px solid #000000',
                borderRadius: '0.75rem',
                padding: '2rem 1.5rem',
                boxShadow: '4px 4px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '3px solid var(--primary-yellow)',
                  backgroundColor: '#171e19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '1.2rem'
                }}>
                  {s.step}
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.15rem', marginBottom: '0.6rem', fontWeight: 800 }}>{s.title}</h3>
                <p style={{ color: '#b7c6c2', fontSize: '0.9rem', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. THE 5 TRAINED MODELS COMPARISON */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: 'var(--accent-sage)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px',
              display: 'inline-block'
            }}>EXPERIMENTAL RESULTS</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.8rem', color: '#000000', fontWeight: 800 }}>
              THE 5 MACHINE LEARNING MODELS
            </h2>
            <p style={{ maxWidth: '700px', margin: '0.5rem auto 0 auto', color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
              Tested and compared on a held-out test split of 24,979 samples to see which algorithm provides the best malware detection accuracy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
            {[
              { name: "LightGBM", type: "Gradient Boosting", acc: "96.88%", recall: "96.03%", desc: "Our highest performing model with the lowest false positive rate (2.28%).", best: true },
              { name: "Random Forest", type: "Ensemble of 100 Trees", acc: "95.64%", recall: "94.03%", desc: "Strong generalization across varied malware families.", best: false },
              { name: "Decision Tree", type: "Tree Logic (Depth 20)", acc: "94.12%", recall: "92.91%", desc: "Transparent, fast decision boundary splitting.", best: false },
              { name: "Logistic Regression", type: "Linear Model (Scaled)", acc: "93.21%", recall: "90.26%", desc: "Normalized baseline model with StandardScaler preprocessing.", best: false },
              { name: "Naive Bayes", type: "Gaussian Probabilistic", acc: "64.31%", recall: "99.14%", desc: "Baseline model with high malware recall but higher false positives.", best: false },
            ].map((m, i) => (
              <div key={i} style={{
                backgroundColor: m.best ? 'var(--primary-yellow)' : '#f8fafc',
                border: '2px solid #000000',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '3px 3px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>{m.type}</span>
                    {m.best && (
                      <span style={{ backgroundColor: '#000000', color: '#ffffff', fontSize: '0.65rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                        TOP MODEL
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{m.name}</h3>
                  <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {m.acc}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.4 }}>{m.desc}</p>
                </div>
                <div style={{ borderTop: '1px solid #000000', paddingTop: '0.75rem', marginTop: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  Recall (Catch Rate): {m.recall}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SYSTEM ARCHITECTURE (HOW CODE CONNECTS) */}
      <section style={{ backgroundColor: 'var(--accent-sage)', padding: '5.5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: '#000000',
              color: 'var(--primary-yellow)',
              border: '2px solid #000000',
              padding: '0.35rem 1.2rem',
              fontWeight: 800,
              fontSize: '0.82rem',
              borderRadius: '9999px',
              display: 'inline-block'
            }}>TECHNICAL STRUCTURE</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.8rem', color: '#000000', fontWeight: 800 }}>
              SYSTEM ARCHITECTURE & DATAFLOW
            </h2>
            <p style={{ maxWidth: '700px', margin: '0.5rem auto 0 auto', color: '#171e19', fontSize: '1rem', fontWeight: 600 }}>
              How our frontend, backend, feature extractor, and machine learning models interact together.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            
            {/* Tier 1 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'var(--primary-yellow)', border: '1.5px solid #000000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                  LAYER 1
                </span>
                <Globe size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>React Web Frontend</h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                Built with React and Vite. Handles user file drag-and-drop, model selection, live scan progress indicators, and results rendering.
              </p>
            </div>

            {/* Tier 2 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'var(--accent-sage)', border: '1.5px solid #000000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                  LAYER 2
                </span>
                <Server size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>FastAPI REST Backend</h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                Python web server exposing /scan and /models endpoints. Manages file buffers, passes data to the detector, and returns JSON verdicts.
              </p>
            </div>

            {/* Tier 3 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'var(--primary-yellow)', border: '1.5px solid #000000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                  LAYER 3
                </span>
                <Cpu size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>PE Feature Extractor</h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                Uses thrember and pefile to extract byte histograms, section entropy, and 57 string patterns into a 2,568-dimensional numerical array.
              </p>
            </div>

            {/* Tier 4 */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '0.75rem',
              padding: '1.8rem',
              boxShadow: '4px 4px 0px #000000'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: 'var(--bg-charcoal)', color: '#ffffff', border: '1.5px solid #000000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                  LAYER 4
                </span>
                <Database size={22} color="#000000" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Model Inference</h3>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
                Trained scikit-learn and LightGBM model files (.joblib) pre-loaded in RAM to compute malware probabilities in under 10ms.
              </p>
            </div>

          </div>

          {/* 6. Mini Project Roadmap Card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '6px 6px 0px #000000'
          }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
              HOW THIS PROJECT WAS DEVELOPED
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
              
              <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #000000', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', marginBottom: '4px' }}>PHASE 1</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Dataset Preparation</div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Extracted a balanced subset of 100,000 files (50k safe, 50k malware) using memory mapping to prevent RAM overflow.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #000000', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>PHASE 2</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Model Training</div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Trained and benchmarked 5 algorithms. LightGBM achieved the best accuracy (96.88%) and was saved as our primary model.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #000000', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ea580c', marginBottom: '4px' }}>PHASE 3</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>API & Detection Engine</div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Developed src/detection.py and FastAPI backend. Pre-cached models in memory for instant prediction.
                </p>
              </div>

              <div style={{ backgroundColor: '#f8fafc', border: '1.5px solid #000000', borderRadius: '8px', padding: '1.2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7c3aed', marginBottom: '4px' }}>PHASE 4</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Web UI & Speedup</div>
                <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  Built the React interface and optimized 10MB file feature extraction from 18 seconds down to ~1 second.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="bg-dot-pattern" style={{ borderBottom: '2px solid #000000', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', lineHeight: 1.15, marginBottom: '1.2rem', fontWeight: 800 }}>
            TRY SCANNING AN EXECUTABLE
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '2.5rem', fontWeight: 500 }}>
            Upload any Windows executable (.exe, .dll, .sys) to see static feature extraction and model prediction in action.
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-brutal"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            <span>Open Live File Scanner</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer style={{ backgroundColor: 'var(--bg-charcoal)', color: '#ffffff', padding: '4rem 2rem 2.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <ShieldCheck size={24} color="var(--primary-yellow)" />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                MALWARE DETECTOR
              </span>
            </div>
            <p style={{ color: '#b7c6c2', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Academic College Mini Project: Windows Portable Executable malware classification using static machine learning models.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>PAGES</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><a href="/scan" style={{ color: '#ffffff', textDecoration: 'none' }}>Live Scanner</a></li>
              <li><a href="/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>Model Comparison</a></li>
              <li><a href="/charts" style={{ color: '#ffffff', textDecoration: 'none' }}>Confusion Matrices</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>TRAINED MODELS</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#b7c6c2' }}>
              <li>LightGBM (96.9% Acc)</li>
              <li>Random Forest (95.6% Acc)</li>
              <li>Decision Tree (94.1% Acc)</li>
              <li>Logistic Regression (93.2% Acc)</li>
              <li>Gaussian Naive Bayes (64.3% Acc)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>TECH STACK</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#b7c6c2' }}>
              <li>Python 3.13 & Scikit-Learn</li>
              <li>Microsoft LightGBM</li>
              <li>FastAPI Web Framework</li>
              <li>React 18 & Vite</li>
            </ul>
          </div>

        </div>

        <div style={{ borderTop: '1px solid #2d3748', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#a0aec0' }}>
          Windows Malware Detection System • College Mini Project
        </div>
      </footer>

    </div>
  )
}
