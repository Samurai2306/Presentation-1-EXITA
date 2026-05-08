export type RaisStackCategory =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DB"
  | "Infra"
  | "Observability"
  | "Security"
  | "Analytics"
  | "QA"
  | "Design"
  | "AI";

export type RaisStackProjectType = {
  id: string;
  title: string;
  summary: string;
  categories: Array<{
    name: RaisStackCategory;
    items: string[];
  }>;
};

export const raisStackProjectTypes: RaisStackProjectType[] = [
  {
    id: "web",
    title: "Веб‑продукты и личные кабинеты",
    summary: "Маркетинговые сайты, веб‑приложения, кабинеты, админки, B2B‑порталы.",
    categories: [
      {
        name: "Frontend",
        items: [
          "TypeScript",
          "React",
          "Next.js",
          "Vite",
          "Tailwind CSS",
          "shadcn/ui",
          "Radix UI",
          "Framer Motion",
        ],
      },
      {
        name: "Backend",
        items: ["Node.js", "NestJS", "tRPC (по необходимости)", "REST/GraphQL"],
      },
      {
        name: "DB",
        items: ["PostgreSQL", "Redis", "Prisma", "Drizzle (по необходимости)"],
      },
      {
        name: "Infra",
        items: ["Vercel", "Docker", "CI/CD (GitHub Actions)"],
      },
      {
        name: "Observability",
        items: ["Sentry (ошибки + performance)", "Логи (структурированные)"],
      },
      {
        name: "Security",
        items: ["Auth (session/JWT)", "RBAC (роли и доступы)", "OWASP базовые практики"],
      },
      {
        name: "QA",
        items: ["Playwright", "Vitest/Jest", "ESLint", "TypeScript checks"],
      },
      {
        name: "Design",
        items: ["Figma", "UI‑kit / дизайн‑система", "UX‑прототипирование"],
      },
    ],
  },
  {
    id: "mobile",
    title: "Мобильные приложения",
    summary: "iOS/Android, MVP и production‑приложения, приложения для сотрудников/клиентов.",
    categories: [
      {
        name: "Mobile",
        items: ["React Native", "Expo", "TypeScript"],
      },
      {
        name: "Backend",
        items: ["Node.js", "NestJS", "REST"],
      },
      {
        name: "DB",
        items: ["PostgreSQL", "Redis"],
      },
      {
        name: "Infra",
        items: ["Docker", "CI/CD"],
      },
      {
        name: "Observability",
        items: ["Sentry (crash + errors)", "Логи (по необходимости)"],
      },
      {
        name: "Security",
        items: ["Auth (session/JWT)", "Безопасное хранение секретов", "Права доступа"],
      },
      {
        name: "Design",
        items: ["Figma", "UX‑флоу", "Дизайн‑система (если нужна)"],
      },
      {
        name: "QA",
        items: ["E2E сценарии (ключевые)", "TypeScript checks", "ESLint"],
      },
    ],
  },
  {
    id: "integrations",
    title: "Интеграции, автоматизации, боты",
    summary: "Связка сервисов, обработка заявок, документооборот, Telegram‑боты, интеграции CRM.",
    categories: [
      {
        name: "Backend",
        items: ["Node.js", "NestJS", "Webhooks", "Очереди задач (BullMQ/Redis)"],
      },
      {
        name: "DB",
        items: ["PostgreSQL", "Redis"],
      },
      {
        name: "Infra",
        items: ["Docker", "CI/CD"],
      },
      {
        name: "Observability",
        items: ["Sentry (по необходимости)", "Метрики и алерты (по необходимости)"],
      },
      {
        name: "Security",
        items: ["Подписи webhook (если есть)", "Idempotency keys", "Секреты и доступы"],
      },
      {
        name: "QA",
        items: ["Contract checks (по необходимости)", "E2E сценарии"],
      },
    ],
  },
  {
    id: "data",
    title: "Аналитика и данные",
    summary: "Сбор событий, отчёты, витрины данных, дашборды, измеримые KPI и конверсии.",
    categories: [
      {
        name: "Analytics",
        items: ["Event tracking", "A/B (по необходимости)", "BI dashboards"],
      },
      {
        name: "Backend",
        items: ["ETL/ELT пайплайны", "API для отчётов"],
      },
      {
        name: "DB",
        items: ["PostgreSQL", "ClickHouse (по необходимости)"],
      },
      {
        name: "Infra",
        items: ["Docker", "CI/CD"],
      },
      {
        name: "Observability",
        items: ["Логи пайплайнов", "Мониторинг выполнения (по необходимости)"],
      },
      {
        name: "Security",
        items: ["Контроль доступа", "Аудит изменений (по необходимости)"],
      },
      {
        name: "QA",
        items: ["Проверки качества данных (по необходимости)", "Тесты критических функций"],
      },
    ],
  },
  {
    id: "ai",
    title: "AI‑функции и поиск",
    summary: "Поиск по базе знаний, ассистенты, классификация, автосуммаризации, RAG‑подходы.",
    categories: [
      {
        name: "AI",
        items: ["Embeddings", "RAG", "Реранкинг (по необходимости)", "Vector DB/Index"],
      },
      {
        name: "Backend",
        items: ["API‑слой", "Rate limiting", "Логи и безопасность"],
      },
      {
        name: "DB",
        items: ["PostgreSQL", "Redis", "Vector storage (по необходимости)"],
      },
      {
        name: "Frontend",
        items: ["Next.js", "Streaming UI (по необходимости)"],
      },
      {
        name: "Observability",
        items: ["Sentry (по необходимости)", "Логи запросов и задержек"],
      },
      {
        name: "Security",
        items: ["PII‑редакция (если нужно)", "Rate limiting", "Контроль доступа"],
      },
      {
        name: "QA",
        items: ["E2E сценарии", "Набор проверочных вопросов/кейсов"],
      },
    ],
  },
];

// Pills for the animated orbit widget
export const raisStackOrbitPills = [
  "Frontend",
  "Backend",
  "DB",
  "Infra",
  "Design",
  "QA",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Vercel",
] as const;

