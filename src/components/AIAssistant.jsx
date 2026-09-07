import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, X } from 'lucide-react';
import { useAppStore } from '../store';
import { speakKey, stopSpeech, t } from '../i18n';

export default function AIAssistant() {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const language = useAppStore((state) => state.language) || 'en';

  useEffect(() => {
    let timeout;
    
    const resetTimer = () => {
      setShowPopup(false);
      stopSpeech();
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        triggerAIHelp();
      }, 10000);
    };

    const triggerAIHelp = () => {
      setShowPopup(true);
      speakGuidance();
    };

    const speakGuidance = () => {
      let key = 'speakDefault';
      
      if (location.pathname === '/login') {
        key = 'speakLogin';
      } else if (location.pathname === '/test') {
        key = 'speakTest';
      } else if (location.pathname === '/tasks') {
        key = 'speakTasks';
      } else if (location.pathname === '/games') {
        key = 'speakGames';
      } else if (location.pathname === '/emergency') {
        key = 'speakEmergency';
      }

      speakKey(language, key);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('touchstart', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      stopSpeech();
    };
  }, [location.pathname, language]);

  if (!showPopup) return null;

  return (
    <div className="ai-popup">
      <Bot size={40} />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{t(language, 'aiTitle')}</h3>
        <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>{t(language, 'aiSubtitle')}</p>
      </div>
      <button 
        onClick={() => {
          setShowPopup(false);
          stopSpeech();
        }} 
        style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
      >
        <X size={28} />
      </button>
    </div>
  );
}
