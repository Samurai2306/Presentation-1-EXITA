"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useUIState } from "@/lib/uiState";
import type { IntentId } from "@/lib/uiState";
import { RaisMicrozoneShell } from "@/components/rais/RaisMicrozoneShell";
import { raisMicrozoneThemes } from "@/mocks/raisMicrozoneThemes";
import { RedaktorshaHero } from "@/components/rais/redaktorsha/RedaktorshaHero";
import {
  RedaktorshaDemo,
  type AnalysisGroupId,
  type AnalysisScenario,
  type DocKind,
  type ScanStage,
} from "@/components/rais/redaktorsha/RedaktorshaDemo";
import { RedaktorshaCriteriaMatrix } from "@/components/rais/redaktorsha/RedaktorshaCriteriaMatrix";
import { RedaktorshaTrustStrip } from "@/components/rais/redaktorsha/RedaktorshaTrustStrip";
import { RedaktorshaTimeline } from "@/components/rais/redaktorsha/RedaktorshaTimeline";
import { RedaktorshaInvestorPitch } from "@/components/rais/redaktorsha/RedaktorshaInvestorPitch";
import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { RedaktorshaLabBackdrop } from "@/components/rais/redaktorsha/RedaktorshaLabBackdrop";
import { ScrollRevealSection as SectionReveal } from "@/components/rais/ScrollRevealSection";

type Scenario = Omit<AnalysisScenario, "summary"> & { intent: IntentId; summary: AnalysisScenario["summary"] };

