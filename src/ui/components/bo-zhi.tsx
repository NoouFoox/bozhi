import { invoke } from "@tauri-apps/api/core";
import { useMemo, useState } from "react";
import { contrastColor, hexToRgba } from "../../lib/utils";
import "./bo-zhi.css";
import { Plus } from "lucide-react";
import ColorInput from "./color-input";
import BoZhiPin from "./bo-zhi-pin";
import BoZhiEdit from "./bo-zhi-edit";
const defaultColor = "#fff4aa";
export default function boZhi() {
  const [color, setColor] = useState(defaultColor);
  const addWindow = async (): Promise<void> => {
    await invoke("add_new_window", { });
  }
  const changeColor = async (value: string): Promise<void> => {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("set_background_color", { color: hexToRgba(value) });
    setColor(value);
  };
  const barFontColor = useMemo(() => contrastColor(hexToRgba(color)), [color]);
  return (
    <div className="bo-zhi-content" style={{ background: color }}>
      <div className="bo-zhi-content-main">
        <BoZhiEdit theme={barFontColor === "#ffffff" ? "classic" : "dark"} />
      </div>
      <div className="bo-zhi-tool-bar" style={{ color: barFontColor }}>
        <Plus onClick={addWindow}></Plus>
        <ColorInput
          color={color}
          onChange={changeColor}
          defaultColor={defaultColor}
        />
      </div>
      <BoZhiPin fonsColor={barFontColor} />
    </div>
  );
}
