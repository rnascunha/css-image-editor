import styles from "./navbar.module.css";

import { AppBar, Box } from "@mui/material";
import ThemeSwicher from "@/components/theme/themeSwicher";

export default function NavBar() {
  return (
    <AppBar
      className={styles.container}
      component="nav"
      sx={{
        position: "static",
      }}
    >
      <Box
        className={styles.content}
        sx={{
          backgroundColor: "background.soft",
        }}
      >
        <ThemeSwicher sx={{ p: 0.5 }} />
      </Box>
    </AppBar>
  );
}
