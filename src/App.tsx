import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GameInitializer from './components/game/GameInitializer';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="game" element={<GameInitializer />} />
    </Routes>
  );
}

export default App;
