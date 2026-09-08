export default function FaqAccordionItem({
  faq,
  isOpen,
  onToggle
}) {
  return (
    <div
      style={{
        backgroundColor: '#0b111e',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        overflow: 'hidden',
        transition: 'border-color 0.15s ease'
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: '14px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#f8fafc',
          fontWeight: '500',
          fontSize: '0.88rem'
        }}
      >
        <span>{faq.q}</span>
        <span style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: '600', marginLeft: '12px' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>

      {isOpen && (
        <div style={{
          padding: '0 18px 16px 18px',
          color: '#94a3b8',
          fontSize: '0.84rem',
          lineHeight: '1.6',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}
