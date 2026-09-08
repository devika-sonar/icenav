// src/components/DataTable.jsx
export default function DataTable({ activeService }) {
  // Mock Data Arrays for pure React UI mapping
  const icebergData = [
    { id: 'IB-42A', lat: '-70.00', lon: '-45.00', risk: 'High', size: '1.2 sq km' },
    { id: 'IB-42B', lat: '-69.20', lon: '-42.50', risk: 'Medium', size: '0.8 sq km' },
    { id: 'IB-47C', lat: '-71.50', lon: '-48.10', risk: 'Low', size: '2.4 sq km' },
  ];

  const routeData = [
    { waypoint: 1, lat: '-62.00', lon: '-60.00', speed: '14 knots', fuelRate: 'Optimized' },
    { waypoint: 2, lat: '-65.00', lon: '-55.00', speed: '12 knots', fuelRate: 'Eco' },
    { waypoint: 3, lat: '-68.00', lon: '-48.00', speed: '10 knots', fuelRate: 'Ice-Breaker' },
  ];

  // Refined styling for minimal table cells in the sidebar
  const thStyle = {
    textAlign: 'left',
    padding: '9px 10px',
    color: '#94a3b8',
    fontSize: '0.72rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0c121e',
    whiteSpace: 'nowrap'
  };

  const tdStyle = {
    padding: '9px 10px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    color: '#e2e8f0',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={{
      backgroundColor: '#111827',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      padding: '14px 16px',
      marginTop: '0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{
        marginBottom: '12px',
        color: '#f8fafc',
        fontSize: '0.86rem',
        fontWeight: '600',
        letterSpacing: '-0.01em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>{activeService === 'icebergs' ? 'Detected Iceberg Logs' : (activeService === 'navigation' ? 'Route Telemetry Details' : 'Sea-Ice Grid Logs')}</span>
        <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>Live Telemetry</span>
      </h3>
      
      <div style={{ overflowX: 'auto', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr>
              {activeService === 'icebergs' ? (
                <>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Latitude</th>
                  <th style={thStyle}>Longitude</th>
                  <th style={thStyle}>Size</th>
                  <th style={thStyle}>Risk</th>
                </>
              ) : (
                <>
                  <th style={thStyle}>Point</th>
                  <th style={thStyle}>Latitude</th>
                  <th style={thStyle}>Longitude</th>
                  <th style={thStyle}>Speed</th>
                  <th style={thStyle}>Fuel Plan</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeService === 'icebergs' && icebergData.map((row) => (
              <tr key={row.id} style={{ transition: 'background-color 0.15s' }}>
                <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#38bdf8', fontWeight: '600' }}>{row.id}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.lat}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.lon}</td>
                <td style={tdStyle}>{row.size}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    backgroundColor: row.risk === 'High' ? 'rgba(248, 113, 113, 0.12)' : 'rgba(56, 189, 248, 0.1)',
                    color: row.risk === 'High' ? '#f87171' : (row.risk === 'Medium' ? '#fbbf24' : '#34d399'),
                    border: `1px solid ${row.risk === 'High' ? 'rgba(248, 113, 113, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`
                  }}>
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}

            {activeService === 'navigation' && routeData.map((row) => (
              <tr key={row.waypoint} style={{ transition: 'background-color 0.15s' }}>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#94a3b8' }}>#{row.waypoint}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.lat}</td>
                <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.lon}</td>
                <td style={tdStyle}>{row.speed}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    color: '#34d399',
                    border: '1px solid rgba(52, 211, 153, 0.2)'
                  }}>
                    {row.fuelRate}
                  </span>
                </td>
              </tr>
            ))}

            {activeService === 'sea-ice' && (
              <tr>
                <td colSpan="5" style={{ ...tdStyle, textAlign: 'center', color: '#64748b', padding: '18px 12px' }}>
                  Gridded sea-ice data is rendered directly on map layer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}