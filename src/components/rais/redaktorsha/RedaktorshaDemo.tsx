import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, FileText, Share2, Sparkles } from "lucide-react";

import { cn } from "@/lib/cn";
import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { RaisDivider } from "@/components/rais/RaisDivider";
import { RaisTag } from "@/components/rais/RaisTag";

export type ScanStage = "wait" | "index" | "risks" | "summary";
export type DocKind = "contract" | "academic_paper" | "teaching_materials" | "student_work";
export type AnalysisGroupId = "all" | "structure" | "wording" | "sources" | "methodology" | "law" | "terms";

export type AnalysisScenario = {
  kind: DocKind;
  label: string;
  eyebrow: string;
  subtitle: string;
  tags: string[];
  groups: { id: AnalysisGroupId; label: string; tags: string[] }[];
  fragmentTitle: string;
  fragmentText: string;
  explanationFallback: React.ReactNode;
  variantsTitle: string;
  variants: { title: string; note: string }[];
  summary: { title: string; points: string[] };
};

type Severity = "high" | "medium" | "low";

function severityFor(tag: string): Severity {
  const high = ["Скрытые штрафы", "Противоречия законодательству", "Односторонние изменения", "Ограничение ответственности"];
  const medium = ["Неявные сроки", "Размытые формулировки", "Источники", "Цитирование", "Оценивание", "Требования", "Оформление"];
  if (high.includes(tag)) return "high";
  if (medium.includes(tag)) return "medium";
  return "low";
}

function scoreModel(kind: DocKind) {
  if (kind === "contract") return { score: 78, structure: 76, clarity: 71, sources: 65, risk: 82 };
  if (kind === "academic_paper") return { score: 84, structure: 86, clarity: 78, sources: 72, risk: 60 };
  if (kind === "teaching_materials") return { score: 81, structure: 79, clarity: 74, sources: 66, risk: 58 };
  return { score: 73, structure: 70, clarity: 68, sources: 62, risk: 55 };
}

function scanLabel(scan: "idle" | "scanning" | "done", stage: ScanStage, scenario: AnalysisScenario) {
  if (scan === "idle") return "Ожидание файла";
  if (scan === "done") return "Сводка готова";
  if (stage === "index") return `Индексация… (${scenario.eyebrow})`;
  if (stage === "risks") return "Поиск сигналов…";
  return "Сканирование…";
}

function scenarioAcceptHint(kind: DocKind) {
  if (kind === "contract") return "PDF/DOCX: договор, NDA, приложение (пример)";
  if (kind === "academic_paper") return "PDF/DOCX: статья, отчёт, заявка (пример)";
  if (kind === "teaching_materials") return "PDF/DOCX: программа, лекция, методичка (пример)";
  return "PDF/DOCX: курсовая, эссе, диплом (пример)";
}

function Meter({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "accent";
}) {
  return (
    <div className="doclab-volume-surface rounded-[16px] border border-(--app-separator) p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="text-[12px] font-medium text-(--app-text-2)">{label}</div>
        <div className="text-[12px] font-semibold tabular-nums text-(--app-text-3)">{value}</div>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-(--app-separator) bg-(--app-surface-inset)">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "accent" ? "bg-[linear-gradient(90deg,var(--exita-accent),transparent)]" : "bg-(--app-separator-strong)",
          )}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

