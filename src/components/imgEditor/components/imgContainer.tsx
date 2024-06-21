import styles from "./imgContainer.module.css";

import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import { uploadFile } from "@/lib/upload_file";

import { defaultLimits as limits, supported_image_types } from "../constants";
import type {
  ConfigProps,
  DragState,
  ImageReference,
  Props,
  SetPropsType,
} from "../types";
import { makeImageStyle, makeBackgroundStyle } from "../functions";
import { dragOver, dragStart, keyboard, wheel, drop_file } from "../events";

import VisuallyHiddenInput from "@/components/styled/hiddenInput";

import { Box, Stack, Typography } from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";

function get_grid_element_sizes(el: HTMLElement): [number, number] {
  const { width, height } = el.getBoundingClientRect();
  return [width, height];
}

interface ImgContainerProps {
  props: Props;
  config: ConfigProps;
  setProps: SetPropsType;
  upload_image: (img: string, image_name?: string) => void;
  error: (error: string) => void;
  setInnerRef(ref: ImageReference): void;
}

function is_pixels(value: string) {
  return /^.*px$/.test(value);
}

function get_first_numbers(value: string) {
  const num = /^[0-9]*/.exec(value);
  if (num === null) return 0;
  return +num[0];
}

function get_value(
  v: string,
  container: HTMLElement | null,
  name: "width" | "height"
) {
  if (is_pixels(v)) return get_first_numbers(v);
  if (container === null) return undefined;
  const vall = container.getBoundingClientRect()[name];
  return Math.ceil((get_first_numbers(v) * vall) / 100);
}

function dimension(
  width: string,
  height: string,
  container: HTMLElement | null
) {
  if (width === "100%" && height === "100%") return { fill: true };

  const w = get_value(width, container, "width");
  const h = get_value(height, container, "height");
  if (w === undefined || h === undefined) return { fill: true };

  return {
    fill: false,
    width: w,
    height: h,
  };
}

interface StatContainerProps {
  showInfo: boolean;
  sizeCanvas: [number, number];
  mousePositon: [number, number];
}

function StatContainer({
  showInfo,
  sizeCanvas,
  mousePositon,
}: StatContainerProps) {
  return (
    <div
      className={styles.stats_container}
      style={{
        display: showInfo ? "block" : "none",
      }}
    >
      {`${mousePositon[0]} x ${mousePositon[1]} | ${Math.round(
        sizeCanvas[0]
      )} x ${Math.round(sizeCanvas[1])}`}
    </div>
  );
}

interface ImageContainerProps {
  props: Props;
  config: ConfigProps;
  containerRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

function ImageContainer({
  props,
  config,
  containerRef,
  children,
}: ImageContainerProps) {
  const computedStyle = useMemo(
    () => makeBackgroundStyle(props.background, props.image),
    [props.background, props.image]
  );

  return (
    <Box
      className={`${styles.container} ${
        config.background_transparency_pattern
          ? styles.square_background_pattern
          : ""
      }`}
      sx={{
        outlineColor: "text.primary",
      }}
      style={{
        // Flex will centralize the image when is smaller then the container
        // When image is not 100%x100%
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        width: props.size.canvas[0],
        height: props.size.canvas[1],
        aspectRatio:
          props.size.aspectRatio === undefined
            ? "unset"
            : `${props.size.aspectRatio[0]} / ${props.size.aspectRatio[1]}`,
      }}
      ref={containerRef}
    >
      {/* Here will be the drawable canvas this can */}
      <div
        className={styles.bg_container}
        style={computedStyle}
      >
        {/* Background canvas */}
      </div>
      {children}
    </Box>
  );
}

interface ImageShowProps {
  innerRefImg: RefObject<HTMLImageElement>;
  props: Props;
  config: ConfigProps;
  optimizeImage: boolean;
  container: HTMLDivElement | null;
  error(msg: string): void;
}

function ImageShow({
  innerRefImg,
  props,
  optimizeImage,
  container,
  error,
}: ImageShowProps) {
  const [d, setD] = useState(
    dimension(props.size.image[0], props.size.image[1], container)
  );
  useEffect(() => {
    setD(dimension(props.size.image[0], props.size.image[1], container));
  }, [props.size, container]);

  const computedStyle = useMemo(() => makeImageStyle(props), [props]);

  return (
    <Image
      ref={innerRefImg}
      src={props.image}
      alt={props.image_name}
      className={styles.image}
      fill={d.fill}
      width={d.width}
      height={d.height}
      style={computedStyle}
      priority
      unoptimized={!optimizeImage}
      onError={() => error("Error loading image")}
    />
  );
}

interface NoImageDragDropProps {
  upload_image: (img: string, image_name?: string) => void;
  error: (error: string) => void;
}

function NoImageDragDrop({ upload_image, error }: NoImageDragDropProps) {
  return (
    <Stack
      sx={{
        outlineColor: "text.secondary",
      }}
      className={styles.no_image}
      spacing={2}
    >
      <FileUploadIcon
        sx={{
          fontSize: 100,
        }}
      />
      <i>
        Drag and Drop or{" "}
        <label>
          <VisuallyHiddenInput
            type="file"
            accept={supported_image_types.join(", ")}
            onChange={(ev) => {
              uploadFile(ev)
                .then(({ data, files }) => {
                  upload_image(data as string, files[0].name);
                })
                .catch((e) => {
                  error(e.error);
                });
            }}
          />
          <Typography
            sx={{
              display: "inline",
              cursor: "pointer",
              color: "btn",
              fontSize: "xx-large",
            }}
          >
            <b>Upload</b>
          </Typography>
        </label>{" "}
        image
      </i>
    </Stack>
  );
}

const defaultDragState: DragState = {
  is_valid: false,
  x: 0,
  y: 0,
  ix: 50,
  iy: 50,
  is_translate: false,
};

export default function ImgContainer({
  props,
  config,
  setProps,
  upload_image,
  error,
  setInnerRef,
}: ImgContainerProps) {
  const outer_container = useRef<HTMLElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const drag_container = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState>(defaultDragState);

  const [sizeCanvas, setSizeCanvas] = useState<[number, number]>([0, 0]);
  const [pos, setPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (container.current === null || image.current === null) return;

    setInnerRef({
      container: container.current,
      image: image.current,
    });

    const keyboardEvent = (ev: KeyboardEvent) => {
      if (document.activeElement !== document.body) return;
      keyboard(ev, setProps, limits);
    };

    const el = container.current;
    const dragStartEvent = (ev: DragEvent) =>
      dragStart(ev, drag.current, props.position);
    const dragOverEvent = (ev: DragEvent) =>
      dragOver(ev, drag.current, setProps, limits);
    const dragEndEvent = (ev: DragEvent) => {
      ev.preventDefault();
      drag.current.is_valid = false;
    };
    const wheelEvent = (ev: WheelEvent) => wheel(ev, setProps, limits);

    document.body.addEventListener("keyup", keyboardEvent);
    el.addEventListener("wheel", wheelEvent);
    el.addEventListener("dragstart", dragStartEvent);
    el.addEventListener("dragover", dragOverEvent);
    el.addEventListener("dragend", dragEndEvent);

    return () => {
      document.body.removeEventListener("keyup", keyboardEvent);
      el.removeEventListener("dragstart", dragStartEvent);
      el.removeEventListener("dragover", dragOverEvent);
      el.removeEventListener("wheel", wheelEvent);
      el.removeEventListener("dragend", dragEndEvent);
    };
  }, [props.position, setProps, setInnerRef, props.image]);

