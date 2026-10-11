import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ShieldCheck, AlertOctagon, Binary, FileCog, FileCode2, Layers, ArrowRight, Zap, CheckCircle2 } from 'lucide-react'
import { InteractiveFolder } from './InteractiveFolder'

const MODEL_OPTIONS = [
  { 
    id: 'LightGBM', 
    name: 'LightGBM', 
    tag: 'RECOMMENDED', 
    acc: '96.9%', 
    desc: 'Gradient Boosted Trees — Highest overall accuracy (96.88%) & lowest false positive rate (2.28%).' 
  },
  { 
    id: 'Random Forest', 
    name: 'Random Forest', 
    tag: '95.6% ACC', 
    acc: '95.6%', 
    desc: 'Ensemble of 60 decision trees — High generalization and robust against structural evasion.' 
  },
  { 
    id: 'Decision Tree', 
    name: 'Decision Tree', 
    tag: '94.1% ACC', 
    acc: '94.1%', 
    desc: 'Hierarchical tree logic — Fast split rule inspection with 94.12% accuracy.' 
  },
  { 
    id: 'Logistic Regression', 
    name: 'Logistic Reg.', 
    tag: '93.2% ACC', 
    acc: '93.2%', 
    desc: 'Normalized linear decision boundary with StandardScaler preprocessing.' 
  },
  { 
    id: 'Gaussian Naive Bayes', 
    name: 'Naive Bayes', 
    tag: '64.3% ACC', 
    acc: '64.3%', 
    desc: 'Probabilistic baseline — Ultra-high malware recall (99.14%) prioritizing zero missed threats.' 
  },
  { 
    id: 'Ensemble', 
    name: '⚡ Ensemble Consensus', 
    tag: 'MULTI-ENGINE', 
    acc: 'ALL', 
    desc: 'Concurrent Multi-Engine Analysis — Runs all 5 ML models simultaneously and calculates consensus.' 
  },
]

