"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUIState } from "@/lib/uiState";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type NavItem = {
  id: string;
  href: string;
  label: string;
  hint?: string;
  keywords?: readonly string[];
};

function NavRow({
  href,
  label,
  hint,
  onNavigate,
  active = false,
}: NavItem & { onNavigate?: () => void; tone: "dark" | "light"; active?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative flex flex-col rounded-[14px] border px-3 py-2.5 text-left transition-colors",
        "border-(--app-border) bg-(--app-surface) hover:border-(--app-border-strong) hover:bg-(--app-surface-strong)",
        "shadow-[0_10px_24px_rgba(0,0,0,0.04)]",
        active &&
          "border-(--app-border-strong) bg-(--app-surface-strong)",
      )}
    >
      <span className="text-[13px] font-semibold text-(--app-fg)">{label}</span>
      {hint ? (
        <span className="mt-0.5 text-[11px] text-(--app-fg-muted)">{hint}</span>
      ) : null}
    </Link>
  );
}

function MiniNavButton({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  tone: "dark" | "light";
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors",
        "border-(--app-border) bg-(--app-surface) text-(--app-fg-muted)",
        "hover:border-(--app-border-strong) hover:bg-(--app-surface-strong) hover:text-(--app-fg)",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-(--app-focus)",
      )}
    >
      {label}
    </Link>
  );
}

