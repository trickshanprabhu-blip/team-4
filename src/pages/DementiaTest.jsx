import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { useNavigate } from 'react-router-dom';

const EMOJIS = ['🐶', '🐱', '🐰', '🦊', '🐶', '🐱', '🐰', '🦊'];

export default function DementiaTest() {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const setDementiaLevel = useAppStore(state => state.setDementiaLevel);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndexes.length === 2 || flippedIndexes.includes(index) || cards[index] === null) return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            next[first] = null;
            next[second] = null;
            return next;
          });
          setMatchedPairs(p => p + 1);
          setFlippedIndexes([]);
        }, 500);
      } else {
        setTimeout(() => setFlippedIndexes([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs === EMOJIS.length / 2) {
      // Determine dementia level based on moves
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
      <h2>Memory Assessment</h2>
      <p style={{ color: 'var(--text-muted)' }}>Match the pairs to proceed.</p>
      
      <div className="game-grid">
        {cards.map((emoji, index) => (
          <div 
            key={index} 
            className={`game-card ${flippedIndexes.includes(index) || emoji === null ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
            style={{ visibility: emoji === null ? 'hidden' : 'visible' }}
          >
            {(flippedIndexes.includes(index) || emoji === null) ? emoji : '?'}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>Moves: {moves}</p>
        {matchedPairs === EMOJIS.length / 2 && (
          <p style={{ color: 'var(--success)', fontWeight: 'bold', marginTop: '1rem' }}>Test Complete! Determining level...</p>
        )}
      </div>
    </div>
  );
}
