"use client";

import * as React from "react";
import { ArrowRight, BarChart3, Bot, Database, Gauge, Search, ShieldCheck, Sparkles, Workflow, Wrench } from "lucide-react";

import { useUIState } from "@/lib/uiState";
import { RaisMicrozoneShell } from "@/components/rais/RaisMicrozoneShell";
import { raisMicrozoneThemes } from "@/mocks/raisMicrozoneThemes";
import {
  RaisPanel,
  RaisPanelBody,
  RaisPanelHeader,
  RaisPanelTitle,
} from "@/components/rais/RaisPanel";
import { RaisStat } from "@/components/rais/RaisStat";
import { ScrollRevealSection } from "@/components/rais/ScrollRevealSection";
import { KeycapButton } from "@/components/ui/KeycapButton";
import { KeycapLink } from "@/components/ui/KeycapLink";
import {
  analyticsDeliverySteps,
  analyticsHeroTags,
  analyticsIntegrationClusters,
} from "@/mocks/aiAnalyticsLanding";
import { QuantumNeuralNetworkBackdrop } from "@/components/three/quantum-neural/QuantumNeuralNetworkBackdrop";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function analyticsMailtoHref() {
  const subject = 'Пилот "AI-аналитика и автоматизация" для <организация>';
  const body = [
    "Здравствуйте!",
    "",
    "Хочу обсудить пилот по услуге «AI-аналитика и автоматизация».",
    "",
    "Организация:",
    "Подразделение / процесс в фокусе:",
    "Какие данные и системы уже есть:",
    "Какой эффект ожидаем:",
    "Срок, в который нужен первый результат:",
    "",
    "Контактное лицо:",
    "Роль:",
    "Email / телефон:",
  ].join("\n");

  return `mailto:hello@exita.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const ROI_SCENARIOS = {
  conservative: { label: "Консервативный", eff: 12, investment: 95 },
  base: { label: "Базовый", eff: 18, investment: 60 },
  aggressive: { label: "Оптимистичный", eff: 28, investment: 78 },
} as const;

const analyticsSectionAnchors = [
  { id: "analytics-overview", label: "Обзор" },
  { id: "analytics-solution", label: "Контур решения" },
  { id: "analytics-roi", label: "ROI-скетч" },
  { id: "analytics-delivery", label: "Внедрение" },
  { id: "analytics-cta", label: "Следующий шаг" },
] as const;

const analyticsInfographicSteps = [
  {
    id: "01",
    title: "Диагностика фокуса",
    description:
      "Фиксируем узкие места в процессах и данных, определяем где скорость и деньги теряются прямо сейчас.",
    progress: 68,
    icon: Search,
  },
  {
    id: "02",
    title: "Сборка data-ядра",
    description:
      "Собираем единую модель показателей и правила синхронизации источников, чтобы решения строились на одном наборе фактов.",
    progress: 79,
    icon: Database,
  },
  {
    id: "03",
    title: "AI-автоматизации",
    description:
      "Встраиваем AI-сценарии и триггеры в операционный контур: маршруты задач, прогнозы, контроль SLA и отклонений.",
    progress: 87,
    icon: Wrench,
  },
  {
    id: "04",
    title: "Управление эффектом",
    description:
      "Выводим KPI, ROI и риски в дашборд с прозрачной ответственностью, безопасностью и контролем на каждом шаге.",
    progress: 100,
    icon: ShieldCheck,
  },
] as const;

const analyticsContrast = {
  before: {
    title: "До внедрения",
    bullets: [
      "Собранные вручную отчеты с задержкой по данным.",
      "Решения принимаются по неполной картине и интуиции.",
      "Команда тратит время на рутину вместо роста и экспериментов.",
    ],
  },
  after: {
    title: "После внедрения",
    bullets: [
      "Единый контур данных и KPI в реальном времени.",
      "AI-подсказки и автоматические действия по триггерам.",
      "Решения на базе прогнозов, контролируемый рост и прозрачный ROI.",
    ],
  },
} as const;

export default function AnalyticsPage() {
  const patchContext = useUIState((s) => s.patchContext);
  const appTheme = useUIState((s) => s.theme);
  const scheme = appTheme === "dark" ? "dark" : "light";
  const [losses, setLosses] = React.useState(120);
  const [eff, setEff] = React.useState<number>(ROI_SCENARIOS.base.eff);
  const [investment, setInvestment] = React.useState<number>(ROI_SCENARIOS.base.investment);
  const [months, setMonths] = React.useState(12);
  const [roiScenario, setRoiScenario] = React.useState<keyof typeof ROI_SCENARIOS>("base");
  const [roiView, setRoiView] = React.useState<"cumulative" | "monthly">("cumulative");

  React.useEffect(() => {
    patchContext({ intent: "analytics", productHint: "AI-аналитика и автоматизация" });
  }, [patchContext]);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) {
      return;
    }

    const root = document.querySelector(".analytics-lab-shell");
    if (!root) {
      return;
    }

    const magnetSelector = [
      ".rais-panel-root",
      ".analytics-deck-card",
      ".analytics-inset-frame",
      ".analytics-field",
      ".analytics-chip",
      ".key",
    ].join(", ");
    const blocks = Array.from(root.querySelectorAll<HTMLElement>(magnetSelector));
    if (!blocks.length) {
      return;
    }

    const listeners = blocks.map((el) => {
      el.classList.add("analytics-magnet");
      const maxShift = el.matches(".analytics-chip") ? 1.6 : el.matches(".analytics-field") ? 1.4 : 3.1;

      const updateMagnet = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - rect.left;
        const relY = event.clientY - rect.top;
        const nx = clamp((relX / rect.width) * 2 - 1, -1, 1);
        const ny = clamp((relY / rect.height) * 2 - 1, -1, 1);

        el.style.setProperty("--analytics-magnet-x", `${(nx * maxShift).toFixed(2)}px`);
        el.style.setProperty("--analytics-magnet-y", `${(ny * maxShift).toFixed(2)}px`);
        el.style.setProperty("--analytics-glow-x", `${(relX / rect.width) * 100}%`);
        el.style.setProperty("--analytics-glow-y", `${(relY / rect.height) * 100}%`);
      };

      const resetMagnet = () => {
        el.style.setProperty("--analytics-magnet-x", "0px");
        el.style.setProperty("--analytics-magnet-y", "0px");
        el.style.setProperty("--analytics-glow-x", "50%");
        el.style.setProperty("--analytics-glow-y", "50%");
      };

      el.addEventListener("pointerenter", updateMagnet);
      el.addEventListener("pointermove", updateMagnet);
      el.addEventListener("pointerleave", resetMagnet);

      return { el, updateMagnet, resetMagnet };
    });

    return () => {
      listeners.forEach(({ el, updateMagnet, resetMagnet }) => {
        el.removeEventListener("pointerenter", updateMagnet);
        el.removeEventListener("pointermove", updateMagnet);
        el.removeEventListener("pointerleave", resetMagnet);
        el.style.removeProperty("--analytics-magnet-x");
        el.style.removeProperty("--analytics-magnet-y");
        el.style.removeProperty("--analytics-glow-x");
        el.style.removeProperty("--analytics-glow-y");
      });
    };
  }, []);

  const monthlySavings = Math.round((losses * (eff / 100)) * 10) / 10;
  const breakEven = monthlySavings > 0 ? Math.max(1, Math.round(investment / monthlySavings)) : 0;

  const cumulativeSeries = Array.from({ length: months }, (_, i) => {
    const m = i + 1;
    return Math.round(monthlySavings * m);
  });
  const monthlySeries = Array.from({ length: months }, (_, i) => {
    const slope = months > 1 ? i / (months - 1) : 1;
    const factor = 0.74 + slope * 0.34;
    return Math.max(1, Math.round(monthlySavings * factor));
  });
  const activeSeries = roiView === "cumulative" ? cumulativeSeries : monthlySeries;
  const max = Math.max(1, ...activeSeries);
  const serviceSchema = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI-аналитика и автоматизация",
      serviceType: "Data-driven AI automation service",
      areaServed: "RU",
      provider: {
        "@type": "Organization",
        name: "EXITA",
      },
      description:
        "Проектирование и внедрение контура данных, AI-аналитики и автоматизаций с измеримым ROI, KPI и дорожной картой масштабирования.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        url: "https://exita.ru/rais/analytics",
      },
    }),
    [],
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <QuantumNeuralNetworkBackdrop attach="viewport" />
      <RaisMicrozoneShell
        title="AI-аналитика и автоматизация"
        subtitle="в управляемый рост и предсказуемый ROI"
        description={
          <span className="rais-microzone-description">
            Собираем единый контур данных, AI-аналитики и автоматизаций, чтобы управленческие решения
            принимались быстрее, риски считались заранее, а рост опирался на проверяемые KPI вместо
            ручных отчётов.
          </span>
        }
        accent="Analytics"
        code="/OFFER_01"
        scheme={scheme}
        theme={raisMicrozoneThemes.rais_analytics}
        className="analytics-lab-shell analytics-lab-shell--quantum bg-transparent!"
        backdropAllowAnimatedDepth
        contentClassName="gap-5 sm:gap-6 lg:gap-7"
      >
      <div id="analytics-overview" className="scroll-mt-24 lg:col-span-12">
        <RaisPanel scheme={scheme}>
          <RaisPanelBody className="p-4 sm:p-5 lg:p-7">
            <div className="analytics-deck-card p-5 sm:p-6 lg:p-7">
              <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
                <div className="lg:col-span-8">
                  <div className="analytics-kicker text-[11px] font-semibold">AI-услуга / формат презентации</div>
                  <h2 className="analytics-display-title mt-3">
                    От разрозненных данных к управляемой системе решений
                  </h2>
                  <p className="analytics-lead mt-4">
                    Сначала фиксируем реальные потери и узкие места, затем собираем модель данных, запускаем
                    AI-автоматизации и выводим метрики в единый контур. Каждый этап привязан к измеримому
                    результату и понятной зоне ответственности.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {analyticsHeroTags.map((tag) => (
                      <span
                        key={tag}
                        className="analytics-chip inline-flex items-center px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <KeycapLink
                      href="/rais/solve"
                      variant="primary"
                      size="md"
                      className="analytics-key-main inline-flex items-center justify-center"
                    >
                      Оформить запрос <ArrowRight className="h-4 w-4" />
                    </KeycapLink>
                    <KeycapLink
                      href={analyticsMailtoHref()}
                      variant="ghost"
                      size="md"
                      className="analytics-key-secondary inline-flex items-center justify-center"
                    >
                      Запросить пилот
                    </KeycapLink>
                  </div>
                </div>

                <div className="grid gap-3 lg:col-span-4">
                  <div className="analytics-deck-card p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">Технологический контур</div>
                    <div className="mt-3 grid gap-2 text-[13px] text-(--app-text-2)">
                      <div className="inline-flex items-center gap-2">
                        <Database className="h-4 w-4 text-(--exita-accent)" /> Модель данных
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Bot className="h-4 w-4 text-(--exita-accent)" /> AI-слой
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-(--exita-accent)" /> Автоматизация процессов
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-(--exita-accent)" /> Безопасность и контроль
                      </div>
                    </div>
                  </div>
                  <div className="analytics-deck-card p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Формат результата
                    </div>
                    <p className="analytics-body-copy mt-3">
                      Пилот с критериями готовности, набор автоматизированных сценариев, dashboard и план
                      масштабирования без потери контроля.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RaisPanelBody>
        </RaisPanel>
      </div>

      <ScrollRevealSection className="lg:col-span-12" delay={0.03} minOpacity={0.82}>
        <RaisPanel scheme={scheme}>
          <RaisPanelBody className="p-4 sm:p-5 lg:p-6">
            <div className="analytics-inset-frame mb-4 p-2 sm:p-2.5">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(ROI_SCENARIOS) as Array<keyof typeof ROI_SCENARIOS>).map((id) => (
                  <KeycapButton
                    key={id}
                    size="sm"
                    pressed={roiScenario === id}
                    variant={roiScenario === id ? "primary" : "ghost"}
                    onClick={() => {
                      setRoiScenario(id);
                      setEff(ROI_SCENARIOS[id].eff);
                      setInvestment(ROI_SCENARIOS[id].investment);
                    }}
                  >
                    {ROI_SCENARIOS[id].label}
                  </KeycapButton>
                ))}
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {analyticsSectionAnchors.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="analytics-chip inline-flex items-center px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <RaisStat className="analytics-stat-card" label="Экономия/месяц" value={`${monthlySavings}k`} />
              <RaisStat className="analytics-stat-card" label="Окупаемость" value={`${breakEven} мес`} />
              <RaisStat className="analytics-stat-card" label="Горизонт" value={`${months} мес`} />
              <RaisStat className="analytics-stat-card" label="Инвестиция" value={`${investment}k`} />
            </div>
          </RaisPanelBody>
        </RaisPanel>
      </ScrollRevealSection>

      <div id="analytics-solution" className="scroll-mt-24 lg:col-span-12">
        <ScrollRevealSection className="lg:col-span-12" delay={0.04} minOpacity={0.82}>
          <div className="analytics-solution-flow">
            <div className="analytics-solution-stage-head">
              <RaisPanelTitle>Контур решения</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">от диагностики к масштабу</div>
            </div>
            <div className="analytics-step-infographic">
              {analyticsInfographicSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className="analytics-step-row"
                    style={{ "--analytics-step-index": index } as React.CSSProperties}
                  >
                    <div className="analytics-step-folder">
                      <div className="analytics-step-folder-tab" aria-hidden />
                      <div className="analytics-step-folder-body">
                        <div className="analytics-step-label">STEP</div>
                        <div className="analytics-step-number">{step.id}</div>
                        <div className="analytics-step-progress-row">
                          <span>{step.progress}%</span>
                          <div className="analytics-step-progress-track" aria-hidden>
                            <div
                              className="analytics-step-progress-fill"
                              style={{ width: `${step.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="analytics-step-caption">
                      <span className="analytics-step-icon" aria-hidden>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="analytics-card-title">{step.title}</h3>
                        <p className="analytics-body-copy mt-2">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollRevealSection>
      </div>

      <ScrollRevealSection className="lg:col-span-12" delay={0.045} minOpacity={0.83}>
        <div className="analytics-section-divider">
          <span>Смена режима</span>
          <div className="analytics-section-divider-line" aria-hidden />
          <span>из ручной операционки в AI-контур</span>
        </div>
      </ScrollRevealSection>

      <ScrollRevealSection className="lg:col-span-12" delay={0.05} minOpacity={0.84}>
        <div className="analytics-contrast-grid">
          <div className="analytics-contrast-card analytics-contrast-card--before">
            <div className="analytics-kicker">Before</div>
            <h3 className="analytics-card-title mt-2">{analyticsContrast.before.title}</h3>
            <ul className="analytics-bullet-list mt-3 grid gap-2">
              {analyticsContrast.before.bullets.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
          <div className="analytics-contrast-arrow" aria-hidden>
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="analytics-contrast-card analytics-contrast-card--after">
            <div className="analytics-kicker">After</div>
            <h3 className="analytics-card-title mt-2">{analyticsContrast.after.title}</h3>
            <ul className="analytics-bullet-list mt-3 grid gap-2">
              {analyticsContrast.after.bullets.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollRevealSection>

      <div id="analytics-roi" className="scroll-mt-24 lg:col-span-5">
        <ScrollRevealSection className="lg:col-span-5" delay={0.05} minOpacity={0.84}>
          <RaisPanel scheme={scheme}>
          <RaisPanelHeader>
            <RaisPanelTitle>ROI-скетч</RaisPanelTitle>
            <BarChart3 className="h-4 w-4 text-(--app-text-3)" />
          </RaisPanelHeader>
          <RaisPanelBody>
            <div className="grid gap-4">
              <div className="analytics-deck-card p-3.5 sm:p-4">
                <label className="grid gap-2">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                    Потери в месяц (тыс.)
                  </div>
                  <input
                    type="number"
                    value={losses}
                    min={0}
                    aria-label="Потери в месяц, тысяч рублей"
                    onChange={(e) => setLosses(clamp(Number(e.currentTarget.value), 0, 5000))}
                    className="analytics-field h-10.5 w-full px-3.5 text-[13px] text-(--app-text) sm:h-11 sm:px-4"
                  />
                  <div className="analytics-caption">Оценка упущенной эффективности до автоматизации.</div>
                </label>
              </div>

              <div className="analytics-deck-card p-3.5 sm:p-4">
                <label className="grid gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                      Эффект автоматизации
                    </div>
                    <div className="analytics-metric-badge inline-flex items-center px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-(--app-text-2)">
                      {eff}%
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={eff}
                    aria-label="Эффект автоматизации, процентов"
                    onChange={(e) => setEff(Number(e.currentTarget.value))}
                    className="analytics-range w-full accent-(--exita-accent)"
                  />
                  <div className="analytics-caption">Пример параметра: эффект от ИИ и автоматизации.</div>
                </label>
              </div>

              <div className="analytics-deck-card p-3.5 sm:p-4">
                <label className="grid gap-2">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                    Горизонт (мес.)
                  </div>
                  <input
                    type="number"
                    value={months}
                    min={6}
                    max={24}
                    aria-label="Горизонт прогноза, месяцев"
                    onChange={(e) => setMonths(clamp(Number(e.currentTarget.value), 6, 24))}
                    className="analytics-field h-10.5 w-full px-3.5 text-[13px] text-(--app-text) sm:h-11 sm:px-4"
                  />
                  <div className="analytics-caption">Горизонт прогноза для графика.</div>
                </label>
              </div>
              <div className="analytics-deck-card p-3.5 sm:p-4">
                <label className="grid gap-2">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                    Инвестиция (тыс.)
                  </div>
                  <input
                    type="number"
                    value={investment}
                    min={10}
                    max={300}
                    aria-label="Инвестиция, тысяч рублей"
                    onChange={(e) => setInvestment(clamp(Number(e.currentTarget.value), 10, 300))}
                    className="analytics-field h-10.5 w-full px-3.5 text-[13px] text-(--app-text) sm:h-11 sm:px-4"
                  />
                  <div className="analytics-caption">
                    Бюджет пилота для расчёта окупаемости.
                  </div>
                </label>
              </div>
            </div>
          </RaisPanelBody>
          </RaisPanel>
        </ScrollRevealSection>
      </div>

      <ScrollRevealSection className="lg:col-span-7" delay={0.06} minOpacity={0.84}>
        <RaisPanel scheme={scheme}>
          <RaisPanelHeader>
            <RaisPanelTitle>Прогноз окупаемости</RaisPanelTitle>
            <div className="inline-flex items-center gap-2">
              <KeycapButton
                size="sm"
                pressed={roiView === "cumulative"}
                variant={roiView === "cumulative" ? "primary" : "ghost"}
                onClick={() => setRoiView("cumulative")}
                className="analytics-mini-toggle"
              >
                Накопительно
              </KeycapButton>
              <KeycapButton
                size="sm"
                pressed={roiView === "monthly"}
                variant={roiView === "monthly" ? "primary" : "ghost"}
                onClick={() => setRoiView("monthly")}
                className="analytics-mini-toggle"
              >
                По месяцам
              </KeycapButton>
            </div>
          </RaisPanelHeader>
          <RaisPanelBody>
            <div className="analytics-deck-card p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-[12px] text-(--app-text-2)">
                  {roiView === "cumulative" ? "Кумулятивная экономия по месяцам" : "Ожидаемая экономия каждого месяца"}
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                  max: {Math.round(max)}k
                </div>
              </div>
              <div className="overflow-x-auto pb-1">
                <div className="relative min-w-[460px]">
                  <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
                    <div className="absolute inset-x-0 top-1/3 h-px bg-(--app-separator-subtle)" />
                    <div className="absolute inset-x-0 top-2/3 h-px bg-(--app-separator-subtle)" />
                  </div>
                  <div
                    className="grid items-end gap-2"
                    style={{ gridTemplateColumns: `repeat(${months}, minmax(18px, 1fr))` }}
                  >
                    {activeSeries.map((v, i) => {
                      const h = Math.round((v / max) * 100);
                      return (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <div
                            className="analytics-bar w-full rounded-md border shadow-(--app-shadow-1)"
                            style={{ height: `${h}%`, minHeight: 12 }}
                          />
                          <div className="text-[10px] text-(--app-text-3)">{i + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-[12px] leading-6 text-(--app-text-2)">
              В production: источники данных, сценарии расчётов, версии модели и экспорт отчётов. Базовая инвестиция в скетче — {investment}k.
            </div>
          </RaisPanelBody>
        </RaisPanel>
      </ScrollRevealSection>

      <div id="analytics-delivery" className="scroll-mt-24 lg:col-span-12">
        <ScrollRevealSection className="lg:col-span-12" delay={0.07} minOpacity={0.84}>
          <RaisPanel scheme={scheme}>
          <RaisPanelHeader>
            <RaisPanelTitle>Интеграции и внедрение</RaisPanelTitle>
            <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">карта внедрения</div>
          </RaisPanelHeader>
          <RaisPanelBody>
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="grid gap-3 lg:col-span-5">
                {analyticsIntegrationClusters.map((cluster) => (
                  <div key={cluster.id} className="analytics-deck-card p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">{cluster.title}</div>
                    <div className="analytics-body-copy mt-2">{cluster.systems}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 lg:col-span-7">
                <div className="analytics-deck-card p-4 sm:p-5">
                  <div className="analytics-kicker">Delivery Timeline</div>
                  <ol className="analytics-delivery-timeline mt-4">
                    {analyticsDeliverySteps.map((step, idx) => (
                      <li key={step.id} className="analytics-delivery-item">
                        <div className="analytics-delivery-pin" aria-hidden>
                          <span>{idx + 1}</span>
                        </div>
                        <div className="analytics-delivery-content">
                          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                            <span>/0{idx + 1}</span>
                            <span>{step.title}</span>
                          </div>
                          <div className="analytics-body-copy mt-2">{step.details}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </RaisPanelBody>
          </RaisPanel>
        </ScrollRevealSection>
      </div>

      <div id="analytics-cta" className="scroll-mt-24 lg:col-span-12">
        <ScrollRevealSection className="lg:col-span-12" delay={0.08} minOpacity={0.86} finalizeAtPageBottom>
          <RaisPanel scheme={scheme}>
          <RaisPanelBody className="p-4 sm:p-6 lg:p-7">
            <div className="analytics-deck-card p-5 sm:p-6 lg:p-7">
              <div className="grid items-center gap-5 lg:grid-cols-[1.2fr_auto]">
                <div>
                  <div className="analytics-kicker text-[11px] font-semibold">Следующий шаг</div>
                  <div className="analytics-section-title mt-3">
                    Согласуем пилот, проверим эффект на ваших данных и зафиксируем план масштабирования
                  </div>
                  <p className="analytics-body-copy mt-3">
                    Вы получаете не «красивую демку», а рабочий контур: входные данные, автоматизированные
                    сценарии, KPI, отчетность и ответственность по шагам.
                  </p>
                </div>
                <div className="analytics-cta-actions">
                  <div className="analytics-deck-card p-4">
                    <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      <Gauge className="h-4 w-4" /> Ready checklist
                    </div>
                    <ul className="analytics-bullet-list mt-3 grid gap-1.5">
                      <li>— выбрана зона пилота и KPI успеха</li>
                      <li>— определены источники и ответственные</li>
                      <li>— согласован формат запуска и срок</li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2.5 lg:justify-end">
                    <KeycapLink
                      href="/rais/solve"
                      variant="primary"
                      size="md"
                      className="analytics-key-main inline-flex items-center justify-center"
                    >
                      Запустить проект <ArrowRight className="h-4 w-4" />
                    </KeycapLink>
                    <KeycapLink
                      href={analyticsMailtoHref()}
                      variant="ghost"
                      size="md"
                      className="analytics-key-secondary inline-flex items-center justify-center"
                    >
                      Связаться с командой
                    </KeycapLink>
                  </div>
                </div>
              </div>
            </div>
          </RaisPanelBody>
          </RaisPanel>
        </ScrollRevealSection>
      </div>
    </RaisMicrozoneShell>
    </>
  );
}

