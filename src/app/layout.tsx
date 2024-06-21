import "./globals.css";
import styles from "./layout.module.css";

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

import { ThemeContext } from "@/components/theme/themeContext";
import colorTheme from "@/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { Box, CssBaseline } from "@mui/material";
import NavBar from "@/components/navbar/navbar";
import { StatusContext } from "@/components/status/statusContext";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CSS Image Editor",
  description: "Playground to edit a image using CSS primitives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeContext theme={colorTheme}>
            <StatusContext>
              <CssBaseline enableColorScheme />
              <Box
                className={styles.container}
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                }}
              >
                <NavBar />
                <Box sx={{ display: "flex", p: 1, flex: 1, width: "100%" }}>
                  {children}
                </Box>
              </Box>
            </StatusContext>
          </ThemeContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
