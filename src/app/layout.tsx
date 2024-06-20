import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import "./globals.css";

import { ThemeContext } from "@/components/themeContext";
import colorTheme from "@/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";

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
            <CssBaseline enableColorScheme />
            {children}
          </ThemeContext>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
