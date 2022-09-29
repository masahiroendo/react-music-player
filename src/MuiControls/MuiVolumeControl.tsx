import { useTheme } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import { FC } from "react";
import { MuiVolumeLowButton, MuiVolumeHighButton } from "./MuiVolumeButton";
import { IconButton } from "@mui/material";

type VolumeControlProps = {
  mute: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
};

const MuiVolumeControl: FC<VolumeControlProps> = ({
  mute,
  toggleMute,
  volume,
  setVolume,
}) => {
  const volumeChange = (_: Event, v: number | number[]) => {
    if (Array.isArray(v)) {
      return;
    }
    setVolume(v);
  };

  const theme = useTheme();

  return (
    <>
      <IconButton>
        <MuiVolumeLowButton
          mute={mute}
          toggleMute={toggleMute}
          volume={volume}
        />
      </IconButton>
      <Slider
        aria-label="Volume-control"
        min={0}
        max={100}
        // defaultValue={30}
        sx={{
          color: theme.palette.mode === "light" ? "#fff" : "rgba(0,0,0,0.87)",
          "& .MuiSlider-track": {
            border: "none",
          },
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            backgroundColor: "#fff",
            "&:before": {
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
              boxShadow: "none",
            },
          },
        }}
        value={volume}
        onChange={volumeChange}
      />
      {/* <PSlider
        sx={iconStyle}
        min={0}
        max={100}
        value={volume}
        onChange={volumeChange}
      /> */}
      <IconButton>
        <MuiVolumeHighButton />
      </IconButton>
    </>
  );
};

export default MuiVolumeControl;
