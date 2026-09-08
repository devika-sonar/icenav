// src/components/MetricCard.jsx
export default function MetricCard({ title, value, unit, status }) {
  const statusColors = {
    good: '#34d399',    // Refined emerald
    warning: '#fbbf24', // Refined amber
    danger: '#f87171',  // Refined rose
    neutral: '#38bdf8'  // Refined ice blue
  };

  const color = statusColors[status] || statusColors.neutral;

  return (
    <div style={{
      backgroundColor: '#111827',
      padding: '13px 15px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      position: 'relative',
      marginBottom: '0',
      transition: 'border-color 0.2s ease, transform 0.2s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <h3 style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: '#94a3b8',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          margin: 0
        }}>
          {title}
        </h3>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}66`
        }} />
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        {value} <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#64748b' }}>{unit}</span>
      </div>
    </div>
  );
}