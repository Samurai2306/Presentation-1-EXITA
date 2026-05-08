import * as React from "react";

import { Check, Minus } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";

import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { cn } from "@/lib/cn";

type ModeId = "contract" | "academic_paper" | "teaching_materials" | "student_work";

type Row = {
  label: string;
  hint: string;
  applies: Record<ModeId, "yes" | "partial" | "no">;
  why: string;
};

const MODES: { id: ModeId; label: string; short: string }[] = [
  { id: "contract", label: "Договор", short: "Contract" },
  { id: "academic_paper", label: "Статья", short: "Paper" },
  { id: "teaching_materials", label: "Учебная программа", short: "Syllabus" },
  { id: "student_work", label: "Студработа", short: "Student" },
];

const ROWS: Row[] = [
  {
    label: "Структура и логика",
    hint: "тезис → аргументы → вывод",
    applies: { contract: "partial", academic_paper: "yes", teaching_materials: "yes", student_work: "yes" },
    why: "Помогает быстро понять, где текст разваливается по смыслу.",
  },
  {
    label: "Ясность формулировок",
    hint: "точность без воды",
    applies: { contract: "yes", academic_paper: "yes", teaching_materials: "yes", student_work: "yes" },
    why: "Снижает двусмысленность и ускоряет согласование.",
  },
  {
    label: "Источники и цитирование",
    hint: "где нужен источник и как оформить",
    applies: { contract: "no", academic_paper: "yes", teaching_materials: "partial", student_work: "yes" },
    why: "Поднимает академическую достоверность и проверяемость.",
  },
  {
    label: "Методика и соответствие требованиям",
    hint: "цели ↔ оценивание ↔ результаты",
    applies: { contract: "no", academic_paper: "partial", teaching_materials: "yes", student_work: "partial" },
    why: "Показывает, где требования формально есть, но не связаны между собой.",
  },
  {
    label: "Оформление и единый стиль",
    hint: "формат, ссылки, список литературы",
    applies: { contract: "partial", academic_paper: "yes", teaching_materials: "yes", student_work: "yes" },
    why: "Убирает “технический шум” перед финальной сдачей/проверкой.",
  },
  {
    label: "Риски и последствия",
    hint: "опасные условия и варианты правки",
    applies: { contract: "yes", academic_paper: "no", teaching_materials: "no", student_work: "no" },
    why: "Критично для договоров: защищает от небезопасных условий.",
  },
];

function Cell({ value, active }: { value: Row["applies"][ModeId]; active: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold sm:text-[12px]",
          active
            ? "border-emerald-300/60 bg-[color-mix(in_srgb,#10b981_22%,transparent)] text-emerald-100"
            : "border-(--app-separator) bg-(--app-surface-3) text-(--app-text-2)",
        )}
      >
        <Check className="h-3.5 w-3.5" /> Да
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold sm:text-[12px]",
          active
            ? "border-(--app-stroke-strong) bg-(--app-surface-inset) text-(--app-text)"
            : "border-(--app-separator) bg-(--app-surface-3) text-(--app-text-2)",
        )}
      >
        <Minus className="h-3.5 w-3.5" /> Частично
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold sm:text-[12px]",
        active
          ? "border-rose-300/60 bg-[color-mix(in_srgb,#f43f5e_20%,transparent)] text-rose-100"
          : "border-(--app-separator) bg-(--app-surface-3) text-(--app-text-3)",
      )}
    >
      <Minus className="h-3.5 w-3.5" /> Нет
    </span>
  );
}

