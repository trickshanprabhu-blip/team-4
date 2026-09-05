import { useState } from 'react';
import { Music, LayoutGrid, Puzzle } from 'lucide-react';
import MusicGame from '../components/games/MusicGame';
import MatchingGame from '../components/games/MatchingGame';
import PuzzleGame from '../components/games/PuzzleGame';

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const close = () => setActiveGame(null);

  const renderGame = () => {
    if (activeGame === 'music') return <MusicGame onClose={close} />;
    if (activeGame === 'matching') return <MatchingGame onClose={close} />;
    if (activeGame === 'puzzle') return <PuzzleGame onClose={close} />;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button type="button" className="btn card game-menu-btn" onClick={() => setActiveGame('music')}>
          <Music size={48} color="var(--primary-color)" style={{ marginBottom: '0.5rem' }} />
          <span>Music Game</span>
        </button>
        <button type="button" className="btn card game-menu-btn" onClick={() => setActiveGame('matching')}>
          <LayoutGrid size={48} color="var(--success)" style={{ marginBottom: '0.5rem' }} />
          <span>Matching Cards</span>
        </button>
        <button type="button" className="btn card game-menu-btn" onClick={() => setActiveGame('puzzle')}>
          <Puzzle size={48} color="var(--primary-color)" style={{ marginBottom: '0.5rem' }} />
          <span>Puzzle Game</span>
        </button>
      </div>
    );
  };

  return (
    <div className="page-container">
      <h1>Therapeutic Games</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Engage your mind with simple activities.</p>
      {renderGame()}
    </div>
  );
}
