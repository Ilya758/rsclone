import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GameInitializer from './components/game/GameInitializer';
import MultiplayerInitializer from "./components/game/MultiplayerInitializer";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="game" element={<GameInitializer />} />
      <Route path="multiplayer" element={<MultiplayerInitializer />} />
    </Routes>
  );
}

export default App;
