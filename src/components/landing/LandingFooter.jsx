export default function LandingFooter({ onLoginClick }) {
  return (
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
  );
}
