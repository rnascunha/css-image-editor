"use client";

import { useContext, useEffect, useState } from "react";

// import History from "@/components/imgEditor/history";
import { debounce } from "@/lib/debounce";

import ImageEditor, {
  ImageEditorCommandProps as Props,
  ImageEditorConfigProps as ConfigProps,
} from "@/components/imgEditor/imageEditor";
import {
  StatusMode,
  StatusSetModeContext,
} from "@/components/status/statusContext";
import { saveConfig, saveProps } from "@/lib/storage";

import Spinner from "@/components/spinner/spinner";

export default function ImageEditorComponent() {
  const [props, setProps] = useState<Props | undefined>(undefined);
  const [config, setConfig] = useState<ConfigProps | undefined>(undefined);
  const [mounted, setMounted] = useState(false);
  // const history = useRef(new History());

  const { setStatus } = useContext(StatusSetModeContext);

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
          backgroundColor: "rgba(10, 10, 10, 0.3)"
        }}
      >
        <Spinner />
      </div>
    );

  const debounceProps = debounce((e: Props) => {
    try {
      // history.current.add(e);
      saveProps(e);
      setStatus(StatusMode.SUCCESS);
      console.log("s");
    } catch (e) {
      console.warn(e);
      setStatus(StatusMode.ERROR);
    }
  }, 1000);

  const dProps = function (e: Props) {
    setStatus(StatusMode.WARNING);
    debounceProps(e);
  };

  const dConfig = debounce((e: ConfigProps) => {
    try {
      saveConfig(e);
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
      // history={history.current}
    />
  );
}
