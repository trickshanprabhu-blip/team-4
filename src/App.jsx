import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import Navigation from './components/Navigation';
import AIAssistant from './components/AIAssistant';
import BluetoothWatchManager from './components/BluetoothWatchManager';

import Login from './pages/Login';
import DementiaTest from './pages/DementiaTest';
import Tasks from './pages/Tasks';
import Games from './pages/Games';
import Emergency from './pages/Emergency';

function App() {
  const emergencyNumber = useAppStore(state => state.emergencyNumber);
  const dementiaLevel = useAppStore(state => state.dementiaLevel);
  const username = useAppStore(state => state.username);
  const role = useAppStore(state => state.role);
  const isLoggedIn = role === 'caretaker' ? Boolean(username) : Boolean(emergencyNumber);
  const showNav = isLoggedIn && (role === 'caretaker' || Boolean(dementiaLevel));
  const afterLogin = role === 'caretaker' || dementiaLevel ? '/tasks' : '/test';

  return (
    <Router>
      <AIAssistant />
      <BluetoothWatchManager />
      
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to={afterLogin} />} />
        <Route path="/test" element={<DementiaTest />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/games" element={<Games />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {showNav && <Navigation />}
    </Router>
  );
}

export default App;
