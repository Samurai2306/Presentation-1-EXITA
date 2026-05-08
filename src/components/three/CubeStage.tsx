"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/cn";
import { getPerfProfile } from "@/lib/perfGating";

const CubeCanvas = dynamic(
  () => import("./CubeCanvas").then((m) => m.CubeCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-[36px] bg-white/[0.03]" />
    ),
  },
);

export function CubeStage({
  mode,
  cursorHint,
  pulse,
}: {
  mode: "navigator" | "chat";
  cursorHint?: { x: number; y: number } | null;
  pulse?: number;
}) {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    setEnabled(getPerfProfile() === "full");
  }, []);

  return (
    <div className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-[42px] opacity-70"
        style={{
          background:
            "radial-gradient(520px 320px at 50% 35%, var(--exita-ambient), transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.02] backdrop-blur-xl",
        )}
      >
        {enabled ? (
          <CubeCanvas mode={mode} cursorHint={cursorHint} pulse={pulse} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative h-[58%] w-[58%] rounded-[36px] border border-white/10 bg-white/[0.03]">
              <div
                aria-hidden
                className="absolute inset-0 rounded-[36px] opacity-15"
                style={{ boxShadow: "0 0 90px var(--exita-accent)" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

