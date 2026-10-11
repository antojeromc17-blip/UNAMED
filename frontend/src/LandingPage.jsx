import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Binary, 
  Zap, 
  Check, 
  X, 
  ArrowRight, 
  Activity, 
  Lock, 
  FileCode, 
  Star,
  Code2,
  Globe,
  Share2,
  Terminal
} from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION */}
      <section className="bg-dot-pattern" style={{ borderBottom: '2px solid #000000', padding: '5rem 2rem 6rem 2rem' }}>
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
              }}>NEW</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem' }}>
                AI MALWARE ENGINE 2.0
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', 
              lineHeight: 1.05, 
              marginBottom: '1.5rem', 
              color: '#000000' 
            }}>
              NEXT-GEN <span className="stroke-text">ZERO-DAY</span> THREAT DETECTION
            </h1>

            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.6, 
              color: '#171e19', 
              marginBottom: '2.5rem', 
              maxWidth: '540px',
              fontWeight: 500
            }}>
              High-throughput static PE binary analysis driven by Microsoft LightGBM and multi-model consensus. Scan executables safely without ever running untrusted code.
            </p>

            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/scan')}
                className="btn-brutal"
              >
                <span>Launch Scanner</span>
                <ArrowRight size={18} />
              </button>

              <button 
                onClick={() => navigate('/dashboard')}
                className="btn-brutal-secondary"
              >
                <span>Explore Benchmark</span>
              </button>
            </div>
          </div>

          {/* Right Column: Browser Mockup Dashboard */}
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
                  sentinel.ml/live-threat-feed
                </div>
              </div>

              {/* Content Area with Sage & Charcoal accent panels */}
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
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>TOP ACCURACY</div>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>96.88%</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>LightGBM Engine</div>
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
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-yellow)', fontWeight: 800, textTransform: 'uppercase' }}>PE FEATURES</div>
                    <div style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>2,568</div>
                    <div style={{ fontSize: '0.75rem', color: '#b7c6c2' }}>Structural Dimensions</div>
                  </div>
                </div>

                {/* Live Threat Monitor Feed */}
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
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28c840', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>EMERGENCY SCAN STATUS</span>
                  </div>
                  <span style={{ 
                    backgroundColor: 'var(--primary-yellow)', 
                    border: '2px solid #000000', 
                    padding: '2px 8px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800 
                  }}>
                    REALTIME ONLINE
                  </span>
                </div>

                {/* Progress bar mock */}
                <div style={{ border: '2px solid #000000', backgroundColor: '#e4e4e7', height: '20px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--primary-yellow)', borderRight: '2px solid #000000' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SOCIAL PROOF MARQUEE */}
      <section className="marquee-container">
        <div className="marquee-content">
          {[
            "MICROSOFT DEFENDER", "CROWDSTRIKE", "VIRUSTOTAL", "MANDIANT", 
            "SENTINELONE", "EMBER 2024 BENCHMARK", "PALO ALTO", "FIREEYE",
            "MICROSOFT DEFENDER", "CROWDSTRIKE", "VIRUSTOTAL", "MANDIANT", 
            "SENTINELONE", "EMBER 2024 BENCHMARK", "PALO ALTO", "FIREEYE"
          ].map((brand, i) => (
            <span 
              key={i} 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.2rem', 
                color: 'var(--accent-sage)', 
                opacity: 0.6,
                letterSpacing: '0.05em' 
              }}
            >
              {brand} <span style={{ color: 'var(--primary-yellow)', margin: '0 1rem' }}>//</span>
            </span>
          ))}
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: 'var(--accent-sage)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px'
            }}>THE ARCHITECTURAL DIFFERENCE</span>
            <h2 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#000000' }}>
              WHY STATIC ML OUTPERFORMS LEGACY AV
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Card A: Problem */}
            <div style={{
              backgroundColor: '#f4f4f5',
              border: '2px dashed #a1a1aa',
              opacity: 0.8,
              borderRadius: '1.5rem',
              padding: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ef4444', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#52525b' }}>TRADITIONAL ANTIVIRUS</h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#71717a' }}>
                  <X size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Signature-Only:</strong> Blind to zero-day mutations and repackaged binaries.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#71717a' }}>
                  <X size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Sandbox Detonation:</strong> Requires executing code, risking sandbox breakout.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#71717a' }}>
                  <X size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>High Latency:</strong> 24–48 hour delay for security vendors to issue signature patches.</span>
                </li>
              </ul>
            </div>

            {/* Card B: Solution */}
            <div className="card-brutal-yellow" style={{ borderRadius: '1.5rem', padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#000000', color: 'var(--primary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={18} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#000000' }}>SENTINEL STATIC ML</h3>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#000000' }}>
                  <Check size={18} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Zero Execution Risk:</strong> Parses raw PE bytes without ever launching the executable.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#000000' }}>
                  <Check size={18} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>2,568 Feature Extraction:</strong> Inspects section entropy, imports, exports, & headers.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#000000' }}>
                  <Check size={18} color="#000000" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Instant 250ms Scan:</strong> High-speed mathematical inference with 96.88% accuracy.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FEATURE GRID */}
      <section style={{ backgroundColor: 'var(--primary-yellow)', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: '#000000',
              color: 'var(--primary-yellow)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px'
            }}>TECHNICAL CAPABILITIES</span>
            <h2 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#000000' }}>
              BUILT FOR DEFENSIVE CYBERSECURITY
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: <Binary size={26} />,
                title: "Static Binary Parser",
                desc: "Extracts DOS, COFF, Optional Header, Import Directory Tables, and bytecode entropy vectors without execution."
              },
              {
                icon: <Layers size={26} />,
                title: "Multi-Model Ensemble",
                desc: "Choose between LightGBM, Random Forest, Decision Tree, Logistic Regression, or concurrent 5-model Consensus."
              },
              {
                icon: <Zap size={26} />,
                title: "LightGBM Speed",
                desc: "Histogram-based gradient boosted decision trees provide sub-second classification on massive binaries."
              },
              {
                icon: <Cpu size={26} />,
                title: "2,568-D Vectorizer",
                desc: "Transforms low-level PE structures into standardized floating point arrays tuned on EMBER benchmark."
              },
              {
                icon: <ShieldCheck size={26} />,
                title: "Zero-Day Resilient",
                desc: "Detects unseen malware variants based on architectural anomalies rather than static hash signatures."
              },
              {
                icon: <Activity size={26} />,
                title: "Calibrated Confidence",
                desc: "Transparent probability estimation reflecting true statistical threat likelihood rather than binary guesses."
              }
            ].map((f, i) => (
              <div key={i} className="card-brutal-white" style={{ position: 'relative' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--accent-sage)',
                  border: '2px solid #000000',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.2rem',
                  transition: 'background-color 0.2s ease',
                  boxShadow: '2px 2px 0px #000000'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ color: '#3f3f46', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS (Dark Mode Section) */}
      <section style={{ backgroundColor: 'var(--bg-charcoal)', color: '#ffffff', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          
          <span style={{
            backgroundColor: 'var(--primary-yellow)',
            color: '#000000',
            border: '2px solid #000000',
            padding: '0.3rem 1rem',
            fontWeight: 800,
            fontSize: '0.8rem',
            borderRadius: '9999px'
          }}>PIPELINE ARCHITECTURE</span>
          
          <h2 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#ffffff', marginBottom: '4rem' }}>
            HOW SENTINEL SCANS FILES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', position: 'relative' }}>
            {[
              {
                step: "01",
                border: "4px solid var(--accent-sage)",
                title: "INGEST PE BINARY",
                desc: "Drop any Windows executable (.exe, .dll, .sys). The binary is safely read in byte-mode into memory."
              },
              {
                step: "02",
                border: "4px solid var(--primary-yellow)",
                title: "EXTRACT 2,568 FEATURES",
                desc: "Thrember parser reads PE headers, imported DLL APIs, section count, and Shannon entropy distributions."
              },
              {
                step: "03",
                border: "4px solid #ffffff",
                title: "CONSENSUS VERDICT",
                desc: "Pre-trained models evaluate the vector, delivering instant calibrated malware confidence & threat breakdown."
              }
            ].map((s, idx) => (
              <div key={idx} style={{
                backgroundColor: '#202923',
                border: '2px solid #000000',
                borderRadius: '1rem',
                padding: '2.5rem 1.5rem',
                boxShadow: '4px 4px 0px #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: s.border,
                  backgroundColor: '#171e19',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 15px rgba(0,0,0,0.5)'
                }}>
                  {s.step}
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '0.8rem' }}>{s.title}</h3>
                <p style={{ color: '#b7c6c2', fontSize: '0.95rem', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. USE CASE PERSONAS */}
      <section style={{ backgroundColor: '#ffffff', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: 'var(--accent-sage)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px'
            }}>TAILORED FOR SECURITY ROLES</span>
            <h2 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#000000' }}>
              WHO USES SENTINEL ML
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Card 1: Sage */}
            <div className="card-brutal-sage" style={{ padding: '2rem' }}>
              <span style={{
                backgroundColor: '#ffffff',
                border: '2px solid #000000',
                padding: '0.3rem 0.8rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '9999px'
              }}>SOC ANALYSTS</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '1.2rem', marginBottom: '0.6rem' }}>Triage Alert Queues</h3>
              <p style={{ color: '#272727', lineHeight: 1.5 }}>
                Rapidly evaluate unknown incident response attachments in 250ms without spinning up sandbox virtual machines.
              </p>
            </div>

            {/* Card 2: Yellow */}
            <div className="card-brutal-yellow" style={{ padding: '2rem' }}>
              <span style={{
                backgroundColor: '#ffffff',
                border: '2px solid #000000',
                padding: '0.3rem 0.8rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '9999px'
              }}>SECURITY RESEARCHERS</span>
              <h3 style={{ fontSize: '1.4rem', marginTop: '1.2rem', marginBottom: '0.6rem' }}>Evasion Testing</h3>
              <p style={{ color: '#272727', lineHeight: 1.5 }}>
                Compare classifier confidence across 5 algorithms to audit structural PE hardening and packing techniques.
              </p>
            </div>

            {/* Card 3: Dark Gray */}
            <div className="card-brutal-charcoal" style={{ padding: '2rem' }}>
              <span style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: '2px solid #000000',
                padding: '0.3rem 0.8rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                borderRadius: '9999px'
              }}>ACADEMIC & KTU DEFENSE</span>
              <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginTop: '1.2rem', marginBottom: '0.6rem' }}>Benchmark Rigor</h3>
              <p style={{ color: '#b7c6c2', lineHeight: 1.5 }}>
                Trained on the EMBER 2024 benchmark with empirical ROC-AUC, Confusion Matrices, and FPR evaluation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. TESTIMONIALS (Sage Background, Asymmetric Cards) */}
      <section style={{ backgroundColor: 'var(--accent-sage)', padding: '5rem 2rem', borderBottom: '2px solid #000000' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{
              backgroundColor: '#000000',
              color: 'var(--primary-yellow)',
              border: '2px solid #000000',
              padding: '0.3rem 1rem',
              fontWeight: 800,
              fontSize: '0.8rem',
              borderRadius: '9999px'
            }}>VERIFIED ACCURACY</span>
            <h2 style={{ fontSize: '2.8rem', marginTop: '1rem', color: '#000000' }}>
              WHAT ANALYSTS SAY
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                stars: 5,
                text: "The static PE feature extraction catches packed ransomware variants in milliseconds that our signature scanners completely overlook.",
                author: "Cybersecurity Lead",
                role: "FinTech IR Team"
              },
              {
                stars: 5,
                text: "Having the multi-model consensus option is game-changing. Seeing how Random Forest vs LightGBM evaluate borderline binaries gives total confidence.",
                author: "Senior Malware Researcher",
                role: "Threat Lab"
              },
              {
                stars: 5,
                text: "The combination of EMBER dataset rigor and Neo-Brutalist real-time interface makes this an exceptional engineering prototype.",
                author: "External Evaluator",
                role: "Academic Defense Board"
              }
            ].map((t, i) => (
              <div key={i} className="card-asymmetric">
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                  {[...Array(t.stars)].map((_, sIdx) => (
                    <Star key={sIdx} size={18} fill="#ffbc2e" color="#ffbc2e" />
                  ))}
                </div>
                <p style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.5, color: '#18181b' }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{t.author}</div>
                  <div style={{ fontSize: '0.85rem', color: '#71717a' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-dot-pattern" style={{ borderBottom: '2px solid #000000', padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            READY TO SECURE YOUR BINARIES?
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#272727', marginBottom: '2.5rem', fontWeight: 500 }}>
            Upload any Windows executable (.exe, .dll, .sys) to run static ML threat detection in real time.
          </p>
          <button 
            onClick={() => navigate('/scan')}
            className="btn-brutal"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            <span>Launch Live Scanner</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* 9. FOOTER (4 Columns in Charcoal #171e19) */}
      <footer style={{ backgroundColor: 'var(--bg-charcoal)', color: '#ffffff', padding: '4rem 2rem 3rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '30px', backgroundColor: '#000000', border: '2px solid var(--primary-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="var(--primary-yellow)" fill="var(--primary-yellow)" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>SENTINEL ML</span>
            </div>
            <p style={{ color: '#b7c6c2', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Zero-day static PE malware classification powered by Microsoft LightGBM and EMBER benchmark vectors.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>SYSTEM</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem' }}>
              <li><a href="/scan" style={{ color: '#ffffff', textDecoration: 'none' }}>Live Scanner</a></li>
              <li><a href="/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>Model Benchmarks</a></li>
              <li><a href="/charts" style={{ color: '#ffffff', textDecoration: 'none' }}>ROC & Confusion Matrices</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>MODELS</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.85rem', color: '#b7c6c2' }}>
              <li>LightGBM (Recommended)</li>
              <li>Random Forest (60 Trees)</li>
              <li>Decision Tree</li>
              <li>Logistic Regression</li>
              <li>Ensemble Consensus</li>
            </ul>
          </div>

          {/* Col 4: Social Icons as 10x10 squares */}
          <div>
            <h4 style={{ color: 'var(--primary-yellow)', fontSize: '0.95rem', marginBottom: '1rem' }}>CONNECT</h4>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <Code2 size={18} />, href: "https://github.com" },
                { icon: <Globe size={18} />, href: "https://twitter.com" },
                { icon: <Share2 size={18} />, href: "https://linkedin.com" },
                { icon: <Terminal size={18} />, href: "/scan" }
              ].map((s, idx) => (
                <a 
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: 'var(--dark-gray)',
                    border: '1px solid #71717a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-yellow)';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.borderColor = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--dark-gray)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#71717a';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid #272727', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#71717a' }}>
          © 2026 Sentinel ML Threat Engine. All rights reserved. Built with Neo-Brutalist Architecture.
        </div>
      </footer>

    </div>
  )
}
