"use client";

export type PerfProfile = "full" | "reduced";

/**
 * Решение «full» vs «reduced» для тяжёлых 3D-фонов.
 * - `prefers-reduced-motion: reduce` — всегда reduced (a11y).
 * - Мобилки: осторожнее (mem/cores, если API доступны).
 * - Десктоп/планшет: full при отсутствии явных сигналов слабого железа (часто mem/cores = 0 в embedded/браузерах).
 */
export function getPerfProfile(): PerfProfile {
  if (typeof window === "undefined") return "reduced";

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }

  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const mem = nav.deviceMemory ?? 0;
  const cores = nav.hardwareConcurrency ?? 0;
  const narrow = window.matchMedia?.("(max-width: 640px)").matches ?? false;
  const likelyCoarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const likelyMobile = narrow || likelyCoarse;

  if (likelyMobile) {
    if (mem > 0 && mem < 3) return "reduced";
    if (cores > 0 && cores < 4) return "reduced";
  } else {
    if (mem > 0 && mem < 2) return "reduced";
    if (cores > 0 && cores < 2) return "reduced";
  }

  return "full";
}

/** Живой WebGL-фон зоны ассистента: отключаем только при явном reduced-motion. */
export function allowConciergeLiquidBackground(): boolean {
  if (typeof window === "undefined") return true;
  return !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

