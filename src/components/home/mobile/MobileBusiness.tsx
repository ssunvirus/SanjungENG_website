import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightCircle,
  ClipboardCheck,
  Snowflake,
  Wrench,
  Wind,
} from "lucide-react";
import Eyebrow from "@/src/components/shared/SectionEyebrow";
import BusinessWorkflow from "@/src/components/home/BusinessWorkflow";

const business = [
  {
    title: "냉동기",
    description: "안정적인 냉방 설계, 설치, 교체",
    image: "/images/projects/semiconductor-chiller/source-7.jpg",
    href: "/solutions",
  },
  {
    title: "섬유덕트",
    description: "공간에 맞춘 공기 분배 설계",
    image: "/images/business/fabric-duct-card.jpg",
    href: "/fabric-duct",
  },
  {
    title: "저온저장고",
    description: "저온 보관을 위한 설비 구축",
    image: "/images/cold-storage/process-unit-installation.jpg",
    href: "/solutions/cold-storage",
  },
  {
    title: "수리 & 유지보수",
    description: "안정적인 가동을 위한 정기점검",
    image: "/images/business/maintenance-card.jpg",
    href: "/solutions#maintenance",
  },
];

export default function MobileBusiness() {
  return (
    <>
      <section className="mx-auto max-w-[600px] pt-8 text-center">
        <p className="text-xs tracking-[3px] font-semibold text-brand-blue">BUSINESS AREA</p>
        <h2 className="mt-5 text-[28px] font-extrabold">냉동공조 설계 &amp; 시공</h2>
        <p className="mt-3 px-5 text-base font-medium leading-7">
          냉동기부터 섬유덕트까지
          <br />
          원스톱으로 제공하는 산정엔지니어링
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
              title: "유지보수",
              text: "정기점검",
              href: "/solutions#maintenance",
            },
            { icon: Wind, title: "섬유덕트", text: "CFD 설계 & 시공", href: "/fabric-duct" },
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
              <p className="text-sm">{service.text}</p>
            </Link>
          ))}
        </div>
        <div className="relative mt-4 aspect-[1.6] w-full">
          <Image
            src="/images/business/overview-background.png"
            alt="산업 시설 냉동공조 설계 및 시공"
            fill
            sizes="(max-width: 600px) 100vw, 600px"
            className="object-cover object-bottom"
          />
        </div>
        <div className="hidden px-5 py-7 lg:block">
          <BusinessWorkflow />
        </div>
      </section>

      <section className="mx-auto max-w-[600px] px-5 py-8">
        <Eyebrow variant="compact">OUR BUSINESS</Eyebrow>
        <div className="mt-3 flex items-center justify-between">
          <h2 className="text-[28px] font-extrabold">사업영역</h2>
          <Link href="/solutions" className="flex min-h-11 items-center gap-2 text-sm">
            전체 보기
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {business.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex min-h-[130px] items-center gap-4 rounded-[22px] bg-white p-3"
            >
              <div className="relative h-[108px] w-[100px] shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[21px] font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-5 text-[#637382]">{item.description}</p>
                <ArrowRightCircle
                  size={28}
                  aria-hidden="true"
                  className="ml-auto mt-3 text-[#006EB8]"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
