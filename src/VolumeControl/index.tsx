import { FC } from "react";
import PSlider from "../Pslider";
import VolumeButton from "./VolumeButton";
import { iconStyle } from "../utils";

type VolumeControlProps = {
  mute: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
};

const VolumeControl: FC<VolumeControlProps> = ({
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

  return (
    <>
      <VolumeButton mute={mute} toggleMute={toggleMute} volume={volume} />
      <PSlider
        sx={iconStyle}
        min={0}
        max={100}
        value={volume}
        onChange={volumeChange}
      />
    </>
  );
};

export default VolumeControl;
