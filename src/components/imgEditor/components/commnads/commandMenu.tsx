import {
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryStyled,
} from "@/components/styled/accordionStyled";
import { ReactNode, SyntheticEvent } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { dense_size } from "../dense";

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
    <AccordionStyled
      expanded={panelExpand(`p${id}`)}
      onChange={panelChange(`p${id}`)}
    >
      <AccordionSummaryStyled
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        size={dense_size(dense)}
      >
        {name}
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>{children}</AccordionDetailsStyled>
    </AccordionStyled>
  );
}
