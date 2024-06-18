import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

export const InputStyled = styled(TextField)({
  '&': {
    height: "100%",
    backgroundColor: "var(--bgSoft)",
    borderRadius: "4px"
  },
  '& input': {
    color: "var(--text)"
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "var(--text)",
  },
  '& label': {
    backgroundColor: "var(--bgSoft)",
    borderRadius: "4px",
    paddingLeft: "5px",
    paddingRight: "5px",
    color: "var(--text)",
  },
});
