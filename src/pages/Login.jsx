import { useState } from 'react';
import { useAppStore } from '../store';
import { User, Heart, ArrowRight, Lock } from 'lucide-react';
import { LANGUAGES, speakKey, t } from '../i18n';

export default function Login() {
  const storedLanguage = useAppStore((state) => state.language);
  const [role, setRoleState] = useState('patient');
  const [language, setLanguageState] = useState(storedLanguage || 'en');
  const [username, setUsernameState] = useState('');
  const [age, setAgeState] = useState('');
  const [number, setNumber] = useState('');

  const setRole = useAppStore((state) => state.setRole);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setUsername = useAppStore((state) => state.setUsername);
  const setAge = useAppStore((state) => state.setAge);
  const setEmergencyNumber = useAppStore((state) => state.setEmergencyNumber);

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
    <div className="page-container" style={{ justifyContent: 'center' }}>
      {/* Top Header Badges */}
      <div className="top-header-row">
        <div className="pill-badge pill-badge-magenta">
          WELCOME ABOARD
        </div>
        <div className="pill-badge pill-badge-greeting">
          <span className="dot-indicator"></span> Ready to start ✨
        </div>
      </div>

      {/* User Profile Avatar with Online Dot */}
      <div className="avatar-container">
        <User size={36} color="#db2777" strokeWidth={2.2} />
        <div className="avatar-online-dot"></div>
      </div>

      {/* Welcome Heading */}
      <div className="welcome-header">
        <h1>{t(language, 'welcome')}</h1>
        <p>{t(language, 'enterDetails')}</p>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="card">
        {/* Language Selection */}
        <label className="form-section-label">{t(language, 'language')}</label>
        <div className="grid-2x2">
          {LANGUAGES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`option-btn ${language === item.id ? 'active' : ''}`}
              onClick={() => chooseLanguage(item.id)}
            >
              {item.native}
            </button>
          ))}
        </div>

        {/* Role Selection */}
        <label className="form-section-label">{t(language, 'iAmA')}</label>
        <div className="grid-2x2">
          <button
            type="button"
            className={`option-btn ${role === 'patient' ? 'active' : ''}`}
            onClick={() => setRoleState('patient')}
          >
            <User size={20} />
            {t(language, 'patient')}
          </button>
          <button
            type="button"
            className={`option-btn ${role === 'caretaker' ? 'active' : ''}`}
            onClick={() => setRoleState('caretaker')}
          >
            <Heart size={20} color={role === 'caretaker' ? '#ffffff' : '#e11d48'} />
            {t(language, 'caretaker')}
          </button>
        </div>

        {/* Name Input */}
        <div className="input-group">
          <label className="form-section-label">{t(language, 'name')}</label>
          <input
            type="text"
            className="pill-input"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
            placeholder={t(language, 'namePlaceholder')}
            required
          />
        </div>

        {role === 'patient' && (
          <>
            {/* Age Input */}
            <div className="input-group">
              <label className="form-section-label">{t(language, 'age')}</label>
              <input
                type="number"
                className="pill-input"
                value={age}
                onChange={(e) => setAgeState(e.target.value)}
                placeholder={t(language, 'agePlaceholder')}
                required
              />
            </div>

            {/* Emergency Contact Input */}
            <div className="input-group">
              <label className="form-section-label">{t(language, 'emergency')}</label>
              <input
                type="tel"
                className="pill-input"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder={t(language, 'emergencyPlaceholder')}
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn-primary-gradient">
          <span>{role === 'caretaker' ? t(language, 'caretakerContinue') : t(language, 'continue')}</span>
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </form>

      {/* Security Footer */}
      <div className="security-note">
        <Lock size={16} strokeWidth={2.5} color="#9333ea" />
        <span>Your health details remain private & secure</span>
      </div>
    </div>
  );
}
