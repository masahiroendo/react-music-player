import { Box } from "@mui/material";
import { FC, useContext } from "react";

import PlayerContext from "../contexts/PlayModeContext";

import "./wave.styles.scss";

const Wave: FC = () => {
  const { togglePlay } = useContext(PlayerContext);
  return (
    <Box onClick={togglePlay} className="loader">
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
      <Box className="stroke"></Box>
    </Box>
  );
};

export default Wave;
