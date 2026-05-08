import { cn } from "@/lib/cn";

/**
 * Видимый фон ассистента: крупные радиальные пятна + движение (CSS, без WebGL).
 * WebGL-«жижа» рисуется отдельным слоем поверх.
 */
export function ConciergeAtmosphere({ className }: { className?: string }) {
  return <div className={cn("concierge-atmosphere", className)} aria-hidden />;
}
