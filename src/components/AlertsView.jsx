// src/components/AlertsView.jsx
import { useState } from 'react';
import AlertCard from './alerts/AlertCard';
import AlertDetailDrawer from './alerts/AlertDetailDrawer';

const INITIAL_ALERTS = [
  {
    id: 'ALT-8821',
    severity: 'critical',
    title: 'Severe Pack-Ice Convergence Warning',
    location: "68°14'S, 65°20'W (Marguerite Bay)",
    timestamp: '12 mins ago',
    source: 'Sentinel-1 SAR Satellite',
    description: 'Rapid ice convergence detected. Ridge compression pressure increasing rapidly. Immediate diversion recommended for vessels under Ice Class 1A.',
    acknowledged: false,
    recommendedAction: 'Shift heading 045° to avoid pressure ridge pinch-point.',
  },
  {
    id: 'ALT-8819',
    severity: 'critical',
    title: 'Accelerated Iceberg Drift Tracked (A-76A fragment)',
    location: "62°30'S, 58°45'W (Bransfield Strait)",
    timestamp: '34 mins ago',
    source: 'Doppler Radar & MODIS Thermal',
    description: 'Drift velocity increased to 2.4 knots due to subsurface katabatic currents. Projected CPA (Closest Point of Approach) is 1.1 NM in 3 hours.',
    acknowledged: false,
    recommendedAction: 'Reduce speed to 8 knots and maintain minimum 3.0 NM standoff.',
  },
  {
    id: 'ALT-8740',
    severity: 'info',
    title: 'Rothera Research Station Port Advisory',
    location: "67°34'S, 68°08'W (Adelaide Island)",
    timestamp: '4 hours ago',
    source: 'BAS Station Dispatch',
    description: 'Wharf crane maintenance in progress until 08:00 UTC. Berthing fairway clear with minor brash ice accumulation.',
    acknowledged: true,
    recommendedAction: 'Standard approach speed. Contact BAS Harbor Control on VHF Ch 16.',
  }
];

export default function AlertsView() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filterSeverity] = useState('all');
  const [filterStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [searchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleToggleAcknowledge = (id) => {
    setAlerts(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.acknowledged;
        showToast(nextState ? `Alert ${id} acknowledged` : `Alert ${id} marked active`);
        return { ...item, acknowledged: nextState };
      }
      return item;
    }));
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev.filter(item => item.id !== id));
    if (selectedAlert?.id === id) {
      setSelectedAlert(null);
    }
    showToast(`Alert ${id} cleared`);
  };

  const handleSimulateNewAlert = () => {
    const randomId = `ALT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAlert = {
      id: randomId,
      severity: 'critical',
      title: 'Sudden Katabatic Gale Detected (>55 kts)',
      location: "65°10'S, 64°05'W (Lemaire Channel)",
      timestamp: 'Just now',
      source: 'Autonomous Weather Buoy #19',
      description: 'Sudden katabatic wind surge descending from Antarctic Peninsula plateau. Severe visibility reduction and ice floe compaction imminent.',
      acknowledged: false,
      recommendedAction: 'Abort narrow passage transit; seek sheltered anchorage immediately.',
    };
    setAlerts([newAlert, ...alerts]);
    showToast('🚨 New critical alert triggered!');
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false;
    if (filterStatus === 'active' && a.acknowledged) return false;
    if (filterStatus === 'acknowledged' && !a.acknowledged) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'absolute', top: '-10px', right: '10px', zIndex: 100,
          backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px',
          borderRadius: '6px', fontSize: '0.82rem', fontWeight: '600',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)',
          animation: 'fadeIn 0.2s ease-in'
        }}>
          {toastMsg}
        </div>
      )}

      {/* Top Controls Bar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
        justifyContent: 'flex-end', backgroundColor: '#111827',
        padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.07)'
      }}>
        <button
          onClick={handleSimulateNewAlert}
          style={{
            backgroundColor: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)',
            color: '#f87171', padding: '8px 14px', borderRadius: '6px',
            fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <span>⚡</span> Simulate Live Sensor Threat
        </button>
      </div>

      {/* Main Alert List & Detail View */}
      <div style={{ display: 'flex', gap: '16px', flexGrow: 1, minHeight: '480px' }}>
        
        {/* Alerts Feed */}
        <div style={{
          flex: selectedAlert ? '1 1 55%' : '1 1 100%',
          display: 'flex', flexDirection: 'column', gap: '10px',
          overflowY: 'auto', maxHeight: 'calc(100vh - 220px)', paddingRight: '4px'
        }}>
          {filteredAlerts.length === 0 ? (
            <div style={{
              backgroundColor: '#111827', borderRadius: '10px', padding: '40px',
              textAlign: 'center', color: '#64748b', border: '1px dashed rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🛡️</div>
              <div style={{ fontWeight: '600', color: '#94a3b8', fontSize: '0.92rem' }}>No alerts match your current filter</div>
              <div style={{ fontSize: '0.82rem', marginTop: '4px', color: '#64748b' }}>All Antarctic navigational sectors are clear within chosen criteria.</div>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <AlertCard
                key={alert.id}
                alert={alert}
                isSelected={selectedAlert?.id === alert.id}
                onSelect={setSelectedAlert}
              />
            ))
          )}
        </div>

        {/* Selected Alert Detailed Drawer */}
        <AlertDetailDrawer
          selectedAlert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onToggleAcknowledge={handleToggleAcknowledge}
          onDismiss={handleDismiss}
        />
      </div>

    </div>
  );
}
