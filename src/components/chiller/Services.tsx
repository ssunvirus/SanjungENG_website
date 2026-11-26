import { Droplets, Hammer, Settings, Wrench } from "lucide-react";

const chillerServices = [
  {
    title: "설치 및 교체",
    icon: Wrench,
    href: "#chiller-process",
  },
  {
    title: "철거 및 반출",
    icon: Hammer,
    href: "#chiller-removal",
  },
  {
    title: "세관 및 정비",
    icon: Droplets,
    href: "#chiller-cleaning",
  },
  {
    title: "수리 및 유지보수",
    icon: Settings,
    href: "#chiller-maintenance",
  },
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
        </header>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {chillerServices.map((service) => (
            <a
              key={service.title}
              href={service.href}
              className="group flex min-w-0 flex-col rounded-[20px] border border-white/90 bg-white/85 p-4 shadow-[0_10px_30px_rgba(16,45,74,0.07)] transition-[background-color,border-color,box-shadow] hover:border-brand-blue/25 hover:bg-[#EAF8FD] hover:shadow-[0_12px_32px_rgba(0,173,219,0.12)] focus-visible:border-brand-blue/25 focus-visible:bg-[#EAF8FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none lg:rounded-[28px] lg:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-2 lg:mb-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-brand-blue/10 text-brand-blue lg:size-14 lg:rounded-[18px]">
                  <service.icon aria-hidden="true" className="size-7 lg:size-8" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="break-keep text-[20px] font-bold leading-snug tracking-tight text-brand-navy lg:text-[28px]">
                {service.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
