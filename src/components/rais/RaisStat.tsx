import * as React from "react";

import { cn } from "@/lib/cn";

export function RaisStat({
  label,
  value,
  hint,
  className,
  scheme = "dark",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  className?: string;
  scheme?: "dark" | "light";
}) {
  const _scheme = scheme;
  void _scheme;
  return (
    <div
      className={cn(
        "rounded-[18px] border border-(--app-stroke) bg-(--app-surface-2) p-4",
        "shadow-[var(--app-shadow-1)]",
        className,
      )}
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
        {label}
      </div>
      <div className="mt-2 text-2xl font-light tracking-tight text-(--app-text)">
        {value}
      </div>
      {hint ? (
        <div className="mt-2 text-[12px] text-(--app-text-3)">
          {hint}
        </div>
      ) : null}
    </div>
  );
}

