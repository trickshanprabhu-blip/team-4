import { useState } from 'react';
import { useAppStore } from '../store';
import { User, HeartHandshake } from 'lucide-react';
import { LANGUAGES, speakKey, t } from '../i18n';

export default function Login() {
  const storedLanguage = useAppStore((state) => state.language);
  const [role, setRoleState] = useState('patient');
  const [language, setLanguageState] = useState(storedLanguage || 'en');
  const [username, setUsernameState] = useState('');
  const [age, setAgeState] = useState('');
  const [number, setNumber] = useState('');
  
  const setRole = useAppStore(state => state.setRole);
  const setLanguage = useAppStore(state => state.setLanguage);
  const setUsername = useAppStore(state => state.setUsername);
  const setAge = useAppStore(state => state.setAge);
  const setEmergencyNumber = useAppStore(state => state.setEmergencyNumber);

  const chooseLanguage = (id) => {
    setLanguageState(id);
    setLanguage(id);
    speakKey(id, 'speakSelected');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    if (role === 'patient' && number.length < 7) return;

    setLanguage(language);
    setRole(role);
    setUsername(username.trim());
    setAge(age);
    setEmergencyNumber(role === 'caretaker' ? 'caretaker' : number);
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', paddingBottom: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <User size={48} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
        <h1>{t(language, 'welcome')}</h1>
        <p style={{ color: 'var(--text-muted)' }}>{t(language, 'enterDetails')}</p>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t(language, 'language')}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`btn ${language === item.id ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => chooseLanguage(item.id)}
            >
              {item.native}
            </button>
          ))}
        </div>

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t(language, 'iAmA')}</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <button
            type="button"
            className={`btn ${role === 'patient' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setRoleState('patient')}
          >
            <User size={20} />
            {t(language, 'patient')}
          </button>
          <button
            type="button"
            className={`btn ${role === 'caretaker' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setRoleState('caretaker')}
          >
            <HeartHandshake size={20} />
            {t(language, 'caretaker')}
          </button>
        </div>

        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t(language, 'name')}</label>
        <input 
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsernameState(e.target.value)}
          placeholder={t(language, 'namePlaceholder')}
          required
        />
        
        {role === 'patient' && (
          <>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t(language, 'age')}</label>
            <input 
              type="number"
              className="input-field"
              value={age}
              onChange={(e) => setAgeState(e.target.value)}
              placeholder={t(language, 'agePlaceholder')}
              required
            />

            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t(language, 'emergency')}</label>
            <input 
              type="tel"
              className="input-field"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder={t(language, 'emergencyPlaceholder')}
              required
            />
          </>
        )}
        <button type="submit" className="btn btn-primary">
          {role === 'caretaker' ? t(language, 'caretakerContinue') : t(language, 'continue')}
        </button>
      </form>
    </div>
  );
}
