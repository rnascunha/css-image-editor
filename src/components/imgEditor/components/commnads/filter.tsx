import { Props, SetPropsType } from "../../types";
import { filterOptions } from "../../constants";
import { ListFilter } from "../draggableList";
import { filterComponent } from "./setValue";

import MenuOptions from "@/components/menuOptions";

import { Box, Stack, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

interface CommandFilterProps {
  dense: boolean;
  props: Props;
  setProps: SetPropsType;
}

export default function CommandFilter({
  dense,
  props,
  setProps,
}: CommandFilterProps) {
  const optionsFilterCallback = (name: string) => {
    setProps((prev) => {
      const filters = [
        ...prev.filters,
        { key: name, value: filterOptions[name].initValue },
      ];
      return { ...prev, filters };
    });
  };

  const setData = (
    index: number,
    value: number,
    type: "filters" | "transforms"
  ) => {
    setProps((prev) => {
      prev[type][index].value = value;
      return {
        ...prev,
      };
    });
  };

  const setFilter = (index: number, value: number) =>
    setData(index, value, "filters");

  const deleteFilter = (index: number) => {
    setProps((prev) => {
      const filters = prev.filters.filter((v, i) => i !== index);
      return { ...prev, filters };
    });
  };

  const setFilterFour = (
    index: number,
    value: number | string,
    idx: number
  ) => {
    setProps((prev) => {
      const [v0, v1, v2, color] = prev.filters[index].value as [
        number,
        number,
        number,
        string
      ];
      switch (idx) {
        case 0:
          prev.filters[index].value = [value as number, v1, v2, color];
          break;
        case 1:
          prev.filters[index].value = [v0, value as number, v2, color];
          break;
        case 2:
          prev.filters[index].value = [v0, v1, value as number, color];
          break;
        case 3:
          prev.filters[index].value = [v0, v1, v2, value as string];
          break;
      }
      return { ...prev };
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <MenuOptions
          options={filterOptions}
          callback={optionsFilterCallback}
          sx={{
            position: "absolute",
            top: "-3px",
            right: "40px",
          }}
          icon={
            <Tooltip title="New Filter">
              <AddIcon sx={{ fontSize: "20px" }} />
            </Tooltip>
          }
        />
      </Box>
      <Stack sx={{ mb: 1, flex: 1 }}>
        {props.filters.length === 0 ? (
          <div style={{ color: "grey", fontStyle: "italic" }}>
            No filters added
          </div>
        ) : (
          <ListFilter
            items={props.filters}
            componentFunc={(idx, key, value) =>
              filterComponent(
                idx,
                key,
                value,
                setFilter,
                setFilterFour,
                deleteFilter,
                dense
              )
            }
            update={(n) => setProps((prev) => ({ ...prev, filters: n }))}
          />
        )}
      </Stack>
    </>
  );
}
