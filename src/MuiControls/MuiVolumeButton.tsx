import { FC } from "react";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeMuteRounded from "@mui/icons-material/VolumeMuteRounded";
import { useTheme } from "@mui/material/styles";

type MuiVolumeButtonProps = {
  mute: boolean;
  toggleMute: () => void;
  volume: number;
};

export const MuiVolumeLowButton: FC<MuiVolumeButtonProps> = ({
  mute,
  toggleMute,
  volume,
}) => {
  const theme = useTheme();
  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.4)"
      : "rgba(0,0,0,0.4)";

  return mute || volume === 0 ? (
    <VolumeOffRoundedIcon
      titleAccess="mute"
      htmlColor={lightIconColor}
      onClick={toggleMute}
    />
  ) : volume < 32 ? (
    <VolumeMuteRounded htmlColor={lightIconColor} onClick={toggleMute} />
  ) : (
    <VolumeDownRounded htmlColor={lightIconColor} onClick={toggleMute} />
  );
};

export const MuiVolumeHighButton = () => {
  const theme = useTheme();
  const lightIconColor =
    theme.palette.mode === "light"
      ? "rgba(255,255,255,0.4)"
      : "rgba(0,0,0,0.4)";
  return <VolumeUpRounded htmlColor={lightIconColor} />;
};
