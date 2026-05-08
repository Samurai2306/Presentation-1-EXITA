import type { Metadata } from "next";

import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { KeycapLink } from "@/components/ui/KeycapLink";

export const metadata: Metadata = {
  title: "EXITA RAIS — Semantic Search",
  description: "Витрина направления Semantic Search: поиск по базе знаний с цитатами и ссылками.",
  openGraph: {
    title: "EXITA RAIS — Semantic Search",
    description: "Концепт семантического поиска по документам и базе знаний.",
    type: "website",
  },
};

export default function RaisSearchPage() {
  return (
    <div className="min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title={
            <>
              Semantic Search
              <span className="block text-(--app-text-2)">поиск по базе знаний и документам</span>
            </>
          }
          description={
            <>
              Направление в статусе концепта: единый индекс, приоритеты источников, ответы с цитатами на
              первоисточник. Полный список решений — в каталоге проектов.
            </>
          }
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <KeycapLink href="/rais/projects" variant="primary" size="md">
            ← Все проекты RAIS
          </KeycapLink>
          <KeycapLink href="/rais/stack" variant="ghost" size="md">
            Наш стек
          </KeycapLink>
          <KeycapLink href="/rais/solve" variant="ghost" size="md">
            Оформить запрос
          </KeycapLink>
        </div>
      </div>
    </div>
  );
}
