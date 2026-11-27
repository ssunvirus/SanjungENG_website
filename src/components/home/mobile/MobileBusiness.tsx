import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ClipboardCheck, Snowflake, Wrench, Wind } from "lucide-react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import BusinessWorkflow from "@/src/components/home/BusinessWorkflow";

const business = [
  {
    title: "냉동기",
    description: "설치/철거/수리/유지보수",
    image: "/images/projects/semiconductor-chiller/source-7.jpg",
    href: "/solutions",
  },
  {
    title: "저온저장고",
    description: "설계/시공",
    image: "/images/cold-storage/process-unit-installation.jpg",
    href: "/solutions/cold-storage",
  },
  {
    title: "냉각탑",
    description: "설치/교체/부품 정비",
    image: "/images/business/cooling-tower-card.jpg",
    href: "/solutions/cooling-tower",
  },
  {
    title: "항온항습기",
    description: "설치/교체/수리/유지보수",
    image: "/images/business/precision-ac-card.jpg",
    href: "/solutions/precision-ac",
  },
  {
    title: "패브릭덕트",
    description: "패브릭덕트 설계/시공",
    image: "/images/business/fabric-duct-card.jpg",
    href: "/fabric-duct",
  },
];

export function MobileBusinessOverview() {
  return (
    <>
      <section className="mx-auto max-w-[600px] pt-8 text-center">
        <p data-section-eyebrow className="text-xs tracking-[3px] font-semibold text-brand-blue">
          BUSINESS AREA
        </p>
        <h2 className="mt-5 text-[28px] font-extrabold">냉동공조 설계 &amp; 시공</h2>
        <p className="mt-3 px-5 text-base font-medium leading-7">
          냉동설비부터 패브릭덕트까지 원스톱 시공
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 px-5">
          {[
            { icon: Snowflake, title: "냉동설비", text: "설치 & 교체", href: "/solutions" },
            {
              icon: Wrench,
              title: "수리 & 오버홀",
              text: "성능 복구",
              href: "/solutions#maintenance",
            },
            {
              icon: ClipboardCheck,
              title: "유지보수 & 정기점검",
              text: "정기점검",
              href: "/solutions#maintenance",
            },
            { icon: Wind, title: "패브릭덕트", text: "CFD 설계 & 시공", href: "/fabric-duct" },
          ].map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="flex min-h-[120px] flex-col items-center justify-center rounded-[24px] bg-white p-3"
            >
              <service.icon
                size={38}
                strokeWidth={1.5}
                aria-hidden="true"
                className="mb-2 text-brand-blue"
              />
              <h3 className="text-base font-bold">{service.title}</h3>
            </Link>
          ))}
        </div>
        <div className="hidden px-5 py-7 lg:block">
          <BusinessWorkflow />
        </div>
      </section>
    </>
  );
}

export function MobileBusinessAreas() {
  return (
    <section className="mx-auto w-full max-w-[600px] px-5 py-8 md:max-w-[960px] md:px-8">
      <Eyebrow variant="compact">OUR BUSINESS</Eyebrow>
      <div className="mt-3 flex items-center justify-between">
        <h2 className="text-[28px] font-extrabold">사업영역</h2>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {business.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.06)] transition-[border-color,box-shadow] hover:border-brand-blue/50 hover:shadow-[0_8px_24px_rgba(16,46,73,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none ${item.href === "/fabric-duct" ? "col-span-2 md:col-span-1" : ""}`}
          >
            <div className="relative h-[140px] w-full shrink-0 overflow-hidden bg-[#EAF3F8] md:h-[170px]">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={
                    item.href === "/fabric-duct"
                      ? "(min-width: 768px) 300px, (min-width: 600px) 560px, calc(100vw - 40px)"
                      : "(min-width: 768px) 300px, (min-width: 600px) 274px, calc((100vw - 52px) / 2)"
                  }
                  className={
                    item.href === "/fabric-duct"
                      ? "object-cover object-[center_35%]"
                      : "object-cover"
                  }
                />
              )}
            </div>
            <div className="min-w-0 flex-1 p-3.5 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="min-w-0 break-keep text-[18px] font-bold text-brand-navy md:text-[20px]">
                  {item.title}
                </h3>
                <ArrowRightCircle
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-[#006EB8]"
                />
              </div>
              <p className="mt-2 break-keep text-[13px] leading-5 text-[#637382] md:text-sm">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function MobileBusiness() {
  return (
    <>
      <MobileBusinessOverview />
      <MobileBusinessAreas />
    </>
  );
}
