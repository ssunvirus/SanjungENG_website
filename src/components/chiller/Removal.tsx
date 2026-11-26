import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionEyebrow from "@/src/components/shared/SectionEyebrow";
import WorkProcessCards from "@/src/components/shared/WorkProcessCards";
import RemovalGallery from "./RemovalGallery";
import ScrapRefund from "./ScrapRefund";
import { projectListHref } from "@/src/lib/project-list-navigation";

const photoRoot = "/images/projects/hwaseong-absorption-chiller-removal";

// 사진과 단계 설명은 이 목록에서 수정합니다.
const removalSteps = [
  {
    number: "01",
    title: "현장 확인 및 철거 계획",
    mobileTitle: "현장 확인",
    description: "장비 상태, 반출 동선, 인양 방법과 작업 범위를 확인합니다.",
    image: "/images/chiller/removal-process-site-inspection.jpg",
    // Account for the image width needed to cover the 410px-tall desktop frame.
    imageSizes: "(min-width: 1200px) 550px, 90vw",
    alt: "작업자들이 옥외 냉동설비와 주변 배관을 살펴보는 모습",
  },
  {
    number: "02",
    title: "안전조치 및 냉매/용액 회수",
    mobileTitle: "냉매/용액 회수",
    description: "장비 종류에 맞춰 냉매/용액 등을 회수합니다.",
    image: "/images/chiller/removal-process-rooftop-recovery.webp",
    imageSizes: "(min-width: 1200px) 550px, 90vw",
    alt: "옥외 냉동설비 사이에서 회수 용기와 장비를 연결해 작업하는 모습",
  },
  {
    number: "03",
    title: "배관 분리 및 장비 해체",
    mobileTitle: "분리 및 해체",
    description: "연결 배관을 분리하고, 장비를 해체합니다.",
    image: `${photoRoot}/photo-03.jpg`,
    imageSizes: "(min-width: 1200px) 410px, 90vw",
    alt: "흡수식 냉동기 본체를 절단해 해체하는 작업 현장",
  },
  {
    number: "04",
    title: "장비 반출 및 현장 정리",
    mobileTitle: "반출 및 정리",
    description: "장비를 반출하고, 고재를 분류한 뒤 작업 공간을 정리합니다.",
    image: "/images/chiller/removal-process-site-check.jpg",
    alt: "작업자들이 좁은 실내 통로에서 터보냉동기를 이동하는 모습",
  },
];

export default function Removal() {
  return (
    <section
      aria-labelledby="chiller-removal-heading"
      className="mx-auto max-w-[1440px] break-keep px-5 py-12 lg:px-[63px] lg:py-20"
    >
      <header className="mb-7 lg:mb-10">
        <SectionEyebrow>CHILLER REMOVAL</SectionEyebrow>
        <h2
          id="chiller-removal-heading"
          className="mt-3 text-[32px] font-bold tracking-[1px] text-brand-navy lg:text-[50px]"
        >
          <span className="text-brand-blue">냉동기 철거</span>, 해체부터 반출까지
        </h2>
      </header>

      <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <RemovalGallery />
        <div>
          <h3 className="text-balance text-[28px] font-bold leading-[1.45] tracking-tight text-brand-navy lg:text-[36px]">
            복잡한 현장도, 대형 냉동기도.
          </h3>
          <p className="mt-5 text-lg font-semibold leading-8 text-brand-navy/85 lg:text-xl lg:leading-9">
            장비의 규모와 설치 환경, 반출 동선을 고려하여 현장에 최적화된 철거 작업.
          </p>
          <dl className="mt-7 space-y-3 border-t border-brand-navy/10 pt-6 text-lg font-semibold leading-8 text-brand-navy lg:text-xl">
            {[
              ["대상 설비", "흡수식, 터보, 스크류 냉동기 등 현장 확인 후 상담"],
              ["작업 범위", "연결 배관 분리, 장비 해체, 인양 및 반출"],
              ["사전 확인", "설치 위치, 장비 크기, 반출 경로와 작업 공간"],
            ].map(([label, text]) => (
              <div
                key={label}
                className="grid grid-cols-[104px_minmax(0,1fr)] items-start gap-3 lg:gap-4"
              >
                <dt className="rounded-[5px] border border-brand-blue/25 bg-brand-blue/10 px-2 py-1 text-center font-bold">
                  {label}
                </dt>
                <dd className="py-1">{text}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-brand-navy px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:text-xl"
          >
            철거 작업 문의 <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
        </div>
      </div>

      <ScrapRefund />

      <div className="mt-12 border-t border-brand-navy/10 pt-8 lg:mt-16 lg:pt-10">
        <h3 className="text-[26px] font-bold text-brand-navy lg:text-[32px]">
          냉동기 철거 작업 과정
        </h3>
        <WorkProcessCards steps={removalSteps} mobileCarousel desktopColumns={4} />
      </div>

      <div className="mt-7 text-center lg:mt-9">
        <Link
          href={projectListHref(1, "냉동기")}
          className="inline-flex min-h-[53px] max-w-full items-center justify-center gap-2 rounded-[23px] border-4 border-brand-navy bg-brand-navy px-4 py-1 text-[23px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:text-[30px]"
        >
          철거 시공사례 보기 <ArrowRight size={28} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
