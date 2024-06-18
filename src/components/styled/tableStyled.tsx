"use client";

import styled from "@emotion/styled";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)({
  '&': {
    backgroundColor: "var(--bgSoft)",
    color: "var(--text)",
    textAlign: "center"
  },
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
    textAlign: "center"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
});

export const StyledTableRow = styled(TableRow)({
  '& td': {
    borderBottomColor: "var(--text)",
  },
  '& th': {
    backgroundColor: 'var(--btn)'
  }
});
