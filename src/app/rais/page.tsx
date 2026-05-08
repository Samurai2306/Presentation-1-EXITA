import type { Metadata } from "next";
import Link from "next/link";

import {
  raisFeaturedCases,
  raisMicrozones,
  raisOffers,
} from "@/mocks/content";
import { RaisDivider } from "@/components/rais/RaisDivider";
import {
  RaisPanel,
  RaisPanelBody,
  RaisPanelHeader,
  RaisPanelTitle,
} from "@/components/rais/RaisPanel";
import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { RaisTag } from "@/components/rais/RaisTag";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { KeycapCardLink } from "@/components/ui/KeycapCardLink";
import { RaisContactsCta } from "@/components/rais/RaisContactsCta";
import { RaisGooDropdown } from "@/components/rais/RaisGooDropdown";
import { RaisStackOrb } from "@/components/rais/RaisStackOrb";
import { raisStackOrbitPills } from "@/mocks/raisStack";

export const metadata: Metadata = {
  title: "EXITA RAIS — IT‑продукты и инновации",
  description:
    "EXITA RAIS — команда разработки в группе EXITA. Делаем сайты, приложения, дизайн, автоматизации и интеграции. Покажем решения на примерах и поможем запустить ваш проект.",
  openGraph: {
    title: "EXITA RAIS",
    description:
      "Команда разработки в группе EXITA: сайты, приложения, дизайн, автоматизации. Кейсы и решения.",
    type: "website",
  },
};

const whyArguments = [
  {
    title: "Понятно с первого дня",
    description:
      "Вы понимаете, что будет сделано, в какие сроки и что получите на каждом этапе. Без «тумана» и бесконечных переделок.",
  },
  {
    title: "Быстро и аккуратно",
    description:
      "Делаем быстро, но не «на коленке»: фиксируем требования, проверяем качество, не оставляем незакрытых хвостов.",
  },
  {
    title: "Сильная инженерия",
    description:
      "Архитектура, производительность, безопасность, поддерживаемость — чтобы проект можно было развивать, а не переписывать.",
  },
] as const;