const SCENARIOS: Record<DocKind, Scenario> = {
  contract: {
    kind: "contract",
    label: "Договор",
    eyebrow: "Юр‑проверка",
    intent: "legal",
    subtitle: "Риски, формулировки, последствия",
    tags: [
      "Скрытые штрафы",
      "Ограничение ответственности",
      "Противоречия законодательству",
      "Неявные сроки",
      "Размытые формулировки",
      "Односторонние изменения",
    ],
    groups: [
      {
        id: "all",
        label: "Все",
        tags: ["Скрытые штрафы", "Неявные сроки", "Размытые формулировки", "Односторонние изменения", "Противоречия законодательству"],
      },
      { id: "terms", label: "Сроки", tags: ["Неявные сроки", "Односторонние изменения"] },
      { id: "law", label: "Закон", tags: ["Противоречия законодательству"] },
      { id: "wording", label: "Формулировки", tags: ["Размытые формулировки"] },
    ],
    fragmentTitle: "Фрагмент",
    fragmentText:
      "«…Исполнитель вправе в одностороннем порядке изменить стоимость работ и сроки исполнения без уведомления Заказчика…»",
    explanationFallback: (
      <>
        Выберите тег, чтобы открыть пояснение, что именно считается риском и как его корректно переписать (без “магии” —
        с человеческим объяснением и логикой).
      </>
    ),
    variantsTitle: "Варианты правки",
    variants: [
      { title: "Вариант A: ограничить право на односторонние изменения", note: "Добавляет основания, уведомление и срок вступления изменений." },
      { title: "Вариант B: зафиксировать цену/сроки и правила изменения", note: "Убирает размытость, добавляет прозрачную процедуру." },
      { title: "Вариант C: уточнить ответственность и неустойку", note: "Снижает риск перекоса в пользу одной стороны." },
    ],
    summary: {
      title: "Сводка",
      points: [
        "Выделяем потенциально несправедливые условия и объясняем, почему они важны.",
        "Показываем формулировки‑замены и прогноз, как меняется смысл и риски.",
        "При сложном кейсе — маршрут в экспертный контур EXITA Н.Э.П. с сохранением контекста.",
      ],
    },
  },
  academic_paper: {
    kind: "academic_paper",
    label: "Статья",
    eyebrow: "Академический редактор",
    intent: "general",
    subtitle: "Логика, структура, источники",
    tags: ["Структура и композиция", "Аргументация", "Термины", "Источники", "Цитирование", "Ясность текста"],
    groups: [
      { id: "all", label: "Все", tags: ["Структура и композиция", "Аргументация", "Источники", "Цитирование"] },
      { id: "structure", label: "Структура", tags: ["Структура и композиция", "Ясность текста"] },
      { id: "sources", label: "Источники", tags: ["Источники", "Цитирование"] },
      { id: "wording", label: "Язык", tags: ["Термины", "Ясность текста"] },
    ],
    fragmentTitle: "Фрагмент",
    fragmentText:
      "«…В работе рассматривается влияние факторов на результат. Отметим, что в литературе есть разные подходы, поэтому далее мы опишем выбранный…»",
    explanationFallback: (
      <>
        Выберите тег — откроем конкретную правку: где не хватает опоры на источники, где “скачет” логика, и что улучшить,
        чтобы текст был понятнее и сильнее.
      </>
    ),
    variantsTitle: "Варианты улучшения",
    variants: [
      { title: "Вариант A: усилить тезис и связность абзаца", note: "Переписывает предложение так, чтобы вывод был проверяемым." },
      { title: "Вариант B: добавить опору на источники", note: "Подсказывает, где нужен источник и какой тип источника уместен." },
      { title: "Вариант C: уточнить термины и определения", note: "Снимает двусмысленность, сохраняет академический стиль." },
    ],
    summary: {
      title: "Сводка",
      points: [
        "Помогаем автору улучшить текст — без подмены авторства: объяснение + варианты.",
        "Проверяем структуру, аргументацию и корректность ссылок/цитирования.",
        "Делаем единый стандарт качества для кафедры/журнала/проекта.",
      ],
    },
  },
  teaching_materials: {
    kind: "teaching_materials",
    label: "Учебная программа",
    eyebrow: "Методика",
    intent: "general",
    subtitle: "Цели, оценивание, соответствие",
    tags: ["Цели обучения", "Оценивание", "Компетенции", "Содержание", "Требования", "Ясность формулировок"],
    groups: [
      { id: "all", label: "Все", tags: ["Цели обучения", "Оценивание", "Компетенции", "Содержание"] },
      { id: "methodology", label: "Методика", tags: ["Цели обучения", "Компетенции"] },
      { id: "structure", label: "Структура", tags: ["Содержание", "Требования"] },
      { id: "wording", label: "Язык", tags: ["Ясность формулировок"] },
    ],
    fragmentTitle: "Фрагмент",
    fragmentText:
      "«…Цель дисциплины — сформировать у обучающихся понимание основных подходов. Контроль — зачёт…»",
    explanationFallback: (
      <>
        Выберите тег — покажем, где цели не измеримы, где не связаны оценивание и результаты обучения, и как привести к
        понятному стандарту для студентов и проверяющих.
      </>
    ),
    variantsTitle: "Варианты формулировок",
    variants: [
      { title: "Вариант A: сделать цели измеримыми", note: "Переводит “понимание” в наблюдаемые результаты." },
      { title: "Вариант B: связать оценивание с компетенциями", note: "Показывает, что именно проверяется и как." },
      { title: "Вариант C: упростить язык без потери смысла", note: "Сохраняет официальный стиль, делает понятнее." },
    ],
    summary: {
      title: "Сводка",
      points: [
        "Приводим программу к ясным критериям и связности: цели → содержание → оценивание.",
        "Снижаем методическую неопределённость и риск “разночтений” при проверках.",
        "Экономим время кафедры: меньше ручной правки, больше стандарта.",
      ],
    },
  },
  student_work: {
    kind: "student_work",
    label: "Студработа",
    eyebrow: "Проверка перед сдачей",
    intent: "general",
    subtitle: "Оформление, логика, аккуратность",
    tags: ["Аргументация", "Структура", "Оформление", "Список источников", "Точность формулировок", "Сомнительные места"],
    groups: [
      { id: "all", label: "Все", tags: ["Аргументация", "Структура", "Оформление", "Список источников"] },
      { id: "structure", label: "Структура", tags: ["Структура", "Аргументация"] },
      { id: "sources", label: "Источники", tags: ["Список источников", "Сомнительные места"] },
      { id: "wording", label: "Язык", tags: ["Точность формулировок"] },
    ],
    fragmentTitle: "Фрагмент",
    fragmentText:
      "«…Можно сделать вывод, что тема актуальна. В целом, исследования показывают положительную динамику…»",
    explanationFallback: (
      <>
        Выберите тег — подсветим слабые места: где общий текст без фактов, где не хватает источника, где можно сделать
        формулировку точнее, сохранив вашу мысль.
      </>
    ),
    variantsTitle: "Варианты улучшения",
    variants: [
      { title: "Вариант A: усилить аргумент фактами", note: "Подсказывает, какое доказательство нужно (данные/источник/пример)." },
      { title: "Вариант B: переписать абзац точнее", note: "Убирает “в целом” и “актуально”, оставляя смысл." },
      { title: "Вариант C: поправить оформление", note: "Шаблоны ссылок, список литературы, единый стиль." },
    ],
    summary: {
      title: "Сводка",
      points: [
        "Помогаем улучшить работу перед сдачей: структура, логика, оформление.",
        "Объясняем, как исправить — чтобы студент учился, а не “сдавал текст”.",
        "Преподавателю — меньше рутины, больше времени на содержательную обратную связь.",
      ],
    },
  },
};

