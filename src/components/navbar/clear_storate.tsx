"use client";

import { useCallback } from "react";

import { clearStorage } from "@/lib/storage";

import { IconButton, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ClearStorage() {
  const del = useCallback(() => clearStorage(), []);

  return (
    <IconButton size="small" onClick={del}>
      <Tooltip title="Clear Storage">
        <DeleteIcon />
      </Tooltip>
    </IconButton>
  );
}
