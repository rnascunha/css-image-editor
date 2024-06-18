import { uploadFileList } from "@/lib/upload_file";

import { defaultLimits, supported_image_types } from "./constants";
import type { DragState, SetPropsType } from "./types";

type LimitsType = typeof defaultLimits;

function clap(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function wheel(
  ev: WheelEvent,
  setProps: SetPropsType,
  limits: LimitsType = defaultLimits
) {
  if (!ev.ctrlKey) return;
  ev.preventDefault();
  if (ev.deltaY < 0)
    setProps((prev) => ({
      ...prev,
      zoom: Math.max(limits.zoom.min, prev.zoom - limits.zoom.step),
    }));
  else
    setProps((prev) => ({
      ...prev,
      zoom: Math.min(limits.zoom.max, prev.zoom + limits.zoom.step),
    }));
}

export function dragStart(
  ev: DragEvent,
  drag: DragState,
  [x, y]: [number, number]
) {
  drag.is_valid = ev.ctrlKey;
  drag.is_translate = ev.ctrlKey && ev.shiftKey;
  drag.x = ev.clientX;
  drag.y = ev.clientY;
  drag.ix = x;
  drag.iy = y;
  const img = document.createElement("img");
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="; // Transparent
  ev.dataTransfer?.setDragImage(img, 0, 0);

  drag.element = ev.target as HTMLElement;
}

function dragOverTranslate(
  ev: DragEvent,
  drag: DragState,
  setProps: SetPropsType
) {
  const dx = ev.clientX - drag.x;
  const dy = ev.clientY - drag.y;
  setProps((prev) => ({ ...prev, translate: [dx, dy] }));
}

function dragOverObjectPosition(
  ev: DragEvent,
  drag: DragState,
  setProps: SetPropsType,
  limits: LimitsType = defaultLimits
) {
  const { width, height } = (ev.target as HTMLElement).getBoundingClientRect();

  const dx = ((ev.clientX - drag.x) * 100) / width;
  const nx = clap(drag.ix + dx, limits.position.min, limits.position.max);

  const dy = ((ev.clientY - drag.y) * 100) / height;
  const ny = clap(drag.iy + dy, limits.position.min, limits.position.max);
  
  setProps((prev) => ({ ...prev, position: [nx, ny] }));
}

export function dragOver(
  ev: DragEvent,
  drag: DragState,
  setProps: SetPropsType,
  limits: LimitsType = defaultLimits
) {
  ev.preventDefault();
  if (!drag.is_valid) return;
  if (drag.is_translate) dragOverTranslate(ev, drag, setProps);
  else dragOverObjectPosition(ev, drag, setProps, limits);
}

export function keyboardTranslate(ev: KeyboardEvent, setProps: SetPropsType) {
  switch (ev.key) {
    case "ArrowUp":
      setProps((prev) => ({
        ...prev,
        translate: [prev.translate[0], prev.translate[1] + 1],
      }));
      break;
    case "ArrowDown":
      setProps((prev) => ({
        ...prev,
        translate: [prev.translate[0], prev.translate[1] - 1],
      }));
      break;
    case "ArrowRight":
      setProps((prev) => ({
        ...prev,
        translate: [prev.translate[0] + 1, prev.translate[1]],
      }));
      break;
    case "ArrowLeft":
      setProps((prev) => ({
        ...prev,
        translate: [prev.translate[0] - 1, prev.translate[1]],
      }));
      break;
  }
}

function keyboardObjectPosition(
  ev: KeyboardEvent,
  setProps: SetPropsType,
  limits: LimitsType = defaultLimits
) {
  switch (ev.key) {
    case "ArrowUp":
      setProps((prev) => ({
        ...prev,
        position: [
          prev.position[0],
          Math.min(
            limits.position.max,
            prev.position[1] + limits.position.step
          ),
        ],
      }));
      break;
    case "ArrowDown":
      setProps((prev) => ({
        ...prev,
        position: [
          prev.position[0],
          Math.max(
            limits.position.min,
            prev.position[1] - limits.position.step
          ),
        ],
      }));
      break;
    case "ArrowRight":
      setProps((prev) => ({
        ...prev,
        position: [
          Math.min(
            limits.position.max,
            prev.position[0] + limits.position.step
          ),
          prev.position[1],
        ],
      }));
      break;
    case "ArrowLeft":
      setProps((prev) => ({
        ...prev,
        position: [
          Math.max(
            limits.position.min,
            prev.position[0] - limits.position.step
          ),
          prev.position[1],
        ],
      }));
      break;
  }
}

export function keyboard(
  ev: KeyboardEvent,
  setProps: SetPropsType,
  limits: LimitsType = defaultLimits
) {
  if (ev.ctrlKey) keyboardTranslate(ev, setProps);
  else keyboardObjectPosition(ev, setProps, limits);
}

export function drop_file(ev: DragEvent, drag:DragState) {
  ev.preventDefault();

  if (drag.element === ev.target) return;
  if (!ev.dataTransfer?.files || ev.dataTransfer.files.length === 0) return;

  if (!supported_image_types.includes(ev.dataTransfer.files[0].type)) {
    throw new Error(`File not supported ["${ev.dataTransfer.files[0].type}"]`);
  }

  return uploadFileList(ev.dataTransfer.files);
}
