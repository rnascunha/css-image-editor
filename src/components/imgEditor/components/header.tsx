import { uploadFile } from "@/lib/upload_file";

import History from "../history";
import {
  CanvasSizes,
  CanvasSizesOptions,
  supported_image_types,
} from "../constants";
import { ConfigProps } from "../types";
import { dense_icon_size, dense_size } from "./dense";

import MenuOptions from "@/components/menuOptions";
import VisuallyHiddenInput from "@/components/styled/hiddenInput";

import { IconButton, Stack, Switch, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import InfoIcon from "@mui/icons-material/Info";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

export interface ImageHeaderProps {
  image: string;
  image_name: string;
  setImage(img: string, img_name?: string): void;
  config: ConfigProps;
  setConfig(
    key: keyof ConfigProps,
    value?: string | CanvasSizes | CanvasSizesOptions
  ): void;
  upload_image(img: string, img_name: string): void;
  error(img: string): void;
  has_history: boolean;
  undo?: () => void;
  redo?: () => void;
}

export default function ImgHeader({
  image,
  image_name,
  setImage,
  config,
  upload_image,
  error,
  setConfig,
  has_history,
  undo,
  redo,
}: ImageHeaderProps) {
  return (
    <Stack direction="row" spacing="2px">
      <TextField
        size={dense_size(config.dense)}
        sx={{
          flex: 1,
        }}
        label="Image"
        value={image_name}
        onChange={(ev) => setImage(ev.target.value)}
        disabled={image !== "" && image_name !== image}
        InputProps={{
          endAdornment: (
            <Stack direction="row">
              <IconButton
                size={dense_size(config.dense)}
                component="label"
                title="Upload file"
                sx={{
                  color: "primary",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <OpenInBrowserIcon fontSize={dense_icon_size(config.dense)} />
                <VisuallyHiddenInput
                  type="file"
                  accept={supported_image_types.join(", ")}
                  onChange={(ev) => {
                    uploadFile(ev)
                      .then(({ data, files }) => {
                        upload_image(data as string, files[0].name);
                      })
                      .catch((e) => {
                        error(e.error);
                      });
                  }}
                />
              </IconButton>
              <IconButton
                size={dense_size(config.dense)}
                title="Remove image"
                sx={{
                  color: "primary",
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                onClick={() => setImage("")}
              >
                <CloseIcon fontSize={dense_icon_size(config.dense)} />
              </IconButton>
            </Stack>
          ),
        }}
      />
      {has_history && (
        <>
          <IconButton onClick={undo} disabled={undo === undefined}>
            <UndoIcon sx={{ p: 0.5 }} />
          </IconButton>
          <IconButton onClick={redo} disabled={redo === undefined}>
            <RedoIcon sx={{ p: 0.5 }} />
          </IconButton>
        </>
      )}
      <MenuOptions
        size={dense_size(config.dense)}
        options={{
          dense: {
            name: "Dense",
            icon: <FormatSizeIcon />,
            content: <Switch checked={config.dense} />,
            autoclose: false,
          },
          showInfo: {
            name: "Show info",
            icon: <InfoIcon />,
            content: <Switch checked={config.showInfo} />,
            autoclose: false,
          },
          optimizeImage: {
            name: "Optimize Image",
            icon: <FlashOnIcon />,
            content: <Switch checked={config.optimizeImage} />,
            autoclose: false,
          },
          background_transparency_pattern: {
            name: "Transparency pattern",
            icon: <ViewCompactIcon />,
            content: (
              <Switch checked={config.background_transparency_pattern} />
            ),
            autoclose: false,
          },
          expandOne: {
            name: "Exapand One",
            icon: <UnfoldMoreIcon />,
            content: <Switch checked={config.expandOne} />,
            autoclose: false,
          },
        }}
        callback={(name: string) => setConfig(name as keyof ConfigProps)}
        icon={<SettingsIcon fontSize={dense_icon_size(config.dense)} />}
      />
    </Stack>
  );
}