function CollapseSection({
  title,
  defaultOpen = false,
  children,
  ribbon,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  tone: "dark" | "light";
  ribbon: "exita" | "nep" | "rais";
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const ribbonClass =
    ribbon === "nep"
      ? "bg-[#0b2a5a]"
      : ribbon === "rais"
        ? "bg-[#7a1e2c]"
        : "bg-[#7c3aed]";
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "relative py-1",
        "border-b border-(--app-border)",
      )}
    >
      <div aria-hidden className={cn("absolute left-1 top-3 h-[calc(100%-1.25rem)] w-1.5 rounded-full opacity-90", ribbonClass)} />
      <Collapsible.Trigger
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-2 py-2.5 pl-4 text-left text-[12px] font-semibold uppercase tracking-[0.12em] outline-none focus-visible:ring-2",
          "text-(--app-fg-muted) hover:bg-(--app-surface) focus-visible:ring-(--app-focus)",
        )}
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            "text-(--app-fg-subtle)",
            open && "rotate-180",
          )}
        />
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=closed]:hidden">
        <div className="flex flex-col gap-1.5 px-1 pb-3 pt-1 pl-4">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export function ProjectNavSheet() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const zone = useUIState((s) => s.zone);
  const appTheme = useUIState((s) => s.theme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // `zustand/persist` может восстановить тему/зону до гидрации → mismatch с SSR.
  // Стабилизируем SSR/первый клиентский рендер (light + concierge), затем переключаемся после mount.
  const tone: "dark" | "light" = mounted && appTheme === "dark" ? "dark" : "light";

  const sections = React.useMemo(() => {
    const entry: NavItem[] = [
      {
        id: "concierge",
        href: "/",
        label: "Цифровой консьерж",
        hint: "вход и маршруты",
        keywords: ["главная", "чат", "консьерж"],
      },
      {
        id: "exita",
        href: "/exita",
        label: "Экзита",
        hint: "экосистема, зоны и входы",
        keywords: ["компания", "миссия"],
      },
    ];

    const quick: NavItem[] = [
      { id: "rais-request", href: "/rais/solve", label: "Оформить запрос", hint: "выбор сценария и оформление", keywords: ["заявка", "заказ"] },
      { id: "rais-projects", href: "/rais/projects", label: "Все кейсы (RAIS)", hint: "витрина и сценарии", keywords: ["витрина", "проекты", "кейсы"] },
      { id: "rais-stack", href: "/rais/stack", label: "Наш стек", hint: "технологии по типам проектов", keywords: ["технологии", "stack"] },
      { id: "rais-analytics", href: "/rais/analytics", label: "AI-аналитика и автоматизация", hint: "персонализированное решение под бизнес", keywords: ["аналитика", "BI", "автоматизация", "AI"] },
    ];

    const nep: NavItem[] = [
      { id: "nep", href: "/nep", label: "EXITA Н.Э.П.", hint: "экспертиза, кейсы, таймлайн", keywords: ["право", "экспертиза"] },
    ];

    const it: NavItem[] = [
      { id: "rais", href: "/rais", label: "IT разработка (RAIS)", hint: "обзор, решения и входы", keywords: ["it", "разработка", "rais"] },
    ];

    const projects: NavItem[] = [
      { id: "r-redaktorsha", href: "/rais/redaktorsha", label: "Редакторша", hint: "AI‑анализ документов", keywords: ["документы", "скан", "договор"] },
      { id: "r-ya", href: "/rais/ya-zhivoy", label: "Я Живой", hint: "здоровье и безопасность", keywords: ["hse", "sos"] },
      { id: "r-analytics", href: "/rais/analytics", label: "AI-аналитика и автоматизация", hint: "данные, BI, автоматизация процессов", keywords: ["AI", "BI", "аналитика", "автоматизация"] },
    ];

    return { entry, quick, nep, it, projects };
  }, []);

  const filtered = sections;

  const activeHref =
    (mounted ? zone : "concierge") === "concierge"
      ? "/"
        : (mounted ? zone : "concierge") === "nep"
          ? "/nep"
          : (mounted ? zone : "concierge") === "rais"
            ? "/rais"
            : (mounted ? zone : "concierge") === "rais_redaktorsha"
              ? "/rais/redaktorsha"
              : (mounted ? zone : "concierge") === "rais_ya_zhivoy"
                ? "/rais/ya-zhivoy"
                : "/rais/analytics";
  const isRedaktorsha = pathname === "/rais/redaktorsha";

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {open ? (
        <Dialog.Close asChild>
          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--app-border) bg-(--app-surface) text-(--app-fg) shadow-(--app-shadow-2)",
              isRedaktorsha && "h-9 w-9 rounded-lg",
              "transition-colors hover:border-(--app-border-strong) hover:bg-(--app-surface-strong)",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--app-focus)",
            )}
            aria-label="Закрыть меню навигации"
            aria-expanded
          >
            <span className="relative h-5 w-5">
              <span className="absolute left-1/2 top-1/2 h-0.5 w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current transition duration-200 motion-reduce:transition-none" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-[18px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current transition duration-200 motion-reduce:transition-none" />
            </span>
          </button>
        </Dialog.Close>
      ) : (
        <Dialog.Trigger asChild>
          <button
            type="button"
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--app-border) bg-(--app-surface) text-(--app-fg) shadow-(--app-shadow-2)",
              isRedaktorsha && "h-9 w-9 rounded-lg",
              "transition-colors hover:border-(--app-border-strong) hover:bg-(--app-surface-strong)",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--app-focus)",
            )}
            aria-label="Открыть меню навигации"
            aria-expanded={false}
          >
            <span className="relative h-5 w-5">
              <span className="absolute left-1/2 top-[3px] h-0.5 w-[18px] -translate-x-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 top-1/2 h-0.5 w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
              <span className="absolute left-1/2 bottom-[3px] h-0.5 w-[18px] -translate-x-1/2 rounded-full bg-current" />
            </span>
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-200 backdrop-blur-sm",
            tone === "dark" ? "bg-(--app-overlay)" : "bg-(--app-overlay)",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 left-0 z-201 flex w-[min(100vw-48px,420px)] flex-col border-r pt-14 shadow-2xl",
            "border-(--app-border) bg-(--app-surface) backdrop-blur-xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-4 data-[state=open]:slide-in-from-left-4 duration-200",
          )}
        >
          <Dialog.Description className="absolute -m-px h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap">
            Дерево разделов: консьерж, Global, Н.Э.П., IT разработка и проекты.
          </Dialog.Description>
          <div
            className={cn(
              "flex items-center justify-between border-b px-4 py-4",
              "border-(--app-border)",
            )}
          >
            <div>
              <Dialog.Title className="text-base font-semibold tracking-tight text-(--app-fg)">
                Навигация EXITA
              </Dialog.Title>
              <p className="mt-1 text-[12px] leading-snug text-(--app-fg-muted)">
                Быстрый переход по разделам и продуктам.
              </p>
            </div>
            <div className="shrink-0">
              <ThemeToggle className="theme-toggle theme-toggle--nav" />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
            <div className="relative mb-4 px-1">
              <div aria-hidden className="absolute left-1 top-2 h-[calc(100%-0.5rem)] w-1.5 rounded-full bg-[#7c3aed] opacity-90" />
              <div className="flex flex-col gap-2 pl-4">
                {filtered.entry.map((i) => (
                  <NavRow key={i.id} tone={tone} {...i} active={activeHref === i.href} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </div>

            <div className="my-4 mx-1 h-px bg-(--app-border)" />

            <CollapseSection tone={tone} title="EXITA Н.Э.П." defaultOpen ribbon="nep">
              <div className="flex flex-col gap-1.5">
                {filtered.nep.map((i) => (
                  <NavRow key={i.id} tone={tone} {...i} active={activeHref === i.href} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </CollapseSection>

            <CollapseSection tone={tone} title="IT разработка (RAIS)" defaultOpen ribbon="rais">
              <div className="flex flex-col gap-1.5">
                {filtered.it.map((i) => (
                  <NavRow key={i.id} tone={tone} {...i} active={activeHref === i.href} onNavigate={() => setOpen(false)} />
                ))}
                <div className="flex flex-wrap gap-2 pb-2 pt-1">
                  <MiniNavButton tone={tone} href="/rais/projects" label="Все кейсы" onNavigate={() => setOpen(false)} />
                  <MiniNavButton tone={tone} href="/rais/solve" label="Нужна разработка" onNavigate={() => setOpen(false)} />
                  <MiniNavButton tone={tone} href="/rais/stack" label="Наш стек" onNavigate={() => setOpen(false)} />
                </div>
              </div>
            </CollapseSection>

            <CollapseSection tone={tone} title="Наши проекты" defaultOpen ribbon="rais">
              <div className="flex flex-col gap-1.5">
                {filtered.projects.map((i) => (
                  <NavRow key={i.id} tone={tone} {...i} active={activeHref === i.href} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            </CollapseSection>
          </nav>

          <div className="border-t border-(--app-border) px-4 py-3">
            <div className="text-[11px] leading-relaxed text-(--app-fg-subtle)">
              Закрыть меню можно кнопкой в верхнем левом углу, кликом по фону или клавишей Esc.
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
