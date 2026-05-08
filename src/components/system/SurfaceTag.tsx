import * as React from "react";

import { RaisTag } from "@/components/rais/RaisTag";

export function SurfaceTag(props: Omit<React.ComponentProps<typeof RaisTag>, "scheme">) {
  return <RaisTag scheme="light" {...props} />;
}

