export const formatTime = (time: number): string => {
  if (time && !isNaN(time)) {
    const minutes =
      Math.floor(time / 60) < 10
        ? `0${Math.floor(time / 60)}`
        : Math.floor(time / 60);
    const seconds =
      Math.floor(time % 60) < 10
        ? `0${Math.floor(time % 60)}`
        : Math.floor(time % 60);

    return `${minutes}:${seconds}`;
  }
  return "00:00";
};

export const iconStyle = { color: "silver", "&:hover": { color: "white" } };

export const getRandomTrackIndex = (index: number, size: number): number => {
  let randomIndex = Math.floor(Math.random() * size);
  do {
    randomIndex = Math.floor(Math.random() * size);
  } while (index === randomIndex);

  return randomIndex % size;
};
