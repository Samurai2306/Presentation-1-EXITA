import * as React from "react";

import { ArrowRight, FileUp, GitCompare, ListChecks, ScanText, ShieldCheck } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { cn } from "@/lib/cn";

const STEPS = [
  {
    title: "Загрузка",
    text: "Вы выбираете режим анализа и загружаете файл (PDF/DOCX).",
    icon: <FileUp className="h-5 w-5" />,
  },
  {
    title: "Индексация",
    text: "Система извлекает структуру, фрагменты и ключевые сигналы качества/риска.",
    icon: <ScanText className="h-5 w-5" />,
  },
  {
    title: "Сигналы",
    text: "Показываем топ‑находку и карту качества: где сильные места, где провалы, где риск.",
    icon: <ListChecks className="h-5 w-5" />,
  },
  {
    title: "Варианты",
    text: "3–5 вариантов улучшения: мягкий, строгий, безопасный — с объяснением “почему”.",
    icon: <GitCompare className="h-5 w-5" />,
  },
  {
    title: "Контур доверия",
    text: "При сложном кейсе — маршрут к экспертам EXITA Н.Э.П. с сохранением контекста.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
] as const;

const OUTCOMES = [
  "Один понятный отчёт вместо десятков разрозненных правок.",
  "Прозрачные приоритеты: что исправлять первым и почему.",
  "Варианты формулировок с объяснением для обучения и стандартизации.",
] as const;

export function RedaktorshaTimeline({
  onOpenDemo,
  className,
}: {
  onOpenDemo: () => void;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.22, once: false, margin: "0px 0px -10% 0px" });

  return (
    <div ref={rootRef}>
      <RaisPanel scheme="dark" className={cn("doclab-panel-accent overflow-hidden", className)}>
        <RaisPanelHeader>
          <RaisPanelTitle>Как работает</RaisPanelTitle>
          <div className="text-[10px] uppercase tracking-[0.2em] text-(--app-text-3) sm:text-[11px]">таймлайн</div>
        </RaisPanelHeader>
        <RaisPanelBody>
          <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
            <div className="lg:col-span-7">
              <div className="doclab-neon-edge rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-3 sm:p-4 lg:p-5">
              <div className="mb-3 flex items-center justify-between gap-2 rounded-[14px] border border-(--app-separator) bg-(--app-surface-3) px-3 py-2">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-(--app-text-3) sm:text-[12px]">Путь документа</div>
                <div className="text-[11px] text-(--app-text-3)">{STEPS.length} шагов</div>
              </div>

              <div className="grid gap-2.5 sm:gap-3">
                {STEPS.map((s, idx) => (
                  <div
                    key={s.title}
                    className={cn(
                      "doclab-volume-surface rounded-[16px] border border-(--app-separator) px-3 py-3 sm:px-4",
                      !reducedMotion && "transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    )}
                    style={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: inView ? 1 : 0.06,
                            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
                            transitionDelay: inView ? `${idx * 55}ms` : "0ms",
                          }
                    }
                  >
                    <div className="grid grid-cols-[38px_1fr] items-start gap-3 sm:grid-cols-[42px_1fr] sm:gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-(--app-separator) bg-(--app-surface-3) text-(--app-text-2) shadow-(--app-shadow-1) sm:h-10 sm:w-10">
                        {s.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex min-h-6 items-center rounded-full border border-(--app-separator) bg-(--app-surface-3) px-2 py-0.5 text-[10px] font-semibold tracking-widest text-(--app-text-3) sm:text-[11px]">
                            STEP {idx + 1}
                          </span>
                          <div className="text-[14px] font-semibold leading-5 text-(--app-text) sm:text-[15px]">{s.title}</div>
                        </div>
                        <div className="mt-1.5 text-[12.5px] leading-5 text-(--app-text-2) sm:text-[13px] sm:leading-6">{s.text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

            <div className="lg:col-span-5">
              <div className="doclab-neon-edge rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-3 sm:p-4 lg:sticky lg:top-5 lg:p-5">
              <div className="rounded-[14px] border border-(--app-separator) bg-(--app-surface-3) px-3 py-2.5">
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-(--app-text-3) sm:text-[12px]">Outcome</div>
                <div className="mt-1 text-[12.5px] leading-5 text-(--app-text-2) sm:text-[13px]">Что команда получает сразу после анализа.</div>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div className="rounded-[12px] border border-(--app-separator) bg-(--app-surface-2) px-2.5 py-1.5">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-(--app-text-3)">Формат</div>
                    <div className="mt-0.5 text-[11px] font-medium text-(--app-text-2)">PDF / DOCX</div>
                  </div>
                  <div className="rounded-[12px] border border-(--app-separator) bg-(--app-surface-2) px-2.5 py-1.5">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-(--app-text-3)">Результат</div>
                    <div className="mt-0.5 text-[11px] font-medium text-(--app-text-2)">Сигналы + варианты</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-2.5 text-[12.5px] leading-5 text-(--app-text-2) sm:text-[13px] sm:leading-6">
                {OUTCOMES.map((item, idx) => (
                  <div
                    key={item}
                    className={cn(
                      "doclab-volume-surface rounded-[14px] border border-(--app-separator) px-3 py-2.5",
                      !reducedMotion && "transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    )}
                    style={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: inView ? 1 : 0.06,
                            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,14px,0)",
                            transitionDelay: inView ? `${170 + idx * 55}ms` : "0ms",
                          }
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpenDemo}
                className="doclab-neon-btn mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[16px] border border-(--app-stroke) px-4 py-3 text-[12.5px] font-semibold text-(--app-text-inverse) shadow-(--app-shadow-2) transition-opacity hover:opacity-90 sm:text-[13px]"
              >
                Открыть демо <ArrowRight className="h-4 w-4" />
              </button>
              </div>
            </div>
          </div>
        </RaisPanelBody>
      </RaisPanel>
    </div>
  );
}

