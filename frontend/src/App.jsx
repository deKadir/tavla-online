import GameProvider from "./context/GameProvider";
import Pages from "./pages";
function App() {
  return (
    <GameProvider>
      <Pages />
    </GameProvider>
  );
}

export default App;
