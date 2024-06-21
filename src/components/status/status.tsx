"use client";

import { useContext } from "react";

import { StatusMode, StatusModeContext } from "./statusContext";

import { Chip } from "@mui/material";

function statusColor(status:StatusMode){
  switch(status) {
    case StatusMode.IDLE:
      return "default";
    case StatusMode.ERROR:
      return "error";
    case StatusMode.SUCCESS:
      return "success";
    case StatusMode.WARNING:
      return "warning";
  }
}

export default function StatusIndicator() {
  const value = useContext(StatusModeContext);

  return <Chip size="small" label={value[0].toUpperCase()} color={statusColor(value)} />
}