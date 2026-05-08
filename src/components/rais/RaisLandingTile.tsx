import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { RaisPanel, RaisPanelBody } from "@/components/rais/RaisPanel";
import { RaisTag } from "@/components/rais/RaisTag";

export function RaisLandingTile({
  title,
  subtitle,
  meta,
  tags,
  href,
  scheme = "dark",
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  tags?: string[];
  href?: string;
  scheme?: "dark" | "light";
  className?: string;
}) {
  const inner = (
    <RaisPanel
      scheme={scheme}
      className={cn(
        "group relative h-full overflow-hidden",
        scheme === "dark"
          ? "transition-colors hover:border-white/25 hover:bg-black/30"
          : cn(
              "transition-colors",
              "hover:border-black/30 hover:bg-[rgba(0,0,0,0.03)]",
              "hover:shadow-[0_14px_44px_rgba(0,0,0,0.10)]",
            ),
        "transition-[transform,box-shadow,filter,border-color,background-color] duration-420 ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
    >
      <RaisPanelBody className="p-4 sm:p-5 lg:p-6">
        {meta ? (
          <div
            className={cn(
              "text-[11px] uppercase tracking-[0.18em]",
              scheme === "dark" ? "text-white/45" : "text-black/55",
            )}
          >
            {meta}
          </div>
        ) : null}
        <div
          className={cn(
            "mt-3 text-balance text-[18px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-[20px] lg:text-[22px]",
            scheme === "dark" ? "text-white" : "text-black",
          )}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            className={cn(
              "mt-3 text-[14px] leading-6 sm:leading-7",
              scheme === "dark" ? "text-white/60" : "text-black/75",
            )}
          >
            {subtitle}
          </div>
        ) : null}
        {tags && tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <RaisTag key={t} scheme={scheme}>
                {t}
              </RaisTag>
            ))}
          </div>
        ) : null}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              scheme === "dark"
                ? "radial-gradient(700px 260px at 18% 0%, rgba(255,255,255,0.12), transparent 55%)"
                : "radial-gradient(700px 260px at 18% 0%, rgba(0,0,0,0.10), transparent 58%)",
          }}
        />
      </RaisPanelBody>
    </RaisPanel>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "block h-full rounded-[22px] focus:outline-none focus-visible:ring-2",
          scheme === "dark" ? "focus-visible:ring-white/25" : "focus-visible:ring-black/20",
        )}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

