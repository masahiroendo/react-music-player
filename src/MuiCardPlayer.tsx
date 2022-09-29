import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayerContext from "./contexts/PlayModeContext";
import MuiVolumeControl from "./MuiControls/MuiVolumeControl";
import MuiTrackControl from "./MuiControls/MuiTrackControl";
import MuiTimeSlider from "./MuiControls/MuiTimeSlider";

import Wave from "./Wave";

// #region -------- Styled Components -----------------------------------------
const WallPaper = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  overflow: "hidden",
  background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
  transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
  "&:before": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    top: "-40%",
    right: "-50%",
    background:
      "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
  },
  "&:after": {
    content: '""',
    width: "140%",
    height: "140%",
    position: "absolute",
    bottom: "-50%",
    left: "-30%",
    background:
      "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
    transform: "rotate(30deg)",
  },
});

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,0.6)"
      : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});
// #endregion ---------------------------------------------------------------

export default function MuiCardPlayer() {
  const {
    music,
    audioRef,
    isPlaying,
    listOpened,
    playNext,
    playTrack,
    tracks,
    trackIndex,
    toggleList,
    updateDuration,
    updateElapsedTime,
  } = useContext(PlayerContext);
  const theme = useTheme();
  const [volume, setVolume] = useState<number>(50);
  const [mute, setMute] = useState(false);

  // const formatDuration = (value: number) => {
  //   const minute = Math.floor(value / 60);
  //   const secondLeft = value - minute * 60;
  //   return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  // };

  const mainIconColor = theme.palette.mode === "light" ? "#fff" : "#000";
  // const lightIconColor =
  //   theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

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
      <Box sx={{ width: "100%", overflow: "hidden", color: mainIconColor }}>
        <Widget>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <CoverImage>
              <img alt={music.title} src={music.image} />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography variant="caption" fontWeight={500}>
                {music.artist}
              </Typography>
              <Typography noWrap>{music.title}</Typography>
              <Typography noWrap letterSpacing={-0.25}>
                Album Name &mdash; Album Name
              </Typography>
            </Box>
          </Box>
          <MuiTimeSlider />
          <MuiTrackControl />
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <MuiVolumeControl
              mute={mute}
              volume={volume}
              setVolume={setVolume}
              toggleMute={() => setMute(!mute)}
            />
          </Stack>
          <Collapse in={listOpened} timeout="auto" unmountOnExit>
            <List>
              <ListItem
                secondaryAction={
                  <IconButton onClick={toggleList}>
                    <CloseRoundedIcon
                      htmlColor={mainIconColor}
                      sx={{ fontSize: "1.5rem" }}
                    />
                  </IconButton>
                }
              />

              {tracks.map((track, i) => (
                <ListItem
                  key={track.title}
                  disablePadding
                  secondaryAction={isPlaying && trackIndex === i && <Wave />}
                >
                  <ListItemButton onClick={() => playTrack(i)}>
                    <ListItemAvatar>
                      <Avatar alt={track.title} src={track.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={track.title}
                      secondary={
                        <Typography variant="body2" width={"200px"}>
                          {track.artist}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Widget>
        <WallPaper />
      </Box>
    </>
  );
}
