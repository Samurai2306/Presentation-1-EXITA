import * as React from "react";

import { cn } from "@/lib/cn";
import { MicrozoneBackdrop } from "@/components/rais/MicrozoneBackdrop";
import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { KeycapLink } from "@/components/ui/KeycapLink";
import type { RaisMicrozoneTheme } from "@/mocks/raisMicrozoneThemes";

function HeroMark({ mark, scheme }: { mark: RaisMicrozoneTheme["mark"]; scheme: "dark" | "light" }) {
  const common = cn(
    "pointer-events-none absolute -right-6 -top-8 h-[140px] w-[220px] rotate-[-10deg] select-none sm:-right-10 sm:-top-10 sm:h-[160px] sm:w-[260px]",
    scheme === "dark" ? "opacity-[0.22]" : "opacity-[0.18]",
  );

  const stroke = scheme === "dark" ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)";
  const fill = scheme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  if (mark === "scan") {
    return (
      <svg className={common} viewBox="0 0 260 160" aria-hidden>
        <rect x="36" y="22" width="160" height="116" rx="22" fill={fill} stroke={stroke} strokeWidth="1.2" />
        <path d="M58 52h116" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 7" />
        <path d="M58 78h98" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 7" />
        <path d="M58 104h82" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 7" />
        <path d="M54 34h26M176 34h26M54 126h26M176 126h26" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (mark === "health") {
    return (
      <svg className={common} viewBox="0 0 260 160" aria-hidden>
        <path
          d="M134 124c-26-16-62-38-62-72 0-16 12-28 28-28 12 0 22 6 28 16 6-10 16-16 28-16 16 0 28 12 28 28 0 34-36 56-62 72z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.2"
        />
        <path d="M86 80h22l10-18 12 36 10-18h30" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // analytics
  return (
    <svg className={common} viewBox="0 0 260 160" aria-hidden>
      <rect x="46" y="30" width="168" height="104" rx="18" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <path d="M76 112V82M108 112V66M140 112V92M172 112V54" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
      <path d="M76 112h104" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function RaisMicrozoneShell({
  title,
  description,
  subtitle,
  accent,
  code,
  children,
  theme,
  scheme = "dark",
  showBackdrop = true,
  backHref = "/rais",
  backLabel = "← к витрине",
  hideHeader = false,
  className,
  contentClassName,
  /** Слой читабельности над WebGL-фоном: полупрозрачная база и поднятый z-index контента. */
  backdropAllowAnimatedDepth = false,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  subtitle?: React.ReactNode;
  accent?: React.ReactNode;
  code?: React.ReactNode;
  children: React.ReactNode;
  theme?: RaisMicrozoneTheme;
  scheme?: "dark" | "light";
  showBackdrop?: boolean;
  backHref?: string;
  backLabel?: string;
  hideHeader?: boolean;
  className?: string;
  contentClassName?: string;
  backdropAllowAnimatedDepth?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full max-w-[1480px] px-4 pb-24 pt-10 sm:px-6",
        "bg-(--app-bg) text-(--app-fg)",
        className,
      )}
    >
      {showBackdrop ? (
        <MicrozoneBackdrop
          scheme={scheme}
          auraOpacity={scheme === "light" ? theme?.auraOpacity : undefined}
          gridOpacity={scheme === "light" ? theme?.gridOpacity : undefined}
          allowAnimatedDepth={backdropAllowAnimatedDepth}
        />
      ) : null}

      <div className={cn(backdropAllowAnimatedDepth && "relative z-10")}>
        {hideHeader ? null : (
          <RaisSectionHeader
            className="rais-microzone-shell-header"
            scheme={scheme}
            eyebrow={
            <span className="inline-flex items-center gap-2">
              <span className="rais-microzone-eyebrow-main">{scheme === "light" ? "IT‑зона / Проект" : "RAIS / Microzone"}</span>
              {code ? (
                <span className={cn("rais-microzone-eyebrow-code", scheme === "light" ? "text-black/60" : "text-white/68")}>
                  <span className="px-1">·</span>
                  {code}
                </span>
              ) : null}
            </span>
          }
          title={
            <span className="rais-microzone-title-wrap inline-flex flex-wrap items-end gap-x-3 gap-y-2">
              <span className="rais-microzone-title-main">{title}</span>
              {subtitle ? (
                <span
                  className={cn(
                    "rais-microzone-title-subtitle text-[0.52em] font-semibold tracking-[-0.01em]",
                    scheme === "light" ? "text-black/65" : "text-white/74",
                  )}
                >
                  {subtitle}
                </span>
              ) : null}
            </span>
          }
          description={description}
          right={
            <div className="relative flex items-center gap-3">
              {theme ? <HeroMark mark={theme.mark} scheme={scheme} /> : null}
              {accent ? (
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="h-2 w-2 rounded-full bg-(--exita-accent) shadow-[0_0_18px_var(--exita-accent)]" />
                  <div
                    className={cn(
                      "rais-microzone-accent-label text-[11px] uppercase tracking-[0.22em]",
                      scheme === "light" ? "text-black/68" : "text-white/72",
                    )}
                  >
                    {accent}
                  </div>
                </div>
              ) : null}
              <KeycapLink href={backHref} variant="ghost" size="sm">
                {backLabel}
              </KeycapLink>
            </div>
          }
        />
      )}

      <div className={cn("rais-microzone-content-grid mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12", contentClassName)}>
        {children}
      </div>
      </div>
    </div>
  );
}

