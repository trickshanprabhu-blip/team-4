import { Link, useLocation } from 'react-router-dom';
import { ClipboardCheck, Gamepad2, ShieldCheck } from 'lucide-react';
import { t } from '../i18n';
import { useAppStore } from '../store';

export default function Navigation() {
  const location = useLocation();
  const language = useAppStore((state) => state.language) || 'en';

  return (
    <div className="bottom-nav-wrapper">
      <nav className="bottom-nav">
        <Link
          to="/tasks"
          className={`nav-link ${location.pathname === '/tasks' ? 'active' : ''}`}
        >
          <div className="nav-icon-pill">
            <ClipboardCheck size={24} strokeWidth={2.2} />
          </div>
          <span>{t(language, 'tasksTab') || 'Tasks'}</span>
        </Link>

        <Link
          to="/games"
          className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`}
        >
          <div className="nav-icon-pill">
            <Gamepad2 size={24} strokeWidth={2.2} />
          </div>
          <span>{t(language, 'gamesTab') || 'Games'}</span>
        </Link>

        <Link
          to="/emergency"
          className={`nav-link ${location.pathname === '/emergency' ? 'active' : ''}`}
        >
          <div className="nav-icon-pill">
            <ShieldCheck size={24} strokeWidth={2.2} />
          </div>
          <span>{t(language, 'emergencyTab') || 'SOS'}</span>
        </Link>
      </nav>

      {/* iOS Home Bar Indicator */}
      <div className="home-bar"></div>
    </div>
  );
}
