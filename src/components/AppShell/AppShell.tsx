"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { getZoneTheme, type ZoneId } from "@/lib/zones";
import { useUIState } from "@/lib/uiState";
import { OmniBar } from "@/components/OmniBar/OmniBar";

function deriveZoneFromPath(pathname: string): ZoneId {
  if (pathname === "/") return "concierge";
  if (pathname.startsWith("/about")) return "concierge";
  if (pathname.startsWith("/global")) return "concierge";
  if (pathname.startsWith("/exita")) return "concierge";
  if (pathname.startsWith("/nep")) return "nep";
  if (pathname === "/rais") return "rais";
  if (pathname.startsWith("/rais/redaktorsha")) return "rais_redaktorsha";
  if (pathname.startsWith("/rais/ya-zhivoy")) return "rais_ya_zhivoy";
  if (pathname.startsWith("/rais/analytics")) return "rais_analytics";
  if (pathname.startsWith("/rais")) return "rais";
  return "concierge";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const zone = useUIState((s) => s.zone);
  const setZone = useUIState((s) => s.setZone);
  const appTheme = useUIState((s) => s.theme);

  React.useEffect(() => {
    const derived = deriveZoneFromPath(pathname);
    if (derived !== zone) setZone(derived);
  }, [pathname, setZone, zone]);

  React.useEffect(() => {
    const msg = "This module has been deprecated. Please use THREE.Timer instead.";
    const isClockDeprecation = (args: unknown[]) =>
      typeof args[0] === "string" &&
      (args[0].includes("THREE.Clock") || args[0].includes("THREE.THREE.Clock")) &&
      args[0].includes(msg);

    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      if (isClockDeprecation(args)) return;
      origWarn(...args);
    };
    return () => {
      console.warn = origWarn;
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", appTheme === "dark");
  }, [appTheme]);

  const theme = getZoneTheme(zone);
  const style = {
    "--exita-accent": `var(${theme.accentCssVar})`,
    "--exita-ambient": `var(${theme.ambientCssVar})`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative flex min-h-dvh flex-1 flex-col overflow-x-hidden",
        "bg-(--app-bg) text-(--app-fg)",
        "bg-[radial-gradient(1200px_800px_at_50%_0%,color-mix(in_srgb,var(--app-fg)_6%,transparent),transparent_55%)]",
      )}
      style={style}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, var(--exita-ambient), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(900px 480px at 50% 20%, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      <OmniBar />
      <main className="flex flex-1 flex-col pt-16 sm:pt-18">{children}</main>
    </div>
  );
}

