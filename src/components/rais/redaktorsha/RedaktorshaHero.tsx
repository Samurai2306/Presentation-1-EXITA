import * as React from "react";
import { ArrowRight, Mail } from "lucide-react";

import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { BookScannerCinematic } from "@/components/special/BookScannerCinematic";
import { cn } from "@/lib/cn";
import { KeycapLink } from "@/components/ui/KeycapLink";

export function RedaktorshaHero({
  onOpenDemo,
  pilotMailtoHref,
  backHref = "/rais",
  backLabel = "← к витрине",
  className,
}: {
  onOpenDemo: () => void;
  pilotMailtoHref: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}) {
  return (
    <RaisPanel scheme="dark" className={cn("doclab-glow doclab-panel-accent overflow-hidden", className)}>
      <RaisPanelHeader>
        <RaisPanelTitle>
          <span className="doclab-kicker">Document Lab</span>
        </RaisPanelTitle>
        <KeycapLink href={backHref} variant="ghost" size="sm">
          {backLabel}
        </KeycapLink>
      </RaisPanelHeader>
      <RaisPanelBody className="p-3.5 sm:p-5 lg:p-5">
        <div className="mx-auto grid w-full max-w-[1180px] items-center gap-3 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6 lg:pl-4">
            <h1 className="font-screpka w-full max-w-[22ch] text-balance text-[52px] leading-[0.92] tracking-[-0.01em] text-(--app-text) drop-shadow-[0_1px_0_rgba(255,255,255,0.2)] sm:max-w-[24ch] sm:text-[64px] lg:text-[94px]">
              <span className="block">Редакторша</span>
              <span className="mt-1 block text-[0.92em] leading-[0.98] text-(--app-text-2) sm:text-[0.86em]">— качество документов</span>
              <span className="block text-[0.92em] leading-[0.98] text-(--app-text-2) sm:text-[0.86em]">наша ответственность</span>
            </h1>

            <p className="mt-2.5 max-w-[58ch] text-pretty text-[14.5px] leading-[1.65] text-(--app-text-2) sm:text-[14px] sm:leading-6">
              Document Lab для вузов и команд: статьи, программы, студработы и договоры. Система объясняет &quot;почему&quot;,
              предлагает варианты, а финальное решение всегда остаётся за человеком.
            </p>

            <div className="mt-3.5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={onOpenDemo}
                aria-label="Открыть анализ документов"
                className={cn(
                  "key btn--primary doclab-key doclab-key-main inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[16px] px-7 text-[20px] font-bold tracking-[-0.015em]",
                  "shadow-(--app-shadow-2) transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-(--app-shadow-3)",
                  "focus-visible:ring-(--app-focus) focus-visible:ring-offset-(--app-bg)",
                )}
              >
                Анализ документов <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href={pilotMailtoHref}
                aria-label="Запросить пилот внедрения Редакторши"
                className={cn(
                  "key btn--ghost doclab-key doclab-key-secondary inline-flex items-center justify-center gap-2",
                  "focus-visible:ring-(--app-focus) focus-visible:ring-offset-(--app-bg)",
                )}
              >
                Запросить пилот <Mail className="h-4 w-4" />
              </a>
            </div>

          </div>

          <div className="lg:col-span-6">
            <div className="doclab-neon-edge relative overflow-hidden rounded-[20px] border border-(--app-separator) bg-[linear-gradient(180deg,var(--app-surface-3),var(--app-surface-2))] p-0.5 shadow-(--app-shadow-2)">
              <BookScannerCinematic compact className="mx-auto w-full rounded-[18px]" />
            </div>
          </div>
        </div>
      </RaisPanelBody>
    </RaisPanel>
  );
}

