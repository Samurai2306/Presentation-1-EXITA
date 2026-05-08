import type { Metadata } from "next";

import {
  raisFeaturedProjects,
  raisProjects,
} from "@/mocks/content";
import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { RaisProjectsCatalog } from "@/components/rais/RaisProjectsCatalog";

export const metadata: Metadata = {
  title: "EXITA RAIS — Наши проекты",
  description:
    "Проекты EXITA RAIS: избранное и полный каталог решений.",
  openGraph: {
    title: "EXITA RAIS — Наши проекты",
    description:
      "Каталог решений EXITA RAIS: избранные решения и полный список направлений.",
    type: "website",
  },
};

export default function RaisProjectsPage() {
  return (
    <div className="min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title={
            <>
              Наши проекты
              <span className="block text-(--app-text-2)">решения и направления</span>
            </>
          }
          description={
            <>
              Выберите подходящий вход: решение или направление. Дальше можно перейти в стек, кейсы
              или оформить запрос.
            </>
          }
        />

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <KeycapLink href="/rais" variant="ghost" size="md" className="w-full sm:w-auto">
            ← Вернуться в RAIS
          </KeycapLink>
          <KeycapLink href="/rais/analytics" variant="ghost" size="md" className="w-full sm:w-auto">
            AI-аналитика и автоматизация
          </KeycapLink>
          <KeycapLink href="/rais/stack" variant="ghost" size="md" className="w-full sm:w-auto">
            Наш стек
          </KeycapLink>
          <KeycapLink href="/rais/solve" variant="primary" size="md" className="w-full sm:w-auto">
            Оформить запрос
          </KeycapLink>
        </div>

        <RaisProjectsCatalog featured={raisFeaturedProjects} all={raisProjects} />
      </div>
    </div>
  );
}

