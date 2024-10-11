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

export function contrastColor(color: RgbaArray): '#000000' | '#ffffff' {
  const [r, g, b] = color;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? "#000000" : "#ffffff";
}
// 减淡颜色
export function lightenColor(color: RgbaArray, percent: number): string {
  const [r, g, b, a] = color;
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  return rgbaToHex([
    Math.round((t - r) * p + r),
    Math.round((t - g) * p + g),
    Math.round((t - b) * p + b),
    a,
  ]);
}