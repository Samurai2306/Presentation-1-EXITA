import * as React from "react";

import { cn } from "@/lib/cn";

import {
  RaisPanel,
  RaisPanelBody,
  RaisPanelHeader,
} from "@/components/rais/RaisPanel";

export type SurfaceTone = "default" | "muted";
export type SurfaceVariant = "panel" | "card";

export function SurfacePanel({
  className,
  tone = "default",
  variant = "panel",
  ...props
}: Omit<React.ComponentProps<typeof RaisPanel>, "scheme" | "tone" | "variant"> & {
  tone?: SurfaceTone;
  variant?: SurfaceVariant;
}) {
  return (
    <RaisPanel
      scheme="light"
      tone={tone}
      variant={variant}
      className={cn("bg-(--app-surface)", className)}
      {...props}
    />
  );
}

export function SurfacePanelHeader(props: Omit<React.ComponentProps<typeof RaisPanelHeader>, "scheme">) {
  return <RaisPanelHeader scheme="light" {...props} />;
}

export function SurfacePanelBody(props: React.ComponentProps<typeof RaisPanelBody>) {
  return <RaisPanelBody {...props} />;
}

