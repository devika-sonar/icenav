

export default function LandingPage({ onLoginClick }) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>

 

    
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
        >Login
        </button>
      </section>

      
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '30px 20px 60px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '8px', color: '#ffffff', letterSpacing: '-0.01em' }}>
          Platform Features
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#64748b', textAlign: 'center', marginBottom: '36px' }}>

        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>

          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '8px',
            padding: '22px'
          }}>

            <h3 style={{ color: '#f8fafc', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>Sea-Ice Concentration</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              7-day satellite radar forecasts detailing ice concentration, lead fractures, and ridge compression pressure.
            </p>
          </div>


          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '8px',
            padding: '22px'
          }}>

            <h3 style={{ color: '#f8fafc', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>Iceberg Tracking</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Live trajectory modeling and collision risk assessment for massive tabular icebergs across the Drake Passage.
            </p>
          </div>


          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '8px',
            padding: '22px'
          }}>

            <h3 style={{ color: '#f8fafc', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>Mission Route Planner</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Multi-objective waypoint planning optimizing voyage duration, ice thickness resistance, and vessel fuel consumption.
            </p>
          </div>


          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '8px',
            padding: '22px'
          }}>

            <h3 style={{ color: '#f8fafc', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>Hazard & Weather Alerts</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              Real-time warnings for severe pack-ice convergence, supercooled icing rates, and satellite communication blackouts.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#070b12',
        padding: '20px 36px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#64748b',
        fontSize: '0.8rem'
      }}>
        <div>© AntNav Polaris • Antarctic Marine Navigation System</div>
        <button
          onClick={onLoginClick}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#38bdf8',
            cursor: 'pointer',
            fontSize: '0.8rem',
            textDecoration: 'none'
          }}
        >
          Login here
        </button>
      </footer>
    </div>
  );
}
