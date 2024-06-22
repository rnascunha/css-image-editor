import { Dispatch, SetStateAction } from "react";

import { updateCanvasSize, validateSize } from "./functions";
import { dense_icon_size, dense_size } from "../../dense";
import { CanvasSizesOptions } from "@/components/imgEditor/constants";

import { Stack, TextField, Tooltip } from "@mui/material";

import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";

interface CanvasDimensionCommandProps {
  dense: boolean;
  syncAspectRatio: boolean;
  size: CanvasSizesOptions;
  setDimension(s: CanvasSizesOptions): void;
  setSize: Dispatch<SetStateAction<CanvasSizesOptions>>;
}

export default function CanvasDimensionCommand({
  dense,
  size,
  syncAspectRatio,
  setDimension,
  setSize,
}: CanvasDimensionCommandProps) {
  return (
    <Stack
      direction="row"
      spacing={0.25}
      sx={{
        alignItems: "center",
      }}
      title="Container size"
    >
      <Tooltip disableFocusListener disableTouchListener title="Container size">
        <ImageAspectRatioIcon fontSize={dense_icon_size(dense)} />
      </Tooltip>
      <TextField
        size={dense_size(dense)}
        label="Width"
        InputLabelProps={{ shrink: true }}
        value={size.canvas?.[0] ?? ""}
        sx={{
          maxWidth: "9ch",
        }}
        error={size.canvas && !validateSize(size.canvas[0])}
        onChange={(ev) => {
          const newSize = updateCanvasSize(
            ev.target.value,
            size,
            syncAspectRatio,
            0
          );
          setSize(newSize);
          if (validateSize(ev.target.value)) setDimension(newSize);
        }}
      />
      <TextField
        size={dense_size(dense)}
        label="Height"
        InputLabelProps={{ shrink: true }}
        value={size.canvas?.[1] ?? ""}
        sx={{
          maxWidth: "9ch",
        }}
        error={size.canvas && !validateSize(size.canvas[1])}
        onChange={(ev) => {
          const newSize = updateCanvasSize(
            ev.target.value,
            size,
            syncAspectRatio,
            1
          );
          setSize(newSize);
          if (validateSize(ev.target.value)) setDimension(newSize);
        }}
      />
    </Stack>
  );
}
