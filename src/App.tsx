import { PlayerContextProvider } from "./contexts/PlayModeContext";
import { musicsList } from "./MusicsList";
import CardPlayer from "./CardPlayer";
import Player from "./Player";
import MuiCardPlayer from "./MuiCardPlayer";

function App() {
  return (
    <>
      {/* <header>
        <button>Previous button</button>
        <div>Playing now / Paused</div>
        <button>Show list button</button>
      </header>
      <main id="music-player" className="main">
        <img src="" alt="" />
        <h3>Song Title</h3>
        <h3>Artist name / Album name</h3>
      </main> */}
      <PlayerContextProvider tracks={musicsList}>
        {/* <Player /> */}
        <MuiCardPlayer />
        <CardPlayer />
      </PlayerContextProvider>
    </>
  );
}

export default App;
