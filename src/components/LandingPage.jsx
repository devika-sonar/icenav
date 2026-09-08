import LandingHero from './landing/LandingHero';
import LandingFeatures from './landing/LandingFeatures';
import LandingFooter from './landing/LandingFooter';

export default function LandingPage({ onLoginClick }) {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#090d16',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }}>
      <LandingHero onLoginClick={onLoginClick} />
      <LandingFeatures />
      <LandingFooter onLoginClick={onLoginClick} />
    </div>
  );
}
