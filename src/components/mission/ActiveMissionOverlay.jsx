export default function ActiveMissionOverlay({
  startCoord,
  destCoord,
  onOpenMissionModal
}) {
  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '16px',
      zIndex: 20,
      backgroundColor: 'rgba(17, 24, 39, 0.94)',
      backdropFilter: 'blur(10px)',
      padding: '14px 16px',
      borderRadius: '8px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        paddingBottom: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#34d399',
            boxShadow: '0 0 6px #34d399'
          }} />
          <span style={{
            color: '#34d399',
            fontSize: '0.74rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Ongoing Mission
          </span>
        </div>
        <button
          onClick={onOpenMissionModal}
          style={{
            background: 'transparent',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          New Mission
        </button>
      </div>

      {/* Source Coordinates */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#0b111e',
        padding: '8px 10px',
        borderRadius: '5px',
        border: '1px solid rgba(255, 255, 255, 0.04)'
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: '500' }}>
            Source Coordinates
          </span>
          <span style={{ color: '#f8fafc', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: '600' }}>
            {startCoord}
          </span>
        </div>
      </div>

      {/* Destination Coordinates */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#0b111e',
        padding: '8px 10px',
        borderRadius: '5px',
        border: '1px solid rgba(255, 255, 255, 0.04)'
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f87171', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: '#64748b', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: '500' }}>
            Destination Coordinates
          </span>
          <span style={{ color: '#f8fafc', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: '600' }}>
            {destCoord}
          </span>
        </div>
      </div>
    </div>
  );
}
