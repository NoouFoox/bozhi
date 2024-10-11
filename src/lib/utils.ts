import { RgbaArray } from "./types";

// 十六进制颜色转换 RGBA 颜色
export function hexToRgba(hex: string, alpha = 1): RgbaArray {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, alpha];
}
// RGBA 颜色转换十六进制颜色
export function rgbaToHex(rgba: RgbaArray): string {
  return `#${rgba
    .slice(0, 3)
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;
}