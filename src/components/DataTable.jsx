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

  // Common styling for table cells
  const thStyle = { textAlign: 'left', padding: '12px', color: '#94a3b8', borderBottom: '1px solid #334155' };
  const tdStyle = { padding: '12px', borderBottom: '1px solid #1e293b', color: '#f8fafc' };

  return (
    <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '16px', marginTop: '20px' }}>
      <h3 style={{ marginBottom: '16px', color: '#38bdf8' }}>
        {activeService === 'icebergs' ? 'Detected Iceberg Logs' : 'Route Waypoint Details'}
      </h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            {activeService === 'icebergs' ? (
              <>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Latitude</th>
                <th style={thStyle}>Longitude</th>
                <th style={thStyle}>Size</th>
                <th style={thStyle}>Collision Risk</th>
              </>
            ) : (
              <>
                <th style={thStyle}>Waypoint</th>
                <th style={thStyle}>Latitude</th>
                <th style={thStyle}>Longitude</th>
                <th style={thStyle}>Target Speed</th>
                <th style={thStyle}>Fuel Strategy</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {activeService === 'icebergs' && icebergData.map((row) => (
            <tr key={row.id}>
              <td style={tdStyle}>{row.id}</td>
              <td style={tdStyle}>{row.lat}</td>
              <td style={tdStyle}>{row.lon}</td>
              <td style={tdStyle}>{row.size}</td>
              <td style={{ ...tdStyle, color: row.risk === 'High' ? '#f87171' : '#f8fafc' }}>
                {row.risk}
              </td>
            </tr>
          ))}

          {activeService === 'navigation' && routeData.map((row) => (
            <tr key={row.waypoint}>
              <td style={tdStyle}>{row.waypoint}</td>
              <td style={tdStyle}>{row.lat}</td>
              <td style={tdStyle}>{row.lon}</td>
              <td style={tdStyle}>{row.speed}</td>
              <td style={{ ...tdStyle, color: '#4ade80' }}>{row.fuelRate}</td>
            </tr>
          ))}

          {activeService === 'sea-ice' && (
            <tr>
              <td colSpan="5" style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}>
                Gridded sea-ice data is optimized for map viewing. Raw tensor arrays hidden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}