import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ShieldCheck, AlertOctagon, Binary, FileCog, FileCode2, Cpu, CheckCircle2, Layers } from 'lucide-react'
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
    <div key="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Binary size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.EXE</span></div>,
    <div key="2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCog size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.DLL</span></div>,
    <div key="3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCode2 size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.SYS</span></div>
  ];

  return (
    <div className="container" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3.8rem', marginBottom: '0.8rem', textTransform: 'uppercase' }}>
        Zero-Day Threat Detection
      </h1>
      <p style={{ fontWeight: 'bold', maxWidth: '750px', marginBottom: '1.5rem' }}>
        Upload any Windows executable (.exe, .dll, .sys). Select your preferred ML classifier or run the full multi-model ensemble consensus.
      </p>

      {/* MODEL SELECTION PANEL */}
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 'bold', 
            fontSize: '0.85rem', 
            letterSpacing: '1px', 
            color: '#000000' 
          }}>
            // 1. SELECT DETECTION ENGINE:
          </span>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            backgroundColor: '#000000', 
            color: '#FF4D00', 
            padding: '3px 8px', 
            fontWeight: 'bold',
            border: '2px solid #000000'
          }}>
            ACTIVE: {activeModelMeta.name.toUpperCase()}
          </span>
        </div>

        {/* Brutalist Button Pill Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', 
          gap: '0.5rem',
          marginBottom: '0.6rem' 
        }}>
          {MODEL_OPTIONS.map((m) => {
            const isSelected = selectedModel === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedModel(m.id)}
                style={{
                  backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                  color: isSelected ? '#FF4D00' : '#000000',
                  border: '3px solid #000000',
                  boxShadow: isSelected ? '4px 4px 0px #000000' : '2px 2px 0px #000000',
                  padding: '0.55rem 0.4rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 'bold',
                  transform: isSelected ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.1s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <div style={{ fontSize: '0.8rem', lineHeight: '1.1' }}>{m.name}</div>
                <span style={{
                  fontSize: '0.62rem',
                  padding: '1px 5px',
                  backgroundColor: isSelected ? '#FF4D00' : '#000000',
                  color: isSelected ? '#000000' : '#FFFFFF',
                  fontWeight: '900',
                  letterSpacing: '0.5px'
                }}>
                  {m.tag}
                </span>
              </button>
            )
          })}
        </div>

        {/* Model Spec Callout */}
        <div style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: '2px solid #000000',
          padding: '0.5rem 0.8rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '3px 3px 0px #000000'
        }}>
          <span style={{ color: '#FF4D00', fontWeight: 'bold' }}>MODEL INTEL:</span>
          <span style={{ color: '#E2E8F0' }}>{activeModelMeta.desc}</span>
        </div>
      </div>

      {/* UPLOAD ZONE */}
      <div className="upload-zone" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            color="#93C5FD" 
            label={file ? "UPLOADED" : "UPLOAD"}
            items={folderItems}
            onItemClick={() => fileInputRef.current.click()}
          />
        </div>

        {file ? (
          <div style={{ 
            backgroundColor: '#000000', 
            color: '#FFFFFF', 
            border: '3px solid #000000', 
            padding: '0.6rem 1.4rem', 
            boxShadow: '4px 4px 0px #000000' 
          }}>
            <span style={{ color: '#FF4D00', fontFamily: 'var(--font-mono)', marginRight: '8px' }}>TARGET PE:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>{file.name}</span>
            <span style={{ color: '#94A3B8', fontFamily: 'var(--font-mono)', marginLeft: '10px', fontSize: '0.8rem' }}>
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        ) : (
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>CLICK FOLDER TO SELECT FILE</h2>
        )}
      </div>

      {/* ACTION BUTTON */}
      <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <button 
          className="btn" 
          onClick={scanFile} 
          disabled={!file || loading}
          style={{ minWidth: '260px' }}
        >
          {loading ? `ANALYZING WITH ${activeModelMeta.name.toUpperCase()}...` : `ANALYZE WITH ${activeModelMeta.name.toUpperCase()}`}
        </button>
      </div>

      {/* SCAN RESULTS CARD */}
      {result && !result.error && (
        <div 
          className={`glass-panel result-card ${result.is_malware ? 'danger' : 'safe'}`} 
          style={{ width: '100%', maxWidth: '900px' }}
        >
          {result.is_malware ? <AlertOctagon className="status-icon" /> : <ShieldCheck className="status-icon" />}
          
          <h1 style={{ 
            fontSize: '2.8rem', 
            margin: '0.8rem 0', 
            color: result.is_malware ? 'var(--orange)' : 'var(--white)' 
          }}>
            {result.is_malware ? 'MALWARE DETECTED' : 'SAFE / BENIGN'}
          </h1>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '3.5rem', 
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '1.1rem' }}>VERDICT CONFIDENCE</p>
              <h2 style={{ color: result.is_malware ? 'var(--orange)' : 'var(--white)', fontSize: '2.2rem' }}>
                {(result.confidence * 100).toFixed(2)}%
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '1.1rem' }}>EVALUATION ENGINE</p>
              <h2 style={{ color: 'var(--white)', fontSize: '2.2rem' }}>{result.model_used}</h2>
            </div>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '1.1rem' }}>FILE SCANNED</p>
              <h2 style={{ color: 'var(--white)', fontSize: '1.8rem', fontFamily: 'var(--font-mono)' }}>
                {result.file}
              </h2>
            </div>
          </div>

          {/* MULTI-ENGINE BREAKDOWN (IF ENSEMBLE OR MULTI-MODEL) */}
          {result.models_breakdown && (
            <div style={{ marginTop: '2.5rem', borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Layers size={20} color="#FF4D00" />
                <h3 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: 0 }}>
                  CONSENSUS BREAKDOWN ACROSS ALL 5 MODELS
                </h3>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                gap: '1rem' 
              }}>
                {Object.entries(result.models_breakdown).map(([mName, mData]) => (
                  <div 
                    key={mName}
                    style={{
                      backgroundColor: '#111111',
                      border: '2px solid #333333',
                      borderLeft: mData.is_malware ? '4px solid #FF4D00' : '4px solid #10B981',
                      padding: '0.8rem 1rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <div style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 'bold', marginBottom: '4px' }}>
                      {mName}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        backgroundColor: mData.is_malware ? '#FF4D00' : '#10B981',
                        color: mData.is_malware ? '#000000' : '#FFFFFF',
                        fontWeight: 'bold'
                      }}>
                        {mData.is_malware ? 'MALWARE' : 'BENIGN'}
                      </span>
                      <span style={{ color: '#E2E8F0', fontSize: '0.85rem', fontWeight: 'bold' }}>
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
        <div className="glass-panel result-card danger" style={{ marginTop: '2rem', width: '100%', maxWidth: '900px' }}>
          <AlertOctagon className="status-icon" />
          <h3 style={{ color: 'var(--orange)' }}>ANALYSIS FAILED</h3>
          <p style={{ color: 'var(--white)', marginTop: '0.5rem' }}>{result.error}</p>
        </div>
      )}
    </div>
  )
}
