import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GameInitializer from './components/game/GameInitializer';
import Multiplayer from './components/game/Multiplayer';
import { useAppSelector } from './hooks/storeHooks';
import { useEffect, useState } from 'react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const data = useAppSelector(state => state.user);
  useEffect(() => {
    if (data.status === 'authenticated' || data.status === 'logged')
      setIsAuthenticated(true);
  }, [data]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="game"
        element={isAuthenticated ? <GameInitializer /> : <Navigate to="/" />}
      />
      <Route
        path="multiplayer"
        element={isAuthenticated ? <Multiplayer /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
