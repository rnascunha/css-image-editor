import styles from "./navbar.module.css";

import { AppBar, Box, IconButton, Stack, Typography } from "@mui/material";
import ThemeSwicher from "@/components/theme/themeSwicher";
import StatusIndicator from "../status/status";
import ClearStorage from "./clear_storate";

export default function NavBar() {
  return (
    <AppBar className={styles.container} component="nav" position="static">
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
        <Stack direction="row" alignItems="center">
          <StatusIndicator />
          <ClearStorage />
          <ThemeSwicher sx={{ p: 0.5 }} />
        </Stack>
      </Box>
    </AppBar>
  );
}
