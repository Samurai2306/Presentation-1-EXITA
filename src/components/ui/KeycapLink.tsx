import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import type { KeycapSize, KeycapVariant } from "@/components/ui/KeycapButton";

const variantClass: Record<KeycapVariant, string> = {
  primary: "btn--primary",
  ghost: "btn--ghost",
  subtle: "btn--subtle",
  danger: "btn--danger",
};

const sizeClass: Record<KeycapSize, string> = {
  sm: "h-9 px-3 text-[12px]",
  md: "h-11 px-4 text-[13px]",
  lg: "h-12 px-5 text-[14px]",
};

export function KeycapLink({
  href,
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: KeycapVariant;
  size?: KeycapSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "key inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}

