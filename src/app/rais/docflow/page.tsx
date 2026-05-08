import type { Metadata } from "next";

import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { KeycapLink } from "@/components/ui/KeycapLink";

export const metadata: Metadata = {
  title: "EXITA RAIS — DocFlow",
  description: "Витрина направления DocFlow: маршрутизация и контроль жизненного цикла документов.",
  openGraph: {
    title: "EXITA RAIS — DocFlow",
    description: "Концепт маршрутизации документов и контроля этапов.",
    type: "website",
  },
};

export default function RaisDocflowPage() {
  return (
    <div className="min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title={
            <>
              DocFlow
              <span className="block text-(--app-text-2)">маршрутизация и контроль документов</span>
            </>
          }
          description={
            <>
              Направление в статусе концепта на витрине проектов: статусы и роли, версии, SLA и прозрачность
              этапов согласования. Здесь — краткий экран входа; полный каталог — в разделе проектов.
            </>
          }
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <KeycapLink href="/rais/projects" variant="primary" size="md">
            ← Все проекты RAIS
          </KeycapLink>
          <KeycapLink href="/rais" variant="ghost" size="md">
            Обзор RAIS
          </KeycapLink>
          <KeycapLink href="/rais/solve" variant="ghost" size="md">
            Оформить запрос
          </KeycapLink>
        </div>
      </div>
    </div>
  );
}
