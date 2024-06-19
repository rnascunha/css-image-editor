import type {
  Filters,
  Transforms,
  objectFitOpt,
  bgRepeatOpt,
  CanvasSizesOptions,
} from "./constants";

export interface FilterValue {
  key: Filters;
  value: number | [number, number, number, string];
}

export interface TransformValue {
  key: Transforms;
  value: number | [number, number];
}

export interface BackgroundProps {
  use_image: boolean;
  image?: string;
  color: string;
  opacity: number;
  position: [number, number];
  fit: (typeof objectFitOpt)[number];
  repeat: (typeof bgRepeatOpt)[number];
}

export interface Props {
  image_name: string;
  image: string;
  fit: "cover" | "contain";
  position: [number, number];
  zoom: number;
  translate: [number, number];
  background: BackgroundProps;
  filters: FilterValue[];
  transforms: TransformValue[];
  size: CanvasSizesOptions;
}

export interface ConfigProps {
  dense: boolean;
  showInfo: boolean;
  optimizeImage: boolean;
  background_transparency_pattern: boolean;
  expandOne: boolean;
}

type FunctionArg = Props | ((p: Props) => Props);

export type SetPropsType = (p: FunctionArg) => void;

export interface DragState {
  is_valid: boolean;
  x: number;
  y: number;
  ix: number;
  iy: number;
  is_translate: boolean;
  element?: HTMLElement;
}

export interface ImageReference {
  container: HTMLElement | null;
  image: HTMLImageElement | null;
}
