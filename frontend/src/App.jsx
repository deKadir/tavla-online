import Game from "./pages/Game";
import GameProvider from "./context/GameProvider";

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
