import { Phone, ShieldAlert, HeartHandshake } from 'lucide-react';
import { useAppStore } from '../store';
import { t } from '../i18n';

export default function Emergency() {
  const emergencyNumber = useAppStore((state) => state.emergencyNumber);
  const language = useAppStore((state) => state.language) || 'en';
  const username = useAppStore((state) => state.username);
  const displayName = username ? username.toLowerCase() : 'friend';

  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      {/* Top Header Badges */}
      <div className="top-header-row">
        <div className="pill-badge pill-badge-magenta">
          SAFETY & SOS
        </div>
        <div className="pill-badge pill-badge-greeting">
          <span className="dot-indicator"></span> Hi, {displayName} ✨
        </div>
      </div>

      <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: '#fee2e2',
          border: '2px solid #fca5a5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: '0 6px 18px rgba(239, 68, 68, 0.2)'
        }}>
          <ShieldAlert size={40} color="#dc2626" />
        </div>
        <h1>{t(language, 'emergencyTitle') || 'Emergency SOS'}</h1>
        <p style={{ maxWidth: '300px', margin: '0.5rem auto 0' }}>
          {t(language, 'emergencyDesc') || 'Tap the button below to call your emergency contact immediately.'}
        </p>
      </div>

      {emergencyNumber ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <a
            href={`tel:${emergencyNumber}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              color: 'white',
              width: '100%',
              maxWidth: '320px',
              height: '64px',
              borderRadius: '9999px',
              fontSize: '1.25rem',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 12px 28px -4px rgba(225, 29, 72, 0.45)',
              transition: 'all 0.2s',
            }}
          >
            <Phone size={28} strokeWidth={2.5} />
            <span>{t(language, 'callNow') || 'Call Now'}</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
            <HeartHandshake size={18} color="#db2777" />
            <span>Contact: {emergencyNumber}</span>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '1.5rem', background: '#fff1f2', color: '#be123c', border: '1.5px solid #fecdd3' }}>
          No emergency contact number configured yet.
        </div>
      )}
    </div>
  );
}
