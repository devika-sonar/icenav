
import { useState, useEffect } from 'react';
import './App.css';
import PolarMap from './components/PolarMap';
import MetricCard from './components/MetricCard';
import DataTable from './components/DataTable';
import AlertsView from './components/AlertsView';
import HistoryView from './components/HistoryView';
import HelpView from './components/HelpView';
import Login from './components/login';
import LandingPage from './components/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeService, setActiveService] = useState('sea-ice');
  const [forecastDay, setForecastDay] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Navigation Coordinate States
  const [startCoord, setStartCoord] = useState('-60.00, -62.00');
  const [destCoord, setDestCoord] = useState('-75.00, -35.00');
  const [hasActiveMission, setHasActiveMission] = useState(false);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [modalStartCoord, setModalStartCoord] = useState('-60.00, -62.00');
  const [modalDestCoord, setModalDestCoord] = useState('-75.00, -35.00');

  // Current Vessel Location State
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

  const handleOpenMissionModal = () => {
    setModalStartCoord(startCoord || `${vesselLocation.lat}, ${vesselLocation.lon}`);
    setModalDestCoord(destCoord || '-75.00, -35.00');
    setIsMissionModalOpen(true);
  };

  const handleStartMission = (e) => {
    if (e) e.preventDefault();
    if (!modalStartCoord.trim() || !modalDestCoord.trim()) return;
    setStartCoord(modalStartCoord);
    setDestCoord(modalDestCoord);
    setHasActiveMission(true);
    setIsMissionModalOpen(false);
    handleRecalculate();
  };

 
  if (!isAuthenticated && showLogin) {
    return (
      <Login
        onLogin={() => {
          setIsAuthenticated(true);
          setShowLogin(false);
        }}
        onBack={() => setShowLogin(false)}
      />
    );
  }

 
  if (!isAuthenticated) {
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

 
  return (
    <div className="dashboard-container">
   
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <img 
            src="/aims-logo.png" 
            alt="AIMS" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          />
          <h1 style={{ margin: 0, fontSize: '1.2rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
            AIMS
          </h1>
        </div>

     
        <div style={{
          backgroundColor: '#0f172a', padding: '12px 15px', borderRadius: '8px',
          marginBottom: '16px', border: '1px solid #334155', flexShrink: 0
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '1px' }}>
            Current Position
          </div>
          <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.05rem' }}>
            {vesselLocation.lat}° S
          </div>
          <div style={{ color: '#4ade80', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.05rem' }}>
            {vesselLocation.lon}° W
          </div>
        </div>

        <button
          className={`nav-button ${activeService === 'sea-ice' ? 'active' : ''}`}
          onClick={() => setActiveService('sea-ice')}
        >
          Sea-Ice Forecast
        </button>
        <button
          className={`nav-button ${activeService === 'icebergs' ? 'active' : ''}`}
          onClick={() => setActiveService('icebergs')}
        >
          Iceberg Trajectories
        </button>
        <button
          className={`nav-button ${activeService === 'navigation' ? 'active' : ''}`}
          onClick={() => setActiveService('navigation')}
        >
          Mission Planner
        </button>
        <button
          className={`nav-button ${activeService === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveService('alerts')}
        >
          Alerts
        </button>
        <button
          className={`nav-button ${activeService === 'history' ? 'active' : ''}`}
          onClick={() => setActiveService('history')}
        >
          History
        </button>
        <button
          className={`nav-button ${activeService === 'help' ? 'active' : ''}`}
          onClick={() => setActiveService('help')}
        >
          Help
        </button>

        <button
          onClick={() => {
            setIsAuthenticated(false);
            setShowLogin(false);
          }}
          style={{
            marginTop: 'auto', width: '100%', padding: '12px', backgroundColor: 'transparent',
            color: '#ef4444', border: '1px solid #ef4444', borderRadius: '8px',
            cursor: 'pointer', fontWeight: 'bold', flexShrink: 0, minHeight: '42px',
            transition: 'background-color 0.2s'
          }}>
          Logout
        </button>
      </aside>

     
      <main className="main-content">
        <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
            {activeService === 'sea-ice' && <span style={{ color: '#f8fafc' }}>Sea-Ice Concentration (SIC)</span>}
            {activeService === 'icebergs' && <span style={{ color: '#22d3ee' }}>Iceberg Collision Avoidance</span>}
            {activeService === 'navigation' && <span style={{ color: '#4ade80' }}>Multi-Objective Route Planner</span>}
            {activeService === 'alerts' && <span style={{ color: '#f87171' }}>System Alerts & Hazards</span>}
            {activeService === 'history' && <span style={{ color: '#a78bfa' }}> Mission History</span>}
            {activeService === 'help' && <span style={{ color: '#38bdf8' }}>Operator Manual & Help Guide</span>}
          </h2>

          {(activeService === 'sea-ice' || activeService === 'icebergs' || activeService === 'navigation') && (
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
          )}
        </header>

        {/* Conditional views for alerts, history, help */}
        {activeService === 'alerts' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <AlertsView />
          </div>
        )}

        {activeService === 'history' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <HistoryView />
          </div>
        )}

        {activeService === 'help' && (
          <div style={{ flexGrow: 1, overflowY: 'auto' }}>
            <HelpView />
          </div>
        )}

        {(activeService === 'sea-ice' || activeService === 'icebergs' || activeService === 'navigation') && (
          <div style={{ flexGrow: 1, display: 'flex', gap: '20px', minHeight: 0, height: '100%' }}>

         
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>

             
              <div style={{ flexGrow: 1, backgroundColor: '#0b1120', borderRadius: '12px', padding: '4px', position: 'relative', height: '100%', minHeight: 0 }}>

                {isCalculating && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(11, 17, 32, 0.7)',
                    zIndex: 30, display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: '#38bdf8', fontSize: '1rem', fontWeight: '600', letterSpacing: '0.02em'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        display: 'inline-block', width: '8px', height: '8px',
                        borderRadius: '50%', backgroundColor: '#38bdf8',
                        animation: 'pulseSubtle 1.5s infinite ease-in-out'
                      }} />
                      Running ML Inference...
                    </div>
                  </div>
                )}

                
                {activeService === 'navigation' && !hasActiveMission && (
                  <button
                    onClick={handleOpenMissionModal}
                    style={{
                      position: 'absolute', top: '16px', left: '16px', zIndex: 20,
                      backgroundColor: '#0284c7', color: 'white',
                      border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '6px',
                      padding: '10px 16px', fontWeight: '600', fontSize: '0.85rem',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>+</span> Create New Mission
                  </button>
                )}

                {/* Ongoing Mission Coordinates Box (Only shown when there is an active mission on Navigation tab) */}
                {activeService === 'navigation' && hasActiveMission && (
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px', zIndex: 20,
                    backgroundColor: 'rgba(17, 24, 39, 0.94)', backdropFilter: 'blur(10px)',
                    padding: '14px 16px', borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)', border: '1px solid rgba(255, 255, 255, 0.08)',
                    width: '300px', display: 'flex', flexDirection: 'column', gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#34d399', boxShadow: '0 0 6px #34d399' }}></span>
                        <span style={{ color: '#34d399', fontSize: '0.74rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Ongoing Mission
                        </span>
                      </div>
                      <button
                        onClick={handleOpenMissionModal}
                        style={{
                          background: 'transparent', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8',
                          padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        New Mission
                      </button>
                    </div>

                   
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0b111e', padding: '8px 10px', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', flexShrink: 0 }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#64748b', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: '500' }}>Source Coordinates</span>
                        <span style={{ color: '#f8fafc', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: '600' }}>{startCoord}</span>
                      </div>
                    </div>

                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0b111e', padding: '8px 10px', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f87171', flexShrink: 0 }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#64748b', fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: '500' }}>Destination Coordinates</span>
                        <span style={{ color: '#f8fafc', fontSize: '0.82rem', fontFamily: 'monospace', fontWeight: '600' }}>{destCoord}</span>
                      </div>
                    </div>
                  </div>
                )}

                <PolarMap activeService={activeService} forecastDay={forecastDay} />

                <button
                  onClick={handleRecalculate}
                  disabled={isCalculating}
                  style={{
                    position: 'absolute', bottom: '16px', right: '16px', zIndex: 20,
                    padding: '10px 18px', backgroundColor: isCalculating ? '#1e2c45' : '#0284c7',
                    color: isCalculating ? '#64748b' : '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px', fontWeight: '600', fontSize: '0.84rem',
                    cursor: isCalculating ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.15s ease'
                  }}>
                  {isCalculating ? 'Computing...' : 'Recalculate Route'}
                </button>
              </div>
            </div>

{/*  right sidebar */}
            <aside style={{
              width: '400px',
              minWidth: '360px',
              maxWidth: '430px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              overflowY: 'auto',
              paddingRight: '2px',
              height: '100%'
            }}>

          
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flexShrink: 0 }}>
                {activeService === 'sea-ice' && (
                  <>
                    <MetricCard title="Avg Ice Conc." value={78 + forecastDay} unit="%" status="warning" />
                    <MetricCard title="Confidence" value={92 - (forecastDay * 2)} unit="%" status={forecastDay > 4 ? 'warning' : 'good'} />
                  </>
                )}

                {activeService === 'icebergs' && (
                  <>
                    <MetricCard title="Tracked Icebergs" value="4" unit="Targets" status="neutral" />
                    <MetricCard title="Collision Threat" value={forecastDay > 2 ? 'High' : 'Elevated'} unit="" status={forecastDay > 2 ? 'danger' : 'warning'} />
                  </>
                )}

                {activeService === 'navigation' && (
                  <>
                    <MetricCard title="Fuel Saved" value="14.5" unit="tons" status="good" />
                    <MetricCard title="Safety Score" value={98 - forecastDay} unit="/100" status="good" />
                  </>
                )}
              </div>

             
              <div style={{ flexGrow: 1, minHeight: 0 }}>
                <DataTable activeService={activeService} />
              </div>

            </aside>
          </div>
        )}
      </main>

      {/* CREATE NEW MISSION MODAL POPUP */}
      {isMissionModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(9, 13, 22, 0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px',
            padding: '24px', width: '100%', maxWidth: '440px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.05rem', fontWeight: '600' }}>
                Create New Mission
              </h3>
              <button
                onClick={() => setIsMissionModalOpen(false)}
                style={{
                  background: 'transparent', border: 'none', color: '#64748b',
                  fontSize: '1.1rem', cursor: 'pointer', padding: '4px',
                  lineHeight: 1
                }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '18px', lineHeight: '1.4' }}>
              Enter the waypoint coordinates for your Antarctic transit route.
            </p>

            <form onSubmit={handleStartMission} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '500' }}>
                    Source Coordinates (Lat, Lon)
                  </label>
                  <button
                    type="button"
                    onClick={() => setModalStartCoord(`${vesselLocation.lat}, ${vesselLocation.lon}`)}
                    style={{
                      background: 'transparent', border: 'none', color: '#38bdf8',
                      fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'none'
                    }}
                  >
                    Use Current Vessel Position
                  </button>
                </div>
                <input
                  type="text"
                  value={modalStartCoord}
                  onChange={(e) => setModalStartCoord(e.target.value)}
                  placeholder="e.g. -60.00, -62.00"
                  required
                  style={{
                    width: '100%', backgroundColor: '#0b111e', border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc', padding: '9px 12px', borderRadius: '6px',
                    fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace'
                  }}
                />
              </div>

              <div>
                <label style={{ color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                  Destination Coordinates (Lat, Lon)
                </label>
                <input
                  type="text"
                  value={modalDestCoord}
                  onChange={(e) => setModalDestCoord(e.target.value)}
                  placeholder="e.g. -75.00, -35.00"
                  required
                  style={{
                    width: '100%', backgroundColor: '#0b111e', border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc', padding: '9px 12px', borderRadius: '6px',
                    fontSize: '0.85rem', outline: 'none', fontFamily: 'monospace'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setIsMissionModalOpen(false)}
                  style={{
                    flex: 1, padding: '9px 14px', backgroundColor: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', borderRadius: '6px',
                    fontWeight: '500', cursor: 'pointer', fontSize: '0.85rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2, padding: '9px 14px', backgroundColor: '#0284c7',
                    border: 'none', color: '#ffffff', borderRadius: '6px',
                    fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                  }}
                >
                  Start Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;