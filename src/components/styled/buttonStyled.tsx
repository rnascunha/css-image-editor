import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

export const ButtonStyled = styled(
  ({ children, sx, ...props }: ButtonProps) => (
    <Button
      {...props}
      sx={{
        border: "1px var(--textSoft) solid",
        color: "var(--text)",
        backgroundColor: "var(--bgSoft)",
        ...sx,
      }}
    >
      {children}
    </Button>
  )
)();
