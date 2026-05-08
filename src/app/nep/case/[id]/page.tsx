import { notFound } from "next/navigation";

import { nepCases } from "@/mocks/content";
import { KeycapLink } from "@/components/ui/KeycapLink";
import { SurfacePanel, SurfacePanelBody, SurfacePanelHeader } from "@/components/system/SurfacePanel";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return nepCases.map((c) => ({ id: c.id }));
}

export default async function NepCasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const item = nepCases.find((c) => c.id === id);
  if (!item) notFound();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-24 pt-10 sm:px-6">
      <KeycapLink href="/nep" variant="ghost" size="md" className="h-11 px-5 text-[13px]">
        ← Назад в Н.Э.П.
      </KeycapLink>

      <SurfacePanel className="mt-8 overflow-hidden">
        <SurfacePanelHeader className="px-6 py-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-black/65">/CASE</div>
            <h1 className="mt-2 text-balance text-3xl font-semibold tracking-[-0.02em] text-black sm:text-4xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-3xl text-[14px] leading-7 text-black/70">{item.subtitle}</p>
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-black/45">nep</div>
        </SurfacePanelHeader>

        <SurfacePanelBody className="p-0">
          <div className="grid grid-cols-1 gap-0 divide-y divide-(--app-border)">
            <div className="px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">Outcome</div>
              <div className="mt-2 text-[14px] font-medium text-black">{item.outcome}</div>
            </div>
            <div className="px-6 py-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/55">Notes</div>
              <div className="mt-3 text-[13px] leading-7 text-black/70">
                <ul className="grid gap-2">
                  <li>
                    <span className="font-medium text-black">Контекст:</span> какие факты и документы
                    легли в основу позиции.
                  </li>
                  <li>
                    <span className="font-medium text-black">Ключевые риски:</span> где возможны
                    штрафы/оспаривание/субсидиарная ответственность.
                  </li>
                  <li>
                    <span className="font-medium text-black">Стратегия:</span> что делаем в первую
                    очередь и какие развилки предусмотрены.
                  </li>
                  <li>
                    <span className="font-medium text-black">Контрольные точки:</span> сроки, формат
                    согласования и критерии результата.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SurfacePanelBody>
      </SurfacePanel>
    </div>
  );
}

