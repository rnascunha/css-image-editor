import { useEffect, useState } from "react";

import { gcd } from "@/lib/math";

import { CanvasSizesOptions } from "../constants";
import { ImageReference } from "../types";
import { dense_icon_size, dense_size } from "./dense";

import { Button, ButtonGroup, IconButton, Stack, TextField, Tooltip } from "@mui/material";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import WidthFullIcon from "@mui/icons-material/WidthFull";
import HeightIcon from "@mui/icons-material/Height";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import PhotoIcon from "@mui/icons-material/Photo";
import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";

function validateSize(size?: string) {
  if (size === undefined) return true;
  return /^((100|[0-9]?[0-9])%|[0-9]+px)$/.test(size);
}

export interface DimensionCommandProps {
  dense: boolean;
  size: CanvasSizesOptions;
  imgRef: ImageReference | null;
  setDimension(s: CanvasSizesOptions): void;
}

function getImageDimension(imgRef: ImageReference | null) {
  if (!imgRef || !imgRef.image) return undefined;
  return [`${imgRef.image.naturalWidth}px`, `${imgRef.image.naturalHeight}px`];
}

function calcInstrisicImageAspectRatio(
  imgRef: ImageReference | null
): [number, number] | undefined {
  if (!imgRef || !imgRef.image) return undefined;
  const v = gcd([imgRef.image.naturalWidth, imgRef.image.naturalHeight]);
  return [
    Math.round(imgRef.image.naturalWidth / v),
    Math.round(imgRef.image.naturalHeight / v),
  ];
}

