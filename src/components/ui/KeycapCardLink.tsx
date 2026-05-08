import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { KeycapVariant } from "@/components/ui/KeycapButton";

const variantClass: Record<KeycapVariant, string> = {
  primary: "btn--primary",
  ghost: "btn--ghost",
  subtle: "btn--subtle",
  danger: "btn--danger",
};

export function KeycapCardLink({
  href,
  variant = "ghost",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: KeycapVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "key block",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "transition-[transform,box-shadow,filter,border-color,background-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

