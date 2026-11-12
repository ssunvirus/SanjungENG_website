import Image from "next/image";
import Link from "next/link";
import { projectListHref } from "@/src/lib/project-list-navigation";
import type { CSSProperties } from "react";

const maintenanceServices = [
  {
    number: "01",
    title: "냉동기 세관",
    href: "/projects/hwaseong-absorption-chiller-cleaning",
    description: "열교환기 내부의 스케일과 이물질을 제거",
    image: "/images/chiller/maintenance-cleaning.png",
    alt: "냉동기 열교환기 세관 작업",
    width: 400,
  },
  {
    number: "02",
    title: "수리 & 오버홀",
    href: "/projects/seoanseong-chiller-valve-replacement",
    description: "주요 부품을 분해, 점검하고 마모/손상 부품을 정비",
    image: "/images/chiller/maintenance-overhaul.png",
    alt: "냉동기 주요 부품 수리와 오버홀 작업",
    width: 400,
  },
  {
    number: "03",
    title: "정기점검",
    href: "/projects/seoanseong-maintenance",
    description: "운전 상태와 주요 부품을 주기적으로 점검",
    image: "/images/chiller/maintenance-inspection.png",
    alt: "냉동공조 설비 정기점검 작업",
    width: 407,
  },
];

export default function Maintenance() {
  return (
    <section className="mx-auto w-full lg:max-w-[1440px] overflow-hidden px-[20px] lg:px-[63px] py-[36px] lg:py-[60px]">
      <header>
        <p className="flex items-center gap-[12px] lg:gap-[20px] text-[12px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
          MAINTENANCE
          <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
        </p>
        <h2 className="mt-[12px] lg:mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          유지보수 &amp; 정기점검
        </h2>
        <p className="mt-[12px] lg:mt-[25px] text-[15px] lg:text-[19px] font-semibold text-brand-text">
          운전 상태와 주요 부품을 점검하고, 설비 상태에 맞춰 필요한 정비를 진행합니다.
        </p>
      </header>

      <div className="mt-[24px] lg:mt-8 flex flex-col lg:flex-row items-start gap-[28px] lg:gap-[50px]">
        {maintenanceServices.map((service) => (
          <article
            key={service.number}
            style={{ "--card-width": `${service.width}px` } as CSSProperties}
            className="w-full lg:w-[var(--card-width)] shrink-0"
          >
            <Link
              href={projectListHref(1, "냉동공조")}
              aria-label={`${service.title} 시공사례 보기`}
              className="relative block h-[240px] rounded-[10px] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(16,47,73,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transform-none motion-reduce:transition-none lg:h-[300px]"
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes={`${service.width}px`}
                className="rounded-[10px] object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              />
            </Link>
            <div className="mt-[12px] lg:mt-[20px]">
              <div className="flex items-center gap-[12px] lg:gap-[19px]">
                <span className="text-[20px] lg:text-[30px] font-bold tracking-[1px] lg:tracking-[3px] text-brand-blue">
                  {service.number}
                </span>
                <span aria-hidden="true" className="h-[27px] w-[3px] bg-brand-blue" />
                <h3 className="text-[20px] lg:text-[30px] font-semibold text-brand-text">
                  {service.title}
                </h3>
              </div>
              <p className="mt-[12px] lg:mt-[20px] lg:whitespace-nowrap text-[15px] lg:text-[22px] font-semibold leading-[30px] text-brand-text/80">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
