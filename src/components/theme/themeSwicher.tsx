"use client";

import { CSSProperties, useContext } from "react";

import { IconButton } from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { ColorModeContext } from "./themeContext";

interface ThemeSwicherProps {
  className?: string;
  style?: CSSProperties;
  sx?: SxProps;
}

export default function ThemeSwicher({className, style, sx}:ThemeSwicherProps) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton
      className={className}
      sx={{ ml: 1, ...sx }}
      style={style}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon
          sx={{
            color: "text.primary",
          }}
        />
      ) : (
        <Brightness4Icon
          sx={{
            color: "text.primary",
          }}
        />
      )}
    </IconButton>
  );
}
