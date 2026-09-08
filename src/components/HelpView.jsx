import { useState } from 'react';

const FAQS = [
  {
    q: 'How frequently is Antarctic Sea-Ice Concentration (SIC) data updated?',
    a: 'SIC satellite raster data is assimilated every 6 hours via Sentinel-1 SAR and AMSR2 microwave radiometry sensors. High-latitude orbits provide frequent coverage over the Drake Passage and Weddell/Ross Seas.'
  },
  {
    q: 'How does the Polar Stereographic Projection (EPSG:3031) work?',
    a: 'Standard Mercator projections distort high-latitude polar landmasses infinitely. The EPSG:3031 projection is mathematically centered at the true South Pole (-90° Lat) with true scale at -71°S, preserving geometric bearing accuracy for circumpolar routing.'
  },
  {
    q: 'What is the minimum safe standoff distance from tracked tabular icebergs?',
    a: 'Bridge regulations require a minimum 2.5 NM standoff in daylight with good visibility, and 4.0 NM during polar twilight or blizzard conditions to safeguard against subsurface underwater rams and calving debris.'
  },
  {
    q: 'Can the mission planner run offline during Iridium satellite blackout periods?',
    a: 'Yes. The ML inference engine caches the last 7-day numerical weather prediction and drift vectors locally in browser IndexedDB/LocalStorage. Pathfinding remains fully operational offline.'
  }
];

export default function HelpView() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      
      {/* FAQ / Manual Container */}
      <div style={{
        backgroundColor: '#111827',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '24px',
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 200px)'
      }}>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: '600', marginBottom: '6px' }}>
            Frequently Asked Questions (Operator FAQ)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.84rem', margin: 0 }}>
            Antarctic Iceberg Motion Suite operator guidelines and reference manuals.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#0b111e',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                overflow: 'hidden',
                transition: 'border-color 0.15s ease'
              }}
            >
              <div
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#f8fafc',
                  fontWeight: '500',
                  fontSize: '0.88rem'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: '600', marginLeft: '12px' }}>
                  {openFaq === idx ? '−' : '+'}
                </span>
              </div>
              
              {openFaq === idx && (
                <div style={{
                  padding: '0 18px 16px 18px',
                  color: '#94a3b8',
                  fontSize: '0.84rem',
                  lineHeight: '1.6',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
