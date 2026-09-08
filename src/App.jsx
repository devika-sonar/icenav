import { useState } from 'react';
import './App.css';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MetricsSidebar from './components/layout/MetricsSidebar';

// Mission & Map Components
import MapContainer from './components/mission/MapContainer';
import CreateMissionModal from './components/mission/CreateMissionModal';

// Views & Authentication
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

  const handleSelectService = (service) => {
    setActiveService(service);
    if (['sea-ice', 'icebergs', 'navigation'].includes(service)) {
      setIsCalculating(true);
      setTimeout(() => setIsCalculating(false), 1500);
    }
  };

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
  };

  // Login View
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

  // Landing Page View
  if (!isAuthenticated) {
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  const isMapService = ['sea-ice', 'icebergs', 'navigation'].includes(activeService);

  return (
    <div className="dashboard-container">
      {/* Left Navigation Sidebar */}
      <Sidebar
        vesselLocation={vesselLocation}
        activeService={activeService}
        setActiveService={handleSelectService}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Top Header Bar */}
        <Header
          activeService={activeService}
          forecastDay={forecastDay}
          setForecastDay={setForecastDay}
          isCalculating={isCalculating}
        />

        {/* Conditional Full-Page Views */}
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

        {/* Map & Telemetry Dashboard View */}
        {isMapService && (
          <div style={{ flexGrow: 1, display: 'flex', gap: '20px', minHeight: 0, height: '100%' }}>
            <MapContainer
              activeService={activeService}
              forecastDay={forecastDay}
              isCalculating={isCalculating}
              hasActiveMission={hasActiveMission}
              startCoord={startCoord}
              destCoord={destCoord}
              onOpenMissionModal={handleOpenMissionModal}
              onRecalculate={handleRecalculate}
            />

            <MetricsSidebar
              activeService={activeService}
              forecastDay={forecastDay}
            />
          </div>
        )}
      </main>

      {/* Create New Mission Modal Dialog */}
      <CreateMissionModal
        isOpen={isMissionModalOpen}
        onClose={() => setIsMissionModalOpen(false)}
        startCoord={modalStartCoord}
        setStartCoord={setModalStartCoord}
        destCoord={modalDestCoord}
        setDestCoord={setModalDestCoord}
        vesselLocation={vesselLocation}
        onStartMission={handleStartMission}
      />
    </div>
  );
}

export default App;