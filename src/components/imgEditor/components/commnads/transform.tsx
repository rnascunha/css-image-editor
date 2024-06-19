import MenuOptions from "@/components/menuOptions";
import { dense_size } from "../dense";
import { Props, SetPropsType } from "../../types";
import { transformOptions, defaultLimits } from "../../constants";
import { ListTransform } from "../draggableList";
import { transformComponent } from "./setValue";

import { InputAdornment, Stack, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

interface CommandTransformProps {
  props: Props;
  dense: boolean;
  setProps: SetPropsType;
}

export default function CommandTransform({
  props,
  dense,
  setProps,
}: CommandTransformProps) {
  const optionsTransformCallback = (name: string) => {
    setProps((prev) => {
      const transforms = [
        ...prev.transforms,
        {
          key: name,
          value: transformOptions[name].initValue,
        },
      ];
      return { ...prev, transforms };
    });
  };

  const deleteTransform = (index: number) => {
    setProps((prev) => {
      const transforms = prev.transforms.filter((v, i) => i !== index);
      return { ...prev, transforms };
    });
  };

  const setTransformTwo = (index: number, value: number, idx: number) => {
    setProps((prev) => {
      const [v0, v1] = prev.transforms[index].value as [number, number];
      prev.transforms[index].value = idx === 0 ? [value, v1] : [v0, value];
      return { ...prev };
    });
  };

  const setTransform = (index: number, value: number) =>
    setProps((prev) => {
      prev["transforms"][index].value = value;
      return {
        ...prev,
      };
    });

  return (
    <Stack direction="column">
      <Stack
        direction="row"
        spacing={0.25}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <TextField
          label="X"
          type="number"
          size={dense_size(dense)}
          value={props.translate[0]}
          sx={{
            flex: 1,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
          onChange={(ev) => {
            setProps({
              ...props,
              translate: [+ev.target.value, props.translate[1]],
            });
          }}
        />
        <TextField
          label="Y"
          type="number"
          size={dense_size(dense)}
          value={props.translate[1]}
          sx={{
            flex: 1,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
          onChange={(ev) => {
            setProps({
              ...props,
              translate: [props.translate[0], +ev.target.value],
            });
          }}
        />
        <TextField
          label="Zoom"
          type="number"
          size={dense_size(dense)}
          value={props.zoom}
          sx={{
            minWidth: "8ch",
            flex: 0.8,
          }}
          inputProps={{
            ...defaultLimits.zoom,
          }}
          onChange={(ev) => {
            setProps({
              ...props,
              zoom: +ev.target.value,
            });
          }}
        />
        <MenuOptions
          options={transformOptions}
          callback={optionsTransformCallback}
          icon={<AddIcon sx={{ fontSize: "20px" }} />}
        />
      </Stack>
      {props.transforms.length === 0 ? (
        <div style={{ color: "grey", fontStyle: "italic" }}>
          No tranfsforms added
        </div>
      ) : (
        <ListTransform
          items={props.transforms}
          componentFunc={(idx, key, value) =>
            transformComponent(
              idx,
              key,
              value,
              setTransform,
              setTransformTwo,
              deleteTransform,
              dense
            )
          }
          update={(n) => setProps((prev) => ({ ...prev, transforms: n }))}
        />
      )}
    </Stack>
  );
}
