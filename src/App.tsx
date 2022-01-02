import {
  Routes,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import Game from "./components/game/Game";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="game" element={<Game />} />
    </Routes>
  )
}

export default App;
