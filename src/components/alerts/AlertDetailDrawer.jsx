import { getSeverityBadge } from './alertUtils';

export default function AlertDetailDrawer({
  selectedAlert,
  onClose,
  onToggleAcknowledge,
  onDismiss
}) {
  if (!selectedAlert) return null;

  const badge = getSeverityBadge(selectedAlert.severity);

  return (
    <div style={{
      flex: '1 1 45%',
      backgroundColor: '#111827',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: 'fit-content',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        paddingBottom: '12px'
      }}>
        <div>
          <span style={{
            ...badge,
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.7rem',
            fontWeight: '700',
            letterSpacing: '0.04em',
            display: 'inline-block',
            marginBottom: '6px'
          }}>
            {selectedAlert.severity.toUpperCase()}
          </span>
          <h3 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
            {selectedAlert.title}
          </h3>
          <span style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '2px', display: 'inline-block' }}>
            Identifier: {selectedAlert.id} • {selectedAlert.timestamp}
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1
          }}
        >
          ✕
        </button>
      </div>

      {/* Location */}
      <div>
        <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>
          Location Coordinates
        </div>
        <div style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: '600', fontSize: '0.88rem' }}>
          📍 {selectedAlert.location}
        </div>
      </div>

      {/* Source */}
      <div>
        <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>
          Telemetry Source
        </div>
        <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
          📡 {selectedAlert.source}
        </div>
      </div>

      {/* Detailed Hazard Analysis */}
      <div style={{ backgroundColor: '#0b111e', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em', marginBottom: '4px' }}>
          Detailed Hazard Analysis
        </div>
        <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>
          {selectedAlert.description}
        </div>
      </div>

      {/* Recommended Bridge Protocol */}
      <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.06)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
        <div style={{ color: '#38bdf8', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '4px', fontWeight: '600', letterSpacing: '0.04em' }}>
          Recommended Bridge Protocol
        </div>
        <div style={{ color: '#f8fafc', fontSize: '0.85rem', fontWeight: '500', lineHeight: '1.4' }}>
          ⚠️ {selectedAlert.recommendedAction}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
        <button
          onClick={() => onToggleAcknowledge(selectedAlert.id)}
          style={{
            flexGrow: 1,
            padding: '9px 14px',
            borderRadius: '6px',
            backgroundColor: selectedAlert.acknowledged ? '#1e2c45' : '#0284c7',
            color: 'white',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.82rem',
            transition: 'all 0.15s ease'
          }}
        >
          {selectedAlert.acknowledged ? 'Mark Unacknowledged' : '✓ Acknowledge Alert'}
        </button>
        <button
          onClick={() => onDismiss(selectedAlert.id)}
          style={{
            padding: '9px 14px',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            color: '#f87171',
            border: '1px solid rgba(248, 113, 113, 0.3)',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.82rem',
            transition: 'all 0.15s ease'
          }}
        >
          Dismiss / Resolve
        </button>
      </div>
    </div>
  );
}
