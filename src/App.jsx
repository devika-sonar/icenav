// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import PolarMap from './components/PolarMap';
import MetricCard from './components/MetricCard';
import DataTable from './components/DataTable';
import Login from './components/login';

function App() {
  // 1. All our State Variables (This is what was giving you red lines!)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeService, setActiveService] = useState('sea-ice');
  const [forecastDay, setForecastDay] = useState(0); 
  const [isCalculating, setIsCalculating] = useState(false);

  // 2. Fake API loading effect when tabs change
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 1500);
    return () => clearTimeout(timer);
  }, [activeService]);

  // 3. Fake API loading when button clicked
  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 2000);
  };

  // 4. THE GATEKEEPER: If not logged in, show Login Screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // 5. THE MAIN DASHBOARD: Runs only if authenticated
  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h1>Polaris Nav System</h1>
        
        <button 
          className={`nav-button ${activeService === 'sea-ice' ? 'active' : ''}`}
          onClick={() => setActiveService('sea-ice')}
        >
          ❄️ Sea-Ice Forecast
        </button>
        <button 
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          🧊 Iceberg Trajectories
        </button>
        <button 
          className={`nav-button ${activeService === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveService('navigation')}
        >
          🚢 Safe Routing
        </button>
      </aside>

      {/* CENTER CONTENT */}
      <main className="main-content">
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
            {activeService === 'sea-ice' && (
              <span style={{ color: '#f8fafc' }}>Sea-Ice Concentration (SIC)</span>
            )}
            {activeService === 'icebergs' && (
              <span style={{ color: '#22d3ee' }}>Iceberg Collision Avoidance</span>
            )}
            {activeService === 'navigation' && (
              <span style={{ color: '#4ade80' }}>Multi-Objective Route Planner</span>
            )}
          </h2>
          
          {/* Forecast Timeline Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Forecast: <strong>{forecastDay === 0 ? 'Today' : `+${forecastDay} Days`}</strong>
            </label>
            <input 
              type="range" 
              min="0" 
              max="7" 
              value={forecastDay}
              onChange={(e) => setForecastDay(parseInt(e.target.value))}
              disabled={isCalculating}
              style={{ cursor: isCalculating ? 'not-allowed' : 'pointer' }}
            />
          </div>
        </header>

        <div style={{ flexGrow: 1, display: 'flex', gap: '20px' }}>
          
          {/* MAP & TABLE CONTAINER (Left Side) */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Map Area */}
            <div style={{ flexGrow: 1, backgroundColor: '#0b1120', borderRadius: '12px', padding: '4px', position: 'relative', minHeight: '400px' }}>
                
                {/* Loading Overlay */}
                {isCalculating && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(11, 17, 32, 0.7)',
                    zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: '#38bdf8', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '12px'
                  }}>
                    Running ML Inference...
                  </div>
                )}

                <PolarMap activeService={activeService} forecastDay={forecastDay} />
            </div>

            {/* Data Table Area */}
            <DataTable activeService={activeService} />
          </div>

          {/* RIGHT SIDEBAR (Data Metrics) */}
          <aside style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
            
            {activeService === 'sea-ice' && (
              <>
                <MetricCard title="Avg Ice Concentration" value={78 + forecastDay} unit="%" status="warning" />
                <MetricCard title="Forecast Confidence" value={92 - (forecastDay * 2)} unit="%" status={forecastDay > 4 ? 'warning' : 'good'} />
              </>
            )}

            {activeService === 'icebergs' && (
              <>
                <MetricCard title="Active Icebergs Tracked" value="4" unit="Targets" status="neutral" />
                <MetricCard title="Collision Threat Level" value={forecastDay > 2 ? 'High' : 'Elevated'} unit="" status={forecastDay > 2 ? 'danger' : 'warning'} />
              </>
            )}

            {activeService === 'navigation' && (
              <>
                <MetricCard title="Estimated Fuel Saved" value="14.5" unit="tons" status="good" />
                <MetricCard title="Route Safety Score" value={98 - forecastDay} unit="/100" status="good" />
              </>
            )}

            <button 
              onClick={handleRecalculate}
              disabled={isCalculating}
              style={{
                marginTop: 'auto', padding: '16px', backgroundColor: isCalculating ? '#334155' : '#0ea5e9',
                color: isCalculating ? '#94a3b8' : 'white', border: 'none', borderRadius: '8px',
                fontWeight: 'bold', cursor: isCalculating ? 'not-allowed' : 'pointer'
            }}>
              {isCalculating ? 'Computing...' : 'Recalculate ML Model'}
            </button>
            
            {/* NEW: Logout Button just in case! */}
            <button 
              onClick={() => setIsAuthenticated(false)}
              style={{
                marginTop: '10px', padding: '10px', backgroundColor: 'transparent',
                color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px',
                cursor: 'pointer'
            }}>
              Logout Operator
            </button>

          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;