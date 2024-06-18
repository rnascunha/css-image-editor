import styled from "@emotion/styled";
import { Accordion, AccordionSummary, AccordionSummaryProps } from "@mui/material";

type AccordionSummaryStyledProps = AccordionSummaryProps & {
  size?: "small" | "medium";
};

const small_size = "36px";
const medium_size = "64px";

export const AccordionStyled = styled(Accordion)({
  backgroundColor: "var(--bg)",
  color: "var(--text)",
  boxShadow: "0px 2px 1px -1px rgb(from var(--text) r g b / 0.2), 0px 1px 1px 0px rgb(from var(--text) r g b / 0.14), 0px 1px 3px 0px rgb(from var(--text) r g b / 0.12)"
})

export const AccordionSummaryStyled = styled(
  ({ size, children, sx, ...props }: AccordionSummaryStyledProps) => (
    <AccordionSummary
      {...props}
      sx={{
        "&.MuiAccordionSummary-root": {
          minHeight: size === "small" ? small_size : medium_size,
          height: size === "small" ? small_size : medium_size,
        },
        "&.MuiAccordionSummary-root.Mui-expanded": {
          minHeight: size === "small" ? small_size : medium_size,
          height: size === "small" ? small_size : medium_size,
        },
        ...sx
      }}
    >
      {children}
    </AccordionSummary>
  )
)();
