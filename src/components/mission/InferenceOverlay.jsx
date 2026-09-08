export default function InferenceOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 17, 32, 0.7)',
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#38bdf8',
      fontSize: '1rem',
      fontWeight: '600',
      letterSpacing: '0.02em',
      borderRadius: '12px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#38bdf8',
          animation: 'pulseSubtle 1.5s infinite ease-in-out'
        }} />
        Running ML Inference...
      </div>
    </div>
  );
}
