export type ZoneId =
  | "concierge"
  | "global"
  | "nep"
  | "rais"
  | "rais_redaktorsha"
  | "rais_ya_zhivoy"
  | "rais_analytics";

export type UIMode = "navigator" | "chat";

export type ZoneTheme = {
  id: ZoneId;
  label: string;
  accentCssVar: string;
  ambientCssVar: string;
};

export const ZONES: ZoneTheme[] = [
  {
    id: "concierge",
    label: "Concierge",
    accentCssVar: "--accent-indigo",
    ambientCssVar: "--ambient-indigo",
  },
  {
    id: "global",
    label: "EXITA Global",
    accentCssVar: "--accent-silver",
    ambientCssVar: "--ambient-silver",
  },
  {
    id: "nep",
    label: "EXITA Н.Э.П.",
    accentCssVar: "--accent-royal",
    ambientCssVar: "--ambient-royal",
  },
  {
    id: "rais",
    label: "EXITA РАИС",
    accentCssVar: "--accent-crimson",
    ambientCssVar: "--ambient-crimson",
  },
  {
    id: "rais_redaktorsha",
    label: "Редакторша",
    accentCssVar: "--accent-crimson",
    ambientCssVar: "--ambient-crimson",
  },
  {
    id: "rais_ya_zhivoy",
    label: "Я Живой",
    accentCssVar: "--accent-mint",
    ambientCssVar: "--ambient-mint",
  },
  {
    id: "rais_analytics",
    label: "Аналитика",
    accentCssVar: "--accent-cyan",
    ambientCssVar: "--ambient-cyan",
  },
];

export function getZoneTheme(zone: ZoneId): ZoneTheme {
  return ZONES.find((z) => z.id === zone) ?? ZONES[0]!;
}

