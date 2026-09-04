// src/components/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on submit
    setIsLoading(true);
    
    // Simulate a secure network request to an authentication server
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Tell App.jsx that the user successfully logged in
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
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)' // Gives the card a floating effect
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '10px', textAlign: 'center' }}>
          Polaris Nav System
        </h2>
        <p style={{ color: '#94a3b8', marginBottom: '30px', textAlign: 'center', fontSize: '0.9rem' }}>
          Restricted Access. Enter operator credentials.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Operator ID / Email
            </label>
            <input 
              required 
              type="text" 
              placeholder="Enter ID" 
              style={{
                width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #334155',
                backgroundColor: '#0b1120', color: 'white', outline: 'none'
              }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>
              Security Passkey
            </label>
            <input 
              required 
              type="password" 
              placeholder="••••••••" 
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
              backgroundColor: isLoading ? '#334155' : '#0ea5e9',
              color: isLoading ? '#94a3b8' : 'white', 
              border: 'none', borderRadius: '6px',
              fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer', 
              transition: 'background-color 0.2s'
          }}>
            {isLoading ? 'Authenticating...' : 'Initialize Session'}
          </button>
          
        </form>
      </div>
    </div>
  );
}