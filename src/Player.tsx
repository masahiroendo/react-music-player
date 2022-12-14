import { FC, useContext, useEffect, useState } from "react";
import {
  styled,
  Paper,
  Stack,
  Box,
  Typography,
  CardMedia,
} from "@mui/material";

import VolumeControl from "./VolumeControl";
import TimeControl from "./TimeControl";
import TrackControl from "./TrackControl";
import PlayerContext from "./contexts/PlayModeContext";

// // #region -------- Styled Components -----------------------------------------
// const Div = styled("div")(({ theme }) => ({
//   backgroundColor: "black",
//   height: "100vh",
//   width: "100vw",
//   paddingTop: theme.spacing(6),
// }));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#4c4c4c",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
}));

// #endregion ---------------------------------------------------------------

const Player: FC = () => {
  const {
    audioRef,
    music,
    isPlaying,
    playNext,
    updateDuration,
    updateElapsedTime,
  } = useContext(PlayerContext);
  const [volume, setVolume] = useState<number>(50);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (audioRef.current.readyState < 1) {
      return;
    }
    if (audioRef.current != null) {
      audioRef.current.volume = volume / 100;
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(audioRef.current.duration);
        const _elapsed = Math.floor(audioRef.current.currentTime);

        updateDuration(_duration);
        updateElapsedTime(_elapsed);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, volume, audioRef, updateDuration, updateElapsedTime]);

  const onAudioLoaded = () => {
    audioRef.current && updateDuration(Math.floor(audioRef.current.duration));
    audioRef.current && isPlaying && audioRef.current.play();
    updateElapsedTime(0);
  };

  return (
    <>
      <audio
        src={music.url}
        ref={audioRef}
        muted={mute}
        onLoadedMetadata={onAudioLoaded}
        onEnded={playNext}
        // onLoadedData={onAudioLoaded}
      />
      <CustomPaper>
        <Stack
          sx={{
            alignItems: "center",
            color: "silver",
          }}
        >
          {/* <CardMedia
            component="img"
            sx={{ width: 151, borderRadius: "50%" }}
            image={music.image}
            alt="Live from space album cover"
          /> */}
          <Typography variant="h5">{music.title}</Typography>
          <Typography variant="subtitle1">{music.artist}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TimeControl />
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "15%",
              alignItems: "center",
            }}
          >
            <VolumeControl
              mute={mute}
              toggleMute={() => setMute(!mute)}
              volume={volume}
              setVolume={setVolume}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              width: "45%",
              alignItems: "center",
            }}
          >
            <TrackControl />
          </Stack>
          <Stack sx={{ display: "flex", justifyContent: "flex-end" }} />
        </Box>
      </CustomPaper>
    </>
  );
};

export default Player;
