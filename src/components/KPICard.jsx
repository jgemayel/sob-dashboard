import { useState, useEffect, useRef } from 'react';

// Map colors to glow classes
const colorToGlow = {
  '#3b82f6': 'rgba(59,130,246,0.15)',
  '#10b981': 'rgba(16,185,129,0.15)',
  '#f59e0b': 'rgba(245,158,11,0.15)',
  '#8b5cf6': 'rgba(139,92,246,0.15)',
  '#ec4899': 'rgba(236,72,153,0.15)',
  '#06b6d4': 'rgba(6,182,212,0.15)',
};

export default function KPICard({ label, value, sub, color = '#3b82f6', delta, onClick }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  const isCritical = delta !== undefined && delta < 0;
  const glowColor = colorToGlow[color] || 'rgba(59,130,246,0.15)';

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="glass-card"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        padding: '16px 16px 16px 20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        animation: 'fadeIn 0.5s ease-out both',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${glowColor}`;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: '8px',
        bottom: '8px',
        width: '4px',
        borderRadius: '0 4px 4px 0',
        background: color,
        opacity: 0.8,
      }} />

      <div style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: '#64748b',
        marginBottom: '8px',
      }}>
        {label}
      </div>

      <div style={{
        fontSize: '24px',
        fontWeight: 700,
        color: '#fff',
        lineHeight: 1.2,
        animation: animated ? 'countUp 0.6s ease-out' : 'none',
      }}>
        {value}
      </div>

      {delta !== undefined && (
        <span style={{
          fontSize: '12px',
          fontWeight: 500,
          marginTop: '4px',
          display: 'inline-block',
          color: delta >= 0 ? '#34d399' : '#f87171',
          animation: isCritical ? 'pulse-glow 2s ease-in-out infinite' : 'none',
        }}>
          {delta >= 0 ? '+' : ''}{delta}% YoY
        </span>
      )}

      {sub && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{sub}</div>}

      {onClick && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          fontSize: '9px',
          color: '#3b82f650',
          fontStyle: 'italic',
        }}>
          drill down
        </div>
      )}
    </div>
  );
}
