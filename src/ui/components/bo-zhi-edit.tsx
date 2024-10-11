import { useState, useEffect } from "react";
import Vditor from "vditor";
import "./bo-zhi.edit.css";
type Theme = "classic" | "dark";
type BoZhiEditProps = {
  theme: Theme;
};
export default function BoZhiEdit({ theme }: BoZhiEditProps) {
  const [vd, setVd] = useState<Vditor>();
  const changeTheme = (theme: Theme) => {
    if (vd) vd.setTheme(theme);
  };
  let vditor: Vditor | null = null;
  useEffect(() => {
    vditor = new Vditor("vditor", {
      toolbar: [],
      height: "100%",
      after: () => {
        vditor!.setValue("");
        setVd(vditor!);
      },
    });
    changeTheme(theme);
    return () => {
      vd?.destroy();
      setVd(undefined);
    };
  }, []);
  return (
    <div style={{ flex: "1" }}>
      <div id="vditor" className="vditor" />
    </div>
  );
}
