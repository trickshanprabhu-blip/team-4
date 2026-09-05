import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      role: 'patient', // 'patient' | 'caretaker'
      setRole: (role) => set({ role }),
      language: 'en',
      setLanguage: (language) => set({ language }),
      username: '',
      setUsername: (name) => set({ username: name }),
      age: '',
      setAge: (age) => set({ age }),
      emergencyNumber: '',
      setEmergencyNumber: (num) => set({ emergencyNumber: num }),

      musicTracks: [],
      addMusicTrack: (title, dataUrl) => set((state) => ({
        musicTracks: [
          ...(state.musicTracks || []),
          { id: Date.now().toString(), title, dataUrl }
        ]
      })),
      removeMusicTrack: (id) => set((state) => ({
        musicTracks: (state.musicTracks || []).filter((track) => track.id !== id)
      })),
      
      dementiaLevel: null, // null, 'mild', 'moderate', 'high'
      setDementiaLevel: (level) => set({ dementiaLevel: level }),

      tasks: [
        { id: '1', title: 'Drink a glass of water', completed: false },
        { id: '2', title: 'Take morning medication', completed: false },
        { id: '3', title: 'Eat breakfast', completed: false }
      ],
      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => {
          if (task.id === id) {
            const isNowCompleted = !task.completed;
            const resetAt = (isNowCompleted && task.timeLimit) ? Date.now() + task.timeLimit : null;
            return { ...task, completed: isNowCompleted, resetAt };
          }
          return task;
        })
      })),
      addTask: (title, timeLimit) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now().toString(), title, completed: false, timeLimit, resetAt: null }]
      })),
      checkTaskResets: () => set((state) => {
        const now = Date.now();
        let changed = false;
        const newTasks = state.tasks.map(task => {
          if (task.completed && task.resetAt && now >= task.resetAt) {
            changed = true;
            return { ...task, completed: false, resetAt: null };
          }
          return task;
        });
        return changed ? { tasks: newTasks } : state;
      }),
      
      isWatchConnected: false,
      setWatchConnected: (status) => set({ isWatchConnected: status }),
    }),
    {
      name: 'dementia-app-storage',
      merge: (persisted, current) => ({
        ...current,
        ...(persisted || {}),
        role: persisted?.role || 'patient',
        language: persisted?.language || 'en',
        musicTracks: persisted?.musicTracks || [],
      }),
    }
  )
);
