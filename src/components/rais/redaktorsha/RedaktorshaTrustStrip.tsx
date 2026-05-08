import * as React from "react";

import { Lock, Scale, Sparkles } from "lucide-react";

import { RaisPanel, RaisPanelBody, RaisPanelHeader, RaisPanelTitle } from "@/components/rais/RaisPanel";
import { cn } from "@/lib/cn";

function TrustItem({
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

export function RedaktorshaTrustStrip({ className }: { className?: string }) {
  return (
    <RaisPanel scheme="dark" className={cn("doclab-panel-accent overflow-hidden", className)}>
      <RaisPanelHeader>
        <RaisPanelTitle>Доверие</RaisPanelTitle>
        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">принципы</div>
      </RaisPanelHeader>
      <RaisPanelBody>
        <div className="mb-4 flex flex-wrap gap-2 text-[12px] text-(--app-text-2)">
          {["Этичный AI", "Методика", "Конфиденциальность", "Пояснения и варианты"].map((t) => (
            <span key={t} className="doclab-volume-surface rounded-full border border-(--app-separator) px-3 py-1.5">
              {t}
            </span>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <TrustItem
            icon={<Scale className="h-5 w-5" />}
            title="Этика"
            text="Не подменяем автора. Даём объяснения и варианты правки — человек принимает решение и сохраняет авторство."
          />
          <TrustItem
            icon={<Sparkles className="h-5 w-5" />}
            title="Методика"
            text="Проверка строится на понятных критериях: структура, ясность, источники/цитирование, и (для договоров) риски."
          />
          <TrustItem
            icon={<Lock className="h-5 w-5" />}
            title="Конфиденциальность"
            text="Документы не превращаются в публичный контент. Контроль доступа и аккуратная работа с материалами по процессу."
          />
        </div>
      </RaisPanelBody>
    </RaisPanel>
  );
}

