import { globalNews } from "@/mocks/content";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { SurfacePanel, SurfacePanelBody, SurfacePanelHeader } from "@/components/system/SurfacePanel";

export default function ExitaPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-24 pt-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--app-border) bg-(--app-surface) px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">
            Экзита
          </div>
          <h1 className="mt-8 text-balance font-display text-[42px] font-semibold leading-[0.98] tracking-[-0.04em] text-(--app-text) sm:text-[56px]">
            EXITA.
            <span className="block text-(--app-text-3)">Экосистема экспертизы и инженерии.</span>
          </h1>
          <div className="mt-6 grid gap-3 text-pretty text-[15px] leading-7 text-(--app-text-2)">
            <p>
              ЭКЗИТА — экосистема, где экспертиза и инженерия работают вместе: независимая экспертная
              платформа <span className="font-medium text-(--app-text)">Н.Э.П.</span> и IT‑разработка с
              прикладными продуктами <span className="font-medium text-(--app-text)">RAIS</span>.
            </p>
            <p>
              Здесь вы быстро переходите по разделам, продуктам и кейсам — без лишнего клика и
              “режимов”.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3">
            <SurfacePanel variant="card">
              <SurfacePanelBody className="p-5">
                <div className="text-[12px] uppercase tracking-[0.2em] text-(--app-text-3)">/NEP</div>
                <div className="mt-2 text-[14px] font-semibold text-(--app-text)">Экспертиза и право</div>
                <div className="mt-1 text-[12px] text-(--app-text-3)">Кейсы, таймлайн и виртуальный кабинет</div>
                <div className="mt-4">
                  <KeycapLink href="/nep" variant="primary" size="sm">
                    Открыть
                  </KeycapLink>
                </div>
              </SurfacePanelBody>
            </SurfacePanel>

            <SurfacePanel variant="card">
              <SurfacePanelBody className="p-5">
                <div className="text-[12px] uppercase tracking-[0.2em] text-(--app-text-3)">/RAIS</div>
                <div className="mt-2 text-[14px] font-semibold text-(--app-text)">IT‑разработка</div>
                <div className="mt-1 text-[12px] text-(--app-text-3)">Продукты, кейсы и входы</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <KeycapLink href="/rais" variant="primary" size="sm">
                    Открыть
                  </KeycapLink>
                  <KeycapLink href="/rais/projects" variant="ghost" size="sm">
                    Кейсы
                  </KeycapLink>
                  <KeycapLink href="/rais/stack" variant="ghost" size="sm">
                    Стек
                  </KeycapLink>
                </div>
              </SurfacePanelBody>
            </SurfacePanel>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <KeycapLink href="/" variant="ghost" size="md" className="h-11 px-5 text-[13px]">
              На главную
            </KeycapLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SurfacePanel className="overflow-hidden">
            <SurfacePanelHeader className="px-6 py-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">Сводка</div>
                <div className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-(--app-text)">
                  Контур управления
                </div>
              </div>
              <div className="text-right text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">EXITA</div>
            </SurfacePanelHeader>

            <SurfacePanelBody className="p-0">
              <div className="grid grid-cols-1 gap-0 divide-y divide-(--app-border)">
                {globalNews.map((item) => (
                  <div key={item.id} className="px-6 py-5">
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.22em] text-(--app-text-3)">{item.tag}</div>
                        <div className="mt-1 text-[14px] font-medium text-(--app-text)">{item.title}</div>
                      </div>
                      <div className="shrink-0 text-[12px] text-(--app-text-3)">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SurfacePanelBody>
          </SurfacePanel>
        </div>
      </div>
    </div>
  );
}

