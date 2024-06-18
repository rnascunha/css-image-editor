"use client";

import ImageEditor, {
  ImageEditorCommandProps as Props,
  ImageEditorConfigProps as ConfigProps,
} from "@/components/imgEditor/imageEditor";
import Spinner from "@/components/spinner/spinner";
import { debounce } from "@/lib/debounce";
import { useEffect, useState } from "react";

export default function ImageEditorComponent() {
  const [props, setProps] = useState<Props | undefined>(undefined);
  const [config, setConfig] = useState<ConfigProps | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const sprops = localStorage.getItem("imageEditorProps");
    const sconfig = localStorage.getItem("imageEditorConfigProps");

    if (sprops) setProps(JSON.parse(sprops) as Props);
    if (sconfig) setConfig(JSON.parse(sconfig) as ConfigProps);
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

  const dProps = debounce(
    (e) => localStorage.setItem("imageEditorProps", JSON.stringify(e)),
    1000
  );

  const dConfig = debounce(
    (e) => localStorage.setItem("imageEditorConfigProps", JSON.stringify(e)),
    1000
  );

  return (
    <ImageEditor
      props={props}
      config={config}
      update_props={dProps}
      update_config={dConfig}
    />
  );
}
