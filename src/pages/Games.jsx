import { useState } from 'react';
import { Music, LayoutGrid, Puzzle } from 'lucide-react';
import { useAppStore } from '../store';
import MusicGame from '../components/games/MusicGame';
import MatchingGame from '../components/games/MatchingGame';
import PuzzleGame from '../components/games/PuzzleGame';

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const username = useAppStore((state) => state.username);
  const close = () => setActiveGame(null);
  const displayName = username ? username.toLowerCase() : 'friend';

  const renderGame = () => {
    if (activeGame === 'music') return <MusicGame onClose={close} />;
    if (activeGame === 'matching') return <MatchingGame onClose={close} />;
    if (activeGame === 'puzzle') return <PuzzleGame onClose={close} />;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button type="button" className="game-menu-btn" onClick={() => setActiveGame('music')}>
          <Music size={44} color="#db2777" style={{ marginBottom: '0.65rem' }} />
          <span>Music Game</span>
        </button>
        <button type="button" className="game-menu-btn" onClick={() => setActiveGame('matching')}>
          <LayoutGrid size={44} color="#10b981" style={{ marginBottom: '0.65rem' }} />
          <span>Matching Cards</span>
        </button>
        <button type="button" className="game-menu-btn" onClick={() => setActiveGame('puzzle')}>
          <Puzzle size={44} color="#8b5cf6" style={{ marginBottom: '0.65rem' }} />
          <span>Puzzle Game</span>
        </button>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Top Header Badges */}
      <div className="top-header-row">
        <div className="pill-badge pill-badge-magenta">
          MIND & WELLNESS
        </div>
        <div className="pill-badge pill-badge-greeting">
          <span className="dot-indicator"></span> Hi, {displayName} ✨
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Therapeutic Games</h1>
        <p>Engage your mind with simple activities.</p>
      </div>

      {renderGame()}
    </div>
  );
}
