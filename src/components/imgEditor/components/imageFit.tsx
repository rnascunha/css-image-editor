import { defaultLimits, objectFitOpt } from "../constants";
import { dense_size } from "./dense";

import { InputStyled } from "@/components/styled/inputStyled";
import { InputLabelStyled, SelectStyled } from "@/components/styled/selectStyled";

import { FormControl, InputAdornment, MenuItem, Stack } from "@mui/material";

interface FitProps {
  fit: (typeof objectFitOpt)[number];
  position: [number, number];
}

interface ImageFitCommandProps {
  props: FitProps;
  disabled?: boolean;
  update(key: keyof FitProps, value: FitProps[keyof FitProps]): void;
  dense: boolean;
}

export default function ImageFitCommand({
  props,
  update,
  disabled,
  dense,
}: ImageFitCommandProps) {
  return (
    <Stack direction="row" spacing={0.25}>
      <FormControl
        sx={{
          flex: 1,
        }}
      >
        <InputLabelStyled id="image-objectfit-id">Fit Type</InputLabelStyled>
        <SelectStyled
          labelId="image-objectfit-id"
          id="image-objectfit-id"
          size={dense_size(dense)}
          value={props.fit}
          label="Type"
          disabled={disabled}
          onChange={(ev) =>
            update("fit", ev.target.value as (typeof objectFitOpt)[number])
          }
        >
          {objectFitOpt.map((v) => (
            <MenuItem value={v} key={v}>
              {v}
            </MenuItem>
          ))}
        </SelectStyled>
      </FormControl>
      <InputStyled
        label="X"
        type="number"
        size={dense_size(dense)}
        value={props.position[0]}
        disabled={disabled}
        sx={{
          maxWidth: "11ch",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              sx={{
                "& p": {
                  color: "var(--text)",
                },
              }}
              position="end"
            >
              %
            </InputAdornment>
          ),
        }}
        inputProps={{
          ...defaultLimits.position,
        }}
        onChange={(ev) =>
          update("position", [+ev.target.value, props.position[1]])
        }
      />
      <InputStyled
        label="Y"
        type="number"
        size={dense_size(dense)}
        value={props.position[1]}
        disabled={disabled}
        sx={{
          maxWidth: "11ch",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment
              sx={{
                "& p": {
                  color: "var(--text)",
                },
              }}
              position="end"
            >
              %
            </InputAdornment>
          ),
        }}
        inputProps={{
          ...defaultLimits.position,
        }}
        onChange={(ev) =>
          update("position", [props.position[0], +ev.target.value])
        }
      />
    </Stack>
  );
}
