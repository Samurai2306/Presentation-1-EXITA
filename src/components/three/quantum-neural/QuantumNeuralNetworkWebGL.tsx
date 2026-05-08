"use client";

import * as React from "react";

import { mountQuantumNeuralCanvas } from "./mountQuantumNeuralCanvas";
import type { QuantumNeuralRuntimeOptions } from "./types";

export type QuantumNeuralNetworkWebGLProps = QuantumNeuralRuntimeOptions & {
  className?: string;
};

/**
 * Canvas на всю область родителя; размер берётся из `ResizeObserver` (подходит для фона страницы/секции).
 */
export function QuantumNeuralNetworkWebGL({
  className,
  perfTier,
  transparentCanvas = false,
  interactive = false,
  paletteIndex = 0,
  formationIndex = 0,
  densityFactor = 1,
}: QuantumNeuralNetworkWebGLProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const root = wrapRef.current;
    if (!canvas || !root) return;

    const handle = mountQuantumNeuralCanvas({
      canvas,
      perfTier,
      transparentCanvas,
      interactive,
      paletteIndex,
      formationIndex,
      densityFactor,
    });

    const applySize = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      handle.resize(w, h);
    };

    const ro = new ResizeObserver(() => applySize());
    ro.observe(root);
    applySize();

    return () => {
      ro.disconnect();
      handle.dispose();
    };
  }, [perfTier, transparentCanvas, interactive, paletteIndex, formationIndex, densityFactor]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ position: "relative", width: "100%", height: "100%", minHeight: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{
          display: "block",
          touchAction: interactive ? "none" : "auto",
          cursor: interactive ? "crosshair" : "default",
        }}
      />
    </div>
  );
}
