import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXITA RAIS — AI-аналитика и автоматизация",
  description:
    "Deck-страница услуги AI-аналитики и автоматизации: от диагностики и модели данных до workflow, ROI и безопасного масштабирования.",
  keywords: [
    "AI-аналитика",
    "автоматизация бизнес-процессов",
    "внедрение AI",
    "ROI автоматизации",
    "цифровая трансформация",
    "данные и аналитика",
  ],
  alternates: {
    canonical: "/rais/analytics",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "EXITA RAIS — AI-аналитика и автоматизация",
    description:
      "Data + AI workflow для бизнеса: диагностика, автоматизация процессов, ROI-скетч и план внедрения.",
    type: "website",
    url: "/rais/analytics",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXITA RAIS — AI-аналитика и автоматизация",
    description:
      "AI-аналитика и автоматизация под задачи бизнеса: от диагностики и ROI до масштабирования.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

