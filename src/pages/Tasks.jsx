import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { Plus, Check, Circle, Repeat } from 'lucide-react';

function formatRepeatInterval(ms) {
  const totalMinutes = Math.round(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const parts = [];
  if (hours > 0) parts.push(`${hours} hr${hours === 1 ? '' : 's'}`);
  if (minutes > 0) parts.push(`${minutes} min`);
  return parts.join(' ') || 'automatically';
}

export default function Tasks() {
  const { tasks, toggleTask, addTask, checkTaskResets } = useAppStore();
  const [newTask, setNewTask] = useState('');
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [hoursStr, setHoursStr] = useState('0');
  const [minutesStr, setMinutesStr] = useState('30');

  useEffect(() => {
    const interval = setInterval(() => {
      checkTaskResets();
    }, 3000); // Check every 3 seconds for demo purposes
    return () => clearInterval(interval);
  }, [checkTaskResets]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const hours = parseInt(hoursStr, 10) || 0;
      const minutes = parseInt(minutesStr, 10) || 0;
      const totalMs = (hours * 60 + minutes) * 60 * 1000;
      const timeLimit = repeatEnabled && totalMs > 0 ? totalMs : 0;
      addTask(newTask.trim(), timeLimit);
      setNewTask('');
      setRepeatEnabled(false);
      setHoursStr('0');
      setMinutesStr('30');
    }
  };

  return (
    <div className="page-container">
      <h1>My Tasks</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Here are your reminders for today.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="card" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: 0, 
              cursor: 'pointer',
              opacity: task.completed ? 0.6 : 1,
              transition: 'opacity 0.2s'
            }}
            onClick={() => toggleTask(task.id)}
          >
            <div style={{ color: task.completed ? 'var(--success)' : 'var(--primary-color)' }}>
              {task.completed ? <Check size={28} /> : <Circle size={28} />}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.25rem', textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              {task.timeLimit ? (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <Repeat size={12} />
                  Repeats every {formatRepeatInterval(task.timeLimit)}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input 
          type="text"
          className="input-field"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          style={{ marginBottom: 0 }}
        />
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={repeatEnabled} 
              onChange={(e) => setRepeatEnabled(e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
            />
            Repeat task
          </label>
          
          {repeatEnabled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Every</span>
              <input 
                type="number" 
                className="input-field"
                style={{ marginBottom: 0, padding: '0.5rem', width: '56px', textAlign: 'center' }}
                min="0"
                value={hoursStr}
                onChange={(e) => setHoursStr(e.target.value)}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>hrs</span>
              <input 
                type="number" 
                className="input-field"
                style={{ marginBottom: 0, padding: '0.5rem', width: '56px', textAlign: 'center' }}
                min="0"
                max="59"
                value={minutesStr}
                onChange={(e) => setMinutesStr(e.target.value)}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>min</span>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem', marginLeft: repeatEnabled ? 0 : 'auto' }}>
            <Plus size={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
