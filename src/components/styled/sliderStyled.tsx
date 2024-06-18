import styled from "@emotion/styled";
import Slider from "@mui/material/Slider";

export const SliderStyled = styled(Slider)({
  color: "var(--text)",
  '& .MuiSlider-thumb': {
    backgroundColor: 'var(--text)',
  }
})