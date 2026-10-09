import React, { useState, useRef } from 'react'
import axios from 'axios'
import { UploadCloud, ShieldCheck, AlertOctagon, Loader2 } from 'lucide-react'

export default function ScanPage() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true)
    else if (e.type === 'dragleave') setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
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
      // Assuming FastAPI is running on localhost:8000
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

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Zero-Day Threat Detection</h1>
      <p style={{ color: 'var(--text-muted)' }}>Upload any Windows executable (.exe, .dll, .sys) for instant ML analysis.</p>

      <div 
        className={`upload-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".exe,.dll,.sys" />
        <UploadCloud className="upload-icon" />
        {file ? (
          <h2 style={{ color: 'var(--text-main)' }}>{file.name}</h2>
        ) : (
          <h2 style={{ color: 'var(--text-muted)' }}>Drag & Drop file here or Click to Browse</h2>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button className="btn" onClick={scanFile} disabled={!file || loading}>
          {loading ? <><Loader2 className="spinner" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }}/> Scanning Deep Features...</> : 'Analyze File'}
        </button>
      </div>

      {result && !result.error && (
        <div className={`glass-panel result-card ${result.is_malware ? 'danger' : 'safe'}`}>
          {result.is_malware ? <AlertOctagon className="status-icon" /> : <ShieldCheck className="status-icon" />}
          
          <h1 style={{ fontSize: '2rem', margin: '1rem 0' }}>
            {result.is_malware ? 'MALWARE DETECTED' : 'SAFE / BENIGN'}
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '2rem' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Confidence</p>
              <h2 style={{ color: result.is_malware ? 'var(--danger)' : 'var(--primary)' }}>
                {(result.confidence * 100).toFixed(2)}%
              </h2>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Engine</p>
              <h2 style={{ color: 'var(--text-main)' }}>{result.model_used}</h2>
            </div>
          </div>
        </div>
      )}

      {result && result.error && (
        <div className="glass-panel result-card danger" style={{ marginTop: '2rem' }}>
          <AlertOctagon className="status-icon" style={{ width: '40px', height: '40px' }}/>
          <h3 style={{ color: 'var(--danger)' }}>Analysis Failed</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{result.error}</p>
        </div>
      )}
    </div>
  )
}
