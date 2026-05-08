import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXITA RAIS — Я Живой (Health & Safety)",
  description:
    "Health & Safety интерфейс: интерактивные зоны, метрики и журнал событий SOS с подтверждением в интерфейсе.",
  openGraph: {
    title: "EXITA RAIS — Я Живой",
    description:
      "Health & Safety: интерактивные зоны и сценарий SOS с фиксацией событий в интерфейсе.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

