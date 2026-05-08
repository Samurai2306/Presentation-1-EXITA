import * as React from "react";

import { cn } from "@/lib/cn";

export type KeycapVariant = "primary" | "ghost" | "subtle" | "danger";
export type KeycapSize = "sm" | "md" | "lg";

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

export function KeycapButton({
  variant = "ghost",
  size = "md",
  pressed,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: KeycapVariant;
  size?: KeycapSize;
  pressed?: boolean;
}) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      aria-pressed={typeof pressed === "boolean" ? pressed : props["aria-pressed"]}
      className={cn(
        "key inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-55",
        variantClass[variant],
        sizeClass[size],
        pressed ? "key--active" : null,
        className,
      )}
    />
  );
}

