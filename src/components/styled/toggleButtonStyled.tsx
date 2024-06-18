import styled from "@emotion/styled";
import { ToggleButton } from "@mui/material";


const ToggleButtonStyled = styled(ToggleButton)({
  color: "var(--text)",
  border: "1px solid var(--bgSoft)",
  '&.Mui-selected': {
    color: "var(--text)",
    backgroundColor: "var(--bgSoft)",
  }
});

export default ToggleButtonStyled;