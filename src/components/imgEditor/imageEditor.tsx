"use client";

import styles from "./imageEditor.module.css";

import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import History from "./history";

import ImgCommands from "./components/commands";
import type { ConfigProps, ImageReference, Props } from "./types";
import ImgContainer from "./components/imgContainer";
import ImgHeader from "./components/header";
import {
  CanvasSizes,
  CanvasSizesOptions,
  defaultConfig,
  defaultProps,
} from "./constants";

import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { StatusMode, StatusModeContext, StatusSetModeContext } from "../status/statusContext";

export {
  Props as ImageEditorCommandProps,
  ConfigProps as ImageEditorConfigProps,
};

export interface ImageEditorProps {
  props?: Partial<Props>;
  config?: Partial<ConfigProps>;
  update_props?(props: Props): void;
  update_config?(config: ConfigProps): void;
  history?: History;
}

export default function ImageEditor({
  props: initProps,
  config: initConfig,
  update_props,
  update_config,
  history,
}: ImageEditorProps) {
  const [imgRef, setImgRef] = useState<ImageReference | null>(null);
  const [props, setProps] = useState<Props>({ ...defaultProps, ...initProps });
  const [config, setConfig] = useState<ConfigProps>({
    ...defaultConfig,
    ...initConfig,
  });
  const [error, setError] = useState("");
  // const {setStatus} = useContext(StatusSetModeContext);

  useEffect(() => {
    // setStatus(StatusMode.WARNING);
    if (update_props) update_props(props);
  }, [props, update_props]);

  useEffect(() => {
    if (update_config) update_config(config);
  }, [config, update_config]);

  const upload_image = useCallback((image: string, image_name?: string) => {
    setError("");
    setProps({ ...defaultProps, image, image_name: image_name ?? image });
  }, []);

  const error_image = useCallback((error: string) => {
    setError(error);
  }, []);

  const set_image = useCallback((image: string, image_name?: string) => {
    setProps((prev) => ({ ...prev, image, image_name: image_name ?? image }));
  }, []);

  const set_config = useCallback(
    (
      key: keyof ConfigProps,
      value?: string | CanvasSizes | CanvasSizesOptions
    ) => {
      switch (key) {
        case "dense":
        case "optimizeImage":
        case "showInfo":
        case "background_transparency_pattern":
        case "expandOne":
          setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
          break;
        default:
          setConfig((prev) => ({ ...prev, [key]: value }));
          break;
      }
    },
    []
  );

  const redoM = useMemo(
    () =>
      history && history.has_redo()
        ? () => setProps(history.redo() as Props)
        : undefined,
    [history]
  );

  const undoM = useMemo(
    () =>
      history && history.has_undo()
        ? () => setProps(history.undo() as Props)
        : undefined,
    [history]
  );

  return (
    <Box className={styles.container}>
      <ImgHeader
        image={props.image}
        image_name={props.image_name}
        setImage={set_image}
        config={config}
        setConfig={set_config}
        upload_image={upload_image}
        error={error_image}
        has_history={history !== undefined}
        undo={undoM}
        redo={redoM}
      />
      <Box className={styles.commands_image_wrapper}>
        <div className={styles.commands_wrapper}>
          <ImgCommands
            props={props}
            config={config}
            setProps={setProps}
            imgRef={imgRef}
            dense={config.dense}
          />
        </div>
        <ImgContainer
          props={props}
          config={config}
          setProps={setProps}
          upload_image={upload_image}
          error={error_image}
          setInnerRef={setImgRef}
        />
      </Box>
      <Snackbar
        open={error !== ""}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={() => setError("")}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setError("")}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
