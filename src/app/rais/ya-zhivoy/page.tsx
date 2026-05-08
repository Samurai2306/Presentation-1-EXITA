"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";

import { cn } from "@/lib/cn";
import { useUIState } from "@/lib/uiState";
import { RaisMicrozoneShell } from "@/components/rais/RaisMicrozoneShell";
import { raisMicrozoneThemes } from "@/mocks/raisMicrozoneThemes";
import { RaisDivider } from "@/components/rais/RaisDivider";
import {
  RaisPanel,
  RaisPanelBody,
  RaisPanelHeader,
  RaisPanelTitle,
} from "@/components/rais/RaisPanel";
import { RaisTag } from "@/components/rais/RaisTag";

type BodyZone = "head" | "heart" | "lungs" | "stomach";

const zones: Record<BodyZone, { label: string; metrics: string[] }> = {
  head: { label: "Голова", metrics: ["стресс", "сон", "внимание"] },
  heart: { label: "Сердце", metrics: ["пульс", "HRV", "нагрузка"] },
  lungs: { label: "Лёгкие", metrics: ["дыхание", "SpO₂", "восстановление"] },
  stomach: { label: "Корпус", metrics: ["усталость", "гидратация", "температура"] },
};

const levels: Record<BodyZone, { level: "норма" | "внимание" | "риск"; note: string }> = {
  head: { level: "внимание", note: "Повышенный стресс · сон ниже нормы" },
  heart: { level: "норма", note: "Стабильно · без критичных сигналов" },
  lungs: { level: "норма", note: "Ровное дыхание · восстановление ок" },
  stomach: { level: "внимание", note: "Усталость выше среднего · нужна пауза" },
};

const pins: Array<{
  zone: BodyZone;
  label: string;
  position: string;
}> = [
  { zone: "head", label: "Голова", position: "left-[54%] top-[18%]" },
  { zone: "heart", label: "Сердце", position: "left-[48%] top-[40%]" },
  { zone: "lungs", label: "Лёгкие", position: "left-[58%] top-[38%]" },
  { zone: "stomach", label: "Корпус", position: "left-[50%] top-[56%]" },
];

