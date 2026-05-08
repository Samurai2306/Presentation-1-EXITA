"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

import { KeycapLink } from "@/components/ui/KeycapLink";

function buildLoopText(pills: ReadonlyArray<string>) {
  const base = pills.filter(Boolean).map((x) => x.trim()).filter(Boolean);
  const joined = base.join("  •  ");
  // Repeat to avoid visual gaps when rotating
  return `${joined}  •  ${joined}`;
}

export function RaisStackOrb({
  pills,
  className,
}: {
  pills: ReadonlyArray<string>;
  className?: string;
}) {
  const size = 328;
  const orbit = pills.slice(0, 14);
  const loopTextOuter = React.useMemo(() => buildLoopText(orbit), [orbit]);
  const loopTextInner = React.useMemo(
    () => buildLoopText(["EXITA RAIS", "STACK", "DELIVERY", "R&D", "QUALITY", "SECURITY"]),
    [],
  );

  return (
    <div className={cn("rais-stack-orb relative", className)} aria-label="Наш стек">
      <div
        className="relative mx-auto grid place-items-center rounded-full border border-(--rais-border) bg-(--rais-surface) shadow-(--app-shadow-2)"
        style={{ width: "clamp(260px, 68vw, 360px)", height: "clamp(260px, 68vw, 360px)" }}
      >
        <div className="pointer-events-none absolute inset-5 rounded-full border border-(--app-separator)" />
        <div
          className="pointer-events-none absolute inset-[28px] rounded-full"
          style={{
            background:
              "repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--app-separator-strong) 82%, transparent) 0 10deg, transparent 10deg 20deg)",
            maskImage: "radial-gradient(circle at center, transparent 67%, black 72%)",
            WebkitMaskImage: "radial-gradient(circle at center, transparent 67%, black 72%)",
          }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-full mask-[radial-gradient(circle_at_center,transparent_58%,black_68%)]"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--app-separator) 72%, transparent), transparent 55%), radial-gradient(circle at 70% 80%, color-mix(in srgb, var(--app-separator-subtle) 76%, transparent), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <KeycapLink
            href="/rais/stack"
            variant="primary"
            size="lg"
            className="h-11 px-5 text-[13px] tracking-[0.08em] shadow-(--app-shadow-3) sm:h-14 sm:px-7 sm:text-[15px]"
          >
            Наш стек
          </KeycapLink>
          <div className="mt-2 text-center text-[12px] leading-6 text-(--app-text-2)">
            технологии и практики
          </div>
        </div>

        {/* Curved typography ring (centered) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          height="100%"
          aria-hidden
        >
          <defs>
            <path id="orbOuter" d="M 164 24 a 140 140 0 1 1 0 280 a 140 140 0 1 1 0 -280" />
            <path id="orbInner" d="M 164 44 a 120 120 0 1 1 0 240 a 120 120 0 1 1 0 -240" />
          </defs>

          <g className="orb-rotate">
            <text
              className="orb-text orb-text--outer"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              <textPath href="#orbOuter" startOffset="50%">
                {loopTextOuter}
              </textPath>
            </text>
          </g>

          <g className="orb-rotate orb-rotate--inner">
            <text
              className="orb-text orb-text--inner"
              dominantBaseline="middle"
              textAnchor="middle"
            >
              <textPath href="#orbInner" startOffset="50%">
                {loopTextInner}
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <style jsx>{`
        .orb-rotate {
          transform-origin: 50% 50%;
          animation: orb-rotate 18s linear infinite;
          will-change: transform;
        }
        .orb-rotate--inner {
          animation-duration: 24s;
          animation-direction: reverse;
          opacity: 0.9;
        }

        .orb-text {
          fill: var(--app-text-2);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .orb-text--outer {
          font-size: 11px;
        }
        .orb-text--inner {
          font-size: 10px;
          fill: var(--app-text-3);
        }

        :global(html.dark) .rais-stack-orb .orb-text {
          fill: color-mix(in srgb, var(--app-text) 72%, #f8efe1 28%);
        }

        :global(html.dark) .rais-stack-orb .orb-text--inner {
          fill: color-mix(in srgb, var(--app-text-2) 72%, #f0d9bf 28%);
        }

        @keyframes orb-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orb-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-rotate {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

