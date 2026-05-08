export const exitaEase = [0.22, 1, 0.36, 1] as const;

export const motionPresets = {
  fast: { duration: 0.25, ease: exitaEase },
  base: { duration: 0.45, ease: exitaEase },
  slow: { duration: 0.8, ease: exitaEase },
} as const;

