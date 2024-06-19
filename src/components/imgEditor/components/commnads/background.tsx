import React from "react";

import type { BackgroundProps } from "../../types";
import ImageFitCommand from "./imageFit";
import { bgRepeatOpt } from "../../constants";
import { dense_size } from "../dense";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";

interface BackgroundCommandProps {
  props: BackgroundProps;
  dense: boolean;
  update(
    key: keyof BackgroundProps,
    value: BackgroundProps[keyof BackgroundProps]
  ): void;
}

export default function BackgroundCommand({
  props,
  dense,
  update,
}: BackgroundCommandProps) {
  return (
    <Stack spacing={0.5}>
      <Stack direction="row">
        <TextField
          label="Color"
          type="color"
          size={dense_size(dense)}
          value={props.color}
          sx={{
            "&.MuiFormControl-root.MuiTextField-root": {
              width: "8ch",
            },
          }}
          onChange={(ev) => update("color", ev.target.value)}
        />
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, flex: 1 }}
          alignItems="center"
          title="Opacity"
        >
          <OpacityIcon />
          <Slider
            aria-label="Opacity Background"
            value={props.opacity}
            size={dense_size(dense)}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={1}
            onChange={(event: Event, newValue: number | number[]) =>
              update("opacity", newValue as number)
            }
          />
        </Stack>
      </Stack>
      <Stack direction="row">
        <FormControlLabel
          control={
            <Checkbox
              size={dense_size(dense)}
              checked={props.use_image}
            />
          }
          label="Image"
          onChange={(ev) =>
            update("use_image", (ev.target as HTMLInputElement).checked)
          }
        />
        <FormControl>
          <InputLabel id="image-bgrepeat-id">Repeat</InputLabel>
          <Select
            labelId="image-bgrepeat-id"
            id="image-bgrepeat-id"
            size={dense_size(dense)}
            value={props.repeat}
            label="Repeat"
            disabled={!props.use_image}
            MenuProps={{
              disableAutoFocus: true,
              // disableListWrap: true
            }}
            onChange={(ev) =>
              update("repeat", ev.target.value as (typeof bgRepeatOpt)[number])
            }
          >
            {bgRepeatOpt.map((v) => (
              <MenuItem value={v} key={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <ImageFitCommand
        props={props}
        update={update}
        dense={dense}
        disabled={!props.use_image}
      />
    </Stack>
  );
}