function ResultCard({
  kind,
  finding,
}: {
  kind: DocKind;
  finding: { tag: string; severity: Severity };
}) {
  const m = scoreModel(kind);
  const sevLabel = finding.severity === "high" ? "Высокий приоритет" : finding.severity === "medium" ? "Средний" : "Низкий";
  const sevTone =
    finding.severity === "high"
      ? "border-(--app-separator-strong) bg-(--app-surface-3) shadow-(--app-shadow-2)"
      : "border-(--app-separator) bg-(--app-surface-2)";

  const onDownload = () => {
    const text = [
      "Document Lab — демо-отчет",
      `Mode: ${kind}`,
      `Score: ${m.score}/100`,
      `Top finding: ${finding.tag}`,
      `Severity: ${sevLabel}`,
      "",
      "Это демонстрационный мок-отчёт.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `document-lab-report-${kind}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onShare = async () => {
    const shareData = {
      title: "Document Lab — демо-отчёт",
      text: `Top finding: ${finding.tag}. Score: ${m.score}/100.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      }
    } catch {
      // no-op: user cancelled or api unavailable
    }
  };

  return (
    <div className="grid gap-3">
      <div className={cn("doclab-glow doclab-volume-surface rounded-[18px] border p-5", sevTone)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="doclab-kicker text-[11px] font-medium">Результат</div>
            <div className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.03em] text-(--app-text) tabular-nums">
              {m.score}
              <span className="text-[14px] font-semibold text-(--app-text-3)">/100</span>
            </div>
            <div className="mt-2 text-[13px] leading-6 text-(--app-text-2)">
              Top finding: <span className="font-medium text-(--app-text)">{finding.tag}</span>
              <span className="px-2 text-(--app-text-disabled)">·</span>
              {sevLabel}
            </div>
          </div>
          <div className="rounded-full border border-(--app-separator) bg-(--app-surface-3) px-3 py-1.5 text-[12px] text-(--app-text-2)">
            Quality map
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onDownload}
            aria-label="Скачать демо-отчет"
            className="key btn--ghost doclab-key doclab-key-secondary inline-flex items-center gap-1.5 rounded-full"
          >
            <Download className="h-3.5 w-3.5" /> Скачать отчёт (PDF)
          </button>
          <button
            type="button"
            onClick={onShare}
            aria-label="Поделиться ссылкой на демо-отчет"
            className="key btn--ghost doclab-key doclab-key-secondary inline-flex items-center gap-1.5 rounded-full"
          >
            <Share2 className="h-3.5 w-3.5" /> Поделиться ссылкой
          </button>
          <div className="text-[11px] text-(--app-text-3)">* Демо-артефакты, финальный формат настраивается в пилоте.</div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Meter label="Structure" value={m.structure} tone="accent" />
        <Meter label="Clarity" value={m.clarity} />
        <Meter label="Sources" value={m.sources} />
        <Meter label="Risk" value={m.risk} />
      </div>
    </div>
  );
}

function SegmentControl({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; hint: string }[];
}) {
  return (
    <div className="relative">
      <div className="doclab-volume-surface grid w-full grid-cols-2 gap-2 rounded-[18px] border border-(--app-separator) p-2 sm:flex sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:overflow-y-hidden sm:scrollbar-none">
        {options.map((o) => {
          const isActive = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-label={`Режим анализа: ${o.label}`}
              className={cn(
                "group relative inline-flex w-full items-center justify-between gap-2 rounded-[14px] border px-3 py-2 text-[12.5px] font-medium transition-colors sm:w-auto sm:shrink-0 sm:snap-start",
                isActive
                  ? "border-(--app-separator-strong) text-(--app-text-inverse) shadow-(--app-shadow-1)"
                  : "border-(--app-separator) bg-(--app-surface-3) text-(--app-text-2) hover:border-(--app-separator-strong) hover:text-(--app-text)",
              )}
              style={
                isActive
                  ? {
                      backgroundImage:
                        "linear-gradient(180deg, color-mix(in srgb, var(--exita-accent) 78%, #2a214a 22%), color-mix(in srgb, var(--exita-accent) 62%, #211a3d 38%))",
                      backgroundColor: "color-mix(in srgb, var(--exita-accent) 70%, #221b3f 30%)",
                    }
                  : undefined
              }
            >
              <span>{o.label}</span>
              <span className={cn("hidden text-[11px] font-semibold sm:inline", isActive ? "text-(--app-text-inverse) opacity-80" : "text-(--app-text-3)")}>
                {o.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IdlePreview({ kind }: { kind: DocKind }) {
  const m = scoreModel(kind);
  return (
    <div className="doclab-volume-surface rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-4">
      <div className="doclab-kicker text-[11px] font-medium">Пример отчёта</div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-[24px] font-semibold leading-none text-(--app-text-2) tabular-nums">{m.score}</div>
        <div className="text-[12px] text-(--app-text-3)">/100</div>
      </div>
      <div className="mt-3 grid gap-2">
        {[m.structure, m.clarity, m.sources, m.risk].map((v, idx) => (
          <div key={idx} className="h-2 overflow-hidden rounded-full border border-(--app-separator) bg-(--app-surface-inset)">
            <div className="h-full rounded-full bg-(--app-separator-strong) blur-[0.2px]" style={{ width: `${v}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-3 text-[12px] leading-6 text-(--app-text-3)">Показываем, как будет выглядеть результат до загрузки файла.</div>
    </div>
  );
}

export function RedaktorshaDemo({
  docKind,
  setDocKind,
  docName,
  scan,
  stage,
  scenario,
  groupId,
  setGroupId,
  selectedTag,
  setSelectedTag,
  onPickFile,
  onRunDemoWithoutFile,
  demoRef,
}: {
  docKind: DocKind;
  setDocKind: (k: DocKind) => void;
  docName: string | null;
  scan: "idle" | "scanning" | "done";
  stage: ScanStage;
  scenario: AnalysisScenario;
  groupId: AnalysisGroupId;
  setGroupId: (g: AnalysisGroupId) => void;
  selectedTag: string | null;
  setSelectedTag: (t: string | null) => void;
  onPickFile: (file?: File | null) => void;
  onRunDemoWithoutFile: () => void;
  demoRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const tagList = scenario.groups.find((g) => g.id === groupId)?.tags ?? scenario.tags;
  const [priorityOnly, setPriorityOnly] = React.useState(false);
  const [showAllSignals, setShowAllSignals] = React.useState(false);
  const defaultFinding = React.useMemo(() => {
    const t = selectedTag ?? tagList.find((x) => severityFor(x) !== "low") ?? tagList[0] ?? "Сигнал";
    return { tag: t, severity: severityFor(t) };
  }, [selectedTag, tagList]);
  const visibleSignals = React.useMemo(() => {
    let list = [...tagList];
    if (priorityOnly) list = list.filter((x) => severityFor(x) !== "low");
    return showAllSignals ? list : list.slice(0, 6);
  }, [tagList, priorityOnly, showAllSignals]);

  return (
    <RaisPanel scheme="dark" className="doclab-panel-accent overflow-hidden">
      <RaisPanelHeader>
        <RaisPanelTitle>Демо‑анализ</RaisPanelTitle>
        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">{scenario.eyebrow}</div>
      </RaisPanelHeader>

      <RaisPanelBody>
      <div className="grid items-start gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7" ref={demoRef}>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Режим анализа</div>
                <div className="mt-2">
                  <SegmentControl
                    value={docKind}
                    onChange={(v) => {
                      setDocKind(v as DocKind);
                      setSelectedTag(null);
                      setGroupId("all");
                    }}
                    options={[
                      { id: "contract", label: "Договор", hint: "risks" },
                      { id: "academic_paper", label: "Статья", hint: "logic" },
                      { id: "teaching_materials", label: "Учебная программа", hint: "method" },
                      { id: "student_work", label: "Студработа", hint: "review" },
                    ]}
                  />
                </div>
                <div className="mt-3 text-[13px] leading-7 text-(--app-text-2)">
                  <span className="font-medium text-(--app-text)">{scenario.label}:</span> {scenario.subtitle}.
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    { k: "4", v: "режима анализа" },
                    { k: "100", v: "балльная карта качества" },
                    { k: "3–5", v: "вариантов правки" },
                  ].map((m) => (
                    <div key={m.v} className="doclab-surface-inline rounded-[14px] border border-(--app-separator) px-3 py-2">
                      <div className="text-[14px] font-semibold leading-none text-(--app-text)">{m.k}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-(--app-text-3)">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {scan === "done" ? <ResultCard kind={docKind} finding={defaultFinding} /> : <IdlePreview kind={docKind} />}

              <RaisPanel scheme="dark" className="doclab-neon-edge relative">
                <RaisPanelHeader>
                  <RaisPanelTitle>Загрузка файла</RaisPanelTitle>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">dropzone</div>
                </RaisPanelHeader>
                <RaisPanelBody>
                  <label
                    className={cn(
                      "group doclab-volume-surface relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 rounded-[18px]",
                      "border border-dashed border-(--app-separator-strong) px-6 py-10 text-center",
                      "transition-colors hover:border-(--app-separator-strong) hover:bg-(--app-surface-3)",
                      "focus-within:outline-none focus-within:ring-2 focus-within:ring-(--app-focus)",
                    )}
                  >
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]" aria-hidden>
                      <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(820px_420px_at_50%_0%,var(--exita-ambient),transparent_62%)]" />
                      <div className="absolute inset-0 opacity-[0.06] [background:linear-gradient(to_right,color-mix(in_srgb,var(--app-separator)_70%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--app-separator-subtle)_72%,transparent)_1px,transparent_1px)] bg-size-[76px_76px]" />
                    </div>
                    <input
                      type="file"
                      className="sr-only"
                      aria-label="Выберите документ для демо-анализа"
                      accept=".pdf,.doc,.docx,application/pdf"
                      onChange={(e) => onPickFile(e.currentTarget.files?.[0])}
                    />
                    <div className="flex h-14 w-14 items-center justify-center rounded-[16px] border border-(--app-separator) bg-(--app-surface-3)">
                      <FileText className="h-6 w-6 text-(--app-text-2)" />
                    </div>
                    <div className="text-[14px] font-medium text-(--app-text)">Перетащите документ или выберите файл</div>
                    <div className="text-[12px] text-(--app-text-3)">{docName ? `Загружено: ${docName}` : scenarioAcceptHint(docKind)}</div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)" aria-live="polite">
                      {scanLabel(scan, stage, scenario)}
                    </div>
                    <div className="text-[12px] leading-6 text-(--app-text-3)">
                      Мы даём подсказки и варианты правки — вы выбираете, что принять. Это инструмент обучения и качества,
                      а не “генератор сдачи”.
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRunDemoWithoutFile();
                      }}
                      className="key btn--ghost doclab-key doclab-key-secondary inline-flex items-center rounded-full"
                    >
                      Показать демо без файла
                    </button>

                    {scan !== "idle" ? (
                      <div className="absolute inset-0">
                        <motion.div
                          aria-hidden
                          className="absolute left-0 right-0 top-0 h-[2px]"
                          style={{
                            background: "linear-gradient(90deg, transparent, var(--exita-accent), transparent)",
                            boxShadow: "0 0 14px color-mix(in srgb, var(--exita-accent) 65%, transparent)",
                            opacity: 0.75,
                          }}
                          initial={{ y: 14, opacity: 0 }}
                          animate={
                            reduceMotion
                              ? { y: 16, opacity: 0.7 }
                              : {
                                  y: scan === "scanning" ? [16, 190, 16] : 160,
                                  opacity: scan === "scanning" ? 1 : 0.55,
                                }
                          }
                          transition={{
                            duration: scan === "scanning" ? 1.2 : 0.4,
                            repeat: scan === "scanning" && !reduceMotion ? Infinity : 0,
                            ease: "easeInOut",
                          }}
                        />
                      </div>
                    ) : null}
                  </label>
                </RaisPanelBody>
              </RaisPanel>
            </div>
          </div>

          <div className="lg:col-span-5">
            <RaisPanel scheme="dark" className="doclab-neon-edge lg:sticky lg:top-5">
              <RaisPanelHeader>
                <RaisPanelTitle>Сигналы и варианты</RaisPanelTitle>
                <Sparkles className="h-4 w-4 text-(--app-text-3)" />
              </RaisPanelHeader>

              <RaisPanelBody>
                <div className="flex flex-wrap gap-2">
                  {scenario.groups.map((g) => (
                    <RaisTag
                      key={g.id}
                      scheme="dark"
                      onClick={() => {
                        setGroupId(g.id);
                        setSelectedTag(null);
                      }}
                      selected={groupId === g.id}
                    >
                      {g.label}
                    </RaisTag>
                  ))}
                </div>

                <RaisDivider className="my-6" />

                <div className="mb-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setPriorityOnly((v) => !v)}
                    className={cn(
                      "doclab-key inline-flex items-center rounded-full text-[12px]",
                      priorityOnly ? "key btn--primary doclab-key-secondary" : "key btn--ghost doclab-key-secondary",
                    )}
                  >
                    {priorityOnly ? "Все сигналы" : "По приоритету"}
                  </button>
                </div>
                <div className="mb-1 text-[11px] text-(--app-text-3)">Приоритеты: high / medium / low</div>
                <div className="flex flex-wrap gap-2">
                  {visibleSignals.map((t) => {
                    const sev = severityFor(t);
                    return (
                      <RaisTag
                        key={t}
                        scheme="dark"
                        onClick={() => setSelectedTag(t)}
                        selected={selectedTag === t}
                        className={cn(sev === "high" && "doclab-neon-edge border-(--app-separator-strong)", sev === "medium" && "border-(--app-separator)")}
                      >
                        {t}
                      </RaisTag>
                    );
                  })}
                </div>
                {tagList.length > 6 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllSignals((v) => !v)}
                    className="mt-3 text-[12px] font-medium text-(--app-text-3) underline-offset-2 hover:text-(--app-text-2) hover:underline"
                  >
                    {showAllSignals ? "Скрыть часть сигналов" : "Показать ещё сигналы"}
                  </button>
                ) : null}

                <RaisDivider className="my-6" />

                <RaisPanel tone="muted" scheme="dark">
                  <RaisPanelHeader>
                    <RaisPanelTitle>Top finding</RaisPanelTitle>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">объяснение</div>
                  </RaisPanelHeader>
                  <RaisPanelBody>
                    <div className="text-[13px] leading-7 text-(--app-text-2)">
                      {selectedTag ? (
                        <>
                          <span className="font-medium text-(--app-text)">{selectedTag}</span>: объяснение, почему это важно, и что
                          можно улучшить в тексте.
                        </>
                      ) : (
                        scenario.explanationFallback
                      )}
                    </div>

                    <motion.div
                      className={cn(
                        "mt-4 rounded-[16px] border border-(--app-separator) bg-(--app-surface-3) p-4",
                        selectedTag ? "border-(--app-separator-strong)" : "",
                      )}
                      initial={false}
                      animate={selectedTag && !reduceMotion ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">{scenario.fragmentTitle}</div>
                      <div className="mt-2 text-[12.5px] leading-6 text-(--app-text-2)">{scenario.fragmentText}</div>
                      <div className="mt-3 text-[12px] leading-6 text-(--app-text-3)">
                        Поддерживаем: подсветка источника, пояснение “почему”, и несколько вариантов улучшения/замены.
                      </div>
                    </motion.div>
                  </RaisPanelBody>
                </RaisPanel>

                <div className="mt-5">
                  <RaisPanel tone="muted" scheme="dark">
                    <RaisPanelHeader className="relative">
                      <RaisPanelTitle>{scenario.variantsTitle}</RaisPanelTitle>
                      <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">варианты</div>
                    </RaisPanelHeader>
                    <RaisPanelBody>
                      <div className="grid gap-2 text-[12px] text-(--app-text-2)">
                        {scenario.variants.map((v, idx) => {
                          const label = idx === 0 ? "Мягкая" : idx === 1 ? "Строгая" : "Безопасная";
                          return (
                            <div key={v.title} className="doclab-volume-surface rounded-[14px] border border-(--app-separator) p-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="text-[12px] font-medium leading-5 text-(--app-text)">{v.title}</div>
                                <span className="rounded-full border border-(--app-separator) bg-(--app-surface-3) px-2 py-1 text-[11px] font-semibold text-(--app-text-3)">
                                  {label}
                                </span>
                              </div>
                              <div className="mt-1 text-[12px] leading-5 text-(--app-text-2)">{v.note}</div>
                              <div className="mt-2 grid gap-1 text-[11px] leading-5 text-(--app-text-3)">
                                <div>
                                  <span className="font-medium text-(--app-text-2)">Эффект:</span>{" "}
                                  {idx === 0 ? "быстрое улучшение читаемости" : idx === 1 ? "чёткая фиксация условий" : "снижение правового/методического риска"}
                                </div>
                                <div>
                                  <span className="font-medium text-(--app-text-2)">Риск:</span>{" "}
                                  {idx === 0 ? "может не закрыть все спорные пункты" : idx === 1 ? "более строгие требования к согласованию" : "потребуется сверка с требованиями стороны"}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </RaisPanelBody>
                  </RaisPanel>
                </div>

                {scan === "done" ? (
                  <div className="mt-6">
                    <RaisPanel tone="muted" scheme="dark">
                      <RaisPanelHeader>
                        <RaisPanelTitle>{scenario.summary.title}</RaisPanelTitle>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">итог</div>
                      </RaisPanelHeader>
                      <RaisPanelBody>
                        <ul className="grid gap-2 text-[13px] leading-7 text-(--app-text-2)">
                          {scenario.summary.points.map((p) => (
                            <li key={p} className="flex gap-2">
                              <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-(--app-separator-strong)" aria-hidden />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </RaisPanelBody>
                    </RaisPanel>
                  </div>
                ) : null}
              </RaisPanelBody>
            </RaisPanel>
          </div>
        </div>
      </RaisPanelBody>
    </RaisPanel>
  );
}

