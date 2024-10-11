import { RotateCcw } from "lucide-react";
type ColorInputProps = {
  color: string;
  onChange: (color: string) => void;
  defaultColor?: string;
};
export default function ColorInput({
  color,
  onChange,
  defaultColor,
}: ColorInputProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        background: "#00000020",
        borderRadius: "5px",
        padding: "0 5px",
      }}
    >
      <input
        style={{ width: "25px", height: "25px" }}
        value={color}
        type="color"
        name="color"
        id="color"
        onChange={(e) => onChange(e.target.value)}
      />
      {defaultColor && (
        <RotateCcw
          size={18}
          style={{ cursor: "pointer" }}
          onClick={() => onChange(defaultColor)}
        />
      )}
    </div>
  );
}
