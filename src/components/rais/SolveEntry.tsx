"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

import { RaisDivider } from "@/components/rais/RaisDivider";
import {
  RaisPanel,
  RaisPanelBody,
  RaisPanelHeader,
  RaisPanelTitle,
} from "@/components/rais/RaisPanel";
import { RaisTag } from "@/components/rais/RaisTag";
import { KeycapButton } from "@/components/ui/KeycapButton";
import { KeycapLink } from "@/components/ui/KeycapLink";

type SolvePath = "order" | "hire" | "buy";

type SolveDraft = {
  path: SolvePath;
  title: string;
  problem: string;
  outcome: string;
  context: string;
  audience: string;
  integrations: string;
  constraints: string;
  wants: string[];
  timeline: "asap" | "month" | "quarter" | "no-deadline";
  budget: "unknown" | "small" | "medium" | "large";
  priorities: {
    prototype: boolean;
    design: boolean;
    development: boolean;
    automation: boolean;
    analytics: boolean;
    support: boolean;
  };
};

const STORAGE_KEY = "rais.solve.draft.v1";

const defaultDraft: SolveDraft = {
  path: "order",
  title: "",
  problem: "",
  outcome: "",
  context: "",
  audience: "",
  integrations: "",
  constraints: "",
  wants: [],
  timeline: "asap",
  budget: "unknown",
  priorities: {
    prototype: true,
    design: false,
    development: true,
    automation: false,
    analytics: false,
    support: false,
  },
};

function safeParseDraft(value: string | null): SolveDraft | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<SolveDraft>;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.path !== "order" && parsed.path !== "hire" && parsed.path !== "buy") return null;
    return {
      ...defaultDraft,
      ...parsed,
      wants: Array.isArray(parsed.wants) ? parsed.wants.filter((v) => typeof v === "string") : [],
      priorities: {
        ...defaultDraft.priorities,
        ...(parsed.priorities ?? {}),
      },
    };
  } catch {
    return null;
  }
}

type ContactDraft = {
  name: string;
  company: string;
  email: string;
  telegram: string;
  phone: string;
  preferred: "email" | "telegram" | "phone" | "any";
};

const CONTACT_STORAGE_KEY = "rais.solve.contact.v1";

const defaultContact: ContactDraft = {
  name: "",
  company: "",
  email: "",
  telegram: "",
  phone: "",
  preferred: "any",
};

function safeParseContact(value: string | null): ContactDraft | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<ContactDraft>;
    if (!parsed || typeof parsed !== "object") return null;
    const preferred =
      parsed.preferred === "email" ||
      parsed.preferred === "telegram" ||
      parsed.preferred === "phone" ||
      parsed.preferred === "any"
        ? parsed.preferred
        : "any";
    return {
      ...defaultContact,
      ...parsed,
      preferred,
    };
  } catch {
    return null;
  }
}

function labelTimeline(v: SolveDraft["timeline"]) {
  switch (v) {
    case "asap":
      return "как можно быстрее";
    case "month":
      return "в течение месяца";
    case "quarter":
      return "в течение квартала";
    case "no-deadline":
      return "без жёсткого дедлайна";
  }
}

function labelBudget(v: SolveDraft["budget"]) {
  switch (v) {
    case "unknown":
      return "не знаю / нужно оценить";
    case "small":
      return "небольшой (быстрый MVP)";
    case "medium":
      return "средний (полноценный релиз)";
    case "large":
      return "крупный (продукт/платформа)";
  }
}

function labelPath(v: SolvePath) {
  switch (v) {
    case "order":
      return "Заказать разработку";
    case "hire":
      return "Найти разработчиков";
    case "buy":
      return "Подобрать готовое решение";
  }
}

function labelPreferred(v: ContactDraft["preferred"]) {
  switch (v) {
    case "email":
      return "email";
    case "telegram":
      return "telegram";
    case "phone":
      return "телефон";
    case "any":
      return "любой";
  }
}

function buildMailBody(text: string, c: ContactDraft) {
  const lines: string[] = [];
  lines.push(text.trim() ? text.trim() : "—");
  lines.push("");
  lines.push("Контакты:");
  lines.push(`Имя: ${c.name || "—"}`);
  lines.push(`Компания: ${c.company || "—"}`);
  lines.push(`Email: ${c.email || "—"}`);
  lines.push(`Telegram: ${c.telegram || "—"}`);
  lines.push(`Телефон: ${c.phone || "—"}`);
  lines.push(`Как связаться: ${labelPreferred(c.preferred)}`);
  return lines.join("\n");
}

