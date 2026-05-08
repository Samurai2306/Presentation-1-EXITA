import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXITA RAIS — Редакторша (Contract X‑Ray)",
  description:
    "Анализ документов: подсветка рискованных формулировок, чек‑листы и понятные рекомендации. Быстрый вход для оценки качества текста.",
  openGraph: {
    title: "EXITA RAIS — Редакторша",
    description:
      "Анализ документов: риски, чек‑листы качества и рекомендации по корректировке формулировок.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

