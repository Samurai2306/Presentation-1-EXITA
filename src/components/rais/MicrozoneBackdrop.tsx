"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

export function MicrozoneBackdrop({
  scheme = "dark",
  auraOpacity,
  gridOpacity,
  /** Подложка под WebGL/анимацию: базовый слой полупрозрачный, z-index выше слоя сцены (см. QuantumNeuralNetworkBackdrop). */
  allowAnimatedDepth = false,
}: {
  scheme?: "dark" | "light";
  auraOpacity?: number;
  gridOpacity?: number;
  allowAnimatedDepth?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0",
        allowAnimatedDepth ? "z-[1]" : "-z-10",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {scheme === "dark" ? (
        <>
          <div className={cn("absolute inset-0", allowAnimatedDepth ? "bg-black/28" : "bg-black/40")} />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(900px 520px at 50% 10%, var(--exita-ambient), transparent 70%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            className={cn("absolute inset-0", !allowAnimatedDepth && "bg-(--app-bg)")}
            style={
              allowAnimatedDepth
                ? { background: "color-mix(in srgb, var(--app-bg) 40%, transparent)" }
                : undefined
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(980px 560px at 50% 6%, var(--exita-ambient), transparent 62%)",
              opacity: auraOpacity ?? 0.28,
            }}
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[88px_88px] mask-[radial-gradient(closest-side_at_50%_18%,black,transparent_92%)]"
            style={{ opacity: gridOpacity ?? 0.1 }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-white/35 via-transparent to-white/65" />
        </>
      )}
    </motion.div>
  );
}

