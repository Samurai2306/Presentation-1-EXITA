import type { Metadata } from "next";

import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { SolveEntry } from "@/components/rais/SolveEntry";
import { KeycapLink } from "@/components/ui/KeycapLink";

export const metadata: Metadata = {
  title: "EXITA RAIS — Оформить запрос",
  description:
    "Быстрый вход в разработку: опишите задачу, выберите сценарий и получите понятный следующий шаг. Данные остаются в вашем браузере.",
  openGraph: {
    title: "EXITA RAIS — Оформить запрос",
    description:
      "Опишите задачу и получите понятный следующий шаг: формат, план и оценка объёма.",
    type: "website",
  },
};

export default function RaisSolvePage() {
  return (
    <div className="rais-dark-scope min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8 2xl:px-12">
        <RaisSectionHeader
          scheme="light"
          size="section"
          eyebrow="EXITA / RAIS"
          title={
            <>
              <span className="block text-balance text-[34px] leading-[0.96] tracking-[-0.04em] sm:text-[48px] lg:text-[56px]">
                Оформить запрос
              </span>
              <span className="mt-3 block text-balance text-[16px] font-semibold leading-[1.15] tracking-[-0.02em] text-(--app-text-2) sm:text-[20px] lg:text-[22px]">
                Опишите задачу → получите маршрут → сделаем следующий шаг
              </span>
            </>
          }
          description={
            <>
              Выберите сценарий и заполните короткое описание задачи. Его можно сразу отправить или
              сохранить.
              Все данные остаются у вас в браузере: ничего не уходит на сервер автоматически.
            </>
          }
          right={
            <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:flex sm:flex-wrap">
              <KeycapLink href="/rais" variant="ghost" size="sm" className="w-full sm:w-auto">
                ← RAIS
              </KeycapLink>
              <KeycapLink href="/rais/projects" variant="ghost" size="sm" className="w-full sm:w-auto">
                Проекты
              </KeycapLink>
            </div>
          }
        />

        <div className="mt-10 sm:mt-12">
          <SolveEntry />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:flex sm:flex-wrap sm:gap-4">
          <KeycapLink href="/rais" variant="primary" size="md" className="w-full sm:w-auto">
            ← Вернуться к RAIS
          </KeycapLink>
          <KeycapLink href="/rais/projects" variant="ghost" size="md" className="w-full sm:w-auto">
            Наши проекты
          </KeycapLink>
          <KeycapLink href="/" variant="ghost" size="md" className="w-full sm:w-auto">
            Перейти в EXITA (главная)
          </KeycapLink>
        </div>
      </div>
    </div>
  );
}

