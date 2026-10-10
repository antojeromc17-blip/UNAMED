import React, { useState, useRef } from 'react'
import axios from 'axios'
import { ShieldCheck, AlertOctagon, Loader2, Binary, FileCog, FileCode2 } from 'lucide-react'
import { InteractiveFolder } from './InteractiveFolder'

export default function ScanPage() {
  const [file, setFile] = useState(null)
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
    try {
      const res = await axios.post('http://127.0.0.1:8000/scan', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(res.data)
    } catch (err) {
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  const folderItems = [
    <div key="1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Binary size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.EXE</span></div>,
    <div key="2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCog size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.DLL</span></div>,
    <div key="3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FileCode2 size={24} color="#93C5FD" /><span style={{fontSize:'10px', color:'#000000', marginTop:'4px', fontWeight:'bold'}}>.SYS</span></div>
  ];

  return (
    <div className="container" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Zero-Day Threat Detection</h1>
      <p style={{ fontWeight: 'bold' }}>Upload any Windows executable (.exe, .dll, .sys) for instant ML analysis.</p>

      <div className="upload-zone" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".exe,.dll,.sys" />
        
        <div style={{ marginBottom: '2rem', marginTop: '1rem' }}>
          <InteractiveFolder 
            size={1.5} 
            color="#93C5FD" 
            label={file ? "UPLOADED" : "UPLOAD"}
            items={folderItems}
            onItemClick={() => fileInputRef.current.click()}
          />
        </div>

        {file ? (
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem' }}>{file.name}</h2>
        ) : (
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem' }}>CLICK FOLDER TO BROWSE</h2>
        )}
      </div>

      <div style={{ marginTop: '3rem' }}>
        <button className="btn" onClick={scanFile} disabled={!file || loading}>
          {loading ? 'ANALYZING...' : 'ANALYZE FILE'}
        </button>
      </div>

      {result && !result.error && (
        <div className={`glass-panel result-card ${result.is_malware ? 'danger' : 'safe'}`} style={{ width: '100%' }}>
          {result.is_malware ? <AlertOctagon className="status-icon" /> : <ShieldCheck className="status-icon" />}
          
          <h1 style={{ fontSize: '3rem', margin: '1rem 0', color: result.is_malware ? 'var(--orange)' : 'var(--white)' }}>
            {result.is_malware ? 'MALWARE DETECTED' : 'SAFE / BENIGN'}
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '3rem' }}>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '1.2rem' }}>CONFIDENCE</p>
              <h2 style={{ color: result.is_malware ? 'var(--orange)' : 'var(--white)', fontSize: '2rem' }}>
                {(result.confidence * 100).toFixed(2)}%
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--white)', fontSize: '1.2rem' }}>ENGINE</p>
              <h2 style={{ color: 'var(--white)', fontSize: '2rem' }}>{result.model_used}</h2>
            </div>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="glass-panel result-card danger" style={{ marginTop: '2rem', width: '100%' }}>
          <AlertOctagon className="status-icon" />
          <h3 style={{ color: 'var(--orange)' }}>ANALYSIS FAILED</h3>
          <p style={{ color: 'var(--white)', marginTop: '0.5rem' }}>{result.error}</p>
        </div>
      )}
    </div>
  )
}
