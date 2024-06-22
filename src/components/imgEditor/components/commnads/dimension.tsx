import { useEffect, useState } from "react";

import { CanvasSizesOptions } from "../../constants";
import { ImageReference } from "../../types";

import { calcContainerAspectRatio } from "./dimension/functions";

import PredefinedDimensionCommands, {
  AllDimensionProps,
} from "./dimension/predefinedDimension";
import AspectRatioCommand from "./dimension/aspectRatioDimension";
import CanvasDimensionCommand from "./dimension/canvasDimension";
import ImageDimensionCommand from "./dimension/imageDimension";

import { Stack } from "@mui/material";


export interface DimensionCommandProps {
  dense: boolean;
  size: CanvasSizesOptions;
  imgRef: ImageReference | null;
  setDimension(s: CanvasSizesOptions): void;
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

  const setAllDimensions = ({
    size,
    dimension,
    syncAspectRatio,
  }: AllDimensionProps) => {
    setSize(size);
    setDimension(dimension);
    setSyncAspectRatio(syncAspectRatio);
  };

  return (
    <Stack spacing={1.25}>
      <PredefinedDimensionCommands
        dense={dense}
        imgRef={imgRef}
        setAllDimensions={setAllDimensions}
      />
      <AspectRatioCommand
        dense={dense}
        imgRef={imgRef}
        syncAspectRatio={syncAspectRatio}
        size={size}
        dsize={dsize}
        setDimension={setDimension}
        setSize={setSize}
        setSyncAspectRatio={setSyncAspectRatio}
      />
      <CanvasDimensionCommand
        dense={dense}
        syncAspectRatio={syncAspectRatio}
        size={size}
        setDimension={setDimension}
        setSize={setSize}
      />
      <ImageDimensionCommand
        dense={dense}
        size={size}
        setDimension={setDimension}
        setSize={setSize}
      />
    </Stack>
  );
}
