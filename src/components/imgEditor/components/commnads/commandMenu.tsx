import { ReactNode, SyntheticEvent } from "react";

import { dense_size } from "../dense";

import { AccordionCompact } from "@/components/styled/accordionStyled";

import { AccordionDetails, AccordionSummary } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface CommandMenuProps {
  id: string;
  name: string;
  children: ReactNode;
  dense: boolean;
  panelChange(
    panel: string
  ): (event: SyntheticEvent, isExpanded: boolean) => void;
  panelExpand(panel: string): boolean;
}

export default function CommandMenu({
  id,
  name,
  dense,
  panelChange,
  panelExpand,
  children,
}: CommandMenuProps) {
  return (
    <AccordionCompact
      expanded={panelExpand(`p${id}`)}
      onChange={panelChange(`p${id}`)}
      size={dense_size(dense)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        {name}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </AccordionCompact>
  );
}
