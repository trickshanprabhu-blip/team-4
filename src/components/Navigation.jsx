import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Gamepad2, Phone } from 'lucide-react';
import { t } from '../i18n';
import { useAppStore } from '../store';

export default function Navigation() {
  const location = useLocation();
  const language = useAppStore(state => state.language) || 'en';

  return (
    <nav className="bottom-nav">
      <Link to="/tasks" className={`nav-item ${location.pathname === '/tasks' ? 'active' : ''}`}>
        <CheckSquare size={24} />
        <span>{t(language, 'tasksTab') || 'Tasks'}</span>
      </Link>
      <Link to="/games" className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}>
        <Gamepad2 size={24} />
        <span>{t(language, 'gamesTab') || 'Games'}</span>
      </Link>
      <Link to="/emergency" className={`nav-item ${location.pathname === '/emergency' ? 'active' : ''}`}>
        <Phone size={24} />
        <span>{t(language, 'emergencyTab') || 'SOS'}</span>
      </Link>
    </nav>
  );
}
