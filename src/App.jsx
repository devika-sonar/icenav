// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import PolarMap from './components/PolarMap';
import MetricCard from './components/MetricCard';
import DataTable from './components/DataTable';
import Login from './components/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeService, setActiveService] = useState('sea-ice');
  const [forecastDay, setForecastDay] = useState(0); 
  const [isCalculating, setIsCalculating] = useState(false);

  // NEW: Navigation Coordinate States
  const [startCoord, setStartCoord] = useState('-60.00, -62.00');
  const [destCoord, setDestCoord] = useState('-75.00, -35.00');
  
  // NEW: Current Vessel Location State
  const [vesselLocation] = useState({ lat: '-61.24', lon: '-59.10' });

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => setIsCalculating(false), 1500);
    return () => clearTimeout(timer);
  }, [activeService]);

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 2000);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h1>hehehehe</h1>

        {/* NEW: Live Vessel Location Widget */}
        <div style={{
          backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', 
          marginBottom: '25px', border: '1px solid #334155'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
            {/* 📡  */}
            Current Position
          </div>
          <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem' }}>
            {vesselLocation.lat}° S
          </div>
          <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.1rem' }}>
            {vesselLocation.lon}° W
          </div>
        </div>
        
        <button 
          className={`nav-button ${activeService === 'sea-ice' ? 'active' : ''}`}
          onClick={() => setActiveService('sea-ice')}
        >
          {/* ❄️  */}
          Sea-Ice Forecast
        </button>
        <button 
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          {/* 🧊 */}
           Iceberg Trajectories
        </button>
        <button 
          className={`nav-button ${activeService === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveService('navigation')}
        >
          {/* 🚢 */}
           Mission Planner
        </button>
         <button 
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          {/* 🧊 */}
           Alerts
        </button>
         <button 
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          {/* 🧊 */}
           History
        </button>
         <button 
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          {/* 🧊 */}
           Help
        </button>

        <button 
          onClick={() => setIsAuthenticated(false)}
          style={{
            marginTop: 'auto', width: '100%', padding: '12px', backgroundColor: 'transparent',
            color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold'
        }}>
          Logout
        </button>
      </aside>

      {/* CENTER CONTENT */}
      <main className="main-content">
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
            {activeService === 'sea-ice' && <span style={{ color: '#f8fafc' }}>Sea-Ice Concentration (SIC)</span>}
            {activeService === 'icebergs' && <span style={{ color: '#22d3ee' }}>Iceberg Collision Avoidance</span>}
            {activeService === 'navigation' && <span style={{ color: '#4ade80' }}>Multi-Objective Route Planner</span>}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#1e293b', padding: '10px 20px', borderRadius: '8px' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Forecast: <strong>{forecastDay === 0 ? 'Today' : `+${forecastDay} Days`}</strong>
            </label>
            <input 
              type="range" min="0" max="7" value={forecastDay}
              onChange={(e) => setForecastDay(parseInt(e.target.value))}
              disabled={isCalculating}
              style={{ cursor: isCalculating ? 'not-allowed' : 'pointer' }}
            />
          </div>
        </header>

        <div style={{ flexGrow: 1, display: 'flex', gap: '20px' }}>
          
          {/* MAP & TABLE CONTAINER */}
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* Map Area */}
            <div style={{ flexGrow: 1, backgroundColor: '#0b1120', borderRadius: '12px', padding: '4px', position: 'relative', minHeight: '400px' }}>
                
                {isCalculating && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(11, 17, 32, 0.7)',
                    zIndex: 30, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: '#38bdf8', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '12px'
                  }}>
                    Running ML Inference...
                  </div>
                )}

                {/* NEW: Google Maps Style Routing Inputs (Only shows on Navigation tab) */}
                {activeService === 'navigation' && (
                  <div style={{
                    position: 'absolute', top: '20px', left: '20px', zIndex: 20,
                    backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6)', border: '1px solid #334155',
                    width: '300px', display: 'flex', flexDirection: 'column', gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #38bdf8' }}></div>
                      <input 
                        type="text" value={startCoord} onChange={(e) => setStartCoord(e.target.value)}
                        placeholder="Start Coordinates (Lat, Lon)"
                        disabled={isCalculating}
                        style={{ flexGrow: 1, backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>
                    
                    {/* Vertical connecting line design */}
                    <div style={{ width: '2px', height: '10px', backgroundColor: '#334155', marginLeft: '5px', marginTop: '-6px', marginBottom: '-6px' }}></div>
                    <div style={{ width: '2px', height: '10px', backgroundColor: '#334155', marginLeft: '5px', marginTop: '-6px', marginBottom: '-6px' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                      <input 
                        type="text" value={destCoord} onChange={(e) => setDestCoord(e.target.value)}
                        placeholder="Destination Coordinates (Lat, Lon)"
                        disabled={isCalculating}
                        style={{ flexGrow: 1, backgroundColor: '#0f172a', border: '1px solid #334155', color: 'white', padding: '10px', borderRadius: '4px', fontSize: '0.85rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                <PolarMap activeService={activeService} forecastDay={forecastDay} />

                <button 
                  onClick={handleRecalculate}
                  disabled={isCalculating}
                  style={{
                    position: 'absolute', bottom: '20px', right: '20px', zIndex: 20,
                    padding: '12px 24px', backgroundColor: isCalculating ? '#334155' : '#0ea5e9',
                    color: isCalculating ? '#94a3b8' : 'white', border: 'none', borderRadius: '8px',
                    fontWeight: 'bold', cursor: isCalculating ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5)' 
                }}>
                  {isCalculating ? 'Computing...' : 'Recalculate Route'}
                </button>
            </div>

            {/* Data Table Area */}
            <DataTable activeService={activeService} />
          </div>

          {/* RIGHT SIDEBAR */}
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

          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;