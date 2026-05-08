import * as React from "react";

import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";

export function SurfaceSectionHeader(
  props: Omit<React.ComponentProps<typeof RaisSectionHeader>, "scheme">,
) {
  return <RaisSectionHeader scheme="light" {...props} />;
}

