import { ClipboardCheck, Droplets, Hammer, Settings, Wrench } from "lucide-react";

const chillerServices = [
  { title: "설치 및 교체", icon: Wrench, href: "#chiller-process" },
  { title: "철거 및 반출", icon: Hammer, href: "#chiller-removal" },
  { title: "세관 및 정비", icon: Droplets, href: "#chiller-cleaning" },
  { title: "수리 및 오버홀", icon: Settings, href: "#chiller-maintenance" },
  { title: "정기점검 및 유지보수", icon: ClipboardCheck, href: "#chiller-maintenance" },
];

export default function Services() {
  return (
    <>
      <section
        aria-labelledby="chiller-services-heading"
        className="mx-auto w-full max-w-[1440px] bg-[#F1FAFD] px-5 py-12 lg:px-[120px] lg:py-16"
      >
        <header className="mb-7 lg:mb-10">
          <p
            data-section-eyebrow
            className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-[20px] lg:text-[20px] lg:tracking-[6px]"
          >
            CHILLER SERVICE{" "}
            <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
          </p>
          <h2
            id="chiller-services-heading"
            className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[50px] lg:tracking-[2.5px]"
          >
            냉동기 주요 서비스
          </h2>
          <p className="mt-3 text-[15px] font-semibold lg:mt-[25px] lg:text-[19px]">
            필요한 서비스를 선택하면 관련 섹션으로 이동합니다.
          </p>
        </header>
        <div className="overflow-hidden rounded-[10px] border border-brand-navy/15 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.06)]">
          {chillerServices.map((service, index) => (
            <a
              key={service.title}
              href={service.href}
              className="flex items-center gap-4 border-b border-brand-navy/15 px-5 py-8 transition-colors last:border-b-0 hover:bg-[#00ADDB]/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue motion-reduce:transition-none lg:gap-6 lg:px-8 lg:py-9"
            >
              <span className="text-sm font-bold tabular-nums text-brand-blue lg:text-xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-blue/10 text-brand-navy lg:size-12">
                <service.icon aria-hidden="true" className="size-6 lg:size-7" strokeWidth={1.8} />
              </span>
              <h3 className="flex-1 text-lg font-bold text-brand-navy lg:text-[25px]">
                {service.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
