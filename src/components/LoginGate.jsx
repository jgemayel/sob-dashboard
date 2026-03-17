import { useState, useEffect, useRef } from 'react';

function MatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF∑∏∫∂√∞≈≠≤≥±×÷';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const speeds = Array(columns).fill(0).map(() => 0.5 + Math.random() * 1.5);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const brightness = Math.random();

        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${fontSize}px monospace`;
        } else if (brightness > 0.7) {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.8 + Math.random() * 0.2})`;
          ctx.font = `${fontSize}px monospace`;
        } else {
          ctx.fillStyle = `rgba(0, 180, 45, ${0.3 + Math.random() * 0.4})`;
          ctx.font = `${fontSize}px monospace`;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}

function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀■□▪▫';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (i < iteration) return char;
          return glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }).join('')
      );
      iteration += 0.5;
      if (iteration >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

export default function LoginGate({ onAuth }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'OW2026') {
      setSuccess(true);
      setTimeout(() => onAuth(), 800);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => { setError(false); setShake(false); }, 1500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
      <MatrixCanvas />

      {/* Scanline overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
        pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* Login panel */}
      <div style={{
        position: 'relative', zIndex: 10, minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '420px', padding: '40px',
          background: 'rgba(0, 0, 0, 0.85)',
          border: success ? '1px solid #00ff41' : '1px solid rgba(0, 255, 65, 0.2)',
          borderRadius: '4px',
          backdropFilter: 'blur(20px)',
          boxShadow: success
            ? '0 0 60px rgba(0, 255, 65, 0.3), inset 0 0 60px rgba(0, 255, 65, 0.05)'
            : '0 0 40px rgba(0, 255, 65, 0.1), inset 0 0 40px rgba(0, 255, 65, 0.02)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          animation: shake ? 'shake 0.5s ease' : 'none',
        }}>
          {/* Terminal header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '24px', paddingBottom: '12px',
            borderBottom: '1px solid rgba(0, 255, 65, 0.15)',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
            <span style={{ marginLeft: '12px', fontSize: '11px', color: 'rgba(0, 255, 65, 0.5)', fontFamily: 'monospace' }}>
              secure_terminal — 443/tcp
            </span>
          </div>

          {/* Content */}
          <div style={{ fontFamily: "'Courier New', 'Consolas', monospace" }}>
            <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.5)', marginBottom: '4px' }}>
              &#91;SYS&#93; Connection established
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.5)', marginBottom: '4px' }}>
              &#91;SYS&#93; TLS 1.3 handshake complete
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.5)', marginBottom: '16px' }}>
              &#91;SYS&#93; Awaiting authentication...
            </div>

            <div style={{ fontSize: '18px', fontWeight: 700, color: '#00ff41', marginBottom: '4px', letterSpacing: '0.1em' }}>
              <GlitchText text="RESTRICTED ACCESS" />
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.4)', marginBottom: '28px' }}>
              Authorization required to proceed. All sessions are monitored.
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ fontSize: '11px', color: 'rgba(0, 255, 65, 0.6)', marginBottom: '8px' }}>
                root@secure:~$ <span style={{ color: '#00ff41' }}>enter_passphrase</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#00ff41', fontSize: '14px' }}>▶</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  style={{
                    flex: 1, padding: '10px 14px', fontSize: '14px',
                    fontFamily: "'Courier New', monospace",
                    background: 'rgba(0, 255, 65, 0.05)',
                    border: error ? '1px solid #ff3333' : '1px solid rgba(0, 255, 65, 0.25)',
                    borderRadius: '2px',
                    color: '#00ff41',
                    outline: 'none',
                    caretColor: '#00ff41',
                    letterSpacing: '0.15em',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => { if (!error) e.target.style.borderColor = 'rgba(0, 255, 65, 0.6)'; }}
                  onBlur={(e) => { if (!error) e.target.style.borderColor = 'rgba(0, 255, 65, 0.25)'; }}
                />
              </div>

              {error && (
                <div style={{
                  fontSize: '11px', color: '#ff3333', marginTop: '12px',
                  fontFamily: 'monospace',
                }}>
                  &#91;ERROR&#93; Authentication failed. Invalid credentials.
                </div>
              )}

              {success && (
                <div style={{
                  fontSize: '11px', color: '#00ff41', marginTop: '12px',
                  fontFamily: 'monospace',
                }}>
                  &#91;OK&#93; Authentication successful. Decrypting session...
                </div>
              )}

              <button type="submit" disabled={success} style={{
                width: '100%', padding: '10px', marginTop: '20px',
                fontSize: '12px', fontWeight: 700, fontFamily: "'Courier New', monospace",
                letterSpacing: '0.15em', textTransform: 'uppercase',
                background: success ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 255, 65, 0.1)',
                color: '#00ff41',
                border: '1px solid rgba(0, 255, 65, 0.3)',
                borderRadius: '2px',
                cursor: success ? 'default' : 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => { if (!success) { e.target.style.background = 'rgba(0, 255, 65, 0.2)'; e.target.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.15)'; }}}
                onMouseLeave={(e) => { if (!success) { e.target.style.background = 'rgba(0, 255, 65, 0.1)'; e.target.style.boxShadow = 'none'; }}}
              >
                {success ? '[ Authenticated ]' : '[ Authenticate ]'}
              </button>
            </form>

            <div style={{
              marginTop: '24px', paddingTop: '12px',
              borderTop: '1px solid rgba(0, 255, 65, 0.1)',
              fontSize: '9px', color: 'rgba(0, 255, 65, 0.25)',
              fontFamily: 'monospace', lineHeight: 1.8,
            }}>
              SHA-256: e3b0c44298fc1c149afbf4c8996fb924<br />
              Session: {Math.random().toString(36).substring(2, 10)}-{Math.random().toString(36).substring(2, 6)}<br />
              Encrypted channel &middot; All access logged
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-4px); }
          30%, 70% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