function calcContainerAspectRatio(
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

function updateCanvasSize(
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

function getSyncResizeCanvas(
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

export default function DimensionCommand({
  dense,
  size: dsize,
  imgRef,
  setDimension,
}: DimensionCommandProps) {
  const [size, setSize] = useState<CanvasSizesOptions>(dsize);
  const [syncAspectRatio, setSyncAspectRatio] = useState(false);

  useEffect(() => {
    const far = () => {
      if (!syncAspectRatio) {
        const ar = calcContainerAspectRatio(imgRef, "container");
        setSize((prev) => ({
          ...prev,
          aspectRatio: ar,
        }));
      }
    };
    far();
  }, [imgRef, dsize.canvas, syncAspectRatio]);

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
        setSize(newValue);
        setDimension(newValue);
        setSyncAspectRatio(false);
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
        setSize(newValue);
        setDimension(newValue);
        setSyncAspectRatio(true);
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
        setSize(newValue);
        setDimension(newValue);
        setSyncAspectRatio(true);
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
        setSize(newValue);
        setDimension(newValue);
        setSyncAspectRatio(false);
      },
    },
  ] as const;

  return (
    <Stack spacing={1.25}>
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
      <Stack
        direction="row"
        spacing={0.25}
        sx={{
          alignItems: "center",
        }}
        title="Aspect Ratio"
      >
        <Tooltip disableFocusListener disableTouchListener title="Aspect ratio">
          <AspectRatioIcon fontSize={dense_icon_size(dense)} />
        </Tooltip>
        <TextField
          size={dense_size(dense)}
          label="Horizontal"
          type="number"
          InputLabelProps={{ shrink: true }}
          disabled={imgRef === null || !syncAspectRatio}
          value={size.aspectRatio?.[0] ?? ""}
          sx={{
            maxWidth: "9ch",
          }}
          inputProps={{
            min: 1,
            step: 1,
          }}
          onChange={(ev) => {
            setSize((prev) => ({
              ...prev,
              aspectRatio: [
                +ev.target.value,
                (prev.aspectRatio as [number, number])[1],
              ],
            }));
            if (syncAspectRatio)
              setDimension({
                ...dsize,
                aspectRatio: [
                  +ev.target.value,
                  (size.aspectRatio as [number, number])[1],
                ],
              });
          }}
        />
        <TextField
          size={dense_size(dense)}
          label="Vertical"
          type="number"
          InputLabelProps={{ shrink: true }}
          disabled={imgRef === null || !syncAspectRatio}
          value={size.aspectRatio?.[1] ?? ""}
          sx={{
            maxWidth: "9ch",
          }}
          inputProps={{
            min: 1,
            step: 1,
          }}
          onChange={(ev) => {
            setSize((prev) => ({
              ...prev,
              aspectRatio: [
                (prev.aspectRatio as [number, number])[0],
                +ev.target.value,
              ],
            }));
            if (syncAspectRatio)
              setDimension({
                ...dsize,
                aspectRatio: [
                  (size.aspectRatio as [number, number])[0],
                  +ev.target.value,
                ],
              });
          }}
        />
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={"Set image aspect ratio"}
        >
          <span>
            <IconButton
              disabled={!syncAspectRatio}
              onClick={() => {
                const aspectRatio = calcInstrisicImageAspectRatio(imgRef);
                setSize((prev) => ({
                  ...prev,
                  canvas: dsize.canvas,
                  aspectRatio,
                }));
                setDimension({
                  ...dsize,
                  aspectRatio,
                });
              }}
            >
              <SettingsOverscanIcon fontSize={dense_icon_size(dense)} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip
          disableFocusListener
          disableTouchListener
          title={syncAspectRatio ? "Syncing" : "Not syncing"}
        >
          <IconButton
            onClick={() => {
              setSyncAspectRatio((prev) => !prev);
              setDimension({
                ...dsize,
                canvas: getSyncResizeCanvas(size, dsize, !syncAspectRatio),
                aspectRatio: size.aspectRatio,
              });
            }}
          >
            {syncAspectRatio ? (
              <SyncIcon fontSize={dense_icon_size(dense)} />
            ) : (
              <SyncDisabledIcon fontSize={dense_icon_size(dense)} />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack
        direction="row"
        spacing={0.25}
        sx={{
          alignItems: "center",
        }}
        title="Container size"
      >
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Container size"
        >
          <ImageAspectRatioIcon fontSize={dense_icon_size(dense)} />
        </Tooltip>
        <TextField
          size={dense_size(dense)}
          label="Width"
          InputLabelProps={{ shrink: true }}
          value={size.canvas[0]}
          sx={{
            maxWidth: "9ch",
          }}
          error={!validateSize(size.canvas[0])}
          onChange={(ev) => {
            const newSize = updateCanvasSize(
              ev.target.value,
              size,
              syncAspectRatio,
              0
            );
            setSize(newSize);
            if (validateSize(ev.target.value)) setDimension(newSize);
          }}
        />
        <TextField
          size={dense_size(dense)}
          label="Height"
          InputLabelProps={{ shrink: true }}
          value={size.canvas[1]}
          sx={{
            maxWidth: "9ch",
          }}
          error={!validateSize(size.canvas[1])}
          onChange={(ev) => {
            const newSize = updateCanvasSize(
              ev.target.value,
              size,
              syncAspectRatio,
              1
            );
            setSize(newSize);
            if (validateSize(ev.target.value)) setDimension(newSize);
          }}
        />
      </Stack>
      <Stack
        direction="row"
        spacing={0.25}
        sx={{
          alignItems: "center",
        }}
        title="Image size"
      >
        <Tooltip disableFocusListener disableTouchListener title="Image size">
          <PhotoIcon fontSize={dense_icon_size(dense)} />
        </Tooltip>
        <TextField
          size={dense_size(dense)}
          label="Width"
          InputLabelProps={{ shrink: true }}
          value={size.image[0]}
          sx={{
            maxWidth: "9ch",
          }}
          error={!validateSize(size.image[0])}
          onChange={(ev) => {
            const newSize: CanvasSizesOptions = {
              canvas: size.canvas,
              image: [ev.target.value, size.image[1]],
              aspectRatio: undefined,
            };
            setSize(newSize);
            if (validateSize(ev.target.value)) setDimension(newSize);
          }}
        />
        <TextField
          size={dense_size(dense)}
          label="Height"
          InputLabelProps={{ shrink: true }}
          value={size.image[1]}
          sx={{
            maxWidth: "9ch",
          }}
          error={!validateSize(size.image[1])}
          onChange={(ev) => {
            const newSize: CanvasSizesOptions = {
              canvas: size.canvas,
              image: [size.image[0], ev.target.value],
              aspectRatio: undefined,
            };
            setSize(newSize);
            if (validateSize(ev.target.value)) setDimension(newSize);
          }}
        />
      </Stack>
    </Stack>
  );
}
