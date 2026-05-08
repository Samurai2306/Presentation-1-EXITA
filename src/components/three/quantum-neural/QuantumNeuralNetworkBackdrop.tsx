"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/cn";
import { getPerfProfile, type PerfProfile } from "@/lib/perfGating";

const QuantumNeuralNetworkWebGL = dynamic(
  () =>
    import("./QuantumNeuralNetworkWebGL").then((m) => m.QuantumNeuralNetworkWebGL),
  { ssr: false, loading: () => <QuantumNeuralLoadingPlaceholder /> },
);

function QuantumNeuralLoadingPlaceholder() {
  return (
    <div
      className="absolute inset-0 min-h-full w-full"
      style={{
        background:
          "radial-gradient(980px 520px at 50% 40%, rgba(102,126,234,0.16), transparent 55%), radial-gradient(720px 420px at 80% 80%, rgba(118,75,162,0.12), transparent 50%)",
      }}
      aria-hidden
    />
  );
}

export type QuantumNeuralNetworkBackdropProps = {
  className?: string;
  /** `viewport` — полноэкранный слой под страницей (fixed). `container` — под ближайшим relative-предком. */
  attach?: "container" | "viewport";
  perfTier?: PerfProfile;
  interactive?: boolean;
  transparentCanvas?: boolean;
};

/**
 * WebGL-фон «квантовой сети» (THREE + шейдеры). По умолчанию не перехватывает клики (`pointer-events-none`).
 */
export function QuantumNeuralNetworkBackdrop({
  className,
  attach = "container",
  perfTier: perfTierProp,
  interactive = false,
  transparentCanvas = false,
}: QuantumNeuralNetworkBackdropProps) {
  const [mounted, setMounted] = React.useState(false);
  const [tier, setTier] = React.useState<PerfProfile>("reduced");

  React.useEffect(() => {
    setMounted(true);
    setTier(perfTierProp ?? getPerfProfile());
  }, [perfTierProp]);

  return (
    <div
      className={cn(
        "overflow-hidden",
        attach === "viewport" ? "pointer-events-none fixed inset-0 z-0 min-h-dvh" : "absolute inset-0",
        !interactive && attach === "container" && "pointer-events-none",
        className,
      )}
      aria-hidden
    >
      {!mounted ? <QuantumNeuralLoadingPlaceholder /> : null}
      {mounted ? (
        <QuantumNeuralNetworkWebGL
          perfTier={tier}
          interactive={interactive}
          transparentCanvas={transparentCanvas}
          className="absolute inset-0 h-full min-h-full w-full"
        />
      ) : null}
    </div>
  );
}
