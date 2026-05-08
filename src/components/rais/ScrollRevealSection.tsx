"use client";

import * as React from "react";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/cn";

const DEFAULT_MIN_OPACITY = 0.08;

export function ScrollRevealSection({
  children,
  className,
  delay = 0,
  finalizeAtPageBottom = false,
  minOpacity = DEFAULT_MIN_OPACITY,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  finalizeAtPageBottom?: boolean;
  minOpacity?: number;
}) {
  const reducedMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: finalizeAtPageBottom
      ? (["start end", "end end"] as const)
      : (["start 0.92", "start 0.26"] as const),
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    const stagger = Math.min(0.28, delay * 0.07);
    const u = Math.min(1, Math.max(0, (p - stagger) / Math.max(1e-6, 1 - stagger)));
    const t = u * u * (3 - 2 * u);
    return minOpacity + t * (1 - minOpacity);
  });

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <m.div ref={ref} className={cn(className)} style={{ opacity }}>
      {children}
    </m.div>
  );
}
