import styles from "./navbar.module.css";

import { AppBar, Box, Typography } from "@mui/material";
import ThemeSwicher from "@/components/theme/themeSwicher";

export default function NavBar() {
  return (
    <AppBar
      className={styles.container}
      component="nav"
      position="static"
    >
      <Box
        className={styles.content}
        sx={{
          backgroundColor: "background.soft",
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: "bold",
            marginLeft: 0.5,
          }}
        >
          CSS Image Editor
        </Typography>
        <ThemeSwicher sx={{ p: 0.5 }} />
      </Box>
    </AppBar>
  );
}
