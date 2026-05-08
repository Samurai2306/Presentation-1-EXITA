import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UIMode, ZoneId } from "@/lib/zones";

/** Режим окна чата на главной (консьерж). */
export type ConciergeChatMode = "assistant";

export type AppTheme = "light" | "dark";

export type IntentId =
  | "legal"
  | "it"
  | "health"
  | "analytics"
  | "general";

export type UIContext = {
  intent: IntentId;
  productHint?: string;
  lastUtterance?: string;
  uploadedDocumentName?: string;
  toneHint?: "calm" | "stressed" | "neutral";
};

export type UIState = {
  theme: AppTheme;
  zone: ZoneId;
  mode: UIMode;
  /** Окно на главной: только маршрут (ассистент). */
  conciergeChatMode: ConciergeChatMode;
  context: UIContext;

  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;
  setZone: (zone: ZoneId) => void;
  setMode: (mode: UIMode) => void;
  patchContext: (patch: Partial<UIContext>) => void;
  resetContext: () => void;
};

const initialContext: UIContext = {
  intent: "general",
  toneHint: "neutral",
};

export const useUIState = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      zone: "concierge",
      mode: "navigator",
      conciergeChatMode: "assistant",
      context: initialContext,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
      setZone: (zone) => set({ zone }),
      setMode: (mode) => set({ mode }),
      patchContext: (patch) =>
        set((s) => ({ context: { ...s.context, ...patch } })),
      resetContext: () => set({ context: initialContext }),
    }),
    {
      name: "exita-ui",
      merge: (persisted, current) => {
        const p = persisted as Partial<UIState> | undefined;
        const persistedTheme = p?.theme === "dark" || p?.theme === "light" ? p.theme : undefined;
        return {
          ...current,
          ...p,
          theme: persistedTheme ?? current.theme,
          conciergeChatMode: "assistant",
        };
      },
    },
  ),
);

