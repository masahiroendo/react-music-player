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
  playTrack: (n: number, playing?: boolean) => void;
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
  togglePlay: () => void;
  toggleIsPlaying: () => void;
  toggleList: () => void;
  listOpened: boolean;
  elapsedTime: number;
  updateElapsedTime: (n: number) => void;
  duration: number;
  updateDuration: (n: number) => void;
};

const PlayerContext = createContext({} as PlayerContextType);

export type music = {
  title: string;
  artist: string;
  url: string;
  image?: string;
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
  const [listOpened, setListOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const playTrack = (n: number, playing: boolean = true) => {
    setElapsedTime(0);
    setTrackIndex(n);
    audioRef.current.pause();
    audioRef.current.load();
    audioRef.current.src = tracks[n].url;
    if (playing) {
      audioRef.current.play();
      setIsPlaying(playing);
    }
  };

  const skipAudio = (n: number) => {
    playTrack(n, isPlaying);
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

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    toggleIsPlaying();
  };

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleList = () => {
    setListOpened(!listOpened);
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
    playTrack,
    trackIndex,
    tracks,
    isPlaying,
    togglePlay,
    toggleIsPlaying,
    toggleList,
    listOpened,
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