export default function ScanPage() {
  const [file, setFile] = useState(null)
  const [selectedModel, setSelectedModel] = useState('LightGBM')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const scanFile = async () => {
    if (!file) return
    setLoading(true)
    setResult(null)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('model_name', selectedModel)
    try {
      const res = await axios.post('http://127.0.0.1:8000/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(res.data)
    } catch (err) {
      setResult({ error: err.response?.data?.detail || err.message })
    } finally {
      setLoading(false)
    }
  }

  const activeModelMeta = MODEL_OPTIONS.find(m => m.id === selectedModel) || MODEL_OPTIONS[0]

  const folderItems = [
    <div key="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Binary size={24} color="#000000" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'800'}}>.EXE</span></div>,
    <div key="2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCog size={24} color="#000000" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'800'}}>.DLL</span></div>,
    <div key="3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCode2 size={24} color="#000000" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'800'}}>.SYS</span></div>
  ];

  return (
    <div className="bg-dot-pattern" style={{ minHeight: 'calc(100vh - 80px)', padding: '3.5rem 1.5rem 5rem 1.5rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
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
            STATIC PE ANALYSIS ENGINE
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '0.8rem', color: '#000000' }}>
          ZERO-DAY THREAT SCANNER
        </h1>
        <p style={{ maxWidth: '680px', fontSize: '1.1rem', color: '#171e19', marginBottom: '2.5rem', fontWeight: 500 }}>
          Upload any Windows executable (.exe, .dll, .sys). Select an algorithm or run all 5 models via Ensemble Consensus.
        </p>

        {/* MODEL SELECTION BOX */}
        <div style={{
          width: '100%',
          backgroundColor: '#ffffff',
          border: '2px solid #000000',
          borderRadius: '1rem',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', textTransform: 'uppercase' }}>
              // CHOOSE DETECTION ENGINE:
            </span>
            <span style={{
              backgroundColor: 'var(--primary-yellow)',
              border: '2px solid #000000',
              padding: '2px 10px',
              borderRadius: '9999px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              ACTIVE: {activeModelMeta.name.toUpperCase()}
            </span>
          </div>

          {/* Model Button Pills Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', 
            gap: '0.6rem',
            marginBottom: '1rem' 
          }}>
            {MODEL_OPTIONS.map((m) => {
              const isSelected = selectedModel === m.id
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedModel(m.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-charcoal)' : '#ffffff',
                    color: isSelected ? 'var(--primary-yellow)' : '#000000',
                    border: '2px solid #000000',
                    borderRadius: '0.6rem',
                    boxShadow: isSelected ? '2px 2px 0px #000000' : 'var(--shadow-sm)',
                    padding: '0.65rem 0.5rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    transform: isSelected ? 'translate(2px, 2px)' : 'none',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <div style={{ fontSize: '0.85rem' }}>{m.name}</div>
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: '1px solid #000000',
                    backgroundColor: isSelected ? 'var(--primary-yellow)' : 'var(--accent-sage)',
                    color: '#000000',
                    fontWeight: 800
                  }}>
                    {m.tag}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Model Description Box */}
          <div style={{
            backgroundColor: 'var(--accent-sage)',
            border: '2px solid #000000',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#171e19'
          }}>
            <span style={{ backgroundColor: '#000000', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>INFO</span>
            <span>{activeModelMeta.desc}</span>
          </div>
        </div>

        {/* UPLOAD CONTAINER */}
        <div style={{
          width: '100%',
          backgroundColor: '#ffffff',
          border: '2px solid #000000',
          borderRadius: '1rem',
          padding: '2.5rem 1.5rem',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileChange} 
            accept=".exe,.dll,.sys" 
          />

          <div style={{ marginBottom: '1.5rem' }}>
            <InteractiveFolder 
              size={1.5} 
              color="#ffe17c" 
              label={file ? "UPLOADED" : "UPLOAD"}
              items={folderItems}
              onItemClick={() => fileInputRef.current.click()}
            />
          </div>

          {file ? (
            <div style={{
              backgroundColor: 'var(--primary-yellow)',
              border: '2px solid #000000',
              borderRadius: '0.5rem',
              padding: '0.6rem 1.5rem',
              boxShadow: '2px 2px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>TARGET BINARY:</span>
              <span style={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '1rem' }}>{file.name}</span>
              <span style={{ fontSize: '0.8rem', color: '#52525b' }}>({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
          ) : (
            <h3 style={{ fontSize: '1.2rem', color: '#000000', marginTop: '0.5rem' }}>
              CLICK FOLDER TO SELECT EXECUTABLE (.EXE, .DLL, .SYS)
            </h3>
          )}

          <div style={{ marginTop: '2rem' }}>
            <button 
              className="btn-brutal"
              onClick={scanFile}
              disabled={!file || loading}
              style={{ minWidth: '260px' }}
            >
              <span>{loading ? `ANALYZING WITH ${activeModelMeta.name.toUpperCase()}...` : `ANALYZE WITH ${activeModelMeta.name.toUpperCase()}`}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* RESULTS CARD */}
        {result && !result.error && (
          <div style={{
            width: '100%',
            marginTop: '2.5rem',
            backgroundColor: result.is_malware ? '#ffffff' : '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-lg)',
            padding: '2.5rem',
            textAlign: 'center'
          }}>
            {/* Status Header Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: result.is_malware ? '#ff5f57' : 'var(--accent-sage)',
              color: result.is_malware ? '#ffffff' : '#000000',
              border: '2px solid #000000',
              borderRadius: '9999px',
              padding: '0.6rem 1.8rem',
              boxShadow: '4px 4px 0px #000000',
              marginBottom: '1.5rem'
            }}>
              {result.is_malware ? <AlertOctagon size={28} /> : <ShieldCheck size={28} />}
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
                {result.is_malware ? 'MALWARE DETECTED' : 'SAFE / BENIGN'}
              </span>
            </div>

            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
              {result.file}
            </h2>

            {/* Metrics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'var(--primary-yellow)',
                border: '2px solid #000000',
                borderRadius: '0.5rem',
                padding: '1.2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>VERDICT CONFIDENCE</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  {(result.confidence * 100).toFixed(2)}%
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--accent-sage)',
                border: '2px solid #000000',
                borderRadius: '0.5rem',
                padding: '1.2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>EVALUATION ENGINE</div>
                <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginTop: '0.3rem' }}>
                  {result.model_used}
                </div>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-charcoal)',
                color: '#ffffff',
                border: '2px solid #000000',
                borderRadius: '0.5rem',
                padding: '1.2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary-yellow)', fontWeight: 800 }}>THREAT PROBABILITY</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                  {(result.malware_probability * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Ensemble 5-Model Breakdown */}
            {result.models_breakdown && (
              <div style={{
                borderTop: '2px solid #000000',
                paddingTop: '2rem',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Layers size={20} color="#000000" />
                  <h3 style={{ fontSize: '1.2rem' }}>CONSENSUS BREAKDOWN ACROSS ALL 5 MODELS</h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {Object.entries(result.models_breakdown).map(([mName, mData]) => (
                    <div
                      key={mName}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #000000',
                        borderRadius: '0.5rem',
                        padding: '0.8rem',
                        boxShadow: '2px 2px 0px #000000'
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '6px' }}>{mName}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid #000000',
                          backgroundColor: mData.is_malware ? '#ff5f57' : 'var(--accent-sage)',
                          color: mData.is_malware ? '#ffffff' : '#000000'
                        }}>
                          {mData.is_malware ? 'MALWARE' : 'BENIGN'}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                          {(mData.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ERROR CARD */}
        {result && result.error && (
          <div style={{
            width: '100%',
            marginTop: '2rem',
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem'
          }}>
            <div style={{ color: '#ff5f57', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <AlertOctagon size={28} />
              <h3 style={{ fontSize: '1.4rem' }}>SCAN FAILED</h3>
            </div>
            <p style={{ color: '#52525b', fontWeight: 600 }}>{result.error}</p>
          </div>
        )}

      </div>
    </div>
  )
}
