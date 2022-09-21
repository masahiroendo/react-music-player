import { styled, Slider } from "@mui/material";
import { SliderUnstyledOwnProps } from "@mui/base/SliderUnstyled";

const PSlider = styled(Slider)<SliderUnstyledOwnProps & { thumbless?: string }>(
  ({ theme, thumbless = "false", ...props }) => {
    return {
      color: "silver",
      height: 2,
      "&:hover": {
        cursor: "auto",
      },
      "& .MuiSlider-thumb": {
        width: "13px",
        height: "13px",
        display: thumbless === "true" ? "none" : "block",
      },
    };
  }
);

export default PSlider;
