import {
  Filters,
  Transforms,
  filterOptions,
  transformOptions,
} from "../constants";
import { dense_icon_size, dense_size } from "./dense";

import type { OptionDescription } from "@/components/menuOptions";
import InputWithUnitStyled from "@/components/styled/inputWithUnit";

import {
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type SetData = (index: number, value: number) => void;
type SetDataTwo = (index: number, value: number, i: number) => void;
type SetDataFour = (index: number, value: number | string, i: number) => void;
type DeleteData = (index: number) => void;

type ConfigType = OptionDescription & {
  unit: string;
  unitSymbol?: string;
  min?: number;
  max?: number;
  step: number;
  initValue: number | [number, number] | [number, number, number, string];
};

export function SliderInputValue({
  index,
  value,
  config,
  setProps,
  deleteProp,
  dense,
}: {
  index: number;
  value: number;
  config: ConfigType;
  setProps: SetData;
  deleteProp: DeleteData;
  dense: boolean;
}) {
  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ mb: 1, flex: 1 }}
      alignItems="center"
      title={config.name}
    >
      {config.icon}
      <TextField
        label={config.name}
        type="number"
        size={dense_size(dense)}
        value={value}
        sx={{
          minWidth: "10ch",
          marginLeft: 0,
        }}
        inputProps={{
          step: config.step,
          min: config.min,
          max: config.max,
        }}
        InputProps={{
          endAdornment: config.unit ? (
            <InputAdornment
              position="end"
            >
              {config.unitSymbol ?? config.unit}
            </InputAdornment>
          ) : undefined,
        }}
        onChange={(ev) => setProps(index, +ev.target.value)}
      />
      <Slider
        aria-label={config.name}
        value={value}
        size={dense_size(dense)}
        valueLabelDisplay="auto"
        step={config.step}
        min={config.min}
        max={config.max}
        onChange={(event: Event, newValue: number | number[]) =>
          setProps(index, newValue as number)
        }
      />
      <IconButton
        onClick={() => deleteProp(index)}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

export function InputTwoValue({
  index,
  value,
  config,
  setProps,
  deleteProp,
  dense,
}: {
  index: number;
  value: [number, number];
  config: ConfigType;
  setProps: SetDataTwo;
  deleteProp: DeleteData;
  dense: boolean;
}) {
  return (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{ flex: 1 }}
      alignItems="center"
      title={config.name}
    >
      {config.icon}
      <TextField
        label={`${config.name} X`}
        type="number"
        size={dense_size(dense)}
        value={value[0]}
        sx={{
          flex: 1,
          marginLeft: 0,
        }}
        inputProps={{
          step: config.step,
          min: config.min,
          max: config.max,
        }}
        InputProps={{
          endAdornment: config.unit ? (
            <InputAdornment
              position="end"
            >
              {config.unitSymbol ?? config.unit}
            </InputAdornment>
          ) : undefined,
        }}
        onChange={(ev) => setProps(index, +ev.target.value, 0)}
      />
      <TextField
        label={`${config.name} Y`}
        type="number"
        size={dense_size(dense)}
        value={value[1]}
        sx={{
          flex: 1,
          marginLeft: 0,
        }}
        inputProps={{
          step: config.step,
          min: config.min,
          max: config.max,
        }}
        InputProps={{
          endAdornment: config.unit ? (
            <InputAdornment
              position="end"
            >
              {config.unitSymbol ?? config.unit}
            </InputAdornment>
          ) : undefined,
        }}
        onChange={(ev) => setProps(index, +ev.target.value, 1)}
      />
      <IconButton
        onClick={() => deleteProp(index)}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}

export function InputThreeValueAndColor({
  index,
  value,
  config,
  setProps,
  deleteProp,
  dense,
}: {
  index: number;
  value: [number, number, number, string];
  config: ConfigType;
  setProps: SetDataFour;
  deleteProp: DeleteData;
  dense: boolean;
}) {
  return (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{ flex: 1 }}
      alignItems="center"
      title={config.name}
    >
      {config.icon}
      <Stack spacing={1}>
        <Stack direction="row" spacing={0.5}>
          <InputWithUnitStyled
            label="X"
            type="number"
            size={dense_size(dense)}
            value={value[0]}
            sx={{
              flex: 1,
              marginLeft: 0,
            }}
            inputProps={{
              step: config.step,
              min: config.min,
              max: config.max,
            }}
            units="px"
            onChange={(ev) => setProps(index, +ev.target.value, 0)}
          />
          <InputWithUnitStyled
            label="Y"
            type="number"
            size={dense_size(dense)}
            value={value[1]}
            sx={{
              flex: 1,
              marginLeft: 0,
            }}
            inputProps={{
              step: config.step,
              min: config.min,
              max: config.max,
            }}
            units="px"
            onChange={(ev) => setProps(index, +ev.target.value, 1)}
          />
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <InputWithUnitStyled
            label={`Deviation`}
            type="number"
            size={dense_size(dense)}
            value={value[2]}
            sx={{
              flex: 1,
              marginLeft: 0,
            }}
            inputProps={{
              step: config.step,
              min: 0,
              max: config.max,
            }}
            units="px"
            onChange={(ev) => setProps(index, +ev.target.value, 2)}
          />
          <TextField
            label="Color"
            type="color"
            size={dense_size(dense)}
            value={value[3]}
            sx={{
              flex: 1,
              marginLeft: 0,
            }}
            onChange={(ev) => setProps(index, ev.target.value, 3)}
          />
        </Stack>
      </Stack>
      <IconButton onClick={() => deleteProp(index)}>
        <DeleteIcon fontSize={dense_icon_size(dense)} />
      </IconButton>
    </Stack>
  );
}

export function filterComponent(
  index: number,
  key: Filters,
  value: number | [number, number, number, string],
  setProps: SetData,
  setPropsFour: SetDataFour,
  deleteProp: DeleteData,
  dense: boolean
) {
  switch (key) {
    case "drop-shadow":
      return (
        <InputThreeValueAndColor
          key={index}
          index={index}
          dense={dense}
          value={value as [number, number, number, string]}
          config={filterOptions["drop-shadow"]}
          setProps={setPropsFour}
          deleteProp={deleteProp}
        />
      );
    default:
      return (
        <SliderInputValue
          key={index}
          index={index}
          dense={dense}
          value={value as number}
          config={filterOptions[key]}
          setProps={setProps}
          deleteProp={deleteProp}
        />
      );
  }
}

export function transformComponent(
  index: number,
  key: Transforms,
  value: number | [number, number],
  setProps: SetData,
  setPropsTwo: SetDataTwo,
  deleteProp: DeleteData,
  dense: boolean
) {
  switch (key) {
    case "translate":
    case "skew":
    case "scale":
      return (
        <InputTwoValue
          key={index}
          index={index}
          dense={dense}
          value={value as [number, number]}
          config={transformOptions[key]}
          setProps={setPropsTwo}
          deleteProp={deleteProp}
        />
      );
    case "rotate":
      return (
        <SliderInputValue
          key={index}
          index={index}
          dense={dense}
          value={value as number}
          config={transformOptions["rotate"]}
          setProps={setProps}
          deleteProp={deleteProp}
        />
      );
  }
}
