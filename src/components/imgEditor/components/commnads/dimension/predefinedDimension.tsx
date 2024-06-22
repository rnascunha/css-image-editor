import { ImageReference } from "@/components/imgEditor/types";
import { dense_icon_size, dense_size } from "../../dense";
import { CanvasSizesOptions } from "@/components/imgEditor/constants";
import { calcInstrisicImageAspectRatio, getImageDimension } from "./functions";

import { Button, ButtonGroup, Tooltip } from "@mui/material";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import HeightIcon from "@mui/icons-material/Height";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";

export interface AllDimensionProps {
  size: CanvasSizesOptions;
  dimension: CanvasSizesOptions;
  syncAspectRatio: boolean;
}

interface PredefinedDimensionCommandsProps {
  dense: boolean;
  imgRef: ImageReference | null;
  setAllDimensions({
    size,
    dimension,
    syncAspectRatio,
  }: AllDimensionProps): void;
}

export default function PredefinedDimensionCommands({
  dense,
  imgRef,
  setAllDimensions,
}: PredefinedDimensionCommandsProps) {
  const predefinedDismensions = [
    {
      title: "Fit canvas",
      icon: <OpenInFullIcon fontSize={dense_icon_size(dense)} />,
      callback: () => {
        const newValue: CanvasSizesOptions = {
          canvas: ["100%", "100%"],
          image: ["100%", "100%"],
          aspectRatio: undefined,
        };
        setAllDimensions({
          size: newValue,
          dimension: newValue,
          syncAspectRatio: false,
        });
      },
    },
    {
      title: "Fit image width",
      icon: <WidthFullIcon fontSize={dense_icon_size(dense)} />,
      callback: () => {
        const newValue: CanvasSizesOptions = {
          canvas: ["100%", ""],
          image: ["100%", "100%"],
          aspectRatio: calcInstrisicImageAspectRatio(imgRef),
        };
        setAllDimensions({
          size: newValue,
          dimension: newValue,
          syncAspectRatio: true,
        });
      },
    },
    {
      title: "Fit image height",
      icon: <HeightIcon fontSize={dense_icon_size(dense)} />,
      callback: () => {
        const newValue: CanvasSizesOptions = {
          canvas: ["", "100%"],
          image: ["100%", "100%"],
          aspectRatio: calcInstrisicImageAspectRatio(imgRef),
        };
        setAllDimensions({
          size: newValue,
          dimension: newValue,
          syncAspectRatio: true,
        });
      },
    },
    {
      title: "Natural dimension",
      icon: <SettingsOverscanIcon fontSize={dense_icon_size(dense)} />,
      callback: () => {
        const newValue: CanvasSizesOptions = {
          canvas: getImageDimension(imgRef) as [string, string],
          image: ["100%", "100%"],
          aspectRatio: undefined,
        };
        setAllDimensions({
          size: newValue,
          dimension: newValue,
          syncAspectRatio: false,
        });
      },
    },
  ] as const;

  return (
    <ButtonGroup fullWidth>
      {predefinedDismensions.map((e, i) => (
        <Button
          key={i}
          size={dense_size(dense)}
          aria-label={e.title}
          onClick={e.callback}
        >
          <Tooltip disableFocusListener disableTouchListener title={e.title}>
            {e.icon}
          </Tooltip>
        </Button>
      ))}
    </ButtonGroup>
  );
}