export function RedaktorshaCriteriaMatrix({ className }: { className?: string }) {
  const [activeMode, setActiveMode] = React.useState<ModeId | "all">("all");
  const [focusRow, setFocusRow] = React.useState<Row>(ROWS[0]);
  const reducedMotion = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.2, once: false, margin: "0px 0px -10% 0px" });

  return (
    <div ref={rootRef}>
      <RaisPanel scheme="dark" className={cn("doclab-panel-accent overflow-hidden", className)}>
      <RaisPanelHeader>
        <RaisPanelTitle>Что проверяет</RaisPanelTitle>
        <div className="text-[10px] uppercase tracking-[0.2em] text-(--app-text-3) sm:text-[11px]">матрица критериев</div>
      </RaisPanelHeader>
      <RaisPanelBody>
        <div className="doclab-neon-edge relative rounded-[18px] border border-(--app-separator) bg-(--app-surface-2)">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-linear-to-l from-(--app-surface-3) to-transparent lg:hidden" />
          <div className="overflow-x-auto">
            <div className="min-w-[720px] sm:min-w-[760px] lg:min-w-[840px]">
              <div className="doclab-matrix-head grid grid-cols-[minmax(210px,1.25fr)_repeat(4,minmax(100px,0.8fr))] sm:grid-cols-[minmax(230px,1.3fr)_repeat(4,minmax(110px,0.8fr))] lg:grid-cols-[minmax(250px,1.35fr)_repeat(4,minmax(125px,0.8fr))] border-b border-(--app-separator) px-3 py-2.5 sm:px-4 sm:py-3">
                <button
                  type="button"
                  onClick={() => setActiveMode("all")}
                  className={cn(
                    "sticky left-0 z-10 appearance-none rounded-[10px] bg-(--app-surface-3) px-2 text-left text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm sm:text-[12px]",
                    activeMode === "all" ? "text-(--app-text)" : "text-(--app-text-2) hover:bg-(--app-surface-inset)",
                  )}
                >
                  Критерий
                </button>
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMode((prev) => (prev === m.id ? "all" : m.id))}
                    className={cn(
                      "appearance-none rounded-[12px] px-2 py-1 text-right transition-colors sm:py-1.5",
                      activeMode === m.id
                        ? "border border-(--app-stroke-strong) bg-(--app-surface-3) shadow-(--app-shadow-1)"
                        : "border border-transparent hover:bg-(--app-surface-inset)",
                    )}
                    aria-label={`Фокус по колонке ${m.label}`}
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.13em] text-(--app-text-2) sm:text-[12px]">{m.short}</div>
                    <div className="mt-0.5 text-[11px] text-(--app-text-3) sm:text-[12px]">{m.label}</div>
                  </button>
                ))}
              </div>

              <div className="divide-y divide-(--app-separator)">
                {ROWS.map((r, rowIdx) => (
                  <div
                    key={r.label}
                    className={cn(
                      "doclab-matrix-row grid grid-cols-[minmax(210px,1.25fr)_repeat(4,minmax(100px,0.8fr))] sm:grid-cols-[minmax(230px,1.3fr)_repeat(4,minmax(110px,0.8fr))] lg:grid-cols-[minmax(250px,1.35fr)_repeat(4,minmax(125px,0.8fr))] items-center gap-2.5 px-3 py-3.5 sm:gap-3 sm:px-4 sm:py-4",
                      !reducedMotion && "transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    )}
                    style={
                      reducedMotion
                        ? undefined
                        : {
                            opacity: inView ? 1 : 0.08,
                            transform: inView ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
                            transitionDelay: inView ? `${rowIdx * 40}ms` : "0ms",
                          }
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setFocusRow(r)}
                      className={cn(
                        "sticky left-0 z-10 appearance-none rounded-[10px] bg-(--app-surface-3) px-3 py-2 text-left backdrop-blur-sm transition-colors",
                        focusRow.label === r.label ? "bg-(--app-surface-inset)" : "hover:bg-(--app-surface-inset)",
                      )}
                    >
                      <div className="text-[13px] font-semibold leading-5 text-(--app-text) sm:text-[14px] sm:leading-6">{r.label}</div>
                      <div className="mt-1 text-[12px] leading-5 text-(--app-text-2) sm:text-[12.5px] sm:leading-6">{r.hint}</div>
                    </button>
                    {MODES.map((m) => {
                      const value = r.applies[m.id];
                      const isActive = activeMode === m.id;
                      return (
                        <div
                          key={m.id}
                          className={cn(
                            "rounded-[10px] py-1 text-right transition-colors",
                            isActive && value === "yes" && "bg-[color-mix(in_srgb,#10b981_15%,transparent)]",
                            isActive && value === "no" && "bg-[color-mix(in_srgb,#f43f5e_14%,transparent)]",
                            isActive && value === "partial" && "bg-(--app-surface-inset)",
                          )}
                        >
                          <Cell value={value} active={isActive} />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-4 rounded-[16px] border border-(--app-separator) bg-(--app-surface-3) px-4 py-3",
            !reducedMotion && "transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: inView ? 1 : 0.08,
                  transform: inView ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
                  transitionDelay: inView ? `${ROWS.length * 40 + 60}ms` : "0ms",
                }
          }
        >
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-(--app-text-3) sm:text-[12px]">Почему это важно</div>
          <div className="mt-2 text-[12.5px] leading-6 text-(--app-text-2) sm:text-[13px] sm:leading-7">
            <span className="font-semibold text-(--app-text)">{focusRow.label}:</span> {focusRow.why}
          </div>
        </div>
      </RaisPanelBody>
      </RaisPanel>
    </div>
  );
}

