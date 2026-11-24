import Image from "next/image";
import Link from "next/link";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { Droplets, Wrench, ClipboardCheck } from "lucide-react";

const maintenanceServices = [
  {
    number: "01",
    icon: Droplets,
    title: "냉매 및 냉동유 관리",
    href: "/projects/hwaseong-absorption-chiller-cleaning",
    description: "냉매 회수 및 충전, 냉동유 및 필터 교체를 통한 설비 성능 유지",
    image: "/images/chiller/maintenance-oil-filter.png",
    alt: "냉동기 필터를 분리해 상태를 확인하는 모습",
    width: 400,
  },
  {
    number: "02",
    icon: Wrench,
    title: "수리 & 오버홀",
    href: "/projects/seoanseong-chiller-valve-replacement",
    description: "고장 원인 진단 및 주요 부품 수리 및 교체, 분해 정비",
    image: "/images/chiller/maintenance-overhaul.png",
    alt: "냉동기 주요 부품 수리와 오버홀 작업",
    width: 400,
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "정기점검",
    href: "/projects/seoanseong-maintenance",
    description: "운전 상태 및 주요 부품 점검을 통한 설비 이상 진단과 고장 예방",
    image: "/images/chiller/maintenance-inspection.png",
    alt: "냉동공조 설비 정기점검 작업",
    width: 407,
  },
];

export default function Maintenance() {
  return (
    <section className="mx-auto w-full max-w-[1440px] break-keep px-5 py-12 lg:px-[63px] lg:py-20">
      <header>
        <p
          data-section-eyebrow
          className="flex items-center gap-[12px] lg:gap-[20px] text-[12px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60"
        >
          MAINTENANCE
          <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
        </p>
        <h2 className="mt-[12px] lg:mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          유지보수 &amp; 정기점검
        </h2>
        <p className="mt-4 max-w-[1100px] text-lg font-semibold leading-8 text-brand-navy/75 lg:mt-6 lg:text-[22px] lg:leading-9">
          설비의 안정적인 운전과 성능 유지를 위해 현장 상태에 맞춘 전문적인 유지관리 서비스를
          제공합니다.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
        {maintenanceServices.map((service) => (
          <article key={service.number} className="min-w-0">
            <Link
              href={projectListHref(1, "냉동기")}
              aria-label={`${service.title} 시공사례 보기`}
              className="group block h-full rounded-[28px] border border-white/90 bg-white/85 p-5 shadow-[0_10px_30px_rgba(16,45,74,0.07)] transition-[background-color,border-color,box-shadow] hover:border-brand-blue/25 hover:bg-[#EAF8FD] hover:shadow-[0_12px_32px_rgba(0,173,219,0.12)] focus-visible:border-brand-blue/25 focus-visible:bg-[#EAF8FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none lg:p-6"
            >
              <div className="relative aspect-[3/2] overflow-hidden rounded-[20px]">
                <Image
                  src={service.image}
                  unoptimized={service.number === "01"}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1440px) 372px, (min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-1 pb-2 pt-7 lg:pt-8">
                <div className="flex items-center gap-4 lg:gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-[18px] bg-brand-blue/10 text-brand-blue lg:size-16">
                    <service.icon size={34} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 border-l border-brand-blue/35 pl-4 lg:pl-5">
                    <span className="text-[24px] font-bold leading-none tabular-nums text-brand-blue lg:text-[28px]">
                      {service.number}
                    </span>
                    <h3 className="mt-2 text-[24px] font-bold leading-snug tracking-tight text-brand-navy lg:text-[28px]">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-6 text-lg font-semibold leading-8 text-brand-navy/75 lg:text-[20px]">
                  {service.description}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
