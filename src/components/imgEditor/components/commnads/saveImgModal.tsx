import styles from "./saveImgModal.module.css";

import { useEffect, useState } from "react";

import { toJpeg, toPng } from "html-to-image";

import { download } from "@/lib/download";

import { download_processed_image } from "../../export_html";
import { ImageReference } from "../../types";

import InputWithUnitStyled from "@/components/styled/inputWithUnit";

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Slider,
  Stack,
  Tooltip,
} from "@mui/material";

import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import PhotoIcon from "@mui/icons-material/Photo";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Spinner from "@/components/spinner/spinner";

enum ImageExtension {
  PNG = ".png",
  JPEG = ".jpg",
  HTML = ".html",
}

interface SaveFileInfo {
  name: string;
  bg: boolean;
  extension: ImageExtension;
  quality: number;
  dimension: [number, number];
  scale: [number, number];
}

const defaultSaveInfo: SaveFileInfo = {
  name: "image",
  bg: true,
  extension: ImageExtension.PNG,
  quality: 100,
  dimension: [1, 1],
  scale: [1, 1],
};

interface SaveImgModalProps {
  close(): void;
  imageRef: ImageReference | null;
  image_name?: string;
}

export default function SaveImgModal({
  close,
  imageRef,
  image_name,
}: SaveImgModalProps) {
  const [info, setInfo] = useState<SaveFileInfo>({
    ...defaultSaveInfo,
    name: image_name ?? defaultSaveInfo.name,
  });
  const [saving, setSaving] = useState(false);

  const reset_value = (key: "dimension" | "scale") => {
    if (!imageRef || !imageRef.container) return;
    const c = imageRef.container;
    const { width, height } = c.getBoundingClientRect();
    setInfo((prev) => ({
      ...prev,
      [key]: [width, height],
    }));
  };

  useEffect(() => {
    if (!imageRef || !imageRef.container) return;
    const c = imageRef.container;
    const { width, height } = c.getBoundingClientRect();
    setInfo((prev) => ({
      ...prev,
      dimension: [width, height],
      scale: [width, height],
    }));
  }, [imageRef]);

  const saveFile = () => {
    if (!imageRef?.image) return;
    setSaving(true);

    const opt = {
      width: info.dimension[0],
      height: info.dimension[1],
      canvasWidth: info.scale[0],
      canvasHeight: info.scale[1],
      style: {
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
      },
    };
    const imgH = (info.bg ? imageRef.container : imageRef.image) as HTMLElement;
    const img = imgH.cloneNode(true) as HTMLElement;
    if (info.extension === ImageExtension.HTML) {
      download_processed_image(img, imageRef.image.src, info.name);
      close();
      return;
    }

    (info.extension === ImageExtension.PNG
      ? toPng(img, opt)
      : toJpeg(img, {
          ...opt,
          quality: info.quality / 100,
        })
    )
      .then((dataUrl) => download(dataUrl, `${info.name}${info.extension}`))
      .finally(() => {
        setSaving(false);
        close();
      });
  };

  return (
    <Stack
      className={styles.container}
      spacing={1}
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <h1>Export</h1>
      <InputWithUnitStyled
        value={info.name}
        label="File name"
        onChange={(ev) => setInfo({ ...info, name: ev.target.value })}
        sx={{
          width: "100%",
        }}
        unitProps={{
          value: info.extension,
          style: {
            width: "6ch",
          },
          onChange: (ev) =>
            setInfo({ ...info, extension: ev.target.value as ImageExtension }),
        }}
        units={Object.values(ImageExtension)}
      />
      <FormControlLabel
        control={<Checkbox checked={info.bg} />}
        label="Add background"
        disabled={info.extension === ImageExtension.HTML}
        sx={{
          "& .MuiFormControlLabel-label.MuiTypography-root.Mui-disabled": {
            color: "grey",
          },
          "& .MuiButtonBase-root.MuiCheckbox-root.Mui-disabled": {
            color: "grey",
          },
        }}
        onChange={(ev) =>
          setInfo({ ...info, bg: (ev.target as HTMLInputElement).checked })
        }
      />
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <InputWithUnitStyled
          label="Quality"
          type="number"
          disabled={info.extension !== ImageExtension.JPEG}
          value={info.quality}
          inputProps={{
            min: 1,
            max: 100,
            step: 1,
          }}
          sx={{
            width: "15ch",
          }}
          units="%"
          onChange={(ev) => setInfo({ ...info, quality: +ev.target.value })}
        />
        <Slider
          disabled={info.extension !== ImageExtension.JPEG}
          value={info.quality}
          min={1}
          max={100}
          step={1}
          onChange={(event: Event, newValue: number | number[]) =>
            setInfo({ ...info, quality: newValue as number })
          }
        />
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        style={{
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <Tooltip
          disableFocusListener
          disableTouchListener
          title="Container size"
        >
          <PhotoIcon fontSize="large" />
        </Tooltip>
        <InputWithUnitStyled
          label="Width"
          type="number"
          value={info.dimension[0]}
          disabled={info.extension === ImageExtension.HTML}
          inputProps={{
            min: 1,
            step: 1,
          }}
          sx={{
            maxWidth: "12ch",
          }}
          units="px"
          onChange={(ev) =>
            setInfo((prev) => ({
              ...prev,
              dimension: [+ev.target.value, prev.dimension[1]],
            }))
          }
        />
        <InputWithUnitStyled
          label="Height"
          type="number"
          value={info.dimension[1]}
          disabled={info.extension === ImageExtension.HTML}
          inputProps={{
            min: 1,
            step: 1,
          }}
          sx={{
            maxWidth: "12ch",
          }}
          units="px"
          onChange={(ev) =>
            setInfo((prev) => ({
              ...prev,
              dimension: [prev.dimension[0], +ev.target.value],
            }))
          }
        />
        <IconButton
          aria-label="Reset dimension"
          disabled={info.extension === ImageExtension.HTML}
          onClick={() => {
            reset_value("dimension");
          }}
          sx={{
            color: "text.primary",
          }}
        >
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Reset values"
          >
            <RestartAltIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        style={{
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <Tooltip disableFocusListener disableTouchListener title="Resize image">
          <PhotoSizeSelectSmallIcon fontSize="large" />
        </Tooltip>
        <InputWithUnitStyled
          label="Width"
          type="number"
          value={info.scale[0]}
          disabled={info.extension === ImageExtension.HTML}
          inputProps={{
            min: 1,
            max: 100,
            step: 1,
          }}
          sx={{
            maxWidth: "12ch",
          }}
          units="px"
          onChange={(ev) =>
            setInfo((prev) => ({
              ...prev,
              scale: [+ev.target.value, prev.scale[1]],
            }))
          }
        />
        <InputWithUnitStyled
          label="Height"
          type="number"
          value={info.scale[1]}
          disabled={info.extension === ImageExtension.HTML}
          inputProps={{
            min: 1,
            step: 1,
          }}
          sx={{
            maxWidth: "12ch",
          }}
          units="px"
          onChange={(ev) =>
            setInfo((prev) => ({
              ...prev,
              scale: [prev.scale[0], +ev.target.value],
            }))
          }
        />
        <IconButton
          aria-label="Reset scale"
          disabled={info.extension === ImageExtension.HTML}
          onClick={() => {
            reset_value("scale");
          }}
          sx={{
            color: "text.primary",
          }}
        >
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Reset values"
          >
            <RestartAltIcon fontSize="large" />
          </Tooltip>
        </IconButton>
      </Stack>
      <hr
        style={{
          width: "100%",
        }}
      />
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignSelf: "end",
        }}
      >
        <Button
          variant="outlined"
          onClick={close}
          sx={{
            borderColor: "btn",
            color: "btn",
            "&:hover": {
              borderColor: "btn",
              color: "btn",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "btn",
            "&:hover": {
              backgroundColor: "btn",
            },
          }}
          disabled={imageRef === null || info.name === "" || saving}
          onClick={saveFile}
        >
          Export{saving ? <Spinner width="15px" height="15px" /> : ""}
        </Button>
      </Stack>
    </Stack>
  );
}
