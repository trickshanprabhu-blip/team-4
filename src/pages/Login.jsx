import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store';
import { User, Heart, ArrowRight, Lock, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { LANGUAGES, speakKey, t } from '../i18n';

export default function Login() {
  const storedLanguage = useAppStore((state) => state.language);
  const [role, setRoleState] = useState('patient');
  const [language, setLanguageState] = useState(storedLanguage || 'en');
  const [username, setUsernameState] = useState('');
  const [age, setAgeState] = useState('');
  const [number, setNumber] = useState('');

  // OTP step state
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  // Resend OTP countdown timer
  useEffect(() => {
    if (!otpStep) return;
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  // Focus first OTP input when entering OTP step
  useEffect(() => {
    if (otpStep && otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, [otpStep]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // keep only last digit
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (pasted.length > 0) {
      const newOtp = ['', '', '', ''];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pasted.length, 3);
      otpRefs[focusIndex]?.current?.focus();
    }
  };

  const maskedNumber = number
    ? number.slice(0, 2) + '•'.repeat(Math.max(0, number.length - 4)) + number.slice(-2)
    : '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpStep) {
      // Step 1: Validate details, then move to OTP step
      if (!username.trim()) return;
      if (role === 'patient' && number.length < 7) return;

      if (role === 'caretaker') {
        // Caretakers skip OTP
        setLanguage(language);
        setRole(role);
        setUsername(username.trim());
        setAge(age);
        setEmergencyNumber('caretaker');
      } else {
        // Patient → go to OTP step
        setOtpStep(true);
        setResendTimer(30);
        setOtp(['', '', '', '']);
        setOtpError('');
      }
    } else {
      // Step 2: Verify OTP
      const enteredOtp = otp.join('');
      if (enteredOtp.length !== 4) {
        setOtpError(t(language, 'otpInvalid'));
        return;
      }

      // Mock verification – accept any 4-digit code
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setLanguage(language);
        setRole(role);
        setUsername(username.trim());
        setAge(age);
        setEmergencyNumber(number);
      }, 800);
    }
  };

  const handleResendOtp = () => {
    setResendTimer(30);
    setOtp(['', '', '', '']);
    setOtpError('');
    otpRefs[0].current?.focus();
  };

  const handleGoBack = () => {
    setOtpStep(false);
    setOtp(['', '', '', '']);
    setOtpError('');
  };

  // ─── OTP Verification Screen ───
  if (otpStep) {
    return (
      <div className="page-container" style={{ justifyContent: 'center' }}>
        {/* Top Header Badges */}
        <div className="top-header-row">
          <div className="pill-badge pill-badge-magenta">
            VERIFICATION
          </div>
          <div className="pill-badge pill-badge-greeting">
            <span className="dot-indicator"></span> {t(language, 'verifyOtp')} 🔐
          </div>
        </div>

        {/* Shield Icon */}
        <div className="avatar-container" style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '2px solid rgba(34, 197, 94, 0.25)',
        }}>
          <ShieldCheck size={36} color="#22c55e" strokeWidth={2.2} />
          <div className="avatar-online-dot" style={{ background: '#22c55e' }}></div>
        </div>

        {/* OTP Heading */}
        <div className="welcome-header">
          <h1>{t(language, 'verifyOtp')}</h1>
          <p>{t(language, 'enterOtp')}</p>
          <p style={{
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            color: '#60a5fa',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            {t(language, 'otpSent')} {maskedNumber}
          </p>
        </div>

        {/* OTP Form Card */}
        <form onSubmit={handleSubmit} className="card">
          {/* 4-digit OTP Input Boxes */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={otpRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={index === 0 ? handleOtpPaste : undefined}
                style={{
                  width: '56px',
                  height: '64px',
                  borderRadius: '16px',
                  border: otpError
                    ? '2px solid rgba(239, 68, 68, 0.6)'
                    : digit
                      ? '2px solid rgba(99, 102, 241, 0.6)'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                  background: digit
                    ? 'rgba(99, 102, 241, 0.08)'
                    : 'rgba(255, 255, 255, 0.04)',
                  color: '#f1f5f9',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  caretColor: '#818cf8',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.8)';
                  e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = digit
                    ? 'rgba(99, 102, 241, 0.6)'
                    : 'rgba(255, 255, 255, 0.1)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            ))}
          </div>

          {/* OTP Error Message */}
          {otpError && (
            <p style={{
              color: '#f87171',
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              {otpError}
            </p>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            className="btn-primary-gradient"
            disabled={isVerifying}
            style={{
              opacity: isVerifying ? 0.7 : 1,
              cursor: isVerifying ? 'wait' : 'pointer',
            }}
          >
            <span>{isVerifying ? '...' : t(language, 'verifyAndContinue')}</span>
            {!isVerifying && <ShieldCheck size={20} strokeWidth={2.5} />}
          </button>

          {/* Resend / Go Back Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
            gap: '0.5rem',
          }}>
            <button
              type="button"
              onClick={handleGoBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
            >
              <ArrowLeft size={16} /> {t(language, 'goBack')}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'none',
                border: 'none',
                color: resendTimer > 0 ? '#475569' : '#60a5fa',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: resendTimer > 0 ? 'default' : 'pointer',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                transition: 'color 0.2s',
              }}
            >
              <RefreshCw size={14} />
              {resendTimer > 0
                ? `${t(language, 'resendOtp')} (${resendTimer}s)`
                : t(language, 'resendOtp')
              }
            </button>
          </div>
        </form>

        {/* Security Footer */}
        <div className="security-note">
          <Lock size={16} strokeWidth={2.5} color="#60a5fa" />
          <span>Your health details remain private & secure</span>
        </div>
      </div>
    );
  }

  // ─── Step 1: Details Form (original) ───
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
        <User size={36} color="#3b82f6" strokeWidth={2.2} />
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
            <Heart size={20} color={role === 'caretaker' ? '#ffffff' : '#ef4444'} />
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
        <Lock size={16} strokeWidth={2.5} color="#60a5fa" />
        <span>Your health details remain private & secure</span>
      </div>
    </div>
  );
}
