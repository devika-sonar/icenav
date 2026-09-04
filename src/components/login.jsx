// src/components/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggles between Login and Sign Up
  
  // State for our form inputs
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErrorMsg(''); // Clear old errors
    setIsLoading(true);
    
    // Simulating a secure network request
    setTimeout(() => {
      // 1. Fetch our mock "database" from the browser's local storage
      const existingUsers = JSON.parse(localStorage.getItem('polaris_users')) || [];

      if (isLoginMode) {
        // --- LOGIN LOGIC ---
        const foundUser = existingUsers.find(
          (user) => user.id === operatorId && user.passkey === password
        );

        if (foundUser) {
          onLogin(); // Success! Let them in.
        } else {
          setErrorMsg('User not found or incorrect passkey. Please sign up.');
          setIsLoading(false);
        }

      } else {
        // --- SIGN UP LOGIC ---
        const userExists = existingUsers.find((user) => user.id === operatorId);

        if (userExists) {
          setErrorMsg('Operator ID already exists. Please log in.');
          setIsLoading(false);
        } else {
          // Save the new user to our mock database
          existingUsers.push({ id: operatorId, passkey: password });
          localStorage.setItem('polaris_users', JSON.stringify(existingUsers));
          
          onLogin(); // Log them in automatically after signing up
        }
      }
    }, 1500);
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100vh', width: '100vw', backgroundColor: '#0f172a', color: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px',
        border: '1px solid #334155', width: '100%', maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)' 
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '10px', textAlign: 'center' }}>
          hehehe
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          {isLoginMode ? ' Login to continue' : 'New user Registration.'}
        </p>

        {/* Error Message Display */}
        {errorMsg && (
          <div style={{
            backgroundColor: 'rgba(248, 113, 113, 0.1)', border: '1px solid #f87171',
            color: '#f87171', padding: '10px', borderRadius: '6px', marginBottom: '20px',
            fontSize: '0.85rem', textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Email ID
            </label>
            <input 
              required 
              type="text" 
              placeholder="Enter ID" 
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              style={{
                width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #334155',
                backgroundColor: '#0b1120', color: 'white', outline: 'none'
              }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>
             Password
            </label>
            <input 
              required 
              type="password" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              style={{
                width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #334155',
                backgroundColor: '#0b1120', color: 'white', outline: 'none'
              }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            style={{
              marginTop: '10px', padding: '14px', 
              backgroundColor: isLoading ? '#334155' : (isLoginMode ? '#0ea5e9' : '#4ade80'),
              color: isLoading ? '#94a3b8' : (isLoginMode ? 'white' : '#022c22'), 
              border: 'none', borderRadius: '6px',
              fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', 
              transition: 'background-color 0.2s'
          }}>
            {isLoading 
              ? 'Processing...' 
              : (isLoginMode ? ' Login' : 'Register ')}
          </button>
          
        </form>

        {/* Toggle between Login and Sign Up */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            type="button"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg(''); // clear errors when switching modes
            }}
            style={{
              background: 'transparent', border: 'none', color: '#94a3b8', 
              textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem'
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