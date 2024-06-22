import { Dispatch, SetStateAction } from "react";

import { dense_icon_size, dense_size } from "../../dense";
import { ImageReference } from "@/components/imgEditor/types";
import { CanvasSizesOptions } from "@/components/imgEditor/constants";
import {
  calcInstrisicImageAspectRatio,
  getSyncResizeCanvas,
} from "./functions";

import { IconButton, Stack, TextField, Tooltip } from "@mui/material";

import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";

interface AspectRatioCommandProps {
  dense: boolean;
  imgRef: ImageReference | null;
  syncAspectRatio: boolean;
  size: CanvasSizesOptions;
  dsize: CanvasSizesOptions;
  setDimension(s: CanvasSizesOptions): void;
  setSize: Dispatch<SetStateAction<CanvasSizesOptions>>;
  setSyncAspectRatio: Dispatch<SetStateAction<boolean>>;
}

export default function AspectRatioCommand({
  dense,
  imgRef,
  syncAspectRatio,
  size,
  dsize,
  setDimension,
  setSize,
  setSyncAspectRatio,
}: AspectRatioCommandProps) {
  return (
    <Stack
      direction="row"
      spacing={0.25}
      sx={{
        alignItems: "center",
      }}
      title="Aspect Ratio"
    >
      <Tooltip disableFocusListener disableTouchListener title="Aspect ratio">
        <AspectRatioIcon fontSize={dense_icon_size(dense)} />
      </Tooltip>
      <TextField
        size={dense_size(dense)}
        label="Horizontal"
        type="number"
        InputLabelProps={{ shrink: true }}
        disabled={imgRef === null || !syncAspectRatio}
        value={size.aspectRatio?.[0] ?? ""}
        sx={{
          maxWidth: "9ch",
        }}
        inputProps={{
          min: 1,
          step: 1,
        }}
        onChange={(ev) => {
          setSize((prev) => ({
            ...prev,
            aspectRatio: [
              +ev.target.value,
              (prev.aspectRatio as [number, number])[1],
            ],
          }));
          if (syncAspectRatio)
            setDimension({
              ...dsize,
              aspectRatio: [
                +ev.target.value,
                (size.aspectRatio as [number, number])[1],
              ],
            });
        }}
      />
      <TextField
        size={dense_size(dense)}
        label="Vertical"
        type="number"
        InputLabelProps={{ shrink: true }}
        disabled={imgRef === null || !syncAspectRatio}
        value={size.aspectRatio?.[1] ?? ""}
        sx={{
          maxWidth: "9ch",
        }}
        inputProps={{
          min: 1,
          step: 1,
        }}
        onChange={(ev) => {
          setSize((prev) => ({
            ...prev,
            aspectRatio: [
              (prev.aspectRatio as [number, number])[0],
              +ev.target.value,
            ],
          }));
          if (syncAspectRatio)
            setDimension({
              ...dsize,
              aspectRatio: [
                (size.aspectRatio as [number, number])[0],
                +ev.target.value,
              ],
            });
        }}
      />
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={"Set image aspect ratio"}
      >
        <span>
          <IconButton
            disabled={!syncAspectRatio}
            onClick={() => {
              const aspectRatio = calcInstrisicImageAspectRatio(imgRef);
              setSize((prev) => ({
                ...prev,
                canvas: dsize.canvas,
                aspectRatio,
              }));
              setDimension({
                ...dsize,
                aspectRatio,
              });
            }}
          >
            <SettingsOverscanIcon fontSize={dense_icon_size(dense)} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={syncAspectRatio ? "Syncing" : "Not syncing"}
      >
        <IconButton
          onClick={() => {
            setSyncAspectRatio((prev) => !prev);
            setDimension({
              ...dsize,
              canvas: getSyncResizeCanvas(size, dsize, !syncAspectRatio),
              aspectRatio: size.aspectRatio,
            });
          }}
        >
          {syncAspectRatio ? (
            <SyncIcon fontSize={dense_icon_size(dense)} />
          ) : (
            <SyncDisabledIcon fontSize={dense_icon_size(dense)} />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
