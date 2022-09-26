import {
  createContext,
  FC,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

import { getRandomTrackIndex } from "../utils";

type PlayerContextType = {
  audioRef: MutableRefObject<HTMLAudioElement>;
  music: music;
  random: boolean;
  shufflePlay: () => void;
  normalPlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  repeat: boolean;
  rePlay: () => void;
  trackIndex: number;
  tracks: music[];
  isPlaying: boolean;
  toggleIsPlaying: () => void;
  elapsedTime: number;
  updateElapsedTime: (n: number) => void;
  duration: number;
  updateDuration: (n: number) => void;
};

const PlayerContext = createContext({} as PlayerContextType);

type music = {
  title: string;
  artist: string;
  url: string;
};

type PlayerContextProviderProps = {
  tracks: music[];
};

export const PlayerContextProvider: FC<
  PropsWithChildren<PlayerContextProviderProps>
> = ({ children, tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [random, setRandom] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio(tracks[trackIndex].url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const skipAudio = (n: number) => {
    setElapsedTime(0);
    setTrackIndex(n);
    audioRef.current.src = tracks[n].url;
    isPlaying && audioRef.current.play();
  };

  const changeTrack = (nextTrackIndex: number) => {
    if (random) {
      skipAudio(getRandomTrackIndex(trackIndex, tracks.length));
      return;
    }

    if (repeat) {
      skipAudio(trackIndex);
      return;
    }

    skipAudio(nextTrackIndex);
  };

  const playNext = () => {
    changeTrack((trackIndex + 1) % tracks.length);
  };

  const playPrev = () => {
    changeTrack((trackIndex + tracks.length - 1) % tracks.length);
  };

  const normalPlay = () => {
    setRandom(false);
    setRepeat(false);
  };

  const shufflePlay = () => {
    setRandom(true);
  };

  const rePlay = () => {
    setRepeat(true);
  };

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const updateElapsedTime = (n: number) => {
    setElapsedTime(n);
  };

  const updateDuration = (n: number) => {
    setDuration(n);
  };

  const music = tracks[trackIndex];

  const value = {
    audioRef,
    music,
    random,
    shufflePlay,
    repeat,
    rePlay,
    normalPlay,
    playNext,
    playPrev,
    trackIndex,
    tracks,
    isPlaying,
    toggleIsPlaying,
    elapsedTime,
    updateElapsedTime,
    duration,
    updateDuration,
  };
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContext;