export default function RaisPage() {
  const heroProjects = raisMicrozones;
  const analyticsOffer = raisOffers.find((o) => o.id === "analytics");

  return (
    <div className="rais-dark-scope min-h-svh overflow-x-hidden bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        {/* Light RAIS landing: keep the “old” bright editorial feel */}

        {/* 0) Hero + CTA anchors (#cases, #projects) */}
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title={
            <>
              <span className="font-display inline-block tracking-[-0.01em] pr-3">
                RAIS
              </span>
              <span className="align-baseline">
                — разработка цифровых продуктов и сервисов
              </span>
              <span className="mt-3 block text-[12px] font-semibold leading-tight tracking-[-0.02em] text-(--app-text-2) sm:text-[16px] lg:text-[20px] 2xl:text-[24px]">
                САЙТЫ / ПРИЛОЖЕНИЯ / ДИЗАЙН / АВТОМАТИЗАЦИЯ / ИНТЕГРАЦИЯ
              </span>
            </>
          }
          description={
            <>
              Если вы ищете решение — поможем сформулировать задачу и предложим путь. Если вы
              профессионал — дадим понятные вводные, договоримся о процессе и доведём до релиза.
            </>
          }
        />

        <RaisContactsCta />

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-10 lg:gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RaisPanel scheme="light" className="relative overflow-hidden">
              <RaisPanelHeader scheme="light">
                <RaisPanelTitle scheme="light">Крупные проекты</RaisPanelTitle>
              </RaisPanelHeader>
              <RaisPanelBody>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {heroProjects.map((z, idx) => (
                    <KeycapCardLink
                      key={z.id}
                      href={z.href}
                      className="rounded-[16px] bg-[var(--rais-surface-solid)] p-4 hover:shadow-[0_18px_56px_rgba(0,0,0,0.14)] focus-visible:ring-(--app-focus) sm:rounded-[18px] sm:p-5"
                    >
                      <div className="flex items-baseline justify-between gap-6">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-(--app-text-3)">
                          /{String(idx + 1).padStart(2, "0")}
                        </div>
                        <div className="text-[11px] uppercase tracking-[0.24em] text-(--app-text-disabled)">
                          {z.id}
                        </div>
                      </div>
                      <div className="mt-3 text-balance text-[18px] font-semibold leading-[1.08] tracking-[-0.02em] text-(--app-text) sm:mt-4 sm:text-[20px]">
                        {z.title}
                      </div>
                      <div className="mt-2 text-[13px] leading-6 sm:leading-7 text-(--app-text-2)">
                        {z.subtitle}
                      </div>
                    </KeycapCardLink>
                  ))}
                </div>

                {analyticsOffer ? (
                  <div className="mt-4 rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-4 sm:rounded-[18px] sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-(--app-text-3)">
                          /offer
                        </div>
                        <div className="mt-3 text-balance text-[18px] font-semibold leading-[1.08] tracking-[-0.02em] text-(--app-text) sm:text-[20px]">
                          {analyticsOffer.title}
                        </div>
                        <div className="mt-2 text-[13px] leading-6 sm:leading-7 text-(--app-text-2)">
                          {analyticsOffer.subtitle}
                        </div>
                        {analyticsOffer.summary ? (
                          <div className="mt-3 text-[13px] leading-6 sm:leading-7 text-(--app-text-2)">
                            {analyticsOffer.summary}
                          </div>
                        ) : null}
                        {analyticsOffer.tags?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {analyticsOffer.tags.map((t) => (
                              <RaisTag key={t} scheme="light">
                                {t}
                              </RaisTag>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="shrink-0 sm:self-center">
                        <KeycapLink href={analyticsOffer.href} variant="primary" size="md">
                          Открыть раздел
                        </KeycapLink>
                      </div>
                    </div>
                  </div>
                ) : null}
              </RaisPanelBody>
            </RaisPanel>
          </div>

          <div className="lg:col-span-5">
            <div className="flex h-full flex-col items-center justify-center gap-4 p-2 sm:p-3">
              <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">Наш стек</div>
              <RaisStackOrb pills={raisStackOrbitPills} className="mx-auto w-full max-w-[430px]" />
            </div>
          </div>
        </div>

        {/* z-index: панель должна быть выше #why, иначе развёрнутый .rais-goo-dropdown окажется под следующей секцией */}
        <div className="relative z-20 mt-4 sm:mt-5">
          <RaisPanel scheme="light">
            <RaisPanelHeader scheme="light">
              <RaisPanelTitle scheme="light">О нас</RaisPanelTitle>
              <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                overview
              </div>
            </RaisPanelHeader>
            <RaisPanelBody>
              <div className="rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-4 sm:rounded-[18px] sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Обещание результата
                    </div>
                    <div className="mt-3 text-balance text-[17px] font-semibold leading-[1.1] tracking-[-0.02em] text-(--app-text) sm:text-[18px]">
                      Вы приходите с задачей — уходите с работающим решением.
                    </div>
                    <div className="mt-3 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                      Если вы не знаете, как “правильно назвать” — неважно. Мы переведём
                      задачу на понятный план: что делаем, когда покажем результат и как
                      будем принимать работу.
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:block">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-2 w-2 rounded-full bg-(--app-text-2)" aria-hidden />
                      <div className="h-2 w-2 rounded-full bg-(--app-separator-strong)" aria-hidden />
                      <div className="h-2 w-2 rounded-full bg-(--app-separator-strong)" aria-hidden />
                      <div className="h-2 w-2 rounded-full bg-(--app-separator-strong)" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 pb-12 md:grid-cols-2">
                <RaisGooDropdown
                  face={
                    <span className="text-[13px] font-semibold text-(--app-text)">
                      Кто мы и чем занимаемся
                    </span>
                  }
                >
                  <div className="text-[14px] leading-6 text-(--app-text-2) sm:leading-7">
                    Команда разработки в группе EXITA. Берём на себя продуктовую часть, дизайн
                    и инженерную реализацию — от первого прототипа до релиза и поддержки.
                  </div>
                </RaisGooDropdown>

                <RaisGooDropdown
                  face={
                    <span className="text-[13px] font-semibold text-(--app-text)">
                      Что вы получаете на выходе
                    </span>
                  }
                >
                  <ul className="grid gap-2 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                    <li>
                      <span className="font-medium text-(--app-text)">План работ</span> и приоритеты (что важно в первую очередь).
                    </li>
                    <li>
                      <span className="font-medium text-(--app-text)">Дизайн</span> и прототип (если нужен) — чтобы согласовать “как будет выглядеть”.
                    </li>
                    <li>
                      <span className="font-medium text-(--app-text)">Готовый продукт</span>: разработка, тестирование, релиз.
                    </li>
                    <li>
                      <span className="font-medium text-(--app-text)">Поддержка</span> и развитие: улучшения по данным и обратной связи.
                    </li>
                  </ul>
                </RaisGooDropdown>

                <RaisGooDropdown
                  face={
                    <span className="text-[13px] font-semibold text-(--app-text)">
                      Как мы работаем (4 шага)
                    </span>
                  }
                >
                  <ol className="grid gap-2.5 pl-5 marker:font-semibold marker:text-(--app-text) text-[14px] leading-6 text-(--app-text-2) sm:leading-7">
                    <li>Созвон и уточнение задачи (простыми словами).</li>
                    <li>Прототип/дизайн и согласование.</li>
                    <li>Разработка, тестирование и релиз.</li>
                    <li>Поддержка и развитие.</li>
                  </ol>
                </RaisGooDropdown>

                <RaisGooDropdown
                  face={
                    <span className="text-[13px] font-semibold text-(--app-text)">
                      Для бизнеса / Для команд
                    </span>
                  }
                >
                  <div className="text-[14px] leading-6 text-(--app-text-2) sm:leading-7">
                    <div>
                      <span className="font-medium text-(--app-text)">Для бизнеса</span> — быстро понять объём, сроки и бюджет, получить результат без погружения в термины.
                      <div className="mt-2 text-[12px] leading-[1.35rem] sm:leading-6 text-(--app-text-3)">
                        Пример: “Нужен сайт с заявками”, “Хотим приложение для клиентов”, “Надо автоматизировать заявки из почты/мессенджера”.
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium text-(--app-text)">Для профессионалов</span> — подключимся к вашей команде или возьмём модуль: дизайн, фронтенд, бэкенд, интеграции, тестирование, релиз‑процессы.
                      <div className="mt-2 text-[12px] leading-[1.35rem] sm:leading-6 text-(--app-text-3)">
                        Форматы: “усилить команду”, “сделать модуль”, “закрыть релиз/качество”.
                      </div>
                    </div>
                  </div>
                </RaisGooDropdown>
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </div>

        {/* 3) Why: аргументы + метрики (placeholders) */}
        <section
          id="why"
          className="relative mt-8 scroll-mt-24 sm:mt-10 lg:mt-12 2xl:mt-14"
          aria-labelledby="why-title"
        >
          <RaisSectionHeader
            as="h2"
            size="section"
            divider={false}
            scheme="light"
            eyebrow="/03 Why"
            title={<span id="why-title">Почему выбирают нас</span>}
            description={
              <>
                Мы говорим простыми словами и показываем результат. Метрики ниже —
                шаблоны: их заменим на ваши реальные цифры, когда появится статистика.
              </>
            }
          />

          <div className="mt-5 sm:mt-6">
            <RaisPanel scheme="light">
              <RaisPanelHeader scheme="light">
                <RaisPanelTitle scheme="light">Аргументы</RaisPanelTitle>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                  заметки
                </div>
              </RaisPanelHeader>
              <RaisPanelBody>
                <div className="flex flex-wrap items-start gap-3">
                  {whyArguments.map((a) => (
                    <div key={a.title} className="rais-goo-dropdown-wrap--notes">
                      <RaisGooDropdown
                        variant="notes"
                        face={
                          <>
                            <div className="text-[12px] font-semibold tracking-wide text-(--app-text)">
                              {a.title}
                            </div>
                            <div className="mt-3 text-[12px] font-semibold text-(--app-text-3)">
                              <span className="inline-flex items-center gap-2">
                                Подробнее
                                <span aria-hidden>›</span>
                              </span>
                            </div>
                          </>
                        }
                      >
                        <div className="rais-note-details-body text-[14px] leading-6 text-(--app-text-2) sm:leading-7">
                          <div className="rais-note-details-lead mb-3 text-[14px] leading-6 sm:leading-7 text-(--app-text)">
                            {a.description}
                          </div>
                          <div className="rais-note-callout rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-3.5 sm:p-4">
                            <div className="rais-note-callout-title text-[12px] font-semibold uppercase tracking-[0.14em] text-(--app-text-3)">
                              Что это означает на практике
                            </div>
                            <ul className="rais-note-callout-list mt-2 grid gap-1.5 text-[13px] leading-6 sm:leading-7">
                              <li>— фиксируем критерий готовности и план приёмки</li>
                              <li>— показываем прогресс и промежуточные результаты</li>
                              <li>— не уходим в лишние усложнения</li>
                            </ul>
                          </div>
                        </div>
                      </RaisGooDropdown>
                    </div>
                  ))}
                </div>

                <RaisDivider scheme="light" className="my-6" />
              </RaisPanelBody>
            </RaisPanel>
          </div>
        </section>

        {/* 4) Cases: крупные проекты (use raisFeaturedCases) */}
        <section
          id="cases"
          className="mt-12 scroll-mt-24 sm:mt-14 lg:mt-16 2xl:mt-20"
          aria-labelledby="cases-title"
        >
          <RaisSectionHeader
            as="h2"
            size="section"
            divider={false}
            scheme="light"
            eyebrow="/04 Cases"
            title={<span id="cases-title">Кейсы и решения</span>}
            description={
              <>
                Примеры задач и подходов: что было, что сделали и какой результат получили.
              </>
            }
          />

          <div className="mt-5 grid grid-cols-1 gap-3 pb-16 sm:mt-6 sm:gap-4 lg:grid-cols-2">
            {raisFeaturedCases.map((c) => (
              <RaisGooDropdown
                key={c.id}
                variant="case"
                face={
                  <>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      кейс
                    </div>
                    <div className="mt-3 text-balance text-[20px] font-semibold leading-[1.08] tracking-[-0.02em] text-(--app-text) sm:text-[22px]">
                      {c.title}
                    </div>
                    {c.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <RaisTag key={t} scheme="light">
                            {t}
                          </RaisTag>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-4 text-[12px] font-semibold text-(--app-text-3)">
                      <span className="inline-flex items-center gap-2">
                        Открыть детали
                        <span aria-hidden>›</span>
                      </span>
                    </div>
                  </>
                }
              >
                <div className="grid gap-3">
                  <div className="rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Что было
                    </div>
                    <div className="mt-2 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                      {c.problem}
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Что сделали
                    </div>
                    <div className="mt-2 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                      {c.solution}
                    </div>
                  </div>
                  <div className="rounded-[16px] border border-[var(--rais-border)] bg-[var(--rais-surface-solid)] p-4 sm:rounded-[18px] sm:p-5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">
                      Результат
                    </div>
                    <div className="mt-2 text-[14px] leading-6 sm:leading-7 text-(--app-text-2)">
                      {c.result}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <KeycapLink href="/rais/solve" variant="primary" size="sm">
                    Оформить запрос
                  </KeycapLink>
                  {c.href ? (
                    <KeycapLink href={c.href} variant="ghost" size="sm">
                      Открыть раздел
                    </KeycapLink>
                  ) : null}
                </div>
              </RaisGooDropdown>
            ))}
          </div>
        </section>

        {/* 5) Footer CTA: запрос/контакт (no integration) */}
        <section className="mt-12 sm:mt-14 lg:mt-16 2xl:mt-20">
          <RaisPanel scheme="light" className="overflow-hidden">
            <RaisPanelBody className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-(--app-text-3)">/06 Контакт</div>
                  <h2 className="mt-2 text-balance text-[26px] font-display font-semibold leading-[1.02] tracking-[-0.02em] text-(--app-text) sm:text-[30px] lg:text-[34px]">
                    Обсудить задачу или заказать разработку
                  </h2>
                  <div className="mt-4 max-w-3xl text-pretty text-[14px] leading-6 text-(--app-text-2) sm:text-[15px] sm:leading-7">
                    Можно начать без терминов и ТЗ: опишите проблему и желаемый результат —
                    мы зададим вопросы и предложим план.
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <RaisPanel scheme="light" variant="card">
                    <RaisPanelBody className="p-4 sm:p-5 lg:p-6">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
                        контакт
                      </div>
                      <div className="mt-3 grid gap-2 text-[13px] leading-7 text-(--app-text-2)">
                        <div>Старт: оформить запрос</div>
                        <div>Дальше: созвон → план работ → реализация</div>
                      </div>
                      <div className="mt-5 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                        <Link
                          href="/rais/projects"
                          className="btn--ghost key inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-semibold focus-visible:ring-(--app-focus) sm:w-auto"
                        >
                          Наши проекты
                        </Link>
                        <Link
                          href="/rais/redaktorsha"
                          className="btn--ghost key inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-semibold focus-visible:ring-(--app-focus) sm:w-auto"
                        >
                          Открыть проект
                        </Link>
                      </div>
                    </RaisPanelBody>
                  </RaisPanel>
                </div>
              </div>
            </RaisPanelBody>
          </RaisPanel>
        </section>
      </div>
    </div>
  );
}
