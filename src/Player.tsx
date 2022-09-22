import { FC, useEffect, useRef, useState } from "react";
import { styled, Paper, Stack, Box } from "@mui/material";

import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// #endregion ------------ ICONS ---------

import { musicsList } from "./MusicsList";
import VolumeControl from "./VolumeControl";
import TimeControl from "./TimeControl";

// type music = {
//   title: string;
//   url: string;
// };

// #region -------- Styled Components -----------------------------------------
const Div = styled("div")(({ theme }) => ({
  backgroundColor: "black",
  height: "100vh",
  width: "100vw",
  paddingTop: theme.spacing(6),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#4c4c4c",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
}));

// #endregion ---------------------------------------------------------------

const Player: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(musicsList[0].url));
  const [currentMusic, setCurrentMusic] = useState<string>(musicsList[0].url);
  const [index, setIndex] = useState(0);
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

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying((curState) => !curState);
  };

  const toggleBackOrForward = (n: number) => {
    audioRef.current.currentTime += n;
  };

  const toggleBackward = () => {
    toggleBackOrForward(-10);
  };

  const toggleForward = () => {
    toggleBackOrForward(10);
  };

  const skipNextAudio = () => {
    if (index >= musicsList.length - 1) {
      setIndex(0);
      audioRef.current.src = musicsList[0].url;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setIndex((prev) => prev + 1);
      audioRef.current.src = musicsList[index + 1].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const skipPrevAudio = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      audioRef.current.src = musicsList[index - 1].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onAudioLoaded = () => {
    audioRef.current && setDuration(Math.floor(audioRef.current.duration));
  };

  const onPlaying = () => {
    const _duration = audioRef.current.duration;
    const _currentTime = audioRef.current.currentTime;
    console.log(_duration, _currentTime);
  };

  return (
    <Div>
      <audio
        src={currentMusic}
        ref={audioRef}
        muted={mute}
        onLoadedMetadata={onAudioLoaded}
        // onLoadedData={onAudioLoaded}
        onTimeUpdate={onPlaying}
      />
      <CustomPaper>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "25%",
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
            <SkipPreviousIcon
              sx={{ color: "silver", "&:hover": "white" }}
              onClick={skipPrevAudio}
            />
            <FastRewindIcon
              sx={{ color: "silver", "&:hover": "white" }}
              onClick={toggleBackward}
            />
            {isPlaying ? (
              <PauseIcon
                fontSize="large"
                sx={{ color: "silver", "&:hover": "white" }}
                onClick={togglePlay}
              />
            ) : (
              <PlayArrowIcon
                fontSize="large"
                sx={{ color: "silver", "&:hover": "white" }}
                onClick={togglePlay}
              />
            )}
            <FastForwardIcon
              sx={{ color: "silver", "&:hover": "white" }}
              onClick={toggleForward}
            />
            <SkipNextIcon
              sx={{ color: "silver", "&:hover": "white" }}
              onClick={skipNextAudio}
            />
          </Stack>
          <Stack sx={{ display: "flex", justifyContent: "flex-end" }} />
        </Box>
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
      </CustomPaper>
    </Div>
  );
};

export default Player;