function buildRequestText(d: SolveDraft) {
  const pr: string[] = [];
  if (d.priorities.prototype) pr.push("прототип");
  if (d.priorities.design) pr.push("дизайн");
  if (d.priorities.development) pr.push("разработка");
  if (d.priorities.automation) pr.push("автоматизация/боты");
  if (d.priorities.analytics) pr.push("аналитика/данные");
  if (d.priorities.support) pr.push("поддержка/развитие");

  const lines: string[] = [];
  lines.push("EXITA RAIS — описание задачи");
  lines.push("");
  lines.push(`Сценарий: ${labelPath(d.path)}`);
  lines.push(`Срок: ${labelTimeline(d.timeline)}`);
  lines.push(`Бюджет: ${labelBudget(d.budget)}`);
  lines.push(`Приоритеты: ${pr.length ? pr.join(", ") : "—"}`);
  if (d.wants.length) {
    lines.push(`Что нужно: ${d.wants.join(", ")}`);
  }
  lines.push("");
  lines.push(`Название/коротко: ${d.title || "—"}`);
  lines.push("");
  lines.push("Проблема / зачем:");
  lines.push(d.problem || "—");
  lines.push("");
  lines.push("Ожидаемый результат:");
  lines.push(d.outcome || "—");
  lines.push("");
  lines.push("Контекст (что уже есть, ограничения, что пробовали):");
  lines.push(d.context || "—");
  lines.push("");
  lines.push("Аудитория / пользователи:");
  lines.push(d.audience || "—");
  lines.push("");
  lines.push("Интеграции (сервисы, API, данные):");
  lines.push(d.integrations || "—");
  lines.push("");
  lines.push("Ограничения (безопасность, доступы, сроки, регуляторика):");
  lines.push(d.constraints || "—");

  return lines.join("\n");
}

async function copyToClipboard(text: string) {
  if (typeof navigator === "undefined") return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function PathCard({
  active,
  title,
  description,
  onClick,
  meta,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
  meta: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "key btn--ghost w-full rounded-[18px] p-5 text-left sm:p-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2 focus-visible:ring-offset-(--rais-bg)",
        active ? "key--active" : null,
      )}
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">{meta}</div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-black/35">
          {active ? "выбрано" : "выбрать"}
        </div>
      </div>
      <div className="mt-4 text-balance text-[17px] font-semibold leading-[1.08] tracking-[-0.02em] text-black sm:mt-5 sm:text-[18px]">
        {title}
      </div>
      <div className="mt-3 text-[13px] leading-7 text-black/75 sm:text-[14px] sm:leading-[1.65]">
        {description}
      </div>
    </button>
  );
}

