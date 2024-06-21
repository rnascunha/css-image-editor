import { ImageEditorCommandProps, ImageEditorConfigProps } from "@/components/imgEditor/imageEditor";


const propsLabel = "imageEditorProps";
const configLabel = "imageEditorConfigProps";

export function saveProps(e:ImageEditorCommandProps) {
  localStorage.setItem(propsLabel, JSON.stringify(e));
}

export function saveConfig(e:ImageEditorConfigProps) {
  localStorage.setItem(configLabel, JSON.stringify(e));
}

export function clearStorage() {
  localStorage.removeItem(configLabel);
  localStorage.removeItem(propsLabel);
}