export default function YaZhivoyPage() {
  const patchContext = useUIState((s) => s.patchContext);
  const [active, setActive] = React.useState<BodyZone>("heart");
  const [sos, setSos] = React.useState<"idle" | "sending" | "sent">("idle");
  const [cooldown, setCooldown] = React.useState(0);
  const [sosLog, setSosLog] = React.useState<Array<{ id: string; at: number; zone: BodyZone }>>([]);

  React.useEffect(() => {
    patchContext({ intent: "health", productHint: "Я Живой" });
  }, [patchContext]);

  const activeZone = zones[active];
  const activeLevel = levels[active];

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem("exita_sos_log");
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return;
      const safe = parsed
        .map((x) => {
          if (!x || typeof x !== "object") return null;
          const obj = x as { id?: unknown; at?: unknown; zone?: unknown };
          if (typeof obj.id !== "string") return null;
          if (typeof obj.at !== "number") return null;
          if (obj.zone !== "head" && obj.zone !== "heart" && obj.zone !== "lungs" && obj.zone !== "stomach") return null;
          return { id: obj.id, at: obj.at, zone: obj.zone } as const;
        })
        .filter(Boolean) as Array<{ id: string; at: number; zone: BodyZone }>;
      setSosLog(safe);
    } catch {
      // ignore malformed local storage
    }
  }, []);

  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => window.clearInterval(t);
  }, [cooldown]);

  return (
    <RaisMicrozoneShell
      title="Я Живой"
      subtitle="HSE / безопасность"
      description={
        <>
          HSE / безопасность: интерактивные зоны, метрики и “кнопка спокойствия”. SOS фиксируется в
          журнале событий прямо в интерфейсе.
        </>
      }
      accent="H&S"
      code="/MZ_01"
      scheme="light"
      theme={raisMicrozoneThemes.rais_ya_zhivoy}
    >
      <div className="lg:col-span-7">
        <RaisPanel scheme="light">
          <RaisPanelHeader>
            <RaisPanelTitle>Зеркало состояния</RaisPanelTitle>
            <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
              интерактив
            </div>
          </RaisPanelHeader>

          <RaisPanelBody>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="mx-auto w-full max-w-[340px]">
                <div className="relative flex aspect-3/4 items-center justify-center rounded-[18px] border border-(--app-separator) bg-(--app-surface-2)">
                  <div className="absolute inset-0 overflow-hidden rounded-[18px]" aria-hidden>
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background:
                          "radial-gradient(420px 260px at 50% 20%, var(--exita-ambient), transparent 70%)",
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(0,0,0,0.06),transparent_60%)]" />
                  </div>

                  <div className="relative h-[82%] w-[54%] rounded-[999px] border border-(--app-separator) bg-(--app-surface-3)" />

                  {pins.map((pin) => {
                    const isActive = active === pin.zone;
                    return (
                      <button
                        key={pin.zone}
                        type="button"
                        onClick={() => setActive(pin.zone)}
                        className={cn(
                          "absolute -translate-x-1/2 rounded-full border transition-colors",
                          "h-4 w-4",
                          pin.position,
                          isActive
                            ? "border-(--app-stroke-strong) bg-(--app-surface-inset) shadow-[0_0_0_6px_color-mix(in_srgb,var(--app-separator-subtle)_72%,transparent)]"
                            : "border-(--app-separator-strong) bg-(--app-surface-3) hover:border-(--app-stroke) hover:bg-(--app-surface-inset)",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--app-focus)",
                        )}
                        aria-label={pin.label}
                      />
                    );
                  })}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pins.map((pin) => (
                    <RaisTag
                      key={pin.zone}
                      onClick={() => setActive(pin.zone)}
                      selected={active === pin.zone}
                      scheme="light"
                    >
                      {pin.label}
                    </RaisTag>
                  ))}
                </div>

                <div className="mt-4 rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-(--app-text-3)">
                      Уровень
                    </div>
                    <div
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em]",
                        activeLevel.level === "норма"
                          ? "border-(--app-separator) bg-(--app-surface-3) text-(--app-text-2)"
                          : activeLevel.level === "внимание"
                            ? "border-(--app-separator-strong) bg-(--app-surface-inset) text-(--app-text)"
                            : "border-(--app-stroke) bg-(--app-surface-inset) text-(--app-text)",
                      )}
                    >
                      {activeLevel.level}
                    </div>
                  </div>
                  <div className="mt-2 text-[12px] leading-6 text-(--app-text-2)">{activeLevel.note}</div>
                </div>
              </div>

              <div className="rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                      {activeZone.label}
                    </div>
                    <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">Показатели</div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                      v1
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-2">
                  {activeZone.metrics.map((m, i) => (
                    <div
                      key={m}
                      className="rounded-[14px] border border-(--app-separator) bg-(--app-surface-3) px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-[12px] font-medium text-(--app-text)">{m}</div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                          {activeLevel.level === "норма"
                            ? "ok"
                            : activeLevel.level === "внимание"
                              ? i % 2 === 0
                                ? "warn"
                                : "ok"
                              : "risk"}
                        </div>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full border border-(--app-separator) bg-(--app-surface-2)">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--exita-accent),transparent)]"
                          style={{
                            width:
                              activeLevel.level === "норма"
                                ? `${72 - i * 8}%`
                                : activeLevel.level === "внимание"
                                  ? `${58 - i * 10}%`
                                  : `${40 - i * 10}%`,
                            opacity: 0.75,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <RaisDivider className="my-5" />
                <div className="text-[12px] leading-6 text-(--app-text-3)">
                  Можно расширять: 3D‑сцена, роли, маршрутизация дежурным и интеграции по контуру заказчика.
                </div>
              </div>
            </div>
          </RaisPanelBody>
        </RaisPanel>
      </div>

      <div className="lg:col-span-5">
        <RaisPanel scheme="light">
          <RaisPanelHeader>
            <RaisPanelTitle>Кнопка спокойствия</RaisPanelTitle>
            <ShieldAlert className="h-4 w-4 text-(--app-text-3)" />
          </RaisPanelHeader>
          <RaisPanelBody>
            <div className="text-[13px] leading-7 text-(--app-text-2)">
              SOS создаёт событие и добавляет его в журнал (сохранение в браузере). При подключении контура —
              уходит в API/дежурному с подтверждением доставки.
            </div>
            <button
              type="button"
              onClick={() => {
                if (sos !== "idle") return;
                setSos("sending");
                setCooldown(6);
                const entry = { id: `sos-${Date.now()}`, at: Date.now(), zone: active };
                setSosLog((prev) => {
                  const next = [entry, ...prev].slice(0, 8);
                  try {
                    window.localStorage.setItem("exita_sos_log", JSON.stringify(next));
                  } catch {
                    // ignore storage errors
                  }
                  return next;
                });
                window.setTimeout(() => setSos("sent"), 650);
                window.setTimeout(() => {
                  setSos("idle");
                  setCooldown(0);
                }, 4200);
              }}
              className={cn(
                "mt-6 w-full rounded-[16px] border border-(--app-separator) bg-(--app-surface-3) px-5 py-4 text-[13px] font-medium text-(--app-text)",
                "hover:border-(--app-stroke) hover:bg-(--app-surface-2) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--app-focus)",
                sos !== "idle" && "opacity-80",
              )}
            >
              {sos === "idle" ? "Отправить тестовый SOS" : sos === "sending" ? "Отправка…" : "Отправлено"}
            </button>
            {sos !== "idle" ? (
              <div className="mt-4 rounded-[18px] border border-(--app-separator) bg-(--app-surface-2) p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                    статус
                  </div>
                  <RaisTag selected scheme="light">
                    {sos === "sending" ? "в очереди" : "подтверждено"}
                  </RaisTag>
                </div>
                <div className="mt-3 grid gap-1.5 text-[12px] leading-6 text-(--app-text-2)">
                  <div className="flex items-center justify-between gap-3">
                    <span>1) Сформировать событие</span>
                    <span className="text-(--app-text-3)">локально</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>2) Отправить дежурному</span>
                    <span className="text-(--app-text-3)">{sos === "sending" ? "…" : "ok"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>3) Показать next‑step</span>
                    <span className="text-(--app-text-3)">{sos === "sent" ? "окно действий" : "…"}</span>
                  </div>
                </div>
                {sosLog.length ? (
                  <div className="mt-4 rounded-[16px] border border-(--app-separator) bg-(--app-surface-3) p-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">Журнал</div>
                    <div className="mt-2 grid gap-1.5 text-[12px] leading-6 text-(--app-text-2)">
                      {sosLog.slice(0, 4).map((e) => (
                        <div key={e.id} className="flex items-center justify-between gap-3">
                          <span>
                            SOS · {zones[e.zone].label}
                          </span>
                          <span className="text-(--app-text-3)">
                            {new Date(e.at).toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {cooldown > 0 ? (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                      авто‑закрытие · {cooldown}s
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-(--app-separator) bg-(--app-surface-3) px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-(--app-text-2) hover:border-(--app-stroke) hover:bg-(--app-surface-2)"
                      onClick={() => {
                        setSos("idle");
                        setCooldown(0);
                      }}
                    >
                      Закрыть
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </RaisPanelBody>
        </RaisPanel>
      </div>
    </RaisMicrozoneShell>
  );
}

