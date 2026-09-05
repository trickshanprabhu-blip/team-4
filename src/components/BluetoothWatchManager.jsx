import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { Watch, PhoneCall, AlertTriangle } from 'lucide-react';

export default function BluetoothWatchManager() {
  const { dementiaLevel, emergencyNumber } = useAppStore();
  const [alertActive, setAlertActive] = useState(false);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    // Only active for high dementia level
    if (dementiaLevel !== 'high') return;

    // Simulate a 5-minute check-in (using 5 minutes in ms)
    const CHECK_INTERVAL = 5 * 60 * 1000; 
    const RESPONSE_TIMEOUT = 30 * 1000; // 30 seconds to respond

    let responseTimer;
    
    const interval = setInterval(() => {
      setAlertActive(true);
      
      // If no response after 30 seconds, trigger emergency call
      responseTimer = setTimeout(() => {
        setAlertActive(false);
        setCalling(true);
        triggerEmergencyCall();
      }, RESPONSE_TIMEOUT);
      
    }, CHECK_INTERVAL);

    return () => {
      clearInterval(interval);
      clearTimeout(responseTimer);
    };
  }, [dementiaLevel]);

  const triggerEmergencyCall = () => {
    // In a real app, this might use a native bridge to make a phone call.
    // Here we simulate it.
    const utterance = new SpeechSynthesisUtterance("No response detected. Calling emergency contact.");
    window.speechSynthesis.speak(utterance);
    
    setTimeout(() => {
      // Open the phone dialer as a fallback web action
      window.location.href = `tel:${emergencyNumber}`;
      setCalling(false);
    }, 3000);
  };

  const handleWatchResponse = () => {
    setAlertActive(false);
  };

  if (!alertActive && !calling) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        {calling ? (
          <>
            <PhoneCall size={64} color="var(--danger)" style={{ marginBottom: '1rem', animation: 'pulse 1s infinite' }} />
            <h2 style={{ color: 'var(--danger)' }}>Calling Emergency!</h2>
            <p>Dialing {emergencyNumber}...</p>
          </>
        ) : (
          <>
            <Watch size={64} color="var(--primary-color)" style={{ marginBottom: '1rem', animation: 'pulse 2s infinite' }} />
            <h2>Watch Alert</h2>
            <p style={{ margin: '1rem 0' }}>Are you okay? Please tap the button to confirm you are safe.</p>
            <button className="btn btn-success" onClick={handleWatchResponse} style={{ padding: '1.5rem' }}>
              I AM OK
            </button>
            <p style={{ marginTop: '1rem', color: 'var(--danger)', fontSize: '0.875rem' }}>
              <AlertTriangle size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              If no response, emergency contact will be called.
            </p>
          </>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
