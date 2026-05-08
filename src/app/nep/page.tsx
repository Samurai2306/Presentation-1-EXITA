import { nepCases } from "@/mocks/content";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { SurfacePanel, SurfacePanelBody, SurfacePanelHeader } from "@/components/system/SurfacePanel";

export default function NepPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--app-border) bg-(--app-surface) px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
            EXITA Н.Э.П.
          </div>
          <h1 className="mt-8 text-balance font-display text-[42px] font-semibold leading-[1.04] tracking-[-0.02em] text-(--app-text) sm:text-[56px]">
            Независимая экспертная платформа.
            <span className="block text-(--app-text-3)">Экспертиза, доверие, прозрачность.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-[15px] leading-7 text-(--app-text-2)">
            Зона <span className="font-medium text-(--app-text)">Н.Э.П.</span>: чёткие границы этапов,
            прозрачный таймлайн и витрина обезличенных материалов — без «чёрного ящика».
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <KeycapLink href="/exita" variant="ghost" size="md" className="h-11 px-5 text-[13px]">
              К экосистеме EXITA
            </KeycapLink>
          </div>

          <SurfacePanel className="mt-8" variant="card">
            <SurfacePanelHeader className="px-5 py-4">
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-2)">/SECTION_01</div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">таймлайн</div>
            </SurfacePanelHeader>
            <SurfacePanelBody className="p-5">
              <div className="text-[14px] font-semibold text-(--app-text)">Ход сопровождения</div>
              <div className="mt-3 grid gap-2 text-[12px] text-(--app-text-2)">
                <div className="flex items-center justify-between gap-4 border-b border-(--app-border) pb-2">
                  <span>Заказать услугу</span>
                  <span className="shrink-0 rounded-full border border-(--app-border) bg-(--app-bg) px-2.5 py-0.5 text-[11px] font-medium text-(--app-text-2)">
                    готово
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-(--app-border) pb-2">
                  <span>Подобрать эксперта</span>
                  <span className="shrink-0 rounded-full border border-(--app-border) bg-(--app-bg) px-2.5 py-0.5 text-[11px] font-medium text-(--app-text)">
                    в работе
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Получить результат</span>
                  <span className="shrink-0 rounded-full border border-(--app-border) bg-(--app-surface) px-2.5 py-0.5 text-[11px] text-(--app-text-3)">
                    далее
                  </span>
                </div>
              </div>
            </SurfacePanelBody>
          </SurfacePanel>
        </div>

        <div className="lg:col-span-8">
          <SurfacePanel className="overflow-hidden">
            <SurfacePanelHeader className="px-6 py-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-2)">/SECTION_02</div>
                <div className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-(--app-text)">
                  Виртуальный кабинет
                </div>
                <div className="mt-1 text-[12px] text-(--app-text-3)">Обезличенные сценарии: название, суть, итог</div>
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">сетка</div>
            </SurfacePanelHeader>

            <div className="grid grid-cols-1 gap-0 divide-y divide-(--app-border)">
              {nepCases.map((c, idx) => (
                <KeycapLink
                  key={c.id}
                  href={`/nep/case/${c.id}`}
                  variant="ghost"
                  size="md"
                  className="h-auto rounded-none border-0 bg-transparent px-0 py-0 shadow-none"
                >
                  <div className="group grid grid-cols-1 gap-4 px-6 py-6 transition-colors hover:bg-(--app-surface-inset) sm:grid-cols-12">
                    <div className="sm:col-span-2">
                      <div className="text-[12px] font-semibold tracking-tight text-(--app-text)">
                      /{String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="sm:col-span-7">
                      <div className="text-[14px] font-medium text-(--app-text)">{c.title}</div>
                      <div className="mt-1 text-[12px] text-(--app-text-3)">{c.subtitle}</div>
                    </div>
                    <div className="sm:col-span-3 sm:text-right">
                      <div className="text-[12px] text-(--app-text-3)">Итог</div>
                      <div className="mt-1 text-[12px] text-(--app-text-2)">{c.outcome}</div>
                    </div>
                  </div>
                </KeycapLink>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>
    </div>
  );
}

