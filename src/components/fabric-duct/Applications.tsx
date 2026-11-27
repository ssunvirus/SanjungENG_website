"use client";

import Image from "next/image";
import Link from "next/link";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import ApplicationIcon from "./ApplicationIcon";

const applications = ["물류센터", "생산시설", "상업시설", "체육 / 공공시설"];

// image에 사진 경로를 넣고 title과 description을 수정하면 됩니다.
const slides: { title: string; image: string; description: string; href?: string }[] = [
  {
    title: "의약품 물류창고",
    image: "/images/projects/pharmaceutical-cold-storage-fabric-duct/thumbnail.jpg",
    description:
      "적재 배치와 보관 구역을 고려해 공기를 고르게 분배하여, 공간별 온도 편차를 줄이고 안정적인 보관환경과 쾌적한 작업환경을 조성합니다.",
    href: "/projects/pharmaceutical-cold-storage-fabric-duct",
  },
  {
    title: "오리온 생산설비",
    href: "/projects/orion-production",
    image: "/images/projects/orion-production/cc_P5243334.jpg",
    description: "생산 설비와 작업 구역에 맞춰\n공기를 고르게 공급해 쾌적한 작업환경을 조성합니다.",
  },
  {
    title: "가구매장",
    image: "/images/fabric-duct/application-commercial.jpg",
    description:
      "패브릭덕트가 가구 진열 구역과 고객 통로에 공기를 고르게 보내, 매장 어디서든 쾌적하게 가구를 둘러볼 수 있도록 돕습니다.",
  },
  {
    title: "구례 실내수영장",
    href: "/projects/gurye-pool",
    image: "/images/fabric-duct/hero.jpg",
    description:
      "실내수영장의 온도와 습도를 고려해 공기를 고르게 분배합니다. 세척이 가능한 패브릭덕트로 쾌적하고 위생적인 환경을 유지할 수 있습니다.",
  },
];

export default function Applications() {
  const [activeIndex, setActiveIndex] = useState(1);
  const slide = slides[activeIndex];

  function selectTab(index: number, moveFocus = false) {
    setActiveIndex(index);
    if (moveFocus) document.getElementById(`fabric-application-tab-${index}`)?.focus();
  }

  return (
    <section
      id="fabric-case"
      className="mx-auto h-auto w-full lg:max-w-[1440px] mb-9 lg:mb-[100px] scroll-mt-[110px] px-5 lg:px-10 pt-[24px] lg:pt-[36.12px]"
    >
      <div className="h-auto lg:h-[145.882px]">
        <SectionHeading eyebrow="APPLICATION" title="다양한 공간에 적용됩니다.">
          <p className="hidden lg:block">
            패브릭덕트는 저온저장고, 식품 생산시설, 물류센터, 스마트팜, 체육시설, 상업/공공시설 등에
            적용할 수 있습니다.
          </p>
        </SectionHeading>
      </div>
      <div
        role="tablist"
        aria-label="패브릭덕트 적용 공간"
        className="mt-6 grid grid-cols-2 gap-2 px-1 py-3 lg:mt-8 lg:flex lg:gap-3"
      >
        {applications.map((title, index) => (
          <button
            type="button"
            role="tab"
            id={`fabric-application-tab-${index}`}
            aria-selected={index === activeIndex}
            aria-controls="fabric-application-panel"
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => selectTab(index)}
            onKeyDown={(event) => {
              let nextIndex: number;
              if (event.key === "ArrowRight") nextIndex = (index + 1) % applications.length;
              else if (event.key === "ArrowLeft")
                nextIndex = (index + applications.length - 1) % applications.length;
              else if (event.key === "Home") nextIndex = 0;
              else if (event.key === "End") nextIndex = applications.length - 1;
              else return;
              event.preventDefault();
              selectTab(nextIndex, true);
            }}
            key={title}
            className={`flex min-h-[88px] min-w-0 w-full flex-1 flex-col cursor-pointer items-center justify-center gap-1.5 rounded-2xl border px-1 py-2.5 text-[16px] min-[360px]:text-[18px] font-semibold whitespace-nowrap transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue lg:min-h-[76px] lg:flex-row lg:rounded-full lg:px-2 lg:py-3 lg:text-[22px] xl:gap-2 xl:text-[28px] ${index === activeIndex ? "border-brand-blue bg-brand-blue text-white shadow-[0_6px_20px_rgba(0,173,219,0.18)]" : "border-white/80 bg-white/75 text-brand-navy shadow-[0_4px_16px_rgba(16,45,74,0.04)] hover:border-brand-blue/25 hover:bg-white hover:text-brand-blue"}`}
          >
            <ApplicationIcon index={index} className="size-[30px] shrink-0 lg:size-10 xl:size-11" />
            <span className="leading-[1.4]">{title}</span>
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="fabric-application-panel"
        aria-labelledby={`fabric-application-tab-${activeIndex}`}
        tabIndex={0}
        className="mt-[24px] lg:mt-[26px] grid grid-cols-1 lg:grid-cols-[minmax(0,904fr)_minmax(0,428fr)] gap-[28px] lg:gap-[36px] focus-visible:outline-2 focus-visible:outline-brand-blue"
      >
        <figure className="relative aspect-[904/504] lg:aspect-auto lg:h-[504px] w-full min-w-0 overflow-hidden rounded-[10px]">
          <div
            className={
              activeIndex === 1
                ? "absolute inset-0 lg:inset-auto lg:top-[-16.12%] lg:h-[134.47%] w-full"
                : "absolute inset-0"
            }
          >
            <Image
              key={slide.image}
              src={slide.image}
              alt={`${slide.title} 패브릭덕트 설치 현장`}
              fill
              sizes="(max-width: 1023px) 100vw, 904px"
              quality={85}
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[76.761%] via-black/60 via-[87.383%] to-black/80"
          />
          <figcaption className="absolute bottom-5 left-5 lg:bottom-[27px] lg:left-[44px] text-[16px] lg:text-[25px] font-semibold text-white/80">
            {slide.title}
          </figcaption>
        </figure>
        <div className="w-full min-w-0 pt-0 lg:pt-[38px]">
          <p className="flex h-9 lg:h-[47px] w-fit lg:min-w-[187px] items-center justify-center border-[1.5px] border-brand-blue px-[20px] lg:px-[21px] text-[16px] lg:text-[25px] leading-[24px] lg:leading-[35px] text-brand-blue">
            {applications[activeIndex]}
          </p>
          <h3 className="mt-4 lg:mt-[34px] text-[24px] lg:text-[45px] font-bold leading-[1.35] lg:leading-[54px] tracking-[1px] lg:tracking-[2.25px] text-brand-navy">
            {slide.title}
          </h3>
          <p className="mt-3 lg:mt-[28px] whitespace-pre-line break-keep text-pretty text-[15px] lg:text-[20px] leading-[26px] lg:leading-[35px]">
            {slide.description}
          </p>
          {slide.href && (
            <Link
              href={projectListHref(1, "패브릭덕트")}
              className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-lg bg-brand-navy px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:mt-8 lg:text-lg"
            >
              시공사례 보러가기 <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
