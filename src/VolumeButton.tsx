import { FC } from "react";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";

type VolumeButtonProps = {
  mute: boolean;
  toggleMute: () => void;
  volume: number;
};

const VolumeButton: FC<VolumeButtonProps> = ({ mute, toggleMute, volume }) => {
  return mute ? (
    <VolumeOffIcon
      sx={{ color: "silver", "&:hover": "white" }}
      onClick={toggleMute}
    />
  ) : volume <= 20 ? (
    <VolumeMuteIcon
      sx={{ color: "silver", "&:hover": "white" }}
      onClick={toggleMute}
    />
  ) : volume <= 49 ? (
    <VolumeDownIcon
      sx={{ color: "silver", "&:hover": "white" }}
      onClick={toggleMute}
    />
  ) : (
    <VolumeUpIcon
      sx={{ color: "silver", "&:hover": "white" }}
      onClick={toggleMute}
    />
  );
};

export default VolumeButton;
