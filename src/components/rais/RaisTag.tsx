import * as React from "react";

import { cn } from "@/lib/cn";

type BaseProps = {
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
  scheme?: "dark" | "light";
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  };

type SpanProps = BaseProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, "className" | "children"> & {
    onClick?: undefined;
  };

export function RaisTag(props: ButtonProps | SpanProps) {
  const scheme = props.scheme ?? "dark";
  const common = cn(
    "rais-tag inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] leading-5",
    "transition-colors focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-(--app-focus)",
    scheme === "dark"
      ? props.selected
        ? "border-(--app-stroke-strong) bg-(--app-surface-3) text-(--app-text)"
        : "border-(--app-stroke) bg-(--app-surface-inset) text-(--app-text-2)"
      : props.selected
        ? "border-(--app-stroke-strong) bg-(--app-surface-2) text-(--app-text) shadow-[var(--app-rim-1)]"
        : "border-(--rais-border) bg-(--rais-surface) text-(--app-text-2) shadow-[var(--app-rim-1)]",
    scheme === "dark"
      ? "hover:border-(--app-stroke-strong) hover:text-(--app-text)"
      : "hover:border-(--app-stroke-strong) hover:text-(--app-text)",
    props.className,
  );

  if ("onClick" in props && typeof props.onClick === "function") {
    const { selected: _selected, className: _className, children, ...rest } = props;
    void _selected;
    void _className;
    return (
      <button type="button" className={common} {...rest}>
        {children}
      </button>
    );
  }

  const { selected: _selected, className: _className, children, ...rest } = props;
  void _selected;
  void _className;
  return (
    <span className={cn(common, "select-none")} {...rest}>
      {children}
    </span>
  );
}

