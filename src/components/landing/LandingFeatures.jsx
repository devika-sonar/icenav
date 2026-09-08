const FEATURES = [
  {
    title: 'Sea-Ice Concentration',
    description: '7-day satellite radar forecasts detailing ice concentration, lead fractures, and ridge compression pressure.'
  },
  {
    title: 'Iceberg Tracking',
    description: 'Live trajectory modeling and collision risk assessment for massive tabular icebergs across the Drake Passage.'
  },
  {
    title: 'Mission Route Planner',
    description: 'Multi-objective waypoint planning optimizing voyage duration, ice thickness resistance, and vessel fuel consumption.'
  },
  {
    title: 'Hazard & Weather Alerts',
    description: 'Real-time warnings for severe pack-ice convergence, supercooled icing rates, and satellite communication blackouts.'
  }
];

export default function LandingFeatures() {
  return (
    <section style={{
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '30px 20px 60px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: '36px',
        color: '#ffffff',
        letterSpacing: '-0.01em'
      }}>
        Platform Features
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px'
      }}>
        {FEATURES.map((feature, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '8px',
              padding: '22px'
            }}
          >
            <h3 style={{ color: '#f8fafc', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
