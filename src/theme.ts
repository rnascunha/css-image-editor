"use client";

import { Roboto } from "next/font/google";
import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const bothTheme = {
  btn: "#3673fd",
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
};

const colorTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          ...bothTheme,
          primary: {
            main: "#0d0c22",
          },
          text: {
            primary: "#0d0c22",
            secondary: "#2d2d42",
          },
          background: {
            default: "#fff",
            soft: "#f0f0f0",
          },
        }
      : {
          ...bothTheme,
          primary: { main: "#fff" },
          text: {
            primary: "#fff",
            secondary: "#f0f0f0",
          },
          background: {
            default: "#0d0c22",
            soft: "#2d2d42",
          },
        }),
  },
});

export default colorTheme;