export function SolveEntry() {
  const [draft, setDraft] = React.useState<SolveDraft>(defaultDraft);
  const [contact, setContact] = React.useState<ContactDraft>(defaultContact);
  const [copied, setCopied] = React.useState<"idle" | "ok" | "fail">("idle");
  const requestRef = React.useRef<HTMLDivElement | null>(null);
  const contactRef = React.useRef<HTMLDivElement | null>(null);
  const [manualText, setManualText] = React.useState(false);
  const [finalText, setFinalText] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = safeParseDraft(window.localStorage.getItem(STORAGE_KEY));
    if (stored) setDraft(stored);
    const storedContact = safeParseContact(window.localStorage.getItem(CONTACT_STORAGE_KEY));
    if (storedContact) setContact(storedContact);
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  React.useEffect(() => {
    window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
  }, [contact]);

  const requestText = React.useMemo(() => buildRequestText(draft), [draft]);

  React.useEffect(() => {
    if (!manualText) setFinalText(requestText);
  }, [manualText, requestText]);
  const readiness = React.useMemo(() => {
    const hasProblem = draft.problem.trim().length >= 10;
    const hasOutcome = draft.outcome.trim().length >= 10;
    const hasTitle = draft.title.trim().length >= 6;
    const hasContext = draft.context.trim().length >= 10;
    const hasIntegrations = draft.integrations.trim().length >= 8;
    const hasConstraints = draft.constraints.trim().length >= 8;

    const score =
      (hasProblem ? 1 : 0) +
      (hasOutcome ? 1 : 0) +
      (hasTitle ? 1 : 0) +
      (hasContext ? 1 : 0) +
      (hasIntegrations ? 1 : 0) +
      (hasConstraints ? 1 : 0);

    const level = !hasProblem || !hasOutcome ? "draft" : score >= 4 ? "strong" : "basic";

    return {
      hasMinimum: hasProblem && hasOutcome,
      score,
      level,
    } as const;
  }, [draft]);

  const mailtoHref = React.useMemo(() => {
    const subject = `EXITA RAIS — запрос: ${draft.title || labelPath(draft.path)}`;
    const body = buildMailBody(finalText, contact);
    return `mailto:hello@exita?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [contact, finalText, draft.path, draft.title]);

  const applyPreset = React.useCallback(
    (
      preset:
        | "landing"
        | "automation"
        | "bi"
        | "mobile"
        | "account"
        | "integration"
        | "docs"
        | "search",
    ) => {
      const next: SolveDraft =
        preset === "landing"
          ? {
              ...defaultDraft,
              path: "order",
              title: "Лендинг с заявками + админка",
              problem:
                "Есть услуга/продукт, но заявки теряются и нет понятного сценария: от рекламы → к заявке → к обработке. Нужно быстро запуститься и измерять эффективность.",
              outcome:
                "Лендинг с формой/квизом, записью заявок в таблицу/CRM и простой админкой. Понятная воронка + базовые метрики (конверсия/источник).",
              context: "Есть домен/бренд‑материалы. Нет готового дизайна. Нужна мобильная версия и быстрая публикация.",
              audience: "Потенциальные клиенты, которые выбирают услугу и оставляют контакт.",
              integrations: "Почта/Telegram уведомления, таблица или CRM (по ситуации), аналитика (события).",
              constraints: "Важно быстро, аккуратно и без перегруза. Нужны понятные шаги и сроки.",
              timeline: "month",
              budget: "small",
              priorities: {
                prototype: true,
                design: true,
                development: true,
                automation: false,
                analytics: true,
                support: false,
              },
              wants: ["лендинг", "админка", "аналитика", "уведомления"],
            }
          : preset === "automation"
            ? {
                ...defaultDraft,
                path: "order",
                title: "Автоматизация обработки заявок (бот/интеграции)",
                problem:
                  "Заявки приходят из разных каналов (почта/формы/мессенджеры), их вручную разносят и часто забывают. Нужен единый поток и контроль статуса.",
                outcome:
                  "Единая карточка заявки + автоматические уведомления + постановка задач. Статусы прозрачны, есть журнал действий и понятные правила маршрутизации.",
                context:
                  "Есть текущий процесс в чатах/таблицах. Нужна настройка прав и ролей, чтобы было понятно кто отвечает.",
                audience: "Менеджеры, поддержка, руководитель, который смотрит воронку и SLA.",
                integrations: "Telegram/почта, таблица/CRM, возможные webhooks/API.",
                constraints:
                  "Доступы и безопасность: минимальные права, аудит действий. Нельзя ломать текущий процесс резко — нужен плавный переход.",
                timeline: "month",
                budget: "medium",
                priorities: {
                  prototype: true,
                  design: false,
                  development: true,
                  automation: true,
                  analytics: false,
                  support: true,
                },
                wants: ["уведомления", "интеграции", "статусы", "роли/доступы"],
              }
            : preset === "bi"
              ? {
                ...defaultDraft,
                path: "buy",
                title: "BI‑витрина KPI + прогноз эффекта",
                problem:
                  "Метрики разбросаны по таблицам. Отчёты готовятся вручную, решения принимаются без единого источника правды.",
                outcome:
                  "Единая модель данных + витрина KPI + сценарный прогноз (что будет если…). Прозрачные допущения, чтобы расчёты можно было повторить.",
                context:
                  "Источники: таблицы/CRM/финансы. Нужна базовая очистка и правила обновления данных.",
                audience: "Руководитель и аналитик: смотрят KPI, сравнивают сценарии, принимают решения.",
                integrations: "Источники данных (API/выгрузки), хранилище/витрины, отчётность.",
                constraints:
                  "Сначала показать витрину и договориться о составе KPI, потом наращивать.",
                timeline: "quarter",
                budget: "large",
                priorities: {
                  prototype: true,
                  design: false,
                  development: true,
                  automation: false,
                  analytics: true,
                  support: true,
                },
                wants: ["витрина KPI", "источники данных", "прогноз", "доступы"],
              }
              : preset === "mobile"
                ? {
                    ...defaultDraft,
                    path: "order",
                    title: "Мобильное приложение (iOS/Android) + кабинет",
                    problem:
                      "Клиентам неудобно пользоваться сервисом через браузер/чат. Нужен понятный мобильный сценарий и быстрый доступ к ключевым функциям.",
                    outcome:
                      "Приложение с основным сценарием, авторизацией и понятными статусами. Пуш/уведомления, базовая аналитика поведения.",
                    context:
                      "Есть сайт/сервис или идеи по функционалу. Дизайн можно сделать с нуля на основе референсов.",
                    audience: "Клиенты/пользователи сервиса, которым нужен быстрый доступ с телефона.",
                    integrations: "Авторизация, API сервиса, уведомления, аналитика событий.",
                    constraints:
                      "Важно начать с MVP и не перегружать функционалом. Нужны понятные этапы и сроки.",
                    timeline: "quarter",
                    budget: "large",
                    priorities: {
                      prototype: true,
                      design: true,
                      development: true,
                      automation: false,
                      analytics: true,
                      support: true,
                    },
                    wants: ["мобильное приложение", "личный кабинет", "уведомления", "аналитика"],
                  }
                : preset === "account"
                  ? {
                      ...defaultDraft,
                      path: "order",
                      title: "Личный кабинет для клиентов/сотрудников",
                      problem:
                        "Процесс и данные сейчас в таблицах/чатах. Пользователям нужно место, где они видят статус, документы и могут делать действия без ручной поддержки.",
                      outcome:
                        "Личный кабинет с ролями, статусами, загрузкой файлов и журналом действий. Базовая админка для управления.",
                      context:
                        "Есть текущие правила/статусы (или их нужно сформулировать). Нужна прозрачность и контроль.",
                      audience: "Клиенты, менеджеры, поддержка, руководитель.",
                      integrations: "CRM/таблицы, почта/Telegram, файлы/хранилище, API.",
                      constraints:
                        "Роли и доступы обязательны. Важно не ломать текущий процесс — нужен план миграции.",
                      timeline: "quarter",
                      budget: "medium",
                      priorities: {
                        prototype: true,
                        design: true,
                        development: true,
                        automation: false,
                        analytics: false,
                        support: true,
                      },
                      wants: ["личный кабинет", "роли/доступы", "статусы", "админка"],
                    }
                  : preset === "integration"
                    ? {
                        ...defaultDraft,
                        path: "order",
                        title: "Интеграции с CRM/сервисами + единый поток",
                        problem:
                          "Данные разъехались по системам. Много ручной работы и ошибок при переносе. Нужен единый поток и контроль качества данных.",
                        outcome:
                          "Интеграции + правила синхронизации, мониторинг ошибок, понятные статусы. Документация и поддерживаемый контур.",
                        context:
                          "Есть список сервисов/таблиц. Нужны доступы и описание правил, что считать источником правды.",
                        audience: "Операционный отдел, поддержка, разработчики/админы.",
                        integrations: "CRM, почта, Telegram, платежи, API, вебхуки.",
                        constraints:
                          "Безопасность и логирование важны. Нужны тесты и возможность отката.",
                        timeline: "month",
                        budget: "medium",
                        priorities: {
                          prototype: false,
                          design: false,
                          development: true,
                          automation: true,
                          analytics: false,
                          support: true,
                        },
                        wants: ["интеграции", "синхронизация", "логирование", "качество данных"],
                      }
                    : preset === "docs"
                      ? {
                          ...defaultDraft,
                          path: "buy",
                          title: "Документооборот и согласование (процесс + качество)",
                          problem:
                            "Правки размазаны по чатам, версии теряются, согласование занимает долго. Нет прозрачного маршрута и ответственности.",
                          outcome:
                            "Единая карточка документа, роли, чек‑листы, журнал изменений и понятный маршрут согласования.",
                          context:
                            "Есть типы документов и базовые правила. Нужно быстро показать работающий сценарий и потом наращивать.",
                          audience: "Юристы, менеджеры, руководитель, исполнители.",
                          integrations: "Почта/Telegram, хранилище файлов, подпись (если нужно).",
                          constraints:
                            "Нужна прозрачность и контроль доступа. Важны версии и журнал действий.",
                          timeline: "quarter",
                          budget: "large",
                          priorities: {
                            prototype: true,
                            design: true,
                            development: true,
                            automation: false,
                            analytics: false,
                            support: true,
                          },
                          wants: ["документы", "согласование", "версии", "роли/доступы"],
                        }
                      : {
                          ...defaultDraft,
                          path: "buy",
                          title: "Поиск по базе знаний / ответы из документов",
                          problem:
                            "Сотрудники задают одинаковые вопросы, поиск по базе знаний не даёт релевантных ответов, поддержка перегружена.",
                          outcome:
                            "Поиск по источникам + ответы со ссылками на первоисточник. Прозрачность и быстрое внедрение на пилоте.",
                          context:
                            "Есть документы/статьи/FAQ. Нужно определить источники, права доступа и формат обновления.",
                          audience: "Поддержка, новые сотрудники, смежные команды.",
                          integrations: "Источники знаний, доступы, витрина/чат‑интерфейс.",
                          constraints:
                            "Нужны права доступа и понятные границы ответственности (что можно/нельзя).",
                          timeline: "month",
                          budget: "medium",
                          priorities: {
                            prototype: true,
                            design: false,
                            development: true,
                            automation: false,
                            analytics: true,
                            support: true,
                          },
                          wants: ["поиск", "база знаний", "доступы", "витрина"],
                        };

      setDraft(next);
      setManualText(false);
      setSubmitError(null);
      window.requestAnimationFrame(() => {
        requestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [setDraft],
  );

  const modeHint = React.useMemo(() => {
    switch (draft.path) {
      case "order":
        return {
          title: "Маршрут: от идеи к запуску",
          steps: ["1) Уточним цель и критерий результата", "2) Согласуем прототип/дизайн", "3) Разработка → тестирование → релиз", "4) Поддержка и развитие"],
          tags: ["прототип", "план", "релиз"],
        };
      case "hire":
        return {
          title: "Маршрут: усиление команды",
          steps: ["1) Определим роли/нагрузку (фронт/бэк/дизайн/QA)", "2) Согласуем формат (проект/спринты/почасовка)", "3) Подключим к вашему процессу и репозиториям", "4) Контроль качества и прозрачные отчёты"],
          tags: ["команда", "скорость", "качество"],
        };
      case "buy":
        return {
          title: "Маршрут: готовое решение → адаптация",
          steps: ["1) Опишете задачу простыми словами", "2) Подберём ближайший модуль/пример", "3) Оценим, что нужно адаптировать", "4) Доведём до прод‑уровня и внедрим"],
          tags: ["адаптация", "интеграции"],
        };
    }
  }, [draft.path]);

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12">
      <div>
        <RaisPanel scheme="light">
          <RaisPanelHeader scheme="light">
            <RaisPanelTitle scheme="light">Вход</RaisPanelTitle>
            <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">выбор пути</div>
          </RaisPanelHeader>
          <RaisPanelBody className="p-5 sm:p-6 lg:p-8">
            <div className="text-[13px] leading-7 text-black/75 sm:text-[14px] sm:leading-[1.65]">
              Выберите сценарий — мы сформируем аккуратный текст запроса, который можно сразу
              отправить или сохранить. Без бэкенда: всё работает локально в браузере.
            </div>

            <div className="mt-6 grid gap-5 md:mt-7 md:grid-cols-2 xl:grid-cols-3">
              <PathCard
                active={draft.path === "order"}
                meta="/01"
                title="Заказать разработку"
                description="Сформулируем задачу, соберём прототип/план и доведём до релиза."
                onClick={() => setDraft((p) => ({ ...p, path: "order" }))}
              />
              <PathCard
                active={draft.path === "hire"}
                meta="/02"
                title="Найти разработчиков"
                description="Подберём людей/роли, подключимся к вашему процессу и закроем модуль."
                onClick={() => setDraft((p) => ({ ...p, path: "hire" }))}
              />
              <PathCard
                active={draft.path === "buy"}
                meta="/03"
                title="Подобрать решение"
                description="Выберем ближайший пример/модуль и адаптируем под вашу задачу."
                onClick={() => setDraft((p) => ({ ...p, path: "buy" }))}
              />
            </div>

            <RaisDivider scheme="light" className="my-8 sm:my-10" />

            <div className="grid gap-5 md:grid-cols-2">
              <RaisPanel scheme="light" variant="card">
                <RaisPanelBody className="p-5 sm:p-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    {modeHint.title}
                  </div>
                  <div className="mt-3 grid gap-3 text-[13px] leading-7 text-black/75 sm:text-[14px] sm:leading-[1.65]">
                    {modeHint.steps.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {modeHint.tags.map((t) => (
                      <RaisTag key={t} scheme="light">
                        {t}
                      </RaisTag>
                    ))}
                  </div>
                </RaisPanelBody>
              </RaisPanel>

              <RaisPanel scheme="light" variant="card">
                <RaisPanelBody className="p-5 sm:p-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Что заполнить (минимум)
                  </div>
                  <div className="mt-3 grid gap-3 text-[13px] leading-7 text-black/75 sm:text-[14px] sm:leading-[1.65]">
                    <div>— проблему простыми словами</div>
                    <div>— ожидаемый результат</div>
                    <div>— срок/ограничения (если есть)</div>
                    <div>— что уже сделано / что есть</div>
                  </div>
                </RaisPanelBody>
              </RaisPanel>
            </div>
          </RaisPanelBody>
        </RaisPanel>

        <div className="mt-8 sm:mt-10">
          <RaisPanel scheme="light">
            <RaisPanelHeader scheme="light">
              <RaisPanelTitle scheme="light">Описание задачи</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                черновик запроса
              </div>
            </RaisPanelHeader>
            <RaisPanelBody className="p-5 sm:p-6 lg:p-8">
              <div ref={requestRef} />
              <div className="grid gap-5 sm:gap-6">
                <div className="text-[13px] leading-7 text-black/65 sm:max-w-[60ch]">
                  Можно начать с примера и потом отредактировать под себя.
                </div>
                <div className="rounded-[18px] border border-(--rais-border) bg-[var(--rais-surface-solid)] px-6 py-6 sm:px-7 sm:py-7">
                  <div className="text-[13px] font-semibold text-black/85">Примеры задач</div>
                  <div className="mt-4 text-[12px] leading-7 text-black/55">
                    Подставят текст в поля ниже — затем можно править.
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
                    <KeycapButton size="sm" variant="ghost" onClick={() => applyPreset("landing")}>
                      Пример: сайт
                    </KeycapButton>
                    <KeycapButton
                      size="sm"
                      variant="ghost"
                      onClick={() => applyPreset("automation")}
                    >
                      Пример: автоматизация
                    </KeycapButton>
                    <KeycapButton size="sm" variant="ghost" onClick={() => applyPreset("bi")}>
                      Пример: BI
                    </KeycapButton>
                    <KeycapButton size="sm" variant="ghost" onClick={() => applyPreset("mobile")}>
                      Пример: приложение
                    </KeycapButton>
                    <KeycapButton size="sm" variant="ghost" onClick={() => applyPreset("account")}>
                      Пример: кабинет
                    </KeycapButton>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:gap-7 md:grid-cols-2 md:gap-x-10">
                <label className="grid gap-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Название / коротко
                  </div>
                  <input
                    value={draft.title}
                    onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
                    className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="Напр. “Лендинг с заявками”"
                  />
                </label>

                <div className="grid gap-4">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Приоритеты
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-x-4 sm:gap-y-3">
                    {(
                      [
                        ["prototype", "Прототип"],
                        ["design", "Дизайн"],
                        ["development", "Разработка"],
                        ["automation", "Автоматизация"],
                        ["analytics", "Аналитика"],
                        ["support", "Поддержка"],
                      ] as const
                    ).map(([k, label]) => (
                      <KeycapButton
                        key={k}
                        variant={draft.priorities[k] ? "primary" : "ghost"}
                        size="sm"
                        pressed={draft.priorities[k]}
                        onClick={() =>
                          setDraft((p) => ({
                            ...p,
                            priorities: { ...p.priorities, [k]: !p.priorities[k] },
                          }))
                        }
                      >
                        {label}
                      </KeycapButton>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Проблема / зачем
                  </div>
                  <textarea
                    value={draft.problem}
                    onChange={(e) => setDraft((p) => ({ ...p, problem: e.target.value }))}
                    className="min-h-[110px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[120px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                    placeholder="Что не работает / что болит сейчас?"
                  />
                </label>
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Ожидаемый результат
                  </div>
                  <textarea
                    value={draft.outcome}
                    onChange={(e) => setDraft((p) => ({ ...p, outcome: e.target.value }))}
                    className="min-h-[110px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[120px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                    placeholder="Как поймём, что получилось? (критерии)"
                  />
                </label>
              </div>

              <div className="mt-6 rounded-[18px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-5 sm:p-6">
                <div className="text-[13px] font-semibold text-black/85">Что обычно нужно</div>
                <div className="mt-3 text-[12px] leading-7 text-black/55">
                  Отметьте, что ожидаете в продукте — попадёт в текст запроса.
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {(
                    [
                      "лендинг",
                      "админка",
                      "личный кабинет",
                      "платежи",
                      "уведомления",
                      "интеграция с CRM",
                      "бот",
                      "аналитика",
                      "роли/доступы",
                      "импорт данных",
                    ] as const
                  ).map((w) => {
                    const on = draft.wants.includes(w);
                    return (
                      <KeycapButton
                        key={w}
                        size="sm"
                        variant={on ? "primary" : "ghost"}
                        pressed={on}
                        onClick={() =>
                          setDraft((p) => ({
                            ...p,
                            wants: on ? p.wants.filter((x) => x !== w) : [...p.wants, w],
                          }))
                        }
                      >
                        {w}
                      </KeycapButton>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="text-[13px] font-semibold text-black/85">
                  Дополнительно (контекст, аудитория, интеграции)
                </div>
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                  <label className="grid gap-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                      Контекст
                    </div>
                    <textarea
                      value={draft.context}
                      onChange={(e) => setDraft((p) => ({ ...p, context: e.target.value }))}
                      className="min-h-[100px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[110px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                      placeholder="Что уже есть: сайт/приложение/таблицы/процессы?"
                    />
                  </label>
                  <label className="grid gap-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                      Аудитория
                    </div>
                    <textarea
                      value={draft.audience}
                      onChange={(e) => setDraft((p) => ({ ...p, audience: e.target.value }))}
                      className="min-h-[100px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[110px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                      placeholder="Кто пользователь и что он должен сделать?"
                    />
                  </label>
                  <label className="grid gap-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                      Интеграции
                    </div>
                    <textarea
                      value={draft.integrations}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, integrations: e.target.value }))
                      }
                      className="min-h-[100px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[110px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                      placeholder="CRM, платежи, Telegram, почта, базы, API…"
                    />
                  </label>
                  <label className="grid gap-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                      Ограничения
                    </div>
                    <textarea
                      value={draft.constraints}
                      onChange={(e) =>
                        setDraft((p) => ({ ...p, constraints: e.target.value }))
                      }
                      className="min-h-[100px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[14px] leading-7 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[110px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
                      placeholder="Безопасность, доступы, сроки, “нельзя менять”…"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[18px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Срок
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {(
                      [
                        ["asap", "ASAP"],
                        ["month", "Месяц"],
                        ["quarter", "Квартал"],
                        ["no-deadline", "Без дедлайна"],
                      ] as const
                    ).map(([v, label]) => (
                      <KeycapButton
                        key={v}
                        size="sm"
                        variant={draft.timeline === v ? "primary" : "ghost"}
                        pressed={draft.timeline === v}
                        onClick={() => setDraft((p) => ({ ...p, timeline: v }))}
                      >
                        {label}
                      </KeycapButton>
                    ))}
                  </div>
                </div>
                <div className="rounded-[18px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-6">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Бюджет
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {(
                      [
                        ["unknown", "Оценить"],
                        ["small", "MVP"],
                        ["medium", "Релиз"],
                        ["large", "Платформа"],
                      ] as const
                    ).map(([v, label]) => (
                      <KeycapButton
                        key={v}
                        size="sm"
                        variant={draft.budget === v ? "primary" : "ghost"}
                        pressed={draft.budget === v}
                        onClick={() => setDraft((p) => ({ ...p, budget: v }))}
                      >
                        {label}
                      </KeycapButton>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                <KeycapButton
                  variant="subtle"
                  size="md"
                  onClick={() => {
                    window.localStorage.removeItem(STORAGE_KEY);
                    window.localStorage.removeItem(CONTACT_STORAGE_KEY);
                    setDraft(defaultDraft);
                    setContact(defaultContact);
                    setManualText(false);
                    setSubmitError(null);
                  }}
                >
                  Сбросить
                </KeycapButton>
                {manualText ? (
                  <KeycapButton variant="ghost" size="md" onClick={() => setManualText(false)}>
                    Обновить текст по форме
                  </KeycapButton>
                ) : null}
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </div>

        <div className="mt-8 sm:mt-10">
          <RaisPanel scheme="light">
            <RaisPanelHeader scheme="light">
              <RaisPanelTitle scheme="light">Контакты</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                чтобы мы ответили
              </div>
            </RaisPanelHeader>
            <RaisPanelBody className="p-5 sm:p-6 lg:p-8">
              <div ref={contactRef} />
              <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">Имя</div>
                  <input
                    value={contact.name}
                    onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                    className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="Как к вам обращаться"
                  />
                </label>
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Компания (необязательно)
                  </div>
                  <input
                    value={contact.company}
                    onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))}
                    className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="Название компании"
                  />
                </label>
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">Email</div>
                  <input
                    value={contact.email}
                    onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                    className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="name@company.com"
                  />
                </label>
                <label className="grid gap-3">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                    Telegram / телефон
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      value={contact.telegram}
                      onChange={(e) => setContact((p) => ({ ...p, telegram: e.target.value }))}
                      className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                      placeholder="@username"
                    />
                    <input
                      value={contact.phone}
                      onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                      className="h-10.5 rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-4 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                      placeholder="+7 …"
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6 rounded-[18px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-5 sm:p-6">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                  Как удобнее связаться
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {(
                    [
                      ["any", "Любой способ"],
                      ["email", "Email"],
                      ["telegram", "Telegram"],
                      ["phone", "Телефон"],
                    ] as const
                  ).map(([v, label]) => (
                    <KeycapButton
                      key={v}
                      size="sm"
                      variant={contact.preferred === v ? "primary" : "ghost"}
                      pressed={contact.preferred === v}
                      onClick={() => setContact((p) => ({ ...p, preferred: v }))}
                    >
                      {label}
                    </KeycapButton>
                  ))}
                </div>
                {submitError ? (
                  <div className="mt-4 text-[12px] leading-7 text-black/70">
                    <span className="font-semibold text-black">Нужно поправить:</span> {submitError}
                  </div>
                ) : null}
              </div>

              <div className="mt-6 grid gap-4">
                <KeycapButton
                  variant="primary"
                  size="lg"
                  className="h-13 w-full text-[14px] tracking-[0.06em] sm:h-14 sm:text-[15px]"
                  onClick={() => {
                    setSubmitError(null);
                    const hasMinimum = readiness.hasMinimum;
                    const hasContact =
                      contact.email.trim().length > 3 ||
                      contact.telegram.trim().length > 1 ||
                      contact.phone.trim().length > 6;
                    if (!hasMinimum) {
                      setSubmitError("заполните «Проблема» и «Ожидаемый результат» (хотя бы по 1–2 предложения).");
                      requestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      return;
                    }
                    if (!hasContact) {
                      setSubmitError("укажите хотя бы один контакт: email, Telegram или телефон.");
                      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      return;
                    }
                    window.location.href = mailtoHref;
                  }}
                >
                  ОФОРМИТЬ ЗАКАЗ
                </KeycapButton>

                <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                  <KeycapButton
                    variant="ghost"
                    size="md"
                    onClick={async () => {
                      const ok = await copyToClipboard(finalText);
                      setCopied(ok ? "ok" : "fail");
                      window.setTimeout(() => setCopied("idle"), 1500);
                    }}
                  >
                    {copied === "ok"
                      ? "Скопировано"
                      : copied === "fail"
                        ? "Не удалось"
                        : "Скопировать"}
                  </KeycapButton>
                  <KeycapButton
                    variant="ghost"
                    size="md"
                    onClick={() => downloadText("exita-rais-request.txt", buildMailBody(finalText, contact))}
                  >
                    Скачать .txt
                  </KeycapButton>
                  <KeycapLink href={mailtoHref} variant="ghost" size="md">
                    Открыть письмо
                  </KeycapLink>
                </div>
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </div>
      </div>

      <div>
        <RaisPanel scheme="light">
          <RaisPanelHeader scheme="light">
            <RaisPanelTitle scheme="light">Предпросмотр</RaisPanelTitle>
            <div className="flex items-center gap-3">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">готовность</div>
              <RaisTag scheme="light">
                {readiness.level === "draft"
                  ? "черновик"
                  : readiness.level === "basic"
                    ? "базово"
                    : "хорошо"}
              </RaisTag>
            </div>
          </RaisPanelHeader>
          <RaisPanelBody className="p-5 sm:p-6 lg:p-8">
            <div className="rounded-[16px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-5 sm:rounded-[18px] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/55">
                  итоговый текст
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/45">
                  {manualText ? "изменено вручную" : "сформировано"}
                </div>
              </div>
              <textarea
                value={finalText}
                onChange={(e) => {
                  setFinalText(e.target.value);
                  setManualText(true);
                }}
                className="solve-preview-textarea mt-4 min-h-[190px] w-full resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-4 py-3 text-[13px] leading-7 text-black/85 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[220px] sm:px-4 sm:py-3.5 sm:leading-[1.65]"
              />
            </div>
            <div className="mt-6 rounded-[16px] border border-(--rais-border) bg-[var(--rais-surface-solid)] p-5 sm:rounded-[18px] sm:p-6">
              <div className="text-[13px] font-semibold text-black/85">Что будет после отправки</div>
              <div className="mt-3 text-[12px] leading-7 text-black/55">
                Следующие шаги после письма — коротко и без обязательств.
              </div>
              <div className="mt-3 grid gap-3 text-[13px] leading-7 sm:leading-[1.65] text-black/75">
                <div>— уточним вопросы и быстро зафиксируем критерий результата</div>
                <div>— предложим формат (прототип / разработка / интеграции) и план работ</div>
                <div>— дадим оценку по срокам и объёму, согласуем следующий шаг</div>
              </div>
              <div className="mt-4 text-[12px] leading-7 text-black/60">
                Минимум для старта: <span className="text-black/80">проблема</span> и{" "}
                <span className="text-black/80">ожидаемый результат</span>.
                {!readiness.hasMinimum ? (
                  <span className="block">
                    Сейчас это черновик — добавьте 1–2 предложения в эти поля.
                  </span>
                ) : null}
              </div>
            </div>
          </RaisPanelBody>
        </RaisPanel>
      </div>
    </div>
  );
}

