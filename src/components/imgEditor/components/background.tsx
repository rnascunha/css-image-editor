import React from "react";

import type { BackgroundProps } from "../types";
import ImageFitCommand from "./imageFit";
import { bgRepeatOpt } from "../constants";
import { dense_size } from "./dense";

import { InputStyled } from "@/components/styled/inputStyled";
import { SliderStyled } from "@/components/styled/sliderStyled";
import { InputLabelStyled, SelectStyled } from "@/components/styled/selectStyled";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Stack,
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
        <InputStyled
          label="Color"
          type="color"
          size={dense_size(dense)}
          value={props.color}
          sx={{
            "&.MuiFormControl-root.MuiTextField-root": {
              WebkitFlex: "unset",
              msFlex: "unset",
              flex: "unset",
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
          <SliderStyled
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
              sx={{
                color: "var(--text)",
              }}
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
          <InputLabelStyled id="image-bgrepeat-id">Repeat</InputLabelStyled>
          <SelectStyled
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
          </SelectStyled>
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
