import type { IntentId } from "@/lib/uiState";

export type ZoneTile = {
  id: IntentId;
  title: string;
  subtitle: string;
  href: string;
};

export const conciergeTiles: ZoneTile[] = [
  { id: "legal", title: "EXITA Н.Э.П.", subtitle: "Экспертиза и право", href: "/nep" },
  { id: "it", title: "EXITA РАИС", subtitle: "IT-продукты и инновации", href: "/rais" },
  { id: "general", title: "EXITA Global", subtitle: "Системная зона", href: "/global" },
];

export type NewsItem = { id: string; title: string; date: string; tag: string };

export const globalNews: NewsItem[] = [
  { id: "n1", title: "Экосистема: зоны, входы и единый маршрут", date: "2026-04-16", tag: "/UPDATE_01" },
  { id: "n2", title: "Omni‑Bar: быстрый доступ к разделам", date: "2026-04-16", tag: "/UPDATE_02" },
  { id: "n3", title: "RAIS: витрина решений и входов", date: "2026-04-16", tag: "/UPDATE_03" },
];

export type CaseItem = {
  id: string;
  title: string;
  subtitle: string;
  outcome: string;
};

export const nepCases: CaseItem[] = [
  {
    id: "case-01",
    title: "Корпоративный спор: защита интересов",
    subtitle: "Конфликт обязательств и риски субсидиарной ответственности",
    outcome: "Снижение рисков и выстраивание стратегии защиты",
  },
  {
    id: "case-02",
    title: "Договорная экспертиза: проверка условий",
    subtitle: "Выявление скрытых штрафов и ограничений ответственности",
    outcome: "Набор правок + аргументация по нормам",
  },
  {
    id: "case-03",
    title: "Оценка рисков: комплаенс-модель",
    subtitle: "Налоговый комплаенс и контроль процедур",
    outcome: "План внедрения и контрольные точки",
  },
];

export type RaisMicrozone = { id: string; title: string; subtitle: string; href: string };

export const raisMicrozones: RaisMicrozone[] = [
  { id: "redaktorsha", title: "Редакторша", subtitle: "AI-анализ договоров", href: "/rais/redaktorsha" },
  { id: "ya-zhivoy", title: "Я Живой", subtitle: "Health & Safety", href: "/rais/ya-zhivoy" },
];

export type RaisOffer = { id: string; title: string; subtitle: string; href: string; summary?: string; tags?: string[] };

export const raisOffers: RaisOffer[] = [
  {
    id: "analytics",
    title: "AI-аналитика и автоматизация",
    subtitle: "Персонализированное решение под ваш бизнес",
    href: "/rais/analytics",
    summary:
      "Собираем модель данных, метрики и автоматизацию процессов: от диагностики до прототипа и внедрения. С фокусом на ROI, контроль качества и безопасность.",
    tags: ["AI", "BI", "автоматизация"],
  },
];

export type RaisProjectItem = RaisMicrozone & {
  tags?: string[];
  status?: "active" | "pilot" | "concept";
  summary?: string;
};

const raisMicrozoneProjects: RaisProjectItem[] = raisMicrozones.map((z) => ({
  ...z,
  tags: ["MVP"],
  status: "pilot",
  summary: "Быстрый вход: показывает сценарий и ценность решения в одном экране.",
}));

