import { Pin, PinOff } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
type BoZhiPinProps = {
  fonsColor: string;
};
export default function BoZhiPin({ fonsColor }: BoZhiPinProps) {
  const [isPinned, setIsPinned] = useState(false);
  useEffect(() => {
    changePin(false);
  },[])
  const changePin = async (value: boolean): Promise<void> => {
    await invoke("set_pinned", { pinned: value });
    setIsPinned(value);
  }
  return (
    <div className="bo-zhi-pin" style={{ color: fonsColor }}>
      {isPinned ? (
        <Pin size={18} onClick={() => changePin(false)} />
      ) : (
        <PinOff size={18} onClick={() => changePin(true)} />
      )}
    </div>
  );
}
