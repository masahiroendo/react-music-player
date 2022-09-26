import { FC } from "react";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { iconStyle } from "../utils";

type VolumeButtonProps = {
  mute: boolean;
  toggleMute: () => void;
  volume: number;
};

const VolumeButton: FC<VolumeButtonProps> = ({ mute, toggleMute, volume }) => {
  return mute ? (
    <VolumeOffIcon titleAccess="mute" sx={iconStyle} onClick={toggleMute} />
  ) : volume <= 32 ? (
    <VolumeMuteIcon sx={iconStyle} onClick={toggleMute} />
  ) : volume <= 65 ? (
    <VolumeDownIcon sx={iconStyle} onClick={toggleMute} />
  ) : (
    <VolumeUpIcon sx={iconStyle} onClick={toggleMute} />
  );
};

export default VolumeButton;
