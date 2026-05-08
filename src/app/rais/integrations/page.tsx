import type { Metadata } from "next";

import { RaisSectionHeader } from "@/components/rais/RaisSectionHeader";
import { KeycapLink } from "@/components/ui/KeycapLink";

export const metadata: Metadata = {
  title: "EXITA RAIS — Integration Hub",
  description: "Витрина направления Integration Hub: коннекторы и интеграции.",
  openGraph: {
    title: "EXITA RAIS — Integration Hub",
    description: "Концепт коннекторов к сервисам и внутренним системам.",
    type: "website",
  },
};

export default function RaisIntegrationsPage() {
  return (
    <div className="min-h-svh bg-(--app-bg) text-(--app-fg)">
      <div className="mx-auto w-full max-w-[1720px] px-3 pb-20 pt-8 sm:px-5 sm:pb-24 sm:pt-10 lg:px-7 2xl:px-10">
        <RaisSectionHeader
          scheme="light"
          eyebrow="EXITA / RAIS"
          title={
            <>
              Integration Hub
              <span className="block text-(--app-text-2)">коннекторы к сервисам и системам</span>
            </>
          }
          description={
            <>
              Направление в статусе концепта: вебхуки, очереди, ETL и мониторинг; типовые сценарии
              подключения. Детали и соседние входы — в каталоге проектов и на главной RAIS.
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
          <KeycapLink href="/rais/analytics" variant="ghost" size="md">
            AI-аналитика
          </KeycapLink>
        </div>
      </div>
    </div>
  );
}
