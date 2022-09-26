import { FC, useState } from "react";

import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { getRandomTrackIndex, iconStyle } from "../utils";

type music = {
  title: string;
  artist: string;
  url: string;
};

type TrackControlProps = {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  updateElapsedTime: (n: number) => void;
  musics: music[];
  trackIndex: number;
  updateTrackIndex: (i: number) => void;
};

const TrackControl: FC<TrackControlProps> = ({
  audio,
  musics,
  isPlaying,
  toggleIsPlaying,
  trackIndex,
  updateTrackIndex,
  updateElapsedTime,
}) => {
  const [random, setRandom] = useState(true);
  const [repeat, setRepeat] = useState(false);

  const togglePlay = () => {
    if (!isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    toggleIsPlaying();
  };

  const toggleBackOrForward = (n: number) => {
    audio.currentTime += n;
    updateElapsedTime(audio.currentTime);
  };

  const toggleBackward = () => {
    toggleBackOrForward(-10);
  };

  const toggleForward = () => {
    toggleBackOrForward(10);
  };

  const normalPlay = () => {
    setRandom(false);
    setRepeat(false);
  };

  const rePlay = () => {
    setRepeat(true);
  };

  const shufflePlay = () => {
    setRandom(true);
  };

  const skipAudio = (n: number) => {
    updateElapsedTime(0);
    updateTrackIndex(n);
    audio.src = musics[n].url;
    isPlaying && audio.play();
  };

  const skipNextAudio = () => {
    if (random) {
      skipAudio(getRandomTrackIndex(trackIndex, musics.length));
      return;
    }

    if (repeat) {
      skipAudio(trackIndex);
      return;
    }

    skipAudio((trackIndex + 1) % musics.length);
  };

  const skipPrevAudio = () => {
    if (random) {
      skipAudio(getRandomTrackIndex(trackIndex, musics.length));
      return;
    }

    if (repeat) {
      skipAudio(trackIndex);
      return;
    }

    skipAudio((trackIndex + musics.length - 1) % musics.length);
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
        onClick={skipPrevAudio}
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
      <SkipNextIcon
        titleAccess="next song"
        sx={iconStyle}
        onClick={skipNextAudio}
      />
    </>
  );
};

export default TrackControl;