export const raisProjects: RaisProjectItem[] = [
  // Все проекты RAIS (входы + расширение каталога)
  ...raisMicrozoneProjects.map(
    (p): RaisProjectItem =>
      p.id === "redaktorsha"
        ? { ...p, tags: ["юртех", "NLP", "документы"], status: "pilot" }
          : p.id === "ya-zhivoy"
            ? { ...p, tags: ["HSE", "чек-листы", "инциденты"], status: "pilot" }
          : p,
  ),
  {
    id: "analytics-offer",
    title: "AI-аналитика и автоматизация",
    subtitle: "Персонализированное решение под ваш бизнес",
    href: "/rais/analytics",
    tags: ["AI", "BI", "автоматизация", "KPI"],
    status: "pilot",
    summary:
      "Диагностика, модель данных, автоматизация процессов и контроль результата через метрики и ROI.",
  },
  {
    id: "docflow",
    title: "DocFlow",
    subtitle: "Маршрутизация и контроль жизненного цикла документов",
    href: "/rais/docflow",
    tags: ["workflow", "документы", "контроль"],
    status: "concept",
    summary:
      "Гибкие статусы и роли, контроль версий, SLA и прозрачность этапов — чтобы согласования не “терялись” и были воспроизводимы.",
  },
  {
    id: "search",
    title: "Semantic Search",
    subtitle: "Поиск по базе знаний и документам без «магии»",
    href: "/rais/search",
    tags: ["поиск", "семантика", "RAG"],
    status: "concept",
    summary:
      "Единый индекс, приоритеты источников, ответы с цитатами и ссылками на первоисточник.",
  },
  {
    id: "integrations",
    title: "Integration Hub",
    subtitle: "Коннекторы к сервисам и внутренним системам",
    href: "/rais/integrations",
    tags: ["API", "коннекторы"],
    status: "concept",
    summary:
      "Шаблоны интеграций: вебхуки, очереди, ETL и мониторинг; контракты и типовые сценарии.",
  },
  {
    id: "rais-platform",
    title: "RAIS Platform",
    subtitle: "Единая витрина продуктов и интеграций",
    href: "/rais",
    tags: ["платформа", "витрина"],
    status: "concept",
    summary:
      "Каркас для сборки решений: единые UI-паттерны, каталоги модулей и безопасное подключение внешних сервисов.",
  },
];

export const raisFeaturedProjects: RaisProjectItem[] = raisProjects.filter((p) =>
  ["redaktorsha", "ya-zhivoy", "analytics-offer"].includes(p.id),
);

export type RaisCaseItem = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags?: string[];
  href?: string;
  // поля, которые могли использоваться на старых блоках
  subtitle?: string;
  outcome?: string;
};

export const raisFeaturedCases: RaisCaseItem[] = [
  {
    id: "rais-case-01",
    title: "Сокращение времени согласования документов",
    problem:
      "Команда теряет время на ручную проверку и согласование: правки размазаны по чатам, версии не отслеживаются, ответственность не определена.",
    solution:
      "Прототип процесса: единая карточка документа, роли, чек-листы качества, подсветка рискованных формулировок и журнал изменений.",
    result:
      "Предсказуемый маршрут согласования, меньше “потерянных” правок и ясные контрольные точки по этапам.",
    tags: ["документы", "workflow", "качество"],
    href: "/rais#cases",
  },
  {
    id: "rais-case-02",
    title: "Быстрый доступ к знаниям без перегруза поддержки",
    problem:
      "Новые сотрудники и смежные команды задают одни и те же вопросы; поиск по базе знаний не даёт релевантных ответов из-за разрозненных форматов.",
    solution:
      "Демо-решение семантического поиска: единый индекс, источники с приоритетами, ответы с цитатами и ссылками на первоисточник.",
    result:
      "В пилотной витрине — снижение повторяемых запросов и рост доверия к базе знаний за счёт прозрачных ссылок на источники.",
    tags: ["поиск", "knowledge base", "RAG"],
    href: "/rais#cases",
  },
  {
    id: "rais-case-03",
    title: "Контроль показателей и прогнозирование эффектов",
    problem:
      "Метрики разъехались по таблицам, отчёты готовятся вручную, решения принимаются без единого «источника правды».",
    solution:
      "Макет BI-контура: модель данных, витрины KPI, сценарное прогнозирование и объяснимые допущения для расчёта ROI.",
    result:
      "Быстрее подготовка отчёта и воспроизводимые расчёты за счёт фиксированных допущений и единой модели.",
    tags: ["аналитика", "KPI", "ROI"],
    href: "/rais#cases",
  },
  {
    id: "rais-case-04",
    title: "HSE-контур для предотвращения инцидентов",
    problem:
      "Проверки проходят формально: чек-листы не связаны с действиями, нет единого следа по корректирующим мероприятиям.",
    solution:
      "Пилот микрозоны «Я Живой»: чек-листы, регистрация событий, назначение ответственных и контроль выполнения действий.",
    result:
      "Улучшение дисциплины исполнения и прозрачность статусов за счёт единого журнала событий и контрольных точек.",
    tags: ["HSE", "контроль", "процессы"],
    href: "/rais#cases",
  },
];

