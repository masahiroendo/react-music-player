import { FC, useContext } from "react";
import { Typography } from "@mui/material";

import { formatTime, iconStyle } from "../utils";
import PSlider from "../Pslider";
import PlayerContext from "../contexts/PlayModeContext";

const TimeControl: FC = () => {
  const { duration, audioRef, elapsedTime, updateElapsedTime } =
    useContext(PlayerContext);

  const handleChange = (_: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }
    audioRef.current.currentTime = value;
    updateElapsedTime(value);
  };

  return (
    <>
      <Typography sx={{ color: "silver" }}>
        {formatTime(elapsedTime)}
      </Typography>
      <PSlider
        sx={iconStyle}
        thumbless="true"
        value={audioRef.current.currentTime}
        max={duration}
        onChange={handleChange}
      />
      <Typography sx={{ color: "silver" }}>
        {formatTime(duration - elapsedTime)}
      </Typography>
    </>
  );
};

export default TimeControl;
