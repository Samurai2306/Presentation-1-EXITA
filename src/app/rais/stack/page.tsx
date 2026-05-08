import type { Metadata } from "next";

import { raisStackOrbitPills, raisStackProjectTypes } from "@/mocks/raisStack";

import { RaisDivider } from "@/components/rais/RaisDivider";
import { RaisPanel, RaisPanelBody, RaisPanelHeader } from "@/components/rais/RaisPanel";
import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { RaisTag } from "@/components/rais/RaisTag";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { RaisGooDropdown } from "@/components/rais/RaisGooDropdown";

export const metadata: Metadata = {
  title: "EXITA RAIS — наш стек",
  description:
    "Технологии и инструменты EXITA RAIS по типам проектов: фронтенд, бэкенд, базы данных, инфраструктура, наблюдаемость, безопасность, аналитика, дизайн и QA.",
  alternates: {
    canonical: "/rais/stack",
  },
  openGraph: {
    title: "EXITA RAIS — наш стек",
    description:
      "Стек разработки по типам проектов и направлениям: frontend, backend, DB, infra, observability, security, analytics, design, QA.",
    type: "website",
    url: "/rais/stack",
    siteName: "EXITA",
  },
  twitter: {
    card: "summary",
    title: "EXITA RAIS — наш стек",
    description:
      "Стек разработки по типам проектов и направлениям: frontend, backend, DB, infra, observability, security, analytics, design, QA.",
  },
};

const categoryOrder = [
  "Frontend",
  "Backend",
  "Mobile",
  "DB",
  "Infra",
  "Observability",
  "Security",
  "Analytics",
  "AI",
  "Design",
  "QA",
] as const;

export default function RaisStackPage() {
  return (
    <div className="min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title="Наш стек"
          description={
            <>
              Здесь — наши рабочие наборы технологий по типам проектов. Это не “список моды”, а
              реальный набор, с которым мы умеем доводить до релиза и поддерживать.
            </>
          }
          right={
            <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:flex sm:flex-wrap sm:items-center sm:justify-end">
              <KeycapLink href="/rais" variant="ghost" size="sm" className="w-full sm:w-auto">
                ← RAIS
              </KeycapLink>
              <KeycapLink href="/rais/solve" variant="primary" size="sm" className="w-full sm:w-auto">
                Оформить запрос
              </KeycapLink>
            </div>
          }
        />

        <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <RaisPanel scheme="light">
              <RaisPanelHeader scheme="light">
                <div className="min-w-0">
                  <h2 className="text-[12px] font-medium tracking-wide text-(--app-text)">По типам проектов</h2>
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">структура</div>
              </RaisPanelHeader>
              <RaisPanelBody className="p-4 sm:p-5 lg:p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {raisStackProjectTypes.map((t) => (
                    <KeycapLink key={t.id} href={`/rais/stack#${t.id}`} variant="ghost" size="sm" className="w-full sm:w-auto">
                      {t.title}
                    </KeycapLink>
                  ))}
                </div>
                <div className="grid gap-3">
                  {raisStackProjectTypes.map((t) => (
                    <div key={t.id} id={t.id} className="scroll-mt-28">
                      <RaisGooDropdown
                        face={
                          <>
                            <span className="block text-balance text-[17px] font-semibold tracking-[-0.02em] text-(--app-text) sm:text-[18px]">
                              {t.title}
                            </span>
                            <span className="mt-2 block text-[13px] leading-6 sm:leading-7 text-(--app-text-2)">
                              {t.summary}
                            </span>
                            <span className="mt-3 block text-[12px] font-semibold text-(--app-text-3)">
                              <span className="inline-flex items-center gap-2">
                                <span className="rais-dd-hint-collapsed">Открыть направления</span>
                                <span className="rais-dd-hint-expanded">Свернуть</span>
                              </span>
                            </span>
                          </>
                        }
                      >
                        <div className="grid gap-3 md:grid-cols-2">
                          {(() => {
                            const byName = new Map(t.categories.map((c) => [c.name, c] as const));
                            return categoryOrder
                              .map((name) => byName.get(name))
                              .filter(Boolean)
                              .map((c) => (
                                <div
                                  key={c!.name}
                                  className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-3.5 sm:rounded-[18px] sm:p-5"
                                >
                                  <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                                    {c!.name}
                                  </div>
                                  <div className="mt-3 flex flex-wrap gap-1.5">
                                    {c!.items.map((x) => (
                                      <RaisTag
                                        key={x}
                                        scheme="light"
                                        className="px-2.5 py-1 text-[11px] leading-4"
                                      >
                                        {x}
                                      </RaisTag>
                                    ))}
                                  </div>
                                </div>
                              ));
                          })()}
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                          <KeycapLink href="/rais/solve" variant="primary" size="sm" className="w-full sm:w-auto">
                            Оформить запрос
                          </KeycapLink>
                          <KeycapLink href="/rais/projects" variant="ghost" size="sm" className="w-full sm:w-auto">
                            Наши проекты
                          </KeycapLink>
                        </div>
                      </RaisGooDropdown>
                    </div>
                  ))}
                </div>
              </RaisPanelBody>
            </RaisPanel>
          </div>

          <div className="lg:col-span-5">
            <RaisPanel scheme="light" className="overflow-hidden">
              <RaisPanelHeader scheme="light">
                <div className="min-w-0">
                  <h2 className="text-[12px] font-medium tracking-wide text-(--app-text)">Что это даёт</h2>
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">зачем</div>
              </RaisPanelHeader>
              <RaisPanelBody className="p-4 sm:p-5 lg:p-6">
                <div className="grid gap-3 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                  <div className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Прозрачность
                    </div>
                    <div className="mt-2">
                      Быстрее согласовываем решения: вы понимаете, на чём мы делаем проект и как он
                      будет поддерживаться.
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">Качество</div>
                    <div className="mt-2">
                      Мы выбираем инструменты под задачу: скорость разработки, стабильность, цена
                      владения и безопасность.
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-(--rais-border) bg-(--rais-surface) p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Совместимость
                    </div>
                    <div className="mt-2">
                      Если у вас уже есть команда — мы встраиваемся и адаптируемся, сохраняя
                      согласованность решений.
                    </div>
                  </div>
                </div>

                <RaisDivider scheme="light" className="my-6" />

                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                  Коротко про технологии
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {raisStackOrbitPills.map((x) => (
                    <RaisTag key={x} scheme="light" className="px-2.5 py-1 text-[11px] leading-4">
                      {x}
                    </RaisTag>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                  <KeycapLink href="/rais/solve" variant="primary" size="sm" className="w-full sm:w-auto">
                    Оформить запрос
                  </KeycapLink>
                  <KeycapLink href="/rais/projects" variant="ghost" size="sm" className="w-full sm:w-auto">
                    Наши проекты
                  </KeycapLink>
                </div>
              </RaisPanelBody>
            </RaisPanel>
          </div>
        </div>
      </div>

    </div>
  );
}

