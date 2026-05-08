"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { cn } from "@/lib/cn";
import { TouchTexture } from "@/components/three/liquid/touchTexture";

function WebglLoadPlaceholder() {
  return (
    <div
      className="absolute inset-0 min-h-full w-full bg-[radial-gradient(980px_520px_at_8%_8%,rgba(79,70,229,0.24),transparent_58%),radial-gradient(720px_420px_at_100%_12%,rgba(109,40,217,0.19),transparent_52%),radial-gradient(860px_480px_at_12%_92%,rgba(13,148,136,0.14),transparent_50%),radial-gradient(700px_400px_at_88%_88%,rgba(2,132,199,0.1),transparent_48%)]"
      aria-hidden
    />
  );
}

const LiquidGradientScene = dynamic(
  () =>
    import("@/components/three/liquid/LiquidGradientScene").then((m) => m.LiquidGradientScene),
  { ssr: false, loading: () => <WebglLoadPlaceholder /> },
);

type Props = {
  className?: string;
};

/**
 * Полноэкранный слой под зоной консьержа: интерактивный liquid gradient (Three.js).
 * Координаты касаний нормализуются по «зоне ассистента» ( корневой контейнер ).
 */
export function LiquidGradientBackdrop({ className }: Props) {
  const zoneRef = React.useRef<HTMLDivElement>(null);
  const [touch, setTouch] = React.useState<TouchTexture | null>(null);

  React.useEffect(() => {
    const t = new TouchTexture();
    setTouch(t);
    return () => {
      t.dispose();
    };
  }, []);

  const pending = React.useRef<{ x: number; y: number } | null>(null);
  const raf = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!touch) return;
    const zone = zoneRef.current;
    if (!zone) return;

    const flush = () => {
      raf.current = null;
      const p = pending.current;
      pending.current = null;
      if (p) touch.addTouch(p);
    };

    const onMove = (e: PointerEvent) => {
      const r = zone.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        return;
      }
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      pending.current = { x, y };
      if (raf.current == null) {
        raf.current = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [touch]);

  return (
    <div
      ref={zoneRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {touch ? <LiquidGradientScene touch={touch} className="absolute inset-0 h-full min-h-full w-full" /> : <WebglLoadPlaceholder />}

      {/* Слегка сглаживает WebGL, не выбеливая цвета. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-[color-mix(in_srgb,var(--rais-bg)_25%,transparent)]"
        style={{ opacity: 0.52 }}
      />
    </div>
  );
}
