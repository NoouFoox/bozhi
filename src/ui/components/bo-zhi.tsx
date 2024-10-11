import { invoke } from "@tauri-apps/api/core";
import { useMemo, useState } from "react";
import { contrastColor, hexToRgba } from "../../lib/utils";
import "./bo-zhi.css";
import ColorInput from "./color-input";
const defaultColor = "#fff4aa";
export default function boZhi() {
  const [color, setColor] = useState(defaultColor);
  const changeColor = async (value: string): Promise<void> => {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("set_background_color", { color: hexToRgba(value) });
    setColor(value);
  };
  const barFontColor = useMemo(() => contrastColor(hexToRgba(color)), [color]);
  return (
    <div className="bo-zhi-content" style={{ background: color }}>
      <div className="bo-zhi-content-main"></div>
      <div className="bo-zhi-tool-bar" style={{ color: barFontColor }}>
        <ColorInput
          color={color}
          onChange={changeColor}
          defaultColor={defaultColor}
        />
      </div>
    </div>
  );
}
