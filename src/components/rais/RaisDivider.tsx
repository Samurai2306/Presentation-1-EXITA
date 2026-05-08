import * as React from "react";

import { cn } from "@/lib/cn";

export function RaisDivider({
  className,
  scheme = "dark",
  ...props
}: React.HTMLAttributes<HTMLHRElement> & { scheme?: "dark" | "light" }) {
  void scheme;
  return (
    <hr
      className={cn(
        "my-6 border-0 border-t",
        "border-(--app-separator)",
        className,
      )}
      {...props}
    />
  );
}

