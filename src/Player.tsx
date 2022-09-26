import { FC, useEffect, useRef, useState } from "react";
import { styled, Paper, Stack, Box, Typography } from "@mui/material";

import { musicsList } from "./MusicsList";
import VolumeControl from "./VolumeControl";
import TimeControl from "./TimeControl";
import TrackControl from "./TrackControl";

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
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(
    new Audio(musicsList[trackIndex].url)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(50);
  const [mute, setMute] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (audioRef.current.readyState < 1) {
      return;
    }
    if (audioRef != null) {
      audioRef.current.volume = volume / 100;
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(audioRef.current.duration);
        const _elapsed = Math.floor(audioRef.current.currentTime);

        setDuration(_duration);
        setElapsedTime(_elapsed);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, /*, audioRef.current.currentTime */ volume]);

  const onAudioLoaded = () => {
    audioRef.current && setDuration(Math.floor(audioRef.current.duration));
    audioRef.current.play();
    setElapsedTime(0);
  };

  const currentMusic = musicsList[trackIndex];

  return (
    <>
      <audio
        src={currentMusic.url}
        ref={audioRef}
        muted={mute}
        onLoadedMetadata={onAudioLoaded}
        onEnded={() => {
          setTrackIndex(trackIndex + 1);
        }}
        // onLoadedData={onAudioLoaded}
      />
      <CustomPaper>
        <Stack
          sx={{
            alignItems: "center",
            color: "silver",
          }}
        >
          <Typography variant="h5">{currentMusic.title}</Typography>
          <Typography variant="subtitle1">{currentMusic.artist}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TimeControl
            elapsedTime={elapsedTime}
            duration={duration}
            audio={audioRef.current}
          />
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
              width: "40%",
              alignItems: "center",
            }}
          >
            <TrackControl
              audio={audioRef.current}
              musics={musicsList}
              trackIndex={trackIndex}
              updateTrackIndex={(i: number) => setTrackIndex(i)}
              isPlaying={isPlaying}
              toggleIsPlaying={() => setIsPlaying(!isPlaying)}
              updateElapsedTime={(n: number) => setElapsedTime(n)}
            />
          </Stack>
          <Stack sx={{ display: "flex", justifyContent: "flex-end" }} />
        </Box>
      </CustomPaper>
    </>
  );
};

export default Player;
