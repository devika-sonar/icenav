// src/components/MetricCard.jsx
export default function MetricCard({ title, value, unit, status }) {
  // Change color based on status (e.g., 'good' = green, 'warning' = yellow, 'danger' = red)
  const statusColors = {
    good: '#4ade80',    // Green
    warning: '#facc15', // Yellow
    danger: '#f87171',  // Red
    neutral: '#38bdf8'  // Blue
  };

  const color = statusColors[status] || statusColors.neutral;

  return (
    <div style={{
      backgroundColor: '#1e293b',
      padding: '16px',
      borderRadius: '8px',
      border: `1px solid #334155`,
      borderLeft: `4px solid ${color}`,
      marginBottom: '12px'
    }}>
      <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
        {title}
      </h3>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8fafc' }}>
        {value} <span style={{ fontSize: '1rem', color: '#64748b' }}>{unit}</span>
      </div>
    </div>
  );
}