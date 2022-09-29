import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PlayerContext from "./contexts/PlayModeContext";
import MuiVolumeControl from "./MuiControls/MuiVolumeControl";
import MuiTrackControl from "./MuiControls/MuiTrackControl";
import MuiTimeSlider from "./MuiControls/MuiTimeSlider";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";

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
    playNext,
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
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <Widget>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "light" ? "#fff" : "rgba(0,0,0,0.87)",
            }}
          >
            <CoverImage>
              <img alt={music.title} src={music.image} />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                {music.artist}
              </Typography>
              <Typography noWrap>
                {/* <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b> */}
                <b>
                  {music.title} {/*(Can&apos;t win) */}
                </b>
              </Typography>
              <Typography noWrap letterSpacing={-0.25}>
                Album Name &mdash; Album Name
              </Typography>
            </Box>
          </Box>
          <MuiTimeSlider />
          {/* <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value as number)}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box> */}
          <MuiTrackControl />
          {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box> */}
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
            {/* <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} /> */}
          </Stack>
          <IconButton aria-label="like">
            <ThumbUpRoundedIcon htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="subscribe">
            <NotificationsRoundedIcon htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="share">
            <ReplyRoundedIcon htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="download">
            <DownloadRoundedIcon htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="add to library">
            <LibraryAddRoundedIcon htmlColor={mainIconColor} />
          </IconButton>
        </Widget>
        <WallPaper />
      </Box>
    </>
  );
}
