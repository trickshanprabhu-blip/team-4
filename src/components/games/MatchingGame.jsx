import { useState } from 'react';

const PAIRS = ['🐶', '🐱', '🐰', '🌸', '⭐', '🎈'];

function shuffledDeck() {
  return [...PAIRS, ...PAIRS].sort(() => Math.random() - 0.5);
}

export default function MatchingGame({ onClose }) {
  const [cards, setCards] = useState(shuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const won = matched.length === PAIRS.length;

  const handleClick = (index) => {
    if (lock || won) return;
    if (flipped.includes(index) || matched.includes(cards[index])) return;

    const next = [...flipped, index];
    setFlipped(next);
    if (next.length < 2) return;

    setLock(true);
    setMoves((m) => m + 1);
    const [first, second] = next;

    if (cards[first] === cards[second]) {
      setMatched((prev) => [...prev, cards[first]]);
      setFlipped([]);
      setLock(false);
      return;
    }

    setTimeout(() => {
      setFlipped([]);
      setLock(false);
    }, 900);
  };

  const restart = () => {
    setCards(shuffledDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
  };

  return (
    <div className="card" style={{ textAlign: 'center', padding: '1.25rem 1rem' }}>
      <h3>Matching Cards</h3>
      <p style={{ margin: '0.5rem 0 1rem', color: 'var(--text-muted)' }}>
        Find the matching pairs.
      </p>
      <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Moves: {moves}</p>
      <div className="match-grid">
        {cards.map((emoji, index) => {
          const isUp = flipped.includes(index) || matched.includes(emoji);
          return (
            <button
              key={`${index}-${emoji}`}
              type="button"
              className={`match-card ${isUp ? 'up' : ''} ${matched.includes(emoji) ? 'matched' : ''}`}
              onClick={() => handleClick(index)}
              aria-label={isUp ? emoji : 'Hidden card'}
            >
              {isUp ? emoji : '?'}
            </button>
          );
        })}
      </div>
      {won && (
        <p style={{ color: 'var(--success)', fontWeight: 700, marginTop: '1rem' }}>
          Well done! All pairs found.
        </p>
      )}
      <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={restart}>
        Play again
      </button>
      <button type="button" className="btn btn-danger" style={{ marginTop: '0.75rem' }} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
