// src/App.jsx
import DataTable from './components/DataTable';
import { useState, useEffect } from 'react';
import './App.css';
import PolarMap from './components/PolarMap';
import MetricCard from './components/MetricCard';


function App() {
  const [activeService, setActiveService] = useState('sea-ice');
  
  // NEW: State for the timeline slider and loading animation
  const [forecastDay, setForecastDay] = useState(0); 
  const [isCalculating, setIsCalculating] = useState(false);

  // NEW: Fake an API call whenever the active tab changes
  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      setIsCalculating(false);
    }, 1500); // 1.5 second fake loading time
    
    return () => clearTimeout(timer);
  }, [activeService]);

  // Handle the "Recalculate" button click
  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 2000);
  };

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h1>heheehe</h1>
        
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
          {/* 🧊  */}
          Iceberg Trajectories
        </button>
        <button 
          className={`nav-button ${activeService === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveService('navigation')}
        >
          {/* 🚢  */}
          Safe Routing
        </button>
      </aside>

      {/* CENTER CONTENT */}
      <main className="main-content">
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
  {activeService === 'sea-ice' && (
    <span style={{ color: '#8199b7' }}>Sea-Ice Concentration </span>
  )}
  {activeService === 'icebergs' && (
    <span style={{ color: '#8199b7' }}>Iceberg Trajectory</span>
  )}
  {activeService === 'navigation' && (
    <span style={{ color: '#8199b7' }}>Route Planner</span>
  )}
</h2>
          
          {/* NEW: Forecast Timeline Slider */}
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
          
          {/* Map Container */}
          <div style={{ flexGrow: 1, backgroundColor: '#0b1120', borderRadius: '12px', padding: '4px', position: 'relative' }}>
              
              {/* NEW: Loading Overlay over the Map */}
              {isCalculating && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(11, 17, 32, 0.7)',
                  zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center',
                  color: '#38bdf8', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '12px'
                }}>
                  Recentring
                </div>
              )}

              <PolarMap activeService={activeService} forecastDay={forecastDay} />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
            
            {activeService === 'sea-ice' && (
              <>
                {/* Notice how the value changes based on the slider! */}
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
              {isCalculating ? 'Computing...' : 'Recenter'}
            </button>
          </aside>

        </div>
      </main>
    </div>
  );
}

export default App;