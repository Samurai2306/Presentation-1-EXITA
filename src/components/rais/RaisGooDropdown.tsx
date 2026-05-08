"use client";

import type { ReactNode } from "react";
import { useId } from "react";

export type RaisGooDropdownVariant = "default" | "notes" | "case" | "telegram";

type RaisGooDropdownProps = {
  /** Primary label / header content */
  face: ReactNode;
  /** Expanded body */
  children: ReactNode;
  variant?: RaisGooDropdownVariant;
  className?: string;
  /** Override control id (rare; default from useId) */
  id?: string;
};

export function RaisGooDropdown({
  face,
  children,
  variant = "default",
  className = "",
  id: idProp,
}: RaisGooDropdownProps) {
  const uid = useId().replace(/:/g, "");
  const controlId = idProp ?? `rais-goo-dd-${uid}`;

  const variantClass =
    variant === "notes"
      ? "rais-goo-dropdown rais-goo-dropdown--notes"
      : variant === "case"
        ? "rais-goo-dropdown rais-goo-dropdown--case"
        : variant === "telegram"
          ? "rais-goo-dropdown rais-goo-dropdown--telegram"
          : "rais-goo-dropdown";

  const rootClass = `${variantClass} ${className}`.trim();

  return (
    <div className={rootClass}>
      <input id={controlId} type="checkbox" className="rais-goo-dropdown__control" />
      <label htmlFor={controlId} className="rais-goo-dropdown__face">
        <div className="rais-goo-dropdown__face-inner min-w-0 pr-10">{face}</div>
        <span className="rais-goo-dropdown__arrow" aria-hidden />
      </label>
      <div className="rais-goo-dropdown__panel">
        <div className="rais-goo-dropdown__panel-inner">{children}</div>
      </div>
    </div>
  );
}
