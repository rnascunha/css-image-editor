"use client";

import { useEffect, useRef, useState } from "react";

import History from "@/components/imgEditor/history";
import { debounce } from "@/lib/debounce";

import ImageEditor, {
  ImageEditorCommandProps as Props,
  ImageEditorConfigProps as ConfigProps,
} from "@/components/imgEditor/imageEditor";
import Spinner from "@/components/spinner/spinner";

export default function ImageEditorComponent() {
  const [props, setProps] = useState<Props | undefined>(undefined);
  const [config, setConfig] = useState<ConfigProps | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  const history = useRef(new History());

  useEffect(() => {
    const sprops = localStorage.getItem("imageEditorProps");
    const sconfig = localStorage.getItem("imageEditorConfigProps");

    sprops && setProps(JSON.parse(sprops) as Props);
    sconfig && setConfig(JSON.parse(sconfig) as ConfigProps);
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    );

  const dProps = debounce((e: Props) => {
    try {
      console.log("saving...");
      history.current.add(e);
      localStorage.setItem("imageEditorProps", JSON.stringify(e));
    } catch (e) {
      console.warn(e);
    }
  }, 1000);

  const dConfig = debounce((e) => {
    try {
      localStorage.setItem("imageEditorConfigProps", JSON.stringify(e));
    } catch (e) {
      console.warn(e);
    }
  }, 1000);

  return (
    <ImageEditor
      props={props}
      config={config}
      update_props={dProps}
      update_config={dConfig}
      history={history.current}
    />
  );
}
