import * as React from "react";

import { cn } from "@/lib/cn";

export function RaisSectionHeader({
  eyebrow,
  title,
  description,
  right,
  className,
  as = "h1",
  size = "hero",
  divider = true,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
  size?: "hero" | "section";
  divider?: boolean;
  scheme?: "dark" | "light";
}) {
  const Heading = as;
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between gap-6 sm:flex-row",
        divider && "border-b border-(--app-border) pb-6",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <div
            className={cn(
              "text-[11px] uppercase tracking-[0.18em]",
              "text-(--app-fg-subtle)",
            )}
          >
            {eyebrow}
          </div>
        ) : null}
        <Heading
          className={cn(
            "mt-2 text-balance font-display font-semibold leading-[1.02] tracking-[-0.02em]",
            "text-(--app-fg)",
            size === "hero"
              ? "text-[40px] sm:text-[56px] lg:text-[64px] leading-[0.95] tracking-[-0.04em]"
              : "text-[28px] sm:text-[32px]",
          )}
        >
          {title}
        </Heading>
        {description ? (
          <div
            className={cn(
              "mt-4 max-w-3xl text-pretty text-[14px] leading-7 sm:text-[15px]",
              "text-(--app-fg-muted)",
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
      {right ? <div className="shrink-0 pt-1 sm:pt-2">{right}</div> : null}
    </div>
  );
}

