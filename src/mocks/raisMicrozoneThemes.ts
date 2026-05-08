import type { ZoneId } from "@/lib/zones";

export type RaisMicrozoneThemeId = Extract<
  ZoneId,
  "rais_redaktorsha" | "rais_ya_zhivoy" | "rais_analytics"
>;

export type RaisMicrozoneTheme = {
  id: RaisMicrozoneThemeId;
  label: string;
  /**
   * Used for subtle hero watermark + backdrop cadence.
   * Keep values short and stable; don't couple to copy.
   */
  mark: "scan" | "health" | "analytics";
  /**
   * Controls how strong the ambient aura looks in light mode.
   */
  auraOpacity: number;
  /**
   * Controls grid/pattern visibility in light mode.
   */
  gridOpacity: number;
};

export const raisMicrozoneThemes: Record<RaisMicrozoneThemeId, RaisMicrozoneTheme> = {
  rais_redaktorsha: {
    id: "rais_redaktorsha",
    label: "Редакторша",
    mark: "scan",
    auraOpacity: 0.32,
    gridOpacity: 0.1,
  },
  rais_ya_zhivoy: {
    id: "rais_ya_zhivoy",
    label: "Я Живой",
    mark: "health",
    auraOpacity: 0.26,
    gridOpacity: 0.09,
  },
  rais_analytics: {
    id: "rais_analytics",
    label: "Бизнес-аналитика",
    mark: "analytics",
    auraOpacity: 0.24,
    gridOpacity: 0.08,
  },
};

