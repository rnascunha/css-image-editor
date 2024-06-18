import { filterOptions, transformOptions } from "./constants";
import type {
  Props,
  BackgroundProps,
  FilterValue,
  TransformValue,
} from "./types";

function makeThreeColorAndColorStyle(
  key: string,
  value: [number, number, number, string]
) {
  const unit = filterOptions[key].unit;
  return `${key}(${value[0]}${unit} ${value[1]}${unit} ${value[2]}${unit} ${value[3]})`;
}

function makeFiltersStyle(filters: FilterValue[]) {
  return filters
    .map(({ key, value }) =>
      Array.isArray(value)
        ? makeThreeColorAndColorStyle(key, value)
        : `${key}(${value}${filterOptions[key].unit})`
    )
    .join(" ");
}

function makeTrasformsStyle(transforms: TransformValue[]) {
  return transforms
    .map(({ key, value }) =>
      key === "rotate"
        ? `${key}(${value}${transformOptions[key].unit})`
        : `${key}(${(value as [number, number])[0]}${
            transformOptions[key].unit
          }, ${(value as [number, number])[1]}${transformOptions[key].unit})`
    )
    .join(" ");
}

export function makeBackgroundStyle(props: BackgroundProps, image: string) {
  return {
    backgroundColor: `rgb(from ${props.color} r g b / ${props.opacity})`,
    backgroundPosition: `${props.position[0]}% ${props.position[1]}%`,
    backgroundSize: props.fit,
    backgroundImage: props.use_image ? `url(${image})` : undefined,
    backgroundRepeat: props.repeat,
    opacity: props.opacity,
  };
}

export function makeImageStyle(props: Props) {
  return {
    objectFit: props.fit,
    objectPosition: `${props.position[0]}% ${props.position[1]}%`,
    transform: `translate(${props.translate[0]}px, ${
      props.translate[1]
    }px) scale(${props.zoom}) ${makeTrasformsStyle(props.transforms)}`,
    filter: makeFiltersStyle(props.filters),
  };
}
