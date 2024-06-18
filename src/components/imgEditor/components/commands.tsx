import styles from "./commands.module.css";

import { useState } from "react";

import type { ImageReference, Props, SetPropsType } from "../types";
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

import { InputStyled } from "@/components/styled/inputStyled";
import MenuOptions from "@/components/menuOptions";
import DimensionCommand from "./dimension";
import {
  AccordionStyled,
  AccordionSummaryStyled,
} from "@/components/styled/accordionStyled";

import {
  AccordionDetails,
  Box,
  Button,
  InputAdornment,
  Modal,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ImgCommands({
  props,
  setProps,
  imgRef,
  dense,
}: {
  props: Props;
  setProps: SetPropsType;
  imgRef: ImageReference | null;
  dense: boolean;
}) {
  const [open, setOpen] = useState(false);

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
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "var(--text)",
              }}
            />
          }
          aria-controls="dimension-content"
          id="dimension-header"
          size={dense_size(dense)}
        >
          Dimesion
        </AccordionSummaryStyled>
        <AccordionDetails>
          <DimensionCommand
            dense={dense}
            size={props.size}
            imgRef={imgRef}
            setDimension={setDimension}
          />
        </AccordionDetails>
      </AccordionStyled>
      <fieldset className={styles.fieldset}>
        <legend>Position</legend>
        <ImageFitCommand
          props={props}
          update={(key, value) =>
            setProps((prev) => ({ ...prev, [key]: value }))
          }
          dense={dense}
        />
      </fieldset>
      <AccordionStyled>
        <AccordionSummaryStyled
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color: "var(--text)",
              }}
            />
          }
          aria-controls="background-content"
          id="background-header"
          size={dense_size(dense)}
        >
          Background
        </AccordionSummaryStyled>
        <AccordionDetails>
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
        </AccordionDetails>
      </AccordionStyled>
      <fieldset className={styles.fieldset}>
        <legend className={styles.filters_legend}>
          <div>Transform</div>
          <MenuOptions
            options={transformOptions}
            callback={optionsTransformCallback}
            icon={<AddIcon sx={{ fontSize: "20px" }} />}
          />
        </legend>
        <Stack direction="column">
          <Stack
            direction="row"
            spacing={0.25}
            sx={{
              justifyContent: "space-between",
            }}
          >
            <InputStyled
              label="X"
              type="number"
              size={dense_size(dense)}
              value={props.translate[0]}
              sx={{
                maxWidth: "12ch",
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
                    px
                  </InputAdornment>
                ),
              }}
              onChange={(ev) => {
                setProps({
                  ...props,
                  translate: [+ev.target.value, props.translate[1]],
                });
              }}
            />
            <InputStyled
              label="Y"
              type="number"
              size={dense_size(dense)}
              value={props.translate[1]}
              sx={{
                maxWidth: "12ch",
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
                    px
                  </InputAdornment>
                ),
              }}
              onChange={(ev) => {
                setProps({
                  ...props,
                  translate: [props.translate[0], +ev.target.value],
                });
              }}
            />
            <InputStyled
              label="Zoom"
              type="number"
              size={dense_size(dense)}
              value={props.zoom}
              sx={{
                width: "10ch",
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
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend className={styles.filters_legend}>
          <div>Filters</div>
          <MenuOptions
            options={filterOptions}
            callback={optionsFilterCallback}
            icon={<AddIcon sx={{ fontSize: "20px" }} />}
          />
        </legend>
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
      </fieldset>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            flex: 1,
          }}
          size={dense_size(dense)}
          variant="contained"
          onClick={() =>
            setProps((prev) => ({ ...defaultProps, image: prev.image }))
          }
        >
          Reset
        </Button>
        <Button
          sx={{
            flex: 1,
            "&.Mui-disabled": {
              backgroundColor: "var(--bgSoft)",
            },
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
