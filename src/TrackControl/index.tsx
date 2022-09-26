import { FC, useContext } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { iconStyle } from "../utils";
import PlayerContext from "../contexts/PlayModeContext";

const TrackControl: FC = () => {
  const {
    normalPlay,
    isPlaying,
    random,
    shufflePlay,
    audioRef,
    repeat,
    rePlay,
    playNext,
    playPrev,
    toggleIsPlaying,
    updateElapsedTime,
  } = useContext(PlayerContext);

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    toggleIsPlaying();
  };

  const toggleBackOrForward = (n: number) => {
    audioRef.current.currentTime += n;
    updateElapsedTime(audioRef.current.currentTime);
  };

  const toggleBackward = () => {
    toggleBackOrForward(-10);
  };

  const toggleForward = () => {
    toggleBackOrForward(10);
  };

  return (
    <>
      {random ? (
        <ShuffleIcon
          titleAccess="shuffle"
          sx={{
            mr: "10px",
            color: "silver",
            "&:hover": { color: "white" },
          }}
          onClick={normalPlay}
        />
      ) : repeat ? (
        <RepeatOneIcon
          titleAccess="repeat same"
          sx={{
            mr: "10px",
            color: "silver",
            "&:hover": { color: "white" },
          }}
          onClick={shufflePlay}
        />
      ) : (
        <RepeatIcon
          titleAccess="repeat"
          sx={{
            mr: "10px",
            color: "silver",
            "&:hover": { color: "white" },
          }}
          onClick={rePlay}
        />
      )}
      <SkipPreviousIcon
        titleAccess="previous song"
        sx={iconStyle}
        onClick={playPrev}
      />
      <FastRewindIcon
        titleAccess="-10 sec"
        sx={iconStyle}
        onClick={toggleBackward}
      />
      {isPlaying ? (
        <PauseIcon
          titleAccess="Pause"
          fontSize="large"
          sx={iconStyle}
          onClick={togglePlay}
        />
      ) : (
        <PlayArrowIcon
          titleAccess="Play"
          fontSize="large"
          sx={iconStyle}
          onClick={togglePlay}
        />
      )}
      <FastForwardIcon
        titleAccess="+10 sec"
        sx={iconStyle}
        onClick={toggleForward}
      />
      <SkipNextIcon titleAccess="next song" sx={iconStyle} onClick={playNext} />
    </>
  );
};

export default TrackControl;
