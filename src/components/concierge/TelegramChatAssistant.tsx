"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

import { RaisGooDropdown } from "@/components/rais/RaisGooDropdown";
import { useUIState } from "@/lib/uiState";

type Msg = { id: string; role: "in" | "out"; text: string; time: string };

type Chip = { id: string; label: string; href?: string; userEcho?: string };

const nowTime = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
};

const introAssistant: Msg = {
  id: "intro",
  role: "in",
  text:
    "Привет. Я ассистент ЭКЗИТА. Выберите действие ниже — я либо открою нужный раздел, либо соберу короткий маршрут за минуту.",
  time: "14:00",
};

// Smart chat removed: assistant-only concierge.

type AssistantStep =
  | "welcome"
  | "nep_hub"
  | "rais_hub"
  | "nep_kind"
  | "rais_kind"
  | "projects_pick"
  ;

type AssistantState = {
  step: AssistantStep;
  goal?: "nep" | "rais" | "projects" | "about" | "unsure";
  nepKind?: "legal" | "risk" | "expertise" | "other";
  raisKind?: "doc_ai" | "health" | "analytics" | "other";
};

const assistantChips: Record<AssistantStep, Chip[]> = {
  welcome: [
    { id: "w-nep", label: "Экспертиза и право", userEcho: "Экспертиза и право" },
    { id: "w-rais", label: "IT разработка", userEcho: "IT разработка" },
    { id: "w-proj", label: "Наши проекты", userEcho: "Наши проекты" },
    { id: "w-cabinet", label: "Личный кабинет", href: "/nep", userEcho: "Личный кабинет" },
    { id: "about", label: "Экзита", href: "/exita", userEcho: "Экзита" },
  ],
  nep_hub: [
    { id: "open", label: "Открыть Н.Э.П.", userEcho: "Открыть Н.Э.П." },
    { id: "nh-kind", label: "Выбрать направление", userEcho: "Выбрать направление" },
    { id: "nh-about", label: "Экзита", href: "/exita", userEcho: "Экзита" },
    { id: "reset", label: "↺ Сброс", userEcho: "Сброс" },
  ],
  rais_hub: [
    { id: "open", label: "Да, открыть EXITA RAIS", userEcho: "Открыть EXITA RAIS" },
    { id: "rh-projects", label: "Все кейсы", href: "/rais/projects", userEcho: "Все кейсы" },
    { id: "rh-pick", label: "Наши продукты", userEcho: "Наши продукты" },
    { id: "rh-stack", label: "Наш стек технологий", href: "/rais/stack", userEcho: "Наш стек технологий" },
    { id: "rh-solve", label: "Нужна разработка", href: "/rais/solve", userEcho: "Нужна разработка" },
    { id: "reset", label: "↺ Сброс", userEcho: "Сброс" },
  ],
  projects_pick: [
    { id: "p1", label: "Редакторша", href: "/rais/redaktorsha", userEcho: "Редакторша" },
    { id: "p2", label: "Я Живой", href: "/rais/ya-zhivoy", userEcho: "Я Живой" },
    { id: "p0", label: "Открыть проекты EXITA RAIS", href: "/rais/projects", userEcho: "Открыть проекты" },
    { id: "reset", label: "↺ Сброс", userEcho: "Сброс" },
  ],
  nep_kind: [
    { id: "nep-legal", label: "Юридическая экспертиза", userEcho: "Юридическая экспертиза" },
    { id: "nep-risk", label: "Оценка рисков", userEcho: "Оценка рисков" },
    { id: "nep-exp", label: "Предметная экспертиза", userEcho: "Предметная экспертиза" },
    { id: "nep-other", label: "Другое", userEcho: "Другое" },
    { id: "reset", label: "↺ Сброс", userEcho: "Сброс" },
  ],
  rais_kind: [
    { id: "rais-doc", label: "Документы (Редакторша)", userEcho: "Документы" },
    { id: "rais-health", label: "Здоровье (Я Живой)", userEcho: "Здоровье" },
    { id: "rais-ana", label: "AI-аналитика и автоматизация", userEcho: "AI-аналитика и автоматизация" },
    { id: "rais-other", label: "Другое", userEcho: "Другое" },
    { id: "reset", label: "↺ Сброс", userEcho: "Сброс" },
  ],
};

