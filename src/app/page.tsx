"use client";

import styles from "./page.module.css";


import { Box } from "@mui/material";
import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import ImageEditorComponent from "./editor";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function PageHome() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      className={styles.container}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <NavBar />
      <Box sx={{ display: "flex", p: 1, flex: 1, width: "100%" }}>
        <ImageEditorComponent />
      </Box>
    </Box>
  );
}
