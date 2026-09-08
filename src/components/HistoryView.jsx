import { useState } from 'react';

const INITIAL_VOYAGES = [
  {
    id: 'VOY-2026-08D',
    vessel: 'M/V Endurance II',
    route: 'King George Island → McMurdo Sound',
    departure: '2026-08-14',
    arrival: '2026-08-22',
    status: 'Completed',
    distanceNM: 2890,
    fuelSavedTons: 32.1,
    iceEncounterCount: 29,
    avgSpeedKnots: 10.4,
    maxIceConc: '91%',
    captain: 'Capt. A. Ronne',
    notes: 'Heavy multi-year pack ice encountered near Ross Ice Shelf. Icebreaker escort rendezvous accomplished on schedule.'
  },
  {
    id: 'VOY-2026-08B',
    vessel: 'R/V Aurora Australis',
    route: 'Hobart → Casey Station',
    departure: '2026-08-01',
    arrival: '2026-08-09',
    status: 'Completed',
    distanceNM: 1850,
    fuelSavedTons: 22.0,
    iceEncounterCount: 18,
    avgSpeedKnots: 12.1,
    maxIceConc: '75%',
    captain: 'Capt. M. Hurley',
    notes: 'Smooth transit across Southern Ocean. Zero hull stress exceedance alerts triggered during entire voyage.'
  }
];

export default function HistoryView() {
  const [voyages] = useState(INITIAL_VOYAGES);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.25)', text: '#34d399' };
      case 'In Transit':
        return { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.25)', text: '#38bdf8' };
      case 'Diverted':
        return { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.25)', text: '#fbbf24' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.25)', text: '#94a3b8' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      
      {/* Main Table View */}
      <div style={{
        backgroundColor: '#111827',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}>
        <div style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#0c121e', position: 'sticky', top: 0, zIndex: 5 }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Voyage ID</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Vessel</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Route</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Status</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Fuel Saved</th>
                <th style={{ textAlign: 'center', padding: '12px 16px', color: '#94a3b8', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {voyages.map(voyage => {
                const badge = getStatusBadge(voyage.status);

                return (
                  <tr
                    key={voyage.id}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      transition: 'background-color 0.15s'
                    }}
                  >
                    <td style={{ padding: '12px 16px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '600' }}>
                      {voyage.id}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#f8fafc', fontWeight: '500' }}>
                      {voyage.vessel}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#cbd5e1' }}>
                      {voyage.route}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        backgroundColor: badge.bg, color: badge.text,
                        border: `1px solid ${badge.border}`, padding: '2px 8px',
                        borderRadius: '4px', fontSize: '0.72rem', fontWeight: '600'
                      }}>
                        {voyage.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#34d399', fontWeight: '600', fontFamily: 'monospace' }}>
                      +{voyage.fuelSavedTons} t
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        disabled
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          color: '#64748b',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.74rem',
                          cursor: 'default',
                          fontWeight: '500',
                          pointerEvents: 'none'
                        }}
                      >
                        Show Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
