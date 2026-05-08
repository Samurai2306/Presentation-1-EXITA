"use client";

import * as React from "react";

import { KeycapButton } from "@/components/ui/KeycapButton";
import { KeycapLink } from "@/components/ui/KeycapLink";

type ContactDraft = {
  name: string;
  company: string;
  email: string;
  telegram: string;
  phone: string;
  message: string;
  preferred: "email" | "telegram" | "phone" | "any";
};

const defaultDraft: ContactDraft = {
  name: "",
  company: "",
  email: "",
  telegram: "",
  phone: "",
  message: "",
  preferred: "any",
};

function buildContactMailBody(d: ContactDraft) {
  const lines: string[] = [];
  lines.push("EXITA RAIS — запрос на связь");
  lines.push("");
  lines.push("Контакты:");
  lines.push(`Имя: ${d.name || "—"}`);
  lines.push(`Компания: ${d.company || "—"}`);
  lines.push(`Email: ${d.email || "—"}`);
  lines.push(`Telegram: ${d.telegram || "—"}`);
  lines.push(`Телефон: ${d.phone || "—"}`);
  lines.push(`Как связаться: ${d.preferred}`);
  lines.push("");
  lines.push("Сообщение:");
  lines.push(d.message || "—");
  return lines.join("\n");
}

export function RaisContactsCta() {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<ContactDraft>(defaultDraft);
  const [error, setError] = React.useState<string | null>(null);

  const mailtoHref = React.useMemo(() => {
    const subject = "EXITA RAIS — свяжитесь со мной";
    const body = buildContactMailBody(draft);
    return `mailto:hello@exita?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [draft]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open]);

  return (
    <>
      <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3">
        <KeycapLink
          href="/rais/solve"
          variant="primary"
          size="lg"
          className="h-[3.25rem] w-full px-5 text-[14px] tracking-[0.06em] shadow-[0_18px_60px_rgba(0,0,0,0.16)] sm:h-16 sm:w-auto sm:px-8 sm:text-[16px]"
        >
          Оформить запрос
        </KeycapLink>
        <KeycapButton
          variant="ghost"
          size="md"
          className="h-11 w-full px-4 text-[13px] sm:w-auto sm:h-12 sm:px-5 sm:text-[14px]"
          onClick={() => {
            setError(null);
            setOpen(true);
          }}
        >
          Контакты
        </KeycapButton>
        <KeycapLink
          href="#cases"
          variant="ghost"
          size="md"
          className="h-11 w-full px-4 text-[13px] sm:w-auto sm:h-12 sm:px-5 sm:text-[14px]"
        >
          Кейсы / решения
        </KeycapLink>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Контакты EXITA RAIS"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onMouseDown={(e) => {
              // close when clicking the backdrop
              if (e.target === e.currentTarget) setOpen(false);
            }}
            role="presentation"
          />

          <div className="relative w-full max-w-[760px] overflow-hidden rounded-[18px] border border-(--rais-border) bg-(--rais-surface) shadow-[0_18px_70px_rgba(0,0,0,0.18)] sm:rounded-[22px]">
            <div className="max-h-[min(92dvh,980px)] overflow-y-auto overscroll-contain p-4 sm:max-h-[calc(100dvh-2rem)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">
                  контакты
                </div>
                <div className="mt-2 text-balance text-[20px] font-semibold leading-[1.08] tracking-[-0.02em] text-black sm:text-[22px]">
                  Напишите нам — или оставьте контакты, и мы свяжемся первыми
                </div>
                <div className="mt-2 text-[13px] leading-6 sm:leading-7 text-black/70">
                  При отправке откроется письмо с уже заполненным текстом.
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <KeycapButton variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Закрыть окно">
                  Закрыть
                </KeycapButton>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-4 sm:rounded-[18px] sm:p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                  Наши контакты
                </div>
                <div className="mt-3 grid gap-2 text-[13px] leading-6 sm:leading-7 text-black/75">
                  <div>Канал: форма запроса</div>
                  <div>Формат: запрос → созвон → план работ</div>
                </div>
              </div>

              <div className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-4 sm:rounded-[18px] sm:p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                  Как связаться
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      ["any", "Любой"],
                      ["email", "Email"],
                      ["telegram", "Telegram"],
                      ["phone", "Телефон"],
                    ] as const
                  ).map(([v, label]) => (
                    <KeycapButton
                      key={v}
                      size="sm"
                      variant={draft.preferred === v ? "primary" : "ghost"}
                      pressed={draft.preferred === v}
                      onClick={() => setDraft((p) => ({ ...p, preferred: v }))}
                    >
                      {label}
                    </KeycapButton>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">Имя</div>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
                  className="h-[2.625rem] rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="grid gap-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                  Компания (необязательно)
                </div>
                <input
                  value={draft.company}
                  onChange={(e) => setDraft((p) => ({ ...p, company: e.target.value }))}
                  className="h-[2.625rem] rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                  placeholder="Название компании"
                />
              </label>
              <label className="grid gap-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">Email</div>
                <input
                  value={draft.email}
                  onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
                  className="h-[2.625rem] rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                  placeholder="name@company.com"
                />
              </label>
              <label className="grid gap-2">
                <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                  Telegram / телефон
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    value={draft.telegram}
                    onChange={(e) => setDraft((p) => ({ ...p, telegram: e.target.value }))}
                    className="h-[2.625rem] rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="@username"
                  />
                  <input
                    value={draft.phone}
                    onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
                    className="h-[2.625rem] rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:h-11 sm:px-4"
                    placeholder="+7 …"
                  />
                </div>
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-black/60">
                Сообщение (кратко)
              </div>
              <textarea
                value={draft.message}
                onChange={(e) => setDraft((p) => ({ ...p, message: e.target.value }))}
                className="min-h-[100px] resize-y rounded-[16px] border border-(--rais-border) bg-(--rais-surface) px-3.5 py-2.5 text-[14px] leading-6 text-black/90 outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:min-h-[110px] sm:px-4 sm:py-3 sm:leading-7"
                placeholder="Что вы хотите сделать и какой результат нужен?"
              />
            </label>

            {error ? (
              <div className="mt-3 text-[12px] leading-6 text-black/70">
                <span className="font-semibold text-black">Нужно поправить:</span> {error}
              </div>
            ) : null}

            <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
              <KeycapButton
                variant="primary"
                size="lg"
                className="h-[3.25rem] w-full px-5 text-[14px] tracking-[0.06em] sm:h-14 sm:w-auto sm:px-6 sm:text-[15px]"
                onClick={() => {
                  const hasContact =
                    draft.email.trim().length > 3 ||
                    draft.telegram.trim().length > 1 ||
                    draft.phone.trim().length > 6;
                  if (!hasContact) {
                    setError("укажите хотя бы один контакт: email, Telegram или телефон.");
                    return;
                  }
                  setError(null);
                  window.location.href = mailtoHref;
                }}
              >
                Отправить контакты
              </KeycapButton>
              <KeycapButton
                variant="ghost"
                size="lg"
                className="h-12 w-full px-5 text-[14px] sm:h-14 sm:w-auto sm:px-6 sm:text-[15px]"
                onClick={() => setOpen(false)}
              >
                Не сейчас
              </KeycapButton>
            </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