/** Короткие ответы — только режим «Ассистент ЭКЗИТА». */
const botReplyAssistant: Record<string, string> = {
  welcome: "Хорошо. Сначала уточню пару вещей, чтобы предложить точный маршрут.",
  goal_nep: "Понял. Какая именно задача по экспертизе ближе?",
  goal_rais: "Понял. Какой тип продукта/задачи интересует?",
  goal_projects: "Ок. Выберите проект или сразу откройте витрину проектов.",
  confirm_rais: "Вы хотите перейти на страницу EXITA RAIS?",
  open_href: "Открываю выбранный раздел. Здесь же можно вернуться в маршрут",
  recommend_about:
    "Если вы впервые, начните с «О нас» — там коротко о Н.Э.П., IT‑зоне и продуктах. Далее можно вернуться сюда.",
};

export function TelegramChatAssistant({ className }: { className?: string }) {
  const router = useRouter();
  const patchContext = useUIState((s) => s.patchContext);

  const [messages, setMessages] = React.useState<Msg[]>(() => [introAssistant]);
  const [assistant, setAssistant] = React.useState<AssistantState>({ step: "welcome" });
  const [assistantRecommendedHref, setAssistantRecommendedHref] = React.useState<string | null>(null);
  const [pendingChipId, setPendingChipId] = React.useState<string | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const msgId = React.useRef(0);

  // assistant-only: keep initial state stable

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function pushPair(userText: string, botText: string) {
    const t = nowTime();
    msgId.current += 1;
    const outId = `o-${msgId.current}`;
    msgId.current += 1;
    const inId = `i-${msgId.current}`;
    setMessages((m) => [...m, { id: outId, role: "out", text: userText, time: t }]);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: inId, role: "in", text: botText, time: nowTime() }]);
    }, 280);
  }

  function onChip(chip: Chip) {
    if (pendingChipId) return;
    setPendingChipId(chip.id);
    window.setTimeout(() => setPendingChipId(null), 520);

    const echo = chip.userEcho ?? chip.label;
    patchContext({ productHint: chip.label });
    if (chip.id === "reset") {
      pushPair(echo, "Выберите раздел");
      setAssistant({ step: "welcome" });
      setAssistantRecommendedHref(null);
      return;
    }

    if (assistant.step === "welcome") {
      if (chip.id === "w-nep") {
        pushPair(echo, botReplyAssistant.goal_nep);
        setAssistantRecommendedHref("/nep");
        setAssistant((s) => ({ ...s, step: "nep_kind", goal: "nep" }));
        return;
      }
      if (chip.id === "w-rais") {
        pushPair(echo, botReplyAssistant.confirm_rais);
        setAssistantRecommendedHref("/rais");
        setAssistant((s) => ({ ...s, step: "rais_hub", goal: "rais" }));
        return;
      }
      if (chip.id === "w-proj") {
        pushPair(echo, botReplyAssistant.goal_projects);
        setAssistant((s) => ({ ...s, step: "projects_pick", goal: "projects" }));
        setAssistantRecommendedHref(null);
        return;
      }
      if (chip.href) {
        pushPair(echo, chip.id === "about" ? botReplyAssistant.recommend_about : botReplyAssistant.open_href);
        window.setTimeout(() => router.push(chip.href!), 420);
        return;
      }
      pushPair(echo, "Выберите вариант ниже");
      return;
    }

      if (assistant.step === "projects_pick") {
        if (chip.href) {
          pushPair(echo, botReplyAssistant.open_href);
          window.setTimeout(() => router.push(chip.href!), 420);
          return;
        }
      }

      if (assistant.step === "nep_hub") {
        if (chip.id === "open") {
          const href = assistantRecommendedHref ?? "/nep";
          pushPair(echo, "Открываю");
          window.setTimeout(() => router.push(href), 420);
          return;
        }
        if (chip.id === "nh-kind") {
          pushPair(echo, botReplyAssistant.goal_nep);
          setAssistant((s) => ({ ...s, step: "nep_kind", goal: "nep" }));
          return;
        }
        if (chip.href) {
          pushPair(echo, botReplyAssistant.open_href);
          window.setTimeout(() => router.push(chip.href!), 420);
          return;
        }
      }

      if (assistant.step === "rais_hub") {
        if (chip.id === "open") {
          const href = assistantRecommendedHref ?? "/rais";
          pushPair(echo, "Открываю");
          window.setTimeout(() => router.push(href), 420);
          return;
        }
        if (chip.id === "rh-pick") {
          pushPair(echo, botReplyAssistant.goal_rais);
          setAssistant((s) => ({ ...s, step: "rais_kind", goal: "rais" }));
          return;
        }
        if (chip.href) {
          pushPair(echo, botReplyAssistant.open_href);
          window.setTimeout(() => router.push(chip.href!), 420);
          return;
        }
      }

      if (assistant.step === "nep_kind") {
        pushPair(echo, "Открываю Н.Э.П.");
        setAssistant((s) => ({ ...s, step: "nep_hub", goal: "nep" }));
        window.setTimeout(() => router.push("/nep"), 420);
        return;
      }

      if (assistant.step === "rais_kind") {
        const href =
          chip.id === "rais-doc"
            ? "/rais/redaktorsha"
            : chip.id === "rais-health"
              ? "/rais/ya-zhivoy"
              : chip.id === "rais-ana"
                  ? "/rais/analytics"
                  : "/rais";
        pushPair(echo, "Открываю");
        window.setTimeout(() => router.push(href), 420);
        return;
      }

      pushPair(echo, "Выберите вариант ниже");
  }
  const chips = assistantChips[assistant.step];
  const isWelcome = assistant.step === "welcome";
  const isPrimaryChip = (c: Chip) => c.id === "w-rais" || c.id === "rh-solve" || c.id === "open";
  const isWideChip = (c: Chip) =>
    isWelcome &&
    (c.id === "w-proj" || c.id === "w-cabinet" || c.id === "about");
  const isWideChipForStep = (c: Chip) =>
    assistant.step === "rais_hub" ? c.id === "rh-solve" : isWideChip(c);
  const hasReset = chips.some((c) => c.id === "reset");
  const showMoreMenu = assistant.step !== "welcome" && hasReset;
  const gridChips = showMoreMenu ? chips.filter((c) => c.id !== "reset") : chips;

  return (
    <div
      className={cn(
        "concierge-chat-root flex flex-col overflow-hidden rounded-[18px] border-[0.5px] border-(--app-border) bg-(--chat-panel) shadow-[0_24px_80px_rgba(0,0,0,0.10)] backdrop-blur-xl",
        className,
      )}
    >
      <header
        className="flex shrink-0 items-center justify-between gap-2.5 border-b-[0.5px] border-(--app-border) bg-(--chat-header-bg) px-2.5 py-2 sm:gap-3 sm:px-4"
        aria-label="Окно ассистента"
      >
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[11px] bg-linear-to-br from-[#4f46e5] to-[#9333ea] shadow-[0_10px_26px_rgba(79,70,229,0.22)] ring-1 ring-(--app-separator) sm:h-9 sm:w-9 sm:rounded-[12px]">
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white sm:text-[11px]">
              EX
            </div>
          </div>
          <div className="min-w-0">
            <div className="truncate text-[14px] font-semibold text-(--app-fg) sm:text-[16px]">
              Ассистент EXITA
            </div>
            <div className="mt-0.5 text-[11.5px] leading-5 text-(--app-fg-subtle) sm:text-[12px]">
              Маршрут по зонам и проектам
            </div>
          </div>
        </div>
      </header>

      <div
        ref={listRef}
        className={cn(
          "concierge-chat-messages flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden px-2.5 py-3 sm:gap-3.5 sm:px-4 sm:py-4",
        )}
        role="region"
        aria-label="Сообщения"
        tabIndex={-1}
      >
        <div className="mx-auto mb-1 rounded-full border-[0.5px] border-(--app-border) bg-(--chat-date-pill) px-3 py-0.5 text-center text-[12.5px] text-(--app-fg-subtle)">
          Сегодня
        </div>
        {messages.map((msg) =>
          msg.role === "out" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[95%] sm:max-w-[82%] xl:max-w-[74%]">
                <div
                  className={cn(
                    "rounded-[16px] rounded-br-md px-3.5 py-2.5 sm:rounded-[18px] sm:px-4 sm:py-3",
                    "bg-linear-to-br from-[#4f46e5] to-[#7c3aed] text-white",
                    "shadow-[0_1px_0.5px_rgba(0,0,0,0.10),0_18px_50px_rgba(79,70,229,0.18)]",
                  )}
                >
                  <p className="whitespace-pre-wrap text-[13.5px] leading-[1.35rem] sm:text-[15px] sm:leading-6">
                    {msg.text}
                  </p>
                  <div className="mt-1 text-right text-[11.5px] text-white/70">{msg.time}</div>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex justify-start">
              <div className="max-w-[95%] sm:max-w-[82%] xl:max-w-[74%]">
                <div
                  className={cn(
                    "rounded-[16px] rounded-bl-md border-[0.5px] border-(--app-border) px-3.5 py-2.5 sm:rounded-[18px] sm:px-4 sm:py-3",
                    "bg-(--chat-bubble-in) text-(--app-fg)",
                    "shadow-[0_1px_0.5px_rgba(0,0,0,0.05),0_12px_36px_rgba(0,0,0,0.05)]",
                  )}
                >
                  <p className="whitespace-pre-wrap text-[13.5px] leading-[1.35rem] text-(--app-fg-muted) sm:text-[15px] sm:leading-6">
                    {msg.text}
                  </p>
                  <div className="mt-1 text-right text-[11.5px] text-(--app-fg-subtle)">{msg.time}</div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      <div className="shrink-0 border-t-[0.5px] border-(--app-border) bg-(--chat-footer-bg) px-2.5 py-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4 sm:py-3">
        <div className="rounded-[16px] border-[0.5px] border-(--app-border) bg-(--chat-inset-bg) p-2 shadow-[0_8px_28px_rgba(0,0,0,0.05)] sm:rounded-[18px] sm:p-2.5">
          <div className="grid grid-flow-dense grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:gap-2.5 lg:grid-cols-3 2xl:grid-cols-4">
            {gridChips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onChip(c)}
                disabled={pendingChipId !== null}
                className={cn(
                  "key flex min-h-11 w-full items-center rounded-[14px] px-3 py-2 text-left text-[12.5px] font-semibold leading-5 sm:min-h-12 sm:rounded-[16px] sm:px-3.5 sm:py-3 sm:text-[13px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--app-focus)",
                  pendingChipId === c.id ? "opacity-85" : null,
                  isPrimaryChip(c) ? "btn--primary" : null,
                  isWideChipForStep(c) ? "min-[420px]:col-span-2" : null,
                )}
                aria-busy={pendingChipId === c.id}
              >
                <span className="block">{pendingChipId === c.id && c.href ? "Открываю" : c.label}</span>
              </button>
            ))}
          </div>
        </div>
        {showMoreMenu ? (
          <RaisGooDropdown
            variant="telegram"
            className="mt-2"
            face={<span className="text-(--app-fg-muted)">Ещё</span>}
          >
            <button
              type="button"
              onClick={() => onChip({ id: "reset", label: "↺ Сброс", userEcho: "Сброс" })}
              disabled={pendingChipId !== null}
              className="key w-full rounded-[12px] px-3 py-2 text-left text-[12.5px] font-semibold text-(--app-fg-muted)"
            >
              ↺ Сброс
            </button>
          </RaisGooDropdown>
        ) : null}
      </div>
    </div>
  );
}
