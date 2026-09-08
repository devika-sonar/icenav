import PolarMap from '../PolarMap';
import InferenceOverlay from './InferenceOverlay';
import ActiveMissionOverlay from './ActiveMissionOverlay';

export default function MapContainer({
  activeService,
  forecastDay,
  isCalculating,
  hasActiveMission,
  startCoord,
  destCoord,
  onOpenMissionModal,
  onRecalculate
}) {
  return (
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <div style={{
        flexGrow: 1,
        backgroundColor: '#0b1120',
        borderRadius: '12px',
        padding: '4px',
        position: 'relative',
        height: '100%',
        minHeight: 0
      }}>
        {/* ML Inference Calculating Loader */}
        {isCalculating && <InferenceOverlay />}

        {/* Create New Mission Button (when no active mission in navigation view) */}
        {activeService === 'navigation' && !hasActiveMission && (
          <button
            onClick={onOpenMissionModal}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 20,
              backgroundColor: '#0284c7',
              color: 'white',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '6px',
              padding: '10px 16px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>+</span> Create New Mission
          </button>
        )}

        {/* Ongoing Mission Coordinates Box (Only shown when there is an active mission on Navigation tab) */}
        {activeService === 'navigation' && hasActiveMission && (
          <ActiveMissionOverlay
            startCoord={startCoord}
            destCoord={destCoord}
            onOpenMissionModal={onOpenMissionModal}
          />
        )}

        {/* Polar OpenLayers Map Component */}
        <PolarMap activeService={activeService} forecastDay={forecastDay} />

        {/* Recalculate Route Button */}
        <button
          onClick={onRecalculate}
          disabled={isCalculating}
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            zIndex: 20,
            padding: '10px 18px',
            backgroundColor: isCalculating ? '#1e2c45' : '#0284c7',
            color: isCalculating ? '#64748b' : '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '0.84rem',
            cursor: isCalculating ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.15s ease'
          }}
        >
          {isCalculating ? 'Computing...' : 'Recalculate Route'}
        </button>
      </div>
    </div>
  );
}
