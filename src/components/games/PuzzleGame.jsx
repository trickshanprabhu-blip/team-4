import { useMemo, useState } from 'react';
import puzzleImage from '../../assets/puzzle.svg?url';

const SIZE = 3;
const COUNT = SIZE * SIZE;
const EMPTY = COUNT - 1;

function neighbors(emptyIndex) {
  const row = Math.floor(emptyIndex / SIZE);
  const col = emptyIndex % SIZE;
  const next = [];
  if (row > 0) next.push(emptyIndex - SIZE);
  if (row < SIZE - 1) next.push(emptyIndex + SIZE);
  if (col > 0) next.push(emptyIndex - 1);
  if (col < SIZE - 1) next.push(emptyIndex + 1);
  return next;
}

function isSolved(order) {
  return order.every((value, index) => value === index);
}

function shuffleBoard() {
  const order = Array.from({ length: COUNT }, (_, i) => i);
  let empty = EMPTY;
  for (let i = 0; i < 120; i++) {
    const options = neighbors(empty);
    const pick = options[Math.floor(Math.random() * options.length)];
    [order[pick], order[empty]] = [order[empty], order[pick]];
    empty = pick;
  }
  return isSolved(order) ? shuffleBoard() : order;
}

function slideTiles(order, index) {
  const empty = order.indexOf(EMPTY);
  if (index === empty) return null;

  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const emptyRow = Math.floor(empty / SIZE);
  const emptyCol = empty % SIZE;
  if (row !== emptyRow && col !== emptyCol) return null;

  const next = [...order];
  if (row === emptyRow) {
    const step = emptyCol > col ? -1 : 1;
    for (let c = emptyCol; c !== col; c += step) {
      next[row * SIZE + c] = next[row * SIZE + c + step];
    }
  } else {
    const step = emptyRow > row ? -1 : 1;
    for (let r = emptyRow; r !== row; r += step) {
      next[r * SIZE + col] = next[(r + step) * SIZE + col];
    }
  }
  next[index] = EMPTY;
  return next;
}

export default function PuzzleGame({ onClose }) {
  const [order, setOrder] = useState(shuffleBoard);
  const [moves, setMoves] = useState(0);
  const won = useMemo(() => isSolved(order), [order]);

  const moveTile = (index) => {
    if (won) return;
    const next = slideTiles(order, index);
    if (!next) return;
    setOrder(next);
    setMoves((m) => m + 1);
  };

  const restart = () => {
    setOrder(shuffleBoard());
    setMoves(0);
  };

  return (
    <div className="card" style={{ textAlign: 'center', padding: '1.25rem 1rem' }}>
      <h3>Puzzle Game</h3>
      <p style={{ margin: '0.5rem 0 1rem', color: 'var(--text-muted)' }}>
        Tap a tile in line with the empty space to slide it.
      </p>
      <p style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Moves: {moves}</p>
      <div className="puzzle-grid">
        {order.map((tile, index) => {
          const isEmpty = tile === EMPTY;
          const showPicture = !isEmpty || won;
          const pictureTile = isEmpty && won ? EMPTY : tile;
          const row = Math.floor(pictureTile / SIZE);
          const col = pictureTile % SIZE;
          return (
            <button
              key={index}
              type="button"
              className={`puzzle-tile ${isEmpty && !won ? 'empty' : ''}`}
              onClick={() => moveTile(index)}
              aria-label={isEmpty ? 'Empty space' : `Tile ${tile + 1}`}
            >
              {showPicture && (
                <>
                  <img
                    src={puzzleImage}
                    alt=""
                    draggable="false"
                    className="puzzle-tile-image"
                    style={{
                      left: `-${col * 100}%`,
                      top: `-${row * 100}%`,
                    }}
                  />
                  {!won && !isEmpty && <span className="puzzle-tile-number">{tile + 1}</span>}
                </>
              )}
            </button>
          );
        })}
      </div>
      {won && (
        <p style={{ color: 'var(--success)', fontWeight: 700, marginTop: '1rem' }}>
          Puzzle complete!
        </p>
      )}
      <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={restart}>
        Shuffle again
      </button>
      <button type="button" className="btn btn-danger" style={{ marginTop: '0.75rem' }} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
