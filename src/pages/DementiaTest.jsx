import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';

const EMOJIS = ['🐶', '🐱', '🐰', '🦊', '🐶', '🐱', '🐰', '🦊'];

export default function DementiaTest() {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const setDementiaLevel = useAppStore((state) => state.setDementiaLevel);
  const username = useAppStore((state) => state.username);
  const navigate = useNavigate();

  const displayName = username ? username.toLowerCase() : 'friend';

  useEffect(() => {
    const shuffled = [...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndexes.length === 2 || flippedIndexes.includes(index) || cards[index] === null) return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[first] = null;
            next[second] = null;
            return next;
          });
          setMatchedPairs((p) => p + 1);
          setFlippedIndexes([]);
        }, 500);
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs === EMOJIS.length / 2) {
      let level = 'mild';
      if (moves > 8) level = 'moderate';
      if (moves > 12) level = 'high';

      setTimeout(() => {
        setDementiaLevel(level);
        navigate('/tasks');
      }, 1500);
    }
  }, [matchedPairs, moves, navigate, setDementiaLevel]);

  return (
    <div className="page-container">
      {/* Top Header Badges */}
      <div className="top-header-row">
        <div className="pill-badge pill-badge-magenta">
          MEMORY CHECK
        </div>
        <div className="pill-badge pill-badge-greeting">
          <span className="dot-indicator"></span> Hi, {displayName} ✨
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1>Quick Assessment</h1>
        <p>Match the animal pairs to get started.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        marginTop: '0.5rem'
      }}>
        {cards.map((emoji, index) => {
          const isFlipped = flippedIndexes.includes(index) || emoji === null;
          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={{
                aspectRatio: '1',
                borderRadius: '20px',
                background: isFlipped ? '#fdf2f8' : '#ffffff',
                border: isFlipped ? '2px solid #fbcfe8' : '2px solid #ede9fe',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                cursor: emoji === null ? 'default' : 'pointer',
                visibility: emoji === null ? 'hidden' : 'visible',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isFlipped ? 'scale(1.03)' : 'scale(1)',
                userSelect: 'none'
              }}
            >
              {isFlipped ? emoji : '🌸'}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 600 }}>Moves: {moves}</p>
        {matchedPairs === EMOJIS.length / 2 && (
          <p style={{ color: '#059669', fontWeight: 700, marginTop: '1rem' }}>
            🎉 Great job! Setting up your tasks...
          </p>
        )}
      </div>
    </div>
  );
}
