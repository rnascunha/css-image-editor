import { Dispatch, SetStateAction } from "react";

import { dense_icon_size, dense_size } from "../../dense";
import { validateSize } from "./functions";
import { CanvasSizesOptions } from "@/components/imgEditor/constants";

import { Stack, TextField, Tooltip } from "@mui/material";

import PhotoIcon from "@mui/icons-material/Photo";

interface ImageDimensionCommandProps {
  dense: boolean;
  size: CanvasSizesOptions;
  setDimension(s: CanvasSizesOptions): void;
  setSize: Dispatch<SetStateAction<CanvasSizesOptions>>;
}

export default function ImageDimensionCommand({
  dense,
  size,
  setDimension,
  setSize,
}: ImageDimensionCommandProps) {
  return (
    <Stack
      direction="row"
      spacing={0.25}
      sx={{
        alignItems: "center",
      }}
      title="Image size"
    >
      <Tooltip disableFocusListener disableTouchListener title="Image size">
        <PhotoIcon fontSize={dense_icon_size(dense)} />
      </Tooltip>
      <TextField
        size={dense_size(dense)}
        label="Width"
        InputLabelProps={{ shrink: true }}
        value={size.image[0]}
        sx={{
          maxWidth: "9ch",
        }}
        error={!validateSize(size.image[0])}
        onChange={(ev) => {
          const newSize: CanvasSizesOptions = {
            canvas: size.canvas,
            image: [ev.target.value, size.image[1]],
            aspectRatio: undefined,
          };
          setSize(newSize);
          if (validateSize(ev.target.value)) setDimension(newSize);
        }}
      />
      <TextField
        size={dense_size(dense)}
        label="Height"
        InputLabelProps={{ shrink: true }}
        value={size.image[1]}
        sx={{
          maxWidth: "9ch",
        }}
        error={!validateSize(size.image[1])}
        onChange={(ev) => {
          const newSize: CanvasSizesOptions = {
            canvas: size.canvas,
            image: [size.image[0], ev.target.value],
            aspectRatio: undefined,
          };
          setSize(newSize);
          if (validateSize(ev.target.value)) setDimension(newSize);
        }}
      />
    </Stack>
  );
}
