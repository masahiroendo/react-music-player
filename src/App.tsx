import { PlayerContextProvider } from "./contexts/PlayModeContext";
import { musicsList } from "./MusicsList";
import MuiCardPlayer from "./MuiCardPlayer";

function App() {
  return (
    <PlayerContextProvider tracks={musicsList}>
      <MuiCardPlayer />
    </PlayerContextProvider>
  );
}

export default App;
