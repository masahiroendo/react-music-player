import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import RepeatOneRoundedIcon from "@mui/icons-material/RepeatOneRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import SkipNextRounded from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRounded from "@mui/icons-material/SkipPreviousRounded";

import PlayerContext from "../contexts/PlayModeContext";
import { useContext } from "react";

const MuiTrackControl = () => {
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
    toggleList,
    togglePlay,
    updateElapsedTime,
  } = useContext(PlayerContext);
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === "light" ? "#fff" : "#000";

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: -1,
      }}
    >
      {random ? (
        <IconButton onClick={normalPlay}>
          <ShuffleRoundedIcon
            titleAccess="random play"
            sx={{ fontSize: "2rem" }}
            htmlColor={mainIconColor}
          />
        </IconButton>
      ) : repeat ? (
        <IconButton onClick={shufflePlay}>
          <RepeatOneRoundedIcon
            titleAccess="auto replay"
            sx={{ fontSize: "2rem" }}
            htmlColor={mainIconColor}
          />
        </IconButton>
      ) : (
        <IconButton onClick={rePlay}>
          <RepeatRoundedIcon
            titleAccess="standard play"
            sx={{ fontSize: "2rem" }}
            htmlColor={mainIconColor}
          />
        </IconButton>
      )}

      <IconButton aria-label="previous song" onClick={playPrev}>
        <SkipPreviousRounded
          titleAccess="previous song"
          fontSize="large"
          htmlColor={mainIconColor}
        />
      </IconButton>
      <IconButton aria-label="backward song" onClick={toggleBackward}>
        <FastRewindRounded
          titleAccess="-10 sec"
          fontSize="large"
          htmlColor={mainIconColor}
        />
      </IconButton>
      <IconButton
        aria-label={isPlaying ? "pause" : "play"}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <PauseRounded
            titleAccess="Pause"
            sx={{ fontSize: "3rem" }}
            htmlColor={mainIconColor}
          />
        ) : (
          <PlayArrowRounded
            titleAccess="Play"
            sx={{ fontSize: "3rem" }}
            htmlColor={mainIconColor}
          />
        )}
      </IconButton>
      <IconButton aria-label="forward song" onClick={toggleForward}>
        <FastForwardRounded
          titleAccess="+10 sec"
          fontSize="large"
          htmlColor={mainIconColor}
        />
      </IconButton>
      <IconButton aria-label="next song" onClick={playNext}>
        <SkipNextRounded
          titleAccess="next song"
          fontSize="large"
          htmlColor={mainIconColor}
        />
      </IconButton>
      {/* <ExpandMore
        expand={listOpened}
        aria-label="playlist"
        onClick={toggleList}
      >
        {listOpened ? (
          <CloseIcon fontSize="large" htmlColor={mainIconColor} />
        ) : ( */}
      <IconButton aria-label="playlist" onClick={toggleList}>
        <QueueMusicRoundedIcon
          titleAccess="songs list"
          fontSize="large"
          htmlColor={mainIconColor}
        />
      </IconButton>
      {/* )}
      </ExpandMore> */}
    </Box>
  );
};

export default MuiTrackControl;
