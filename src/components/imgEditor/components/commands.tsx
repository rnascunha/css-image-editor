import styles from "./commands.module.css";

import { useState } from "react";

import type {
  ConfigProps,
  ImageReference,
  Props,
  SetPropsType,
} from "../types";
import {
  filterOptions,
  defaultLimits,
  transformOptions,
  CanvasSizesOptions,
  defaultProps,
} from "../constants";

import { filterComponent, transformComponent } from "./setValue";
import { ListFilter, ListTransform } from "./draggableList";
import BackgroundCommand from "./background";
import ImageFitCommand from "./imageFit";
import SaveImgModal from "./saveImgModal";
import { dense_size } from "./dense";

import MenuOptions from "@/components/menuOptions";
import DimensionCommand from "./dimension";
import {
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryStyled,
} from "@/components/styled/accordionStyled";

import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ImgCommandsProps {
  props: Props;
  config: ConfigProps;
  setProps: SetPropsType;
  imgRef: ImageReference | null;
  dense: boolean;
}

export default function ImgCommands({
  props,
  config,
  setProps,
  imgRef,
  dense,
}: ImgCommandsProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);

  const panelChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      return config.expandOne
        ? setExpanded(isExpanded ? [panel] : [])
        : setExpanded((prev) =>
            isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
          );
    };

  const panelExpand = (panel:string) => expanded.includes(panel);

  const optionsFilterCallback = (name: string) => {
    setProps((prev) => {
      const filters = [
        ...prev.filters,
        { key: name, value: filterOptions[name].initValue },
      ];
      return { ...prev, filters };
    });
  };

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
  const setTransform = (index: number, value: number) =>
    setData(index, value, "transforms");

  const deleteFilter = (index: number) => {
    setProps((prev) => {
      const filters = prev.filters.filter((v, i) => i !== index);
      return { ...prev, filters };
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

  const setDimension = (nsize: CanvasSizesOptions) =>
    setProps((prev) => ({ ...prev, size: nsize }));

  return (
    <Box className={styles.commands}>
      <AccordionStyled
        expanded={panelExpand("pdimension")}
        onChange={panelChange("pdimension")}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="dimension-content"
          id="dimension-header"
          size={dense_size(dense)}
        >
          Dimesion
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <DimensionCommand
            dense={dense}
            size={props.size}
            imgRef={imgRef}
            setDimension={setDimension}
          />
        </AccordionDetailsStyled>
      </AccordionStyled>
      <AccordionStyled
        expanded={panelExpand("pposition")}
        onChange={panelChange("pposition")}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="position-content"
          id="position-header"
          size={dense_size(dense)}
        >
          Position
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <ImageFitCommand
            props={props}
            update={(key, value) =>
              setProps((prev) => ({ ...prev, [key]: value }))
            }
            dense={dense}
          />
        </AccordionDetailsStyled>
      </AccordionStyled>
      <AccordionStyled
        expanded={panelExpand("pbackground")}
        onChange={panelChange("pbackground")}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="background-content"
          id="background-header"
          size={dense_size(dense)}
        >
          Background
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <BackgroundCommand
            props={props.background}
            dense={dense}
            update={(k, v) =>
              setProps((prev) => ({
                ...prev,
                background: { ...prev.background, [k]: v },
              }))
            }
          />
        </AccordionDetailsStyled>
      </AccordionStyled>
      <AccordionStyled
        expanded={panelExpand("ptransform")}
        onChange={panelChange("ptransform")}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="transform-content"
          id="transform-header"
          size={dense_size(dense)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Transform
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
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
                  endAdornment: (
                    <InputAdornment position="end">px</InputAdornment>
                  ),
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
                  endAdornment: (
                    <InputAdornment position="end">px</InputAdornment>
                  ),
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
        </AccordionDetailsStyled>
      </AccordionStyled>
      <AccordionStyled
        expanded={panelExpand("pfilter")}
        onChange={panelChange("pfilter")}
      >
        <AccordionSummaryStyled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="filter-content"
          id="filter-header"
          size={dense_size(dense)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& .MuiAccordionSummary-content.Mui-expanded": {
              m: 0,
            },
          }}
        >
          Filter
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MenuOptions
              options={filterOptions}
              callback={optionsFilterCallback}
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
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            flex: 1,
            color: "btn",
            borderColor: "btn",
            '&:hover': {
              borderColor: "btn",
            }
          }}
          size={dense_size(dense)}
          variant="outlined"
          onClick={() =>
            setProps((prev) => ({
              ...defaultProps,
              image: prev.image,
              image_name: prev.image_name,
            }))
          }
        >
          Reset
        </Button>
        <Button
          sx={{
            flex: 1,
            backgroundColor: "btn",
            '&:hover': {
              backgroundColor: "btn",
            }
          }}
          size={dense_size(dense)}
          variant="contained"
          disabled={imgRef === null || props.image === ""}
          onClick={() => setOpen(true)}
        >
          Export
        </Button>
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <SaveImgModal
            close={() => setOpen(false)}
            imageRef={imgRef}
            image_name={
              props.image !== props.image_name ? props.image_name : undefined
            }
          />
        </div>
      </Modal>
    </Box>
  );
}
