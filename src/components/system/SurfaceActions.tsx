import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/cn";

import { KeycapButton, type KeycapSize, type KeycapVariant } from "@/components/ui/KeycapButton";
import { KeycapLink } from "@/components/ui/KeycapLink";

export function SurfaceButton(
  props: React.ComponentProps<typeof KeycapButton> & {
    variant?: KeycapVariant;
    size?: KeycapSize;
  },
) {
  return <KeycapButton {...props} />;
}

export function SurfaceLink(
  props: React.ComponentProps<typeof KeycapLink> & {
    variant?: KeycapVariant;
    size?: KeycapSize;
  },
) {
  return <KeycapLink {...props} />;
}

export function SurfaceInlineLink({
  href,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(
        "underline decoration-black/20 underline-offset-[3px] transition-colors hover:decoration-black/40",
        className,
      )}
      {...props}
    />
  );
}

