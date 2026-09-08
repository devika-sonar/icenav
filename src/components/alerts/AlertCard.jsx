import { getSeverityBadge } from './alertUtils';

export default function AlertCard({ alert, isSelected, onSelect }) {
  const badge = getSeverityBadge(alert.severity);

  return (
    <div
      onClick={() => onSelect(alert)}
      style={{
        backgroundColor: isSelected ? '#152136' : '#111827',
        borderRadius: '8px',
        padding: '14px 18px',
        border: isSelected ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.07)',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        opacity: alert.acknowledged ? 0.7 : 1,
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: badge.bg,
            color: badge.text,
            border: `1px solid ${badge.border}`,
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.04em'
          }}>
            {badge.label}
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.78rem', fontFamily: 'monospace' }}>
            {alert.id}
          </span>
          {alert.acknowledged && (
            <span style={{
              color: '#34d399',
              fontSize: '0.72rem',
              backgroundColor: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500'
            }}>
              ✓ Acknowledged
            </span>
          )}
        </div>
        <span style={{ color: '#64748b', fontSize: '0.78rem' }}>{alert.timestamp}</span>
      </div>

      <div style={{ color: '#f8fafc', fontWeight: '600', fontSize: '0.92rem', marginBottom: '8px', letterSpacing: '-0.01em' }}>
        {alert.title}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#94a3b8' }}>
        <span>📍 {alert.location}</span>
        <span>📡 {alert.source}</span>
      </div>
    </div>
  );
}
