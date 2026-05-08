import * as React from "react";

import { cn } from "@/lib/cn";

type RaisPanelTone = "default" | "muted";
type RaisPanelVariant = "panel" | "card";
type RaisScheme = "dark" | "light";

export function RaisPanel({
  children,
  className,
  tone = "default",
  variant = "panel",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  tone?: RaisPanelTone;
  variant?: RaisPanelVariant;
  scheme?: RaisScheme;
}) {
  const border = "border-[var(--app-hairline)] border-(--app-stroke)";
  const textShadow = "shadow-[var(--app-rim-1)]";
  const depth =
    variant === "panel"
      ? "shadow-[var(--app-shadow-2)]"
      : "shadow-[var(--app-shadow-1)]";
  const baseBg =
    variant === "panel"
      ? "bg-(--app-glass-bg) supports-[backdrop-filter]:backdrop-blur-[var(--app-glass-blur)]"
      : "bg-(--app-surface-2) supports-[backdrop-filter]:backdrop-blur-[var(--app-glass-blur)]";
  const radius = variant === "panel" ? "rounded-[22px]" : "rounded-[18px]";

  return (
    <div
      className={cn(
        "rais-panel-root",
        radius,
        "border",
        border,
        baseBg,
        textShadow,
        depth,
        tone === "muted" && "opacity-[0.96]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function RaisPanelHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { scheme?: RaisScheme }) {
  return (
    <div
      className={cn(
        "rais-panel-header",
        "flex items-center justify-between gap-4 border-b-[var(--app-hairline)] px-6 py-5",
        "border-(--app-separator)",
        className,
      )}
      {...props}
    />
  );
}

export function RaisPanelTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { scheme?: RaisScheme }) {
  return (
    <div
      className={cn(
        "rais-panel-title",
        "text-[12px] font-medium tracking-wide",
        "text-(--app-fg)",
        className,
      )}
      {...props}
    />
  );
}

export function RaisPanelBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rais-panel-body p-6", className)} {...props} />;
}

