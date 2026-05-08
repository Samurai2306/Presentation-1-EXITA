import * as React from "react";

import { Layers, Repeat2, TrendingUp } from "lucide-react";

import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { cn } from "@/lib/cn";

function PitchCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-(--app-separator) bg-(--app-surface-2) text-(--app-text-2)">
          {icon}
        </div>
        <div>
          <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">{title}</div>
          <div className="mt-2 text-[13px] leading-7 text-(--app-text-2)">{text}</div>
        </div>
      </div>
    </div>
  );
}

function ModelCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
      <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">{title}</div>
      <div className="mt-3 grid gap-2 text-[13px] leading-7 text-(--app-text-2)">
        {items.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
    </div>
  );
}

function MoatCard() {
  return (
    <div className="doclab-neon-edge doclab-volume-surface rounded-[18px] border border-(--app-separator) p-5">
      <div className="text-[12px] font-medium uppercase tracking-[0.2em] text-(--app-text-3)">Moat</div>
      <div className="mt-3 grid gap-2 text-[13px] leading-6 text-(--app-text-2)">
        <div>Экспертный контур EXITA Н.Э.П. для сложных кейсов и валидации.</div>
        <div>Накопление внутренних стандартов и паттернов правки организации.</div>
        <div>Процессная интеграция: от сигнала к управляемому quality-cycle.</div>
      </div>
    </div>
  );
}

export function RedaktorshaInvestorPitch({ className }: { className?: string }) {
  return (
    <RaisPanel scheme="dark" className={cn("doclab-panel-accent overflow-hidden", className)}>
      <RaisPanelHeader>
        <RaisPanelTitle>Почему это интересно инвесторам</RaisPanelTitle>
        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">pitch</div>
      </RaisPanelHeader>
      <RaisPanelBody>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              <PitchCard
                icon={<TrendingUp className="h-5 w-5" />}
                title="Большой рынок документов"
                text="Образование, legal и корп-документооборот формируют постоянный поток документов, где цена ошибок высока."
              />
              <PitchCard
                icon={<Repeat2 className="h-5 w-5" />}
                title="Повторяемый процесс"
                text="Проверка становится воспроизводимой: сигнал → объяснение → правка → контроль, без ручного хаоса."
              />
              <PitchCard
                icon={<Layers className="h-5 w-5" />}
                title="Масштабирование"
                text="От одного файла к стандарту организации: роли, аналитика качества и управляемые процессы."
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid gap-4">
              <ModelCard
                title="Модель"
                items={[
                  "Подписка для организации (кафедра/факультет/вуз)",
                  "Пилоты и внедрения (методика, процессы, интеграции)",
                  "Платные экспертные маршруты для сложных документов",
                ]}
              />
              <ModelCard
                title="Что продаём"
                items={[
                  "Идею “качества документов как продукта”: критерии, прозрачность, управляемость.",
                  "Снижение рутины преподавателей и повышение качества обратной связи студентам.",
                ]}
              />
              <MoatCard />
            </div>
          </div>
        </div>
      </RaisPanelBody>
    </RaisPanel>
  );
}