function pilotMailtoHref() {
  const subject = 'Пилот "Редакторша" для <организация>';
  const body = [
    "Здравствуйте!",
    "",
    'Хочу запросить пилот по продукту «Редакторша» (Document Lab).',
    "",
    "Организация / Вуз:",
    "Подразделение (кафедра/факультет/отдел):",
    "Режимы в фокусе (статьи / программы / студработы / договоры):",
    "Какие документы в фокусе (статьи/программы/студработы/договоры):",
    "Оценка объёма (примерно документов в неделю/месяц):",
    "Текущий процесс проверки (как сейчас):",
    "Какой результат ожидаем (стандарты, скорость проверки, качество):",
    "Интеграции (LMS/ДО/внутренние системы), если нужны:",
    "",
    "Контактное лицо:",
    "Роль:",
    "Email / телефон:",
    "Удобное время для контакта:",
  ].join("\n");

  return `mailto:hello@exita.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function RedaktorshaPage() {
  const patchContext = useUIState((s) => s.patchContext);
  const demoRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);

  const [docKind, setDocKind] = React.useState<DocKind>("contract");
  const [docName, setDocName] = React.useState<string | null>(null);
  const [scan, setScan] = React.useState<"idle" | "scanning" | "done">("idle");
  const [stage, setStage] = React.useState<ScanStage>("wait");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [groupId, setGroupId] = React.useState<AnalysisGroupId>("all");

  const scenario = React.useMemo(() => SCENARIOS[docKind], [docKind]);

  React.useEffect(() => {
    if (scan === "idle") {
      setStage("wait");
      return;
    }
    if (scan === "done") {
      setStage("summary");
      return;
    }

    setStage("index");
    const t1 = window.setTimeout(() => setStage("risks"), 420);
    const t2 = window.setTimeout(() => setStage("summary"), 920);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [scan]);

  function onPickFile(file?: File | null) {
    const name = file?.name ?? `${scenario.kind.replace("_", "-")}-demo.pdf`;
    setDocName(name);
    patchContext({ uploadedDocumentName: name, intent: scenario.intent, productHint: "Редакторша" });
    setSelectedTag(null);
    setScan("scanning");
    setGroupId("all");
    window.setTimeout(() => setScan("done"), 1200);
  }

  function onRunDemoWithoutFile() {
    onPickFile(new File(["demo"], `${scenario.kind}-demo.pdf`, { type: "application/pdf" }));
  }

  return (
    <LazyMotion features={domAnimation}>
      <RaisMicrozoneShell
        title="Редакторша"
        subtitle="Document AI Lab"
        description={null}
        accent={null}
        code="/MZ_02"
        scheme="dark"
        theme={raisMicrozoneThemes.rais_redaktorsha}
        showBackdrop={false}
        hideHeader
        className="redaktorsha-lab-shell"
        contentClassName="gap-4 sm:gap-6"
      >
        <RedaktorshaLabBackdrop />
        <SectionReveal className="lg:col-span-12" delay={0.02}>
          <RedaktorshaHero
            pilotMailtoHref={pilotMailtoHref()}
            onOpenDemo={() => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          />
        </SectionReveal>
        <div className="lg:col-span-12">
          <RedaktorshaDemo
            demoRef={demoRef}
            docKind={docKind}
            setDocKind={(k) => {
              setDocKind(k);
              setSelectedTag(null);
              setGroupId("all");
              setScan("idle");
              setDocName(null);
            }}
            docName={docName}
            scan={scan}
            stage={stage}
            scenario={scenario}
            groupId={groupId}
            setGroupId={setGroupId}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            onPickFile={onPickFile}
            onRunDemoWithoutFile={onRunDemoWithoutFile}
          />
        </div>

        <SectionReveal className="lg:col-span-12" delay={0.03}>
          <RedaktorshaTrustStrip />
        </SectionReveal>

        <SectionReveal className="lg:col-span-12" delay={0.05}>
          <RaisPanel scheme="dark" className="doclab-panel-accent">
            <RaisPanelHeader>
              <RaisPanelTitle>Кому помогает</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">для вузов и академиков</div>
            </RaisPanelHeader>
            <RaisPanelBody>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
                  <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Вуз / кафедра</div>
                  <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">
                    Единый стандарт качества документов: программы, отчёты, заявки, договоры. Меньше ручной рутины — больше
                    прозрачности и повторяемости.
                  </div>
                </div>
                <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
                  <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Преподаватель</div>
                  <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">
                    Быстрая обратная связь: где логика, где оформление, где источники. Вы сохраняете “содержательную” часть
                    комментариев, а однотипное — автоматизируется.
                  </div>
                </div>
                <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
                  <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Студент</div>
                  <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">
                    AI‑наставник: показывает, что улучшить, и объясняет почему. Помогает написать лучше самому — без “сдачи
                    чужого текста”.
                  </div>
                </div>
                <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
                  <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Эксперт</div>
                  <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">
                    Предварительная “чистка” и разметка документов: меньше шума, больше сути. При необходимости — подключение
                    экспертного контура EXITA Н.Э.П.
                  </div>
                </div>
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </SectionReveal>

        <SectionReveal className="hidden sm:block lg:col-span-12" delay={0.06}>
          <RedaktorshaCriteriaMatrix />
        </SectionReveal>

        <SectionReveal className="lg:col-span-12" delay={0.06}>
          <RedaktorshaTimeline onOpenDemo={() => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })} />
        </SectionReveal>

        <SectionReveal className="lg:col-span-12" delay={0.05}>
          <RedaktorshaInvestorPitch />
        </SectionReveal>

        <SectionReveal className="lg:col-span-12" delay={0.04} finalizeAtPageBottom>
          <RaisPanel scheme="dark" className="doclab-panel-accent relative overflow-hidden">
            <RaisPanelHeader>
              <RaisPanelTitle>Попробовать сейчас</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">быстрый старт</div>
            </RaisPanelHeader>
            <RaisPanelBody>
              <div className="grid items-center gap-5 md:grid-cols-2" ref={ctaRef}>
                <div>
                  <div className="text-[15px] font-semibold text-(--app-text)">Загрузите документ и получите демо‑анализ за секунды</div>
                  <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">
                    Сначала попробуйте на примере, а затем — обсудим пилот для кафедры/факультета. Контекст сохраняется в
                    экосистеме EXITA.
                  </div>
                  <div className="mt-2 text-[12px] text-(--app-text-3)">
                    После скана сразу доступны артефакты отчёта: экспорт и ссылка для согласования.
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    className="key btn--primary doclab-key doclab-key-main inline-flex items-center justify-center gap-2"
                    onClick={() => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Загрузить документ <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="key btn--ghost doclab-key doclab-key-secondary inline-flex items-center justify-center"
                    onClick={() =>
                      scan === "done"
                        ? demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                        : (window.location.href = pilotMailtoHref())
                    }
                  >
                    {scan === "done" ? "К результату и экспорту" : "Запросить пилот"}
                  </button>
                </div>
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </SectionReveal>
      </RaisMicrozoneShell>
    </LazyMotion>
  );
}

