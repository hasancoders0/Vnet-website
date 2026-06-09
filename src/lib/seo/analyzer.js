import { normalizeText } from "./utils";

export function calculateKeywordDensity(text = "", keyword = "") {
  if (!text || !keyword) return 0;

  const clean = normalizeText(text);
  const words = clean.split(/\s+/).length;

  const matches =
    clean.split(normalizeText(keyword)).length - 1;

  const density = (matches / words) * 100;

  return Number(density.toFixed(2));
}