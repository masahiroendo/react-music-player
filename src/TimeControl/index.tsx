import { FC, useState } from "react";
import { Typography } from "@mui/material";

import { formatTime, iconStyle } from "../utils";
import PSlider from "../Pslider";

type TimeControlProps = {
  audio: HTMLAudioElement;
  elapsedTime: number;
  duration: number;
};

const TimeControl: FC<TimeControlProps> = ({
  elapsedTime,
  duration,
  audio,
}) => {
  const [_, setTime] = useState(elapsedTime);

  const handleChange = (_: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }
    audio.currentTime = value;
    setTime(value);
  };

  return (
    <>
      <Typography sx={{ color: "silver" }}>
        {formatTime(elapsedTime)}
      </Typography>
      <PSlider
        sx={iconStyle}
        thumbless="true"
        value={audio.currentTime}
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
