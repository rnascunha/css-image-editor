import styles from "./commands.module.css";

import { useState } from "react";

import type {
  ConfigProps,
  ImageReference,
  Props,
  SetPropsType,
} from "../types";
import { CanvasSizesOptions, defaultProps, CSSs } from "../constants";

import { dense_size } from "./dense";

import BackgroundCommand from "./commnads/background";
import ImageFitCommand from "./commnads/imageFit";
import SaveImgModal from "./commnads/saveImgModal";
import CSSCommand from "./commnads/css";
import CommandMenu from "./commnads/commandMenu";
import DimensionCommand from "./commnads/dimension";

import { Box, Button, Modal, Stack } from "@mui/material";

import CommandTransform from "./commnads/transform";
import CommandFilter from "./commnads/filter";

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

  const panelExpand = (panel: string) => expanded.includes(panel);

  const setDimension = (nsize: CanvasSizesOptions) =>
    setProps((prev) => ({ ...prev, size: nsize }));

  const setCSSs = (property: CSSs, value?: string) => {
    if (value === undefined) {
      setProps((prev) => ({
        ...prev,
        css: prev.css.filter((v) => v.key !== property),
      }));
    } else {
      setProps((prev) => {
        const idx = prev.css.findIndex((v) => v.key === property);
        if (idx === -1)
          return { ...prev, css: [...prev.css, { key: property, value }] };
        prev.css[idx].value = value;
        return { ...prev };
      });
    }
  };

  return (
    <Box className={styles.commands}>
      <CommandMenu
        id="dimension"
        name="Dimension"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
        <DimensionCommand
          dense={dense}
          size={props.size}
          imgRef={imgRef}
          setDimension={setDimension}
        />
      </CommandMenu>
      <CommandMenu
        id="position"
        name="Position"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
        <ImageFitCommand
          props={props}
          update={(key, value) =>
            setProps((prev) => ({ ...prev, [key]: value }))
          }
          dense={dense}
        />
      </CommandMenu>
      <CommandMenu
        id="background"
        name="Background"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
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
      </CommandMenu>
      <CommandMenu
        id="transform"
        name="Transform"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
        <CommandTransform dense={dense} setProps={setProps} props={props} />
      </CommandMenu>
      <CommandMenu
        id="filter"
        name="Filter"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
        <CommandFilter dense={dense} props={props} setProps={setProps} />
      </CommandMenu>
      <CommandMenu
        id="css"
        name="CSS Property"
        dense={dense}
        panelChange={panelChange}
        panelExpand={panelExpand}
      >
        <CSSCommand csss={props.css} setCSSs={setCSSs} dense={dense} />
      </CommandMenu>
      <Stack direction="row" spacing={1}>
        <Button
          sx={{
            flex: 1,
            color: "btn",
            borderColor: "btn",
            "&:hover": {
              borderColor: "btn",
            },
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
            "&:hover": {
              backgroundColor: "btn",
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
