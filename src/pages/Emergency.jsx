import { Phone } from 'lucide-react';
import { useAppStore } from '../store';
import { t } from '../i18n';

export default function Emergency() {
  const emergencyNumber = useAppStore(state => state.emergencyNumber);
  const language = useAppStore(state => state.language) || 'en';

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={{ color: 'var(--primary-color)' }}>{t(language, 'emergencyTitle') || 'Emergency'}</h1>
      <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: '#666' }}>
        {t(language, 'emergencyDesc') || 'Tap the button below to call your emergency contact.'}
      </p>

      {emergencyNumber ? (
        <a 
          href={`tel:${emergencyNumber}`} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            background: 'var(--accent-color)',
            color: 'white',
            padding: '2rem 3rem',
            borderRadius: '50px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 8px 16px rgba(239,68,68,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Phone size={40} />
          <span>{t(language, 'callNow') || 'Call Now'}</span>
        </a>
      ) : (
        <div className="card" style={{ padding: '2rem', background: '#ffebee', color: '#c62828' }}>
          No emergency contact number configured.
        </div>
      )}
    </div>
  );
}
