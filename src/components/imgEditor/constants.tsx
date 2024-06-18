import {
  OptionDescription,
  OptionsDescriptionArray,
} from "@/components/menuOptions";
import { ConfigProps, Props } from "./types";

import OpacityIcon from "@mui/icons-material/Opacity";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import ContrastIcon from "@mui/icons-material/Contrast";
import FilterBAndWIcon from "@mui/icons-material/FilterBAndW";
import GradientIcon from "@mui/icons-material/Gradient";
import ImagesearchRollerIcon from "@mui/icons-material/ImagesearchRoller";
import AppsIcon from "@mui/icons-material/Apps";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import CachedIcon from "@mui/icons-material/Cached";
import GridOffIcon from "@mui/icons-material/GridOff";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export type FilterOptions = OptionDescription & {
  unit: string;
  unitSymbol?: string;
  min: number;
  max: number;
  step: number;
  initValue: number | [number, number, number, string];
};

export const defaultLimits = {
  zoom: {
    min: 0.1,
    max: 10,
    step: 0.05,
  },
  position: {
    min: 0,
    max: 100,
    step: 1,
  },
} as const;

export const filterOptions: OptionsDescriptionArray<FilterOptions> = {
  opacity: {
    name: "Opacity",
    icon: <OpacityIcon />,
    unit: "",
    min: 0,
    max: 1,
    step: 0.1,
    initValue: 1,
  },
  blur: {
    name: "Blur",
    icon: <BlurOnIcon />,
    unit: "px",
    min: 0,
    max: 8,
    step: 1,
    initValue: 0,
  },
  invert: {
    name: "Invert",
    icon: <InvertColorsIcon />,
    unit: "",
    min: 0,
    max: 1,
    step: 0.1,
    initValue: 0,
  },
  brightness: {
    name: "Brightness",
    icon: <BrightnessHighIcon />,
    unit: "",
    min: 0,
    max: 5,
    step: 0.1,
    initValue: 1,
  },
  contrast: {
    name: "Contrast",
    icon: <ContrastIcon />,
    unit: "",
    min: 0,
    max: 5,
    step: 0.1,
    initValue: 1,
  },
  grayscale: {
    name: "Gray Scale",
    icon: <FilterBAndWIcon />,
    unit: "",
    min: 0,
    max: 1,
    step: 0.1,
    initValue: 0,
  },
  "hue-rotate": {
    name: "Hue rotate",
    icon: <GradientIcon />,
    unit: "deg",
    unitSymbol: "°",
    min: 0,
    max: 360,
    step: 1,
    initValue: 0,
  },
  saturate: {
    name: "Saturate",
    icon: <ImagesearchRollerIcon />,
    unit: "",
    min: 0,
    max: 5,
    step: 0.1,
    initValue: 1,
  },
  sepia: {
    name: "Sepia",
    icon: <AppsIcon />,
    unit: "",
    min: 0,
    max: 1,
    step: 0.1,
    initValue: 0,
  },
  "drop-shadow": {
    name: "Drop-Shadow",
    icon: <WaterDropIcon />,
    unit: "px",
    min: -100,
    max: 100,
    step: 1,
    initValue: [0, 0, 0, "#aa0000"],
  },
} as const;

export type Filters = keyof typeof filterOptions;

type TransformOptions = OptionDescription & {
  unit: string;
  unitSymbol?: string;
  min?: number;
  max?: number;
  step: number;
  initValue: number | [number, number];
};

export const transformOptions: OptionsDescriptionArray<TransformOptions> = {
  translate: {
    name: "Translate",
    icon: <OpenWithIcon />,
    unit: "px",
    step: 1,
    initValue: [0, 0],
  },
  rotate: {
    name: "rotate",
    icon: <CachedIcon />,
    unit: "deg",
    unitSymbol: "°",
    step: 1,
    min: 0,
    max: 359,
    initValue: 0,
  },
  skew: {
    name: "Skew",
    icon: <GridOffIcon />,
    unit: "deg",
    unitSymbol: "°",
    step: 1,
    initValue: [0, 0],
  },
  scale: {
    name: "Scale",
    icon: <AspectRatioIcon />,
    unit: "",
    step: 0.05,
    initValue: [1, 1],
  },
};

export type Transforms = keyof typeof transformOptions;

export const supported_image_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

export const objectFitOpt = ["cover", "contain"];
export const bgRepeatOpt = [
  "repeat",
  "repeat-x",
  "repeat-y",
  "no-repeat",
  "space",
  "round",
];

export enum CanvasSizes {
  FIT_CANVAS = "fit_canvas",
  FIT_IMAGE = "fit_image",
  FULL_IMAGE = "full_image",
  FREE_SIZE = "free_size",
}

export interface CanvasSizesOptions {
  canvas: [string, string];
  image: [string, string];
  aspectRatio: [number, number] | undefined;
}

export type CanvasSizesList = Record<CanvasSizes, CanvasSizesOptions>;

export const defaultProps: Props = {
  fit: "contain",
  position: [50, 50],
  zoom: 1,
  translate: [0, 0],
  background: {
    use_image: false,
    color: "#aaaaaa",
    fit: "cover",
    opacity: 0,
    position: [50, 50],
    repeat: "no-repeat",
  },
  filters: [],
  transforms: [],
  image: "",
  image_name: "",
  size: {
    canvas: ["100%", "100%"],
    image: ["100%", "100%"],
    aspectRatio: undefined,
  },
} as const;

export const defaultConfig: ConfigProps = {
  dense: true,
  optimizeImage: true,
  showInfo: true,
  background_transparency_pattern: true,
} as const;
