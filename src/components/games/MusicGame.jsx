import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Upload, Trash2 } from 'lucide-react';
import { useAppStore } from '../../store';

const MAX_FILE_BYTES = 2.5 * 1024 * 1024;

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function MusicGame({ onClose }) {
  const audioRef = useRef(null);
  const fileRef = useRef(null);
  const role = useAppStore((state) => state.role);
  const tracks = useAppStore((state) => state.musicTracks) || [];
  const addMusicTrack = useAppStore((state) => state.addMusicTrack);
  const removeMusicTrack = useAppStore((state) => state.removeMusicTrack);
  const setRole = useAppStore((state) => state.setRole);
  const isCaretaker = role === 'caretaker';

  const [activeId, setActiveId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleClose = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    onClose();
  };

  const playTrack = async (track) => {
    if (!audioRef.current) return;

    if (activeId === track.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = track.dataUrl;
    audioRef.current.loop = true;
    setActiveId(track.id);
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setError('');
    } catch {
      setIsPlaying(false);
      setError('Could not play this file. Try another audio file.');
    }
  };

  const importMusic = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('Please choose an audio file (mp3, wav, m4a).');
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError('Please choose a file smaller than 2.5 MB.');
      return;
    }

    try {
      const dataUrl = await readAsDataUrl(file);
      const title = file.name.replace(/\.[^.]+$/, '') || 'Imported song';
      addMusicTrack(title, dataUrl);
      setError('');
    } catch {
      setError('Could not import that file. Please try again.');
    }
  };

  const handleRemove = (id) => {
    if (activeId === id) {
      audioRef.current?.pause();
      setIsPlaying(false);
      setActiveId(null);
    }
    removeMusicTrack(id);
  };

  return (
    <div className="card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
      <Music size={56} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
      <h3>Music Game</h3>
      <p style={{ margin: '0.75rem 0 1.25rem', color: 'var(--text-muted)' }}>
        {isCaretaker
          ? 'Import songs for the patient, then tap one to preview.'
          : 'Tap a song to listen. Tap again to pause.'}
      </p>

      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        onChange={importMusic}
        style={{ display: 'none' }}
      />
      <button
        type="button"
        className={`btn ${isCaretaker ? 'btn-primary' : 'btn-outline'}`}
        style={{ marginBottom: '1rem' }}
        onClick={() => {
          if (!isCaretaker) setRole('caretaker');
          fileRef.current?.click();
        }}
      >
        <Upload size={22} />
        {isCaretaker ? 'Import music' : 'Caretaker: import music'}
      </button>

      {error && (
        <p style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.95rem' }}>{error}</p>
      )}

      {tracks.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {isCaretaker
            ? 'No songs yet. Import an mp3 or wav file.'
            : 'No music yet. Ask a caretaker to import songs.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {tracks.map((track) => {
            const selected = activeId === track.id && isPlaying;
            return (
              <div key={track.id} style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  className={`btn ${selected ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => playTrack(track)}
                >
                  {selected ? <Pause size={22} /> : <Play size={22} />}
                  {track.title}
                </button>
                {isCaretaker && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ width: 'auto', padding: '0.75rem' }}
                    onClick={() => handleRemove(track.id)}
                    aria-label={`Remove ${track.title}`}
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button type="button" className="btn btn-danger" style={{ marginTop: '1.25rem' }} onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
