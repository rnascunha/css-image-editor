"use client";

import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

import { useMediaQuery, PaletteMode } from "@mui/material";
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ThemeContext({
  children,
  theme,
}: {
  children: ReactNode;
  theme(theme: PaletteMode): ThemeOptions;
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"light" | "dark" | undefined>(undefined);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newTheme = prevMode === "light" ? "dark" : "light";
          window.localStorage.setItem("theme", newTheme);
          return newTheme;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    const newTheme =
      theme !== null
        ? theme === "dark"
          ? "dark"
          : "light"
        : prefersDarkMode
        ? "dark"
        : "light";
    setMode(newTheme);
  }, [prefersDarkMode]);

  const themeSet = useMemo(
    () => createTheme(theme(mode ?? "light")),
    [mode, theme]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeSet}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