  useEffect(() => {
    if (outer_container.current === null || drag_container.current === null)
      return;
    const oc = outer_container.current;
    const dc = drag_container.current;

    const check = () =>
      drag.current.element === undefined || !oc.contains(drag.current.element);

    const prevent = (ev: DragEvent) => check() && ev.preventDefault();
    const add_class = () => check() && dc.classList.add(styles.on_dragging);
    const remove_class = () => dc.classList.remove(styles.on_dragging);

    const dropEvent = (ev: DragEvent) => {
      try {
        if (drag.current.is_valid) return;
        drop_file(ev, drag.current)
          ?.then(({ data, files }) =>
            upload_image(data as string, files[0].name)
          )
          .catch((e) => error(e.message));
      } catch (e) {
        error((e as Error).message);
      }
    };

    oc.addEventListener("dragover", prevent);
    oc.addEventListener("dragenter", prevent);
    oc.addEventListener("drop", prevent);

    oc.addEventListener("dragenter", add_class);
    dc.addEventListener("dragover", add_class);

    dc.addEventListener("dragleave", remove_class);
    dc.addEventListener("dragend", remove_class);
    dc.addEventListener("drop", remove_class);

    dc.addEventListener("drop", dropEvent);

    return () => {
      oc.removeEventListener("dragover", prevent);
      oc.removeEventListener("dragenter", prevent);
      oc.removeEventListener("drop", prevent);

      dc.removeEventListener("dragover", add_class);
      dc.removeEventListener("dragenter", add_class);

      dc.removeEventListener("dragleave", remove_class);
      dc.removeEventListener("dragend", remove_class);
      dc.removeEventListener("drop", remove_class);

      dc.removeEventListener("drop", dropEvent);
    };
  }, [error, upload_image]);

  useEffect(() => {
    const el = container.current;
    if (el === null || !config.showInfo) return;

    const setNewSize = () => {
      setSizeCanvas(get_grid_element_sizes(el as HTMLElement));
    };
    setNewSize();

    const mouseMove = (ev: MouseEvent) => {
      setPos([ev.offsetX, ev.offsetY]);
    };

    setNewSize();
    window.addEventListener("resize", setNewSize);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("resize", setNewSize);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, [props.size, config.showInfo, props.image]);

  return (
    <Box
      className={styles.outer_container}
      ref={outer_container}
      sx={{
        outlineColor: "background.soft",
      }}
    >
      <Box
        ref={drag_container}
        className={styles.on_dradding_idle}
        sx={{
          backgroundColor: "background.soft",
        }}
      >
        <span>Drop image file...</span>
      </Box>
      {props.image ? (
        <>
          <StatContainer
            mousePositon={pos}
            sizeCanvas={sizeCanvas}
            showInfo={config.showInfo}
          />
          <div className={styles.inner_container}>
            <div className={styles.inner_inner_container}>
              <ImageContainer
                containerRef={container}
                props={props}
                config={config}
              >
                <ImageShow
                  innerRefImg={image}
                  props={props}
                  config={config}
                  optimizeImage={config.optimizeImage}
                  container={container.current}
                  error={(msg: string) => {
                    error(msg);
                    setProps((prev) => ({ ...prev, image: "" }));
                  }}
                />
              </ImageContainer>
            </div>
          </div>
        </>
      ) : (
        <NoImageDragDrop upload_image={upload_image} error={error} />
      )}
    </Box>
  );
}
