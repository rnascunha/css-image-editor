"use client";

import styles from "./page.module.css";

import ThemeSwicher from "@/components/theme/themeSwicher";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavBar from "@/components/navbar/navbar";
import ImageEditor from "@/components/imgEditor/imageEditor";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function PageHome() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
        <ImageEditor />
      </Box>
    </Box>
  );
}
