"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

import { RaisLandingTile } from "@/components/rais/RaisLandingTile";
import { RaisTag } from "@/components/rais/RaisTag";
import { KeycapButton } from "@/components/ui/KeycapButton";

type RaisProject = {
  id: string;
  title: string;
  subtitle: string;
  summary?: string;
  href: string;
  tags?: string[];
  status?: "pilot" | "concept" | string;
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function RaisProjectsCatalog({
  featured,
  all,
}: {
  featured: ReadonlyArray<RaisProject>;
  all: ReadonlyArray<RaisProject>;
}) {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState<"all" | "pilot" | "concept">("all");
  const [tag, setTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    return uniq(
      all
        .flatMap((p) => p.tags ?? [])
        .map((t) => t.trim())
        .filter(Boolean),
    ).sort((a, b) => a.localeCompare(b, "ru"));
  }, [all]);

  const filtered = React.useMemo(() => {
    const nq = normalize(q);
    return all.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (tag && !(p.tags ?? []).includes(tag)) return false;
      if (!nq) return true;
      const hay = [
        p.title,
        p.subtitle,
        p.summary ?? "",
        p.id,
        ...(p.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(nq);
    });
  }, [all, q, status, tag]);

  const pilot = filtered.filter((p) => p.status === "pilot");
  const concept = filtered.filter((p) => p.status === "concept");

  return (
    <div className="mt-7 grid gap-8 sm:mt-8 sm:gap-10">
      <div className="rounded-[18px] border border-(--rais-border) bg-(--rais-surface) p-4 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:rounded-[22px] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">Каталог</div>
            <div className="mt-2 text-balance text-[20px] font-semibold leading-[1.08] tracking-[-0.02em] text-black sm:text-[22px]">
              Найдите проект по задаче, технологии или формату
            </div>
            <div className="mt-2 text-[13px] leading-6 sm:leading-7 text-black/70">
              Поиск и фильтры работают локально — быстро и без лишних экранов.
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-[11px] uppercase tracking-[0.18em] text-black/55">Поиск</div>
            <input
              value={q}
              onChange={(e) => setQ(e.currentTarget.value)}
              placeholder="Например: интеграции, аналитика, Telegram, AI…"
              className={cn(
                "h-10.5 w-full rounded-[14px] border border-(--rais-border) bg-(--rais-surface) px-3.5 text-[14px] text-black/90 outline-none sm:h-11 sm:rounded-[16px] sm:px-4",
                "focus-visible:ring-2 focus-visible:ring-black/20",
              )}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <KeycapButton
            size="sm"
            variant={status === "all" ? "primary" : "ghost"}
            pressed={status === "all"}
            onClick={() => setStatus("all")}
          >
            Все
          </KeycapButton>
          <KeycapButton
            size="sm"
            variant={status === "pilot" ? "primary" : "ghost"}
            pressed={status === "pilot"}
            onClick={() => setStatus("pilot")}
          >
            Пилоты
          </KeycapButton>
          <KeycapButton
            size="sm"
            variant={status === "concept" ? "primary" : "ghost"}
            pressed={status === "concept"}
            onClick={() => setStatus("concept")}
          >
            Концепты
          </KeycapButton>

          {tag ? (
            <KeycapButton size="sm" variant="subtle" onClick={() => setTag(null)}>
              Сбросить тег
            </KeycapButton>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {allTags.slice(0, 18).map((t) => (
            <RaisTag
              key={t}
              scheme="light"
              selected={t === tag}
              onClick={() => setTag((prev) => (prev === t ? null : t))}
            >
              {t}
            </RaisTag>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 text-[13px] text-black/70 sm:flex sm:flex-wrap">
          <span className="key btn--ghost inline-flex h-9 items-center rounded-full px-3">
            Пилоты: <span className="ml-2 font-semibold text-black">{pilot.length}</span>
          </span>
          <span className="key btn--ghost inline-flex h-9 items-center rounded-full px-3">
            Концепты: <span className="ml-2 font-semibold text-black">{concept.length}</span>
          </span>
          <span className="key btn--ghost inline-flex h-9 items-center rounded-full px-3">
            Показано: <span className="ml-2 font-semibold text-black">{filtered.length}</span>
          </span>
        </div>
      </div>

      <section aria-labelledby="featured-title">
        <div className="text-[11px] uppercase tracking-[0.18em] text-black/55">/01 Избранное</div>
        <h2 id="featured-title" className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-black sm:text-[28px]">
          Избранные решения
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <RaisLandingTile
              key={p.id}
              title={p.title}
              subtitle={p.subtitle}
              meta="избранное"
              href={p.href}
              tags={p.tags}
              scheme="light"
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-title">
        <h2 id="all-title" className="text-[24px] font-semibold tracking-[-0.03em] text-black sm:text-[28px]">
          Все проекты
        </h2>

        <div className="mt-6 grid gap-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-black/55">Пилоты</div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pilot.map((p) => (
                <RaisLandingTile
                  key={p.id}
                  title={p.title}
                  subtitle={
                    <>
                      {p.subtitle}
                      {p.summary ? <span className="mt-2 block text-black/70">{p.summary}</span> : null}
                    </>
                  }
                  meta={p.id}
                  href={p.href}
                  tags={p.tags}
                  scheme="light"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-black/55">Концепты</div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {concept.map((p) => (
                <RaisLandingTile
                  key={p.id}
                  title={p.title}
                  subtitle={
                    <>
                      {p.subtitle}
                      {p.summary ? <span className="mt-2 block text-black/70">{p.summary}</span> : null}
                    </>
                  }
                  meta={p.id}
                  href={p.href}
                  tags={p.tags}
                  scheme="light"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

