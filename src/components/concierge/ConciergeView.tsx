"use client";

import * as React from "react";

import { LiquidGradientBackdrop } from "@/components/three/liquid/LiquidGradientBackdrop";
import { TelegramChatAssistant } from "@/components/concierge/TelegramChatAssistant";
import { allowConciergeLiquidBackground } from "@/lib/perfGating";

function ConciergeStaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(980px_560px_at_50%_10%,rgba(0,0,0,0.05),transparent_55%),radial-gradient(860px_520px_at_50%_95%,rgba(0,0,0,0.03),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-size-[84px_84px] mask-[radial-gradient(closest-side_at_50%_28%,black,transparent_92%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-[color-mix(in_srgb,var(--rais-surface)_35%,transparent)] via-transparent to-[color-mix(in_srgb,var(--rais-bg)_55%,#e8dfd2_45%)]" />
    </div>
  );
}

export function ConciergeView() {
  const [liquidGradientOn, setLiquidGradientOn] = React.useState(true);

  React.useLayoutEffect(() => {
    if (!allowConciergeLiquidBackground()) {
      setLiquidGradientOn(false);
    }
  }, []);

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-(--app-bg) font-sans text-(--app-fg) selection:bg-(--app-border) selection:text-(--app-fg)">
      {liquidGradientOn ? <LiquidGradientBackdrop /> : <ConciergeStaticBackdrop />}

      <main className="relative mx-auto flex w-full max-w-[2000px] flex-col items-center px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:px-4 sm:pt-3 md:px-6 md:pt-4 xl:px-8">
        <div className="relative z-10 w-full max-w-[1680px] shrink-0">
          <div className="rounded-[18px] border border-(--app-border) bg-(--app-surface) p-2 shadow-[0_0_0_1px_rgba(0,0,0,0.03),0_32px_120px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:rounded-[24px] sm:p-3 md:p-4">
            <TelegramChatAssistant className="h-[min(84svh,calc(100dvh-5.25rem))] min-h-[520px] max-h-[1120px] w-full rounded-[14px] sm:h-[min(86svh,calc(100dvh-5.8rem))] sm:rounded-[18px] lg:h-[clamp(700px,82dvh,1040px)] 2xl:h-[clamp(760px,80dvh,1120px)]" />
          </div>
        </div>
      </main>
    </div>
  );
}
