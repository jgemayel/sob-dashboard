import { useState } from 'react';

export default function LoginGate({ onAuth }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'OW2026') {
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0e17',
    }}>
      <div style={{
        width: '400px', padding: '48px 40px', borderRadius: '16px',
        background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
        border: '1px solid #1e293b',
      }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase' }}>
          Syria Central Bank Reform Project
        </div>
        <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
          SOB Diagnostic Dashboard
        </div>
        <div style={{ fontSize: '12px', color: '#475569', marginTop: '8px', lineHeight: 1.6 }}>
          State-Owned Banks diagnostic data for authorized personnel only. Enter the access code to continue.
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '32px' }}>
          <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
            Access Code
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter access code"
            autoFocus
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '8px', fontSize: '14px',
              background: '#0a0e17', border: error ? '1px solid #ef4444' : '1px solid #1e293b',
              color: '#fff', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { if (!error) e.target.style.borderColor = '#3b82f6'; }}
            onBlur={(e) => { if (!error) e.target.style.borderColor = '#1e293b'; }}
          />
          {error && (
            <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px' }}>
              Invalid access code. Please try again.
            </div>
          )}
          <button type="submit" style={{
            width: '100%', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
            background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '16px',
            transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => e.target.style.background = '#2563eb'}
            onMouseLeave={(e) => e.target.style.background = '#3b82f6'}
          >
            Access Dashboard
          </button>
        </form>

        <div style={{ fontSize: '10px', color: '#475569', marginTop: '24px', textAlign: 'center' }}>
          Confidential &middot; Authorized access only
        </div>
      </div>
    </div>
  );
}
