import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { Plus, Check, Droplet, FlaskConical, Sun, HeartPulse, Sparkles, Repeat } from 'lucide-react';

function getTaskTheme(title = '', index = 0) {
  const lower = title.toLowerCase();
  if (lower.includes('water') || lower.includes('drink') || lower.includes('hydrate')) {
    return {
      className: 'task-theme-cyan',
      icon: <Droplet size={24} strokeWidth={2.2} />
    };
  }
  if (lower.includes('med') || lower.includes('pill') || lower.includes('tablet') || lower.includes('dose')) {
    return {
      className: 'task-theme-purple',
      icon: <FlaskConical size={24} strokeWidth={2.2} />
    };
  }
  if (lower.includes('breakfast') || lower.includes('eat') || lower.includes('morning') || lower.includes('food') || lower.includes('meal')) {
    return {
      className: 'task-theme-yellow',
      icon: <Sun size={24} strokeWidth={2.2} />
    };
  }
  if (lower.includes('walk') || lower.includes('exercise') || lower.includes('heart') || lower.includes('health')) {
    return {
      className: 'task-theme-pink',
      icon: <HeartPulse size={24} strokeWidth={2.2} />
    };
  }

  // Fallback cycling themes
  const themes = [
    { className: 'task-theme-cyan', icon: <Droplet size={24} strokeWidth={2.2} /> },
    { className: 'task-theme-purple', icon: <FlaskConical size={24} strokeWidth={2.2} /> },
    { className: 'task-theme-yellow', icon: <Sun size={24} strokeWidth={2.2} /> },
    { className: 'task-theme-pink', icon: <Sparkles size={24} strokeWidth={2.2} /> }
  ];

  return themes[index % themes.length];
}

export default function Tasks() {
  const { tasks, toggleTask, addTask, checkTaskResets, username } = useAppStore();
  const [newTask, setNewTask] = useState('');
  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [hoursStr, setHoursStr] = useState('0');
  const [minutesStr, setMinutesStr] = useState('30');

  useEffect(() => {
    const interval = setInterval(() => {
      checkTaskResets();
    }, 3000);
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

  const displayName = username ? username.toLowerCase() : 'john';

  return (
    <div className="page-container">
      {/* Top Header Badges */}
      <div className="top-header-row">
        <div className="pill-badge pill-badge-magenta">
          TODAY'S SCHEDULE
        </div>
        <div className="pill-badge pill-badge-greeting">
          <span className="dot-indicator"></span> Hi, {displayName} ✨
        </div>
      </div>

      {/* Title & Subtitle */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1>My Tasks</h1>
        <p>Here are your reminders for today.</p>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task, index) => {
          const theme = getTaskTheme(task.title, index);
          return (
            <div
              key={task.id}
              className={`task-capsule ${theme.className}`}
              style={{ opacity: task.completed ? 0.65 : 1 }}
              onClick={() => toggleTask(task.id)}
            >
              <div className="task-left">
                <div className={`task-checkbox-circle ${task.completed ? 'checked' : ''}`}>
                  {task.completed && <Check size={18} strokeWidth={3} color="#ffffff" />}
                </div>
                <div>
                  <span className={`task-title ${task.completed ? 'completed' : ''}`}>
                    {task.title}
                  </span>
                  {task.timeLimit ? (
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.2rem' }}>
                      <Repeat size={12} />
                      Repeats automatically
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="task-badge-icon">
                {theme.icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Form */}
      <form onSubmit={handleAdd} style={{ marginTop: '0.5rem' }}>
        <input
          type="text"
          className="task-input-pill"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />

        <div className="task-actions-row">
          <label
            className="repeat-radio-label"
            onClick={() => setRepeatEnabled(!repeatEnabled)}
          >
            <div className={`repeat-radio-circle ${repeatEnabled ? 'checked' : ''}`}></div>
            <span>Repeat task</span>
          </label>

          <button type="submit" className="add-task-fab" aria-label="Add task">
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        {repeatEnabled && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', border: '1.5px solid rgba(59, 130, 246, 0.15)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Every</span>
            <input
              type="number"
              className="pill-input"
              style={{ height: '36px', padding: '0 0.5rem', width: '56px', textAlign: 'center' }}
              min="0"
              value={hoursStr}
              onChange={(e) => setHoursStr(e.target.value)}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>hrs</span>
            <input
              type="number"
              className="pill-input"
              style={{ height: '36px', padding: '0 0.5rem', width: '56px', textAlign: 'center' }}
              min="0"
              max="59"
              value={minutesStr}
              onChange={(e) => setMinutesStr(e.target.value)}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>min</span>
          </div>
        )}
      </form>
    </div>
  );
}
