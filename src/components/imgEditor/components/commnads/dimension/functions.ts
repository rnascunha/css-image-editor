import { CanvasSizesOptions } from "@/components/imgEditor/constants";
import { ImageReference } from "@/components/imgEditor/types";
import { gcd } from "@/lib/math";

export function validateSize(size?: string) {
  if (size === undefined) return true;
  return /^((100|[0-9]?[0-9])%|[0-9]+px)$/.test(size);
}

export function getImageDimension(imgRef: ImageReference | null) {
  if (!imgRef || !imgRef.image) return ["100%", "100%"];
  return [`${imgRef.image.naturalWidth}px`, `${imgRef.image.naturalHeight}px`];
}

export function calcInstrisicImageAspectRatio(
  imgRef: ImageReference | null
): [number, number] | undefined {
  if (!imgRef || !imgRef.image) return undefined;
  const v = gcd([imgRef.image.naturalWidth, imgRef.image.naturalHeight]);
  return [
    Math.round(imgRef.image.naturalWidth / v),
    Math.round(imgRef.image.naturalHeight / v),
  ];
}

export function calcContainerAspectRatio(
  imgRef: ImageReference | null,
  type: "image" | "container"
): [number, number] | undefined {
  if (!imgRef || !imgRef[type]) return undefined;
  const { width, height } = (
    imgRef[type] as HTMLElement
  ).getBoundingClientRect();

  // Image may be remove from DOM
  if (width === 0 || height === 0) return undefined;

  const v = gcd([Math.round(width), Math.round(height)]);
  return [Math.round(width / v), Math.round(height / v)];
}

export function updateCanvasSize(
  newValue: string,
  size: CanvasSizesOptions,
  sync: boolean,
  index: 0 | 1
): CanvasSizesOptions {
  const valid = validateSize(newValue);
  const other_value = !sync || !valid ? size.canvas[index ? 0 : 1] : "";
  return {
    ...size,
    canvas: index === 0 ? [newValue, other_value] : [other_value, newValue],
  };
}

export function getSyncResizeCanvas(
  size: CanvasSizesOptions,
  dsize: CanvasSizesOptions,
  sync: boolean
): [string, string] {
  const xv = validateSize(size.canvas[0]);
  const yv = validateSize(size.canvas[1]);
  if (sync) {
    if (!xv && yv) return ["", size.canvas[1]];
    return [size.canvas[0], ""];
  }
  return dsize.canvas;
}