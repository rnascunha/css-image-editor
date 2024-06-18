import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material";

export interface OptionDescription {
  name: string;
  icon: React.ReactNode;
  autoclose?: boolean;
  content?: React.ReactNode;
}

export type OptionsDescriptionArray<T extends OptionDescription = OptionDescription> = Record<string, T>;

export default function MenuOptions({
  options,
  callback,
  sx,
  icon,
  size
}: {
  options: OptionsDescriptionArray;
  callback(name:string): void;
  sx?: SxProps<Theme>;
  icon?: React.ReactNode;
  size?: "small" | "large" | "medium"
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        size={size ?? "large"}
        sx={sx}
      >
        {icon ?? <MoreVertIcon
          sx={{
            fontSize: "20px",
          }}
        />}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            style: {
              padding: 3,
            },
          },
        }}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem
            key={key}
            onClick={() => {
              if (value.autoclose === undefined || value.autoclose) handleClose();
              callback?.(key);
            }}
          >
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText>{value.name}</ListItemText>
            {value.content}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
