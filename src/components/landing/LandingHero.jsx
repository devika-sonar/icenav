export default function LandingHero({ onLoginClick }) {
  return (
    <section style={{
      maxWidth: '860px',
      margin: '0 auto',
      padding: '50px 20px 40px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <img
          src="/aims-logo.png"
          alt="AIMS Logo"
          style={{ height: '100px', width: 'auto', objectFit: 'contain' }}
        />
      </div>
      <div style={{
        backgroundColor: 'rgba(56, 189, 248, 0.08)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        color: '#38bdf8',
        fontSize: '0.78rem',
        fontWeight: '600',
        letterSpacing: '0.04em',
        padding: '5px 14px',
        borderRadius: '20px',
        marginBottom: '20px'
      }}>
        Antarctic Iceberg Motion Suite
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        lineHeight: '1.2',
        marginBottom: '16px',
        color: '#ffffff',
        letterSpacing: '-0.02em'
      }}>
        Intelligent Polar Navigation & <span style={{ color: '#38bdf8' }}>Sea-Ice Forecasting</span>
      </h1>

      <p style={{
        fontSize: '1.05rem',
        color: '#94a3b8',
        lineHeight: '1.6',
        maxWidth: '700px',
        marginBottom: '32px'
      }}>
        An advanced navigation and ice intelligence system designed for polar vessels and Antarctic research expeditions.
        Monitor real-time sea-ice concentration, track tabular iceberg trajectories, and plan fuel-efficient routes across the Southern Ocean.
      </p>

      <button
        onClick={onLoginClick}
        style={{
          backgroundColor: '#0284c7',
          color: 'white',
          border: 'none',
          padding: '12px 28px',
          borderRadius: '6px',
          fontSize: '0.95rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
          transition: 'all 0.15s ease'
        }}
      >
        Login
      </button>
    </section>
  );
}
