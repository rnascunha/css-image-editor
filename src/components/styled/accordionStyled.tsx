import { styled } from "@mui/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";

const small_size = "36px";
const medium_size = "64px";

export const AccordionStyled = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.soft,
  borderRadius: "5px",
  "&.MuiAccordion-root.Mui-expanded": {
    margin: 0,
  },
}));

interface AccordionSummaryStyledProps extends AccordionSummaryProps {
  size?: "small" | "medium";
}

export const AccordionSummaryStyled = styled(
  AccordionSummary
)<AccordionSummaryStyledProps>(({ size }) => ({
  "&.MuiAccordionSummary-root": {
    minHeight: size === "small" ? small_size : medium_size,
    height: size === "small" ? small_size : medium_size,
  },
  "&.MuiAccordionSummary-root.Mui-expanded": {
    minHeight: size === "small" ? small_size : medium_size,
    height: size === "small" ? small_size : medium_size,
  },
}));

export const AccordionDetailsStyled = styled(AccordionDetails)({
  padding: "8px 8px 8px",
});
