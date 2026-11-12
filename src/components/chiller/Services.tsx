import Image from "next/image";
import Link from "next/link";
import { projectListHref } from "@/src/lib/project-list-navigation";
import {
  ArrowUpRight,
  Check,
  ClipboardCheck,
  Droplets,
  Hammer,
  Plus,
  Settings,
  Wrench,
} from "lucide-react";

const chillerServices = [
  {
    title: "설치 및 교체",
    icon: Wrench,
    description:
      "설치 공간과 필요한 냉동 용량, 기존 설비 상태를 검토하여 \n 장비 설치와 교체를 진행합니다.",
    tasks: [
      "현장 조건 및 설비 용량 검토",
      "장비 반입과 배관 및 전기 연결",
      "시운전 및 운전 상태 확인",
    ],
    image: "/images/projects/semiconductor-chiller/source-5.jpg",
    href: "/projects/wonsam-nonghyup",
  },
  {
    title: "철거 및 반출",
    icon: Hammer,
    description:
      "현장 반출 경로와 작업 공간을 확인하고,\n 연결 배관 분리부터 노후 냉동기 해체 및 반출까지 진행합니다.",
    tasks: ["철거 범위 및 반출 동선 확인", "연결 배관 분리 및 장비 해체", "장비 반출 및 현장 정리"],
    image: "/images/projects/hwaseong-absorption-chiller-removal/photo-03.jpg",
    href: "/projects/hwaseong-absorption-chiller-removal",
  },
  {
    title: "수리 및 오버홀",
    icon: Settings,
    description:
      "고장 원인과 주요 부품 상태를 확인하여\n 필요한 부품과 계통을 정비하고 수리 및 오버홀을 진행합니다.",
    tasks: [
      "고장 원인 및 주요 부품 점검",
      "압축기 등 주요 부품 수리, 교체",
      "분해 정비 및 운전 상태 확인",
    ],
    image: "/images/projects/seoanseong-chiller-valve-replacement/photo-03.jpg",
    href: "/projects/seoanseong-chiller-valve-replacement",
  },
  {
    title: "세관 및 정비",
    icon: Droplets,
    description:
      "설비 상태에 따라 열교환기 내부 오염물을 제거하고\n 냉동유와 필터 등 필요한 소모품을 교체합니다.",
    tasks: [
      "열교환기 오염 상태 확인 및 세관",
      "냉동유, 필터 상태 점검 및 교체",
      "정비 후 조립 및 최종 점검",
    ],
    image: "/images/projects/hwaseong-absorption-chiller-cleaning/photo-06.jpg",
    href: "/projects/hwaseong-absorption-chiller-cleaning",
  },
  {
    title: "정기점검 및 유지보수",
    icon: ClipboardCheck,
    description:
      "정기적인 예방정비로 설비 고장을 사전에 방지하고\n 갑자스러운 고장으로 인한 수리 비용을 최소화합니다.",
    tasks: [
      "운전 압력, 온도 및 냉각 성능 점검",
      "주요 부품과 진동, 소음 확인",
      "정비 항목 안내 및 사후관리",
    ],
    image: "/images/business/maintenance-thermal-inspection.jpg",
    href: "/projects/seoanseong-maintenance",
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
          <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-[20px] lg:text-[20px] lg:tracking-[6px]">
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
            필요한 서비스를 선택해 작업 내용과 현장을 확인해보세요.
          </p>
        </header>
        <div className="overflow-hidden rounded-[10px] border border-brand-navy/15 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.06)]">
          {chillerServices.map((service, index) => (
            <details
              key={service.title}
              name="chiller-services"
              className="group border-b border-brand-navy/15 last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-8 transition-colors hover:bg-[#00ADDB]/15 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue group-open:bg-[#00ADDB]/10 group-open:hover:bg-[#00ADDB]/15 lg:gap-6 lg:px-8 lg:py-9 [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-bold tabular-nums text-brand-blue lg:text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-blue/10 text-brand-navy lg:size-12">
                  <service.icon aria-hidden="true" className="size-6 lg:size-7" strokeWidth={1.8} />
                </span>
                <h3 className="flex-1 text-lg font-bold text-brand-navy lg:text-[25px]">
                  {service.title}
                </h3>
                <Plus
                  aria-hidden="true"
                  className="size-6 shrink-0 text-brand-blue transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <div className="grid gap-8 p-6 lg:grid-cols-2 lg:gap-10 lg:p-10">
                <div className="relative min-h-[320px] overflow-hidden rounded-[10px] lg:min-h-[420px]">
                  <Image
                    src={service.image}
                    alt={service.title + " 현장"}
                    fill
                    sizes="(min-width: 1440px) 540px, (min-width: 768px) 80vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="mb-8 text-[24px] font-extrabold leading-tight text-brand-navy lg:-mt-6 lg:mb-10 lg:text-[35px]">
                    {service.title}
                  </h4>
                  <p className="whitespace-pre-line text-base font-semibold leading-7 text-brand-text/80 lg:text-lg lg:leading-8">
                    {service.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {service.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-3 text-base font-semibold text-brand-navy lg:text-lg"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-5 shrink-0 text-brand-blue"
                        />
                        {task}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={projectListHref(1, "냉동공조")}
                    className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-base font-bold text-white transition-colors hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                  >
                    관련 시공사례 보기
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
