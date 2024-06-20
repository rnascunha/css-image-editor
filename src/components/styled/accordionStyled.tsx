import { styled } from "@mui/system";
import {
  Accordion,  
  AccordionProps,
} from "@mui/material";

const small_size = "36px";
const medium_size = "64px";

interface AccordionCompactProps extends AccordionProps {
  size?: "small" | "medium";
}

export const AccordionCompact = styled(Accordion)<AccordionCompactProps>(({ theme, size }) => ({
  backgroundColor: theme.palette.background.soft,
  borderRadius: "5px",
  "&.MuiAccordion-root.Mui-expanded": {
    margin: 0,
  },
  "&.MuiAccordion-root > .MuiAccordionSummary-root": {
    minHeight: size === "small" ? small_size : medium_size,
    height: size === "small" ? small_size : medium_size,
  },
  "&.MuiAccordion-root > .MuiAccordionSummary-root.Mui-expanded": {
    minHeight: size === "small" ? small_size : medium_size,
    height: size === "small" ? small_size : medium_size,
  },
  "&.MuiAccordion-root .MuiAccordionDetails-root": {
    padding: "8px 8px 8px",
  }
}));