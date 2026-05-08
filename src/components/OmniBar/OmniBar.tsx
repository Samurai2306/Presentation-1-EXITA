"use client";

import { usePathname } from "next/navigation";

import { ProjectNavSheet } from "@/components/navigation/ProjectNavSheet";
import { cn } from "@/lib/cn";

/**
 * Единственный глобальный элемент «навигации» вверху: бургер ☰.
 * Вся ручная навигация по зонам — внутри ProjectNavSheet.
 */
export function OmniBar() {
  const pathname = usePathname();
  const isRedaktorsha = pathname === "/rais/redaktorsha";
  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-300 flex w-full justify-start",
        isRedaktorsha && "top-1",
      )}
      aria-label="Глобальная навигация"
    >
      <div className={cn("pointer-events-auto p-4 sm:p-5", isRedaktorsha && "p-2.5 sm:p-3")}>
        <ProjectNavSheet />
      </div>
    </div>
  );
}
