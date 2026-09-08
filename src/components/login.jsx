
import { useState } from 'react';

export default function Login({ onLogin, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    
    setTimeout(() => {
      
      const existingUsers = JSON.parse(localStorage.getItem('polaris_users')) || [];

      if (isLoginMode) {
        //Login logic 
        const foundUser = existingUsers.find(
          (user) => user.id === operatorId && user.passkey === password
        ) || (operatorId && password); 

        if (foundUser) {
          onLogin(); 
        } else {
          setErrorMsg('User not found or incorrect passkey. Please sign up.');
          setIsLoading(false);
        }

      } else {
        //Sign up logix
        const userExists = existingUsers.find((user) => user.id === operatorId);

        if (userExists) {
          setErrorMsg('Operator ID already exists. Please log in.');
          setIsLoading(false);
        } else {
       
          existingUsers.push({ id: operatorId, passkey: password });
          localStorage.setItem('polaris_users', JSON.stringify(existingUsers));

          onLogin(); //log auto matically afftr signup
        }
      }
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      height: '100vh', width: '100vw', backgroundColor: '#090d16', color: '#f8fafc',
      boxSizing: 'border-box', padding: '20px'
    }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            marginBottom: '16px', background: 'transparent', border: 'none',
            color: '#38bdf8', cursor: 'pointer', fontSize: '0.86rem', fontWeight: '500'
          }}
        >
          ← Back to landing page
        </button>
      )}

      <div style={{
        backgroundColor: '#111827', padding: '36px', borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.08)', width: '100%', maxWidth: '390px',
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)'
      }}>
        <h2 style={{ color: '#f8fafc', fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', textAlign: 'center', letterSpacing: '-0.01em' }}>
          AIMS Login
        </h2>
        <p style={{ color: '#64748b', marginBottom: '22px', textAlign: 'center', fontSize: '0.82rem' }}>
          {isLoginMode ? 'Login to continue ' : 'New user Registration.'}
        </p>

        {/* error display */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(248, 113, 113, 0.08)', border: '1px solid rgba(248, 113, 113, 0.25)',
            color: '#f87171', padding: '10px', borderRadius: '6px', marginBottom: '18px',
            fontSize: '0.82rem', textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>
              Email ID
            </label>
            <input
              required
              type="text"
              placeholder="Enter ID"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0b111e', color: 'white', outline: 'none', boxSizing: 'border-box', fontSize: '0.86rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.8rem', fontWeight: '500', color: '#cbd5e1' }}>
              Password
            </label>
            <input
              required
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0b111e', color: 'white', outline: 'none', boxSizing: 'border-box', fontSize: '0.86rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '6px', padding: '11px',
              backgroundColor: isLoading ? '#1e2c45' : '#0284c7',
              color: isLoading ? '#64748b' : '#ffffff',
              border: 'none', borderRadius: '6px',
              fontWeight: '600', fontSize: '0.88rem', cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.15s ease'
            }}>
            {isLoading
              ? 'Processing...'
              : (isLoginMode ? 'Login' : 'Register')}
          </button>

        </form>

        {/* Toggle between Login and Sign Up */}
        <div style={{ marginTop: '18px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg(''); // clear errors when switching modes
            }}
            style={{
              background: 'transparent', border: 'none', color: '#64748b',
              textDecoration: 'none', cursor: 'pointer', fontSize: '0.8rem',
              transition: 'color 0.15s'
            }}
          >
            {isLoginMode
              ? "Click here to Sign Up"
              : "Already registered? Return to Login"}
          </button>
        </div>

      </div>
    </div>
  );
}