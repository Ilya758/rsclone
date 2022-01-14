import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GameInitializer from './components/game/GameInitializer';
import Multiplayer from "./components/game/Multiplayer";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="game" element={<GameInitializer />} />
      <Route path="multiplayer" element={<Multiplayer />} />
    </Routes>
  );
}

export default App;
