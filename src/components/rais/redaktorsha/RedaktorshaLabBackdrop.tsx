import * as React from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

export function RedaktorshaLabBackdrop({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 -z-10", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-(--app-bg)" />
      <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(980px_560px_at_52%_2%,var(--exita-ambient),transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(720px_420px_at_12%_24%,color-mix(in_srgb,var(--exita-accent)_34%,transparent),transparent_60%),radial-gradient(680px_420px_at_88%_78%,color-mix(in_srgb,var(--app-separator-strong)_42%,transparent),transparent_58%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background:linear-gradient(to_right,color-mix(in_srgb,var(--app-separator)_72%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--app-separator-subtle)_72%,transparent)_1px,transparent_1px)] bg-size-[96px_96px] mask-[radial-gradient(closest-side_at_50%_14%,black,transparent_92%)]" />
      <motion.div
        className="absolute left-[-72px] top-[104px] h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--exita-accent)_42%,transparent),transparent)] blur-md"
        animate={reduceMotion ? { opacity: 0.3 } : { x: [0, 36, -14, 0], y: [0, -14, 10, 0], opacity: [0.22, 0.36, 0.28, 0.22] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-110px] top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--app-separator-strong)_46%,transparent),transparent)] blur-[14px]"
        animate={reduceMotion ? { opacity: 0.28 } : { x: [0, -42, 18, 0], y: [0, 16, -12, 0], opacity: [0.18, 0.32, 0.24, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-(--app-surface-3)/40 via-transparent to-(--app-surface-1)/70" />
    </motion.div>
  );
}

