import { useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Slider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { formatTime } from "../utils";
import PlayerContext from "../contexts/PlayModeContext";

type Props = {};

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
  color: "light" ? "#fff" : "rgba(0,0,0,0.87)",
});

const MuiTimeSlider = (props: Props) => {
  const { audioRef, duration, elapsedTime, updateElapsedTime } =
    useContext(PlayerContext);
  const theme = useTheme();

  const handledChange = (_: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }
    audioRef.current.currentTime = value;
    updateElapsedTime(value);
  };

  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={audioRef.current.currentTime}
        max={duration}
        onChange={handledChange}
        sx={{
          color: theme.palette.mode === "light" ? "#fff" : "rgba(0,0,0,0.87)",
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
                theme.palette.mode === "light"
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
        <TinyText>{formatTime(elapsedTime)}</TinyText>
        <TinyText>-{formatTime(duration - elapsedTime)}</TinyText>
      </Box>
    </>
  );
};

export default MuiTimeSlider;
