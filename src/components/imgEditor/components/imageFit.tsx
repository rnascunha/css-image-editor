import { defaultLimits, objectFitOpt } from "../constants";
import { dense_size } from "./dense";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

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
    <Stack
      direction="row"
      spacing={0.25}
      sx={{
        width: "100%",
      }}
    >
      <FormControl
        sx={{
          flex: 1,
        }}
      >
        <InputLabel id="image-objectfit-id">Fit Type</InputLabel>
        <Select
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
        </Select>
      </FormControl>
      <TextField
        label="X"
        type="number"
        size={dense_size(dense)}
        value={props.position[0]}
        disabled={disabled}
        sx={{
          maxWidth: "11ch",
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        inputProps={{
          ...defaultLimits.position,
        }}
        onChange={(ev) =>
          update("position", [+ev.target.value, props.position[1]])
        }
      />
      <TextField
        label="Y"
        type="number"
        size={dense_size(dense)}
        value={props.position[1]}
        disabled={disabled}
        sx={{
          maxWidth: "11ch",
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
