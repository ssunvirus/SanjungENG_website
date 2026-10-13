"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const applications = [
  ["물류센터", "보관 구역과 적재물 맞춤 공기분배"],
  ["생산시설", "작업 구역과 설비 배치에 맞춤 공기분배"],
  ["상업시설", "다양한 상업공간에 맞춘 효율적인 공기분배"],
  ["체육 / 공공시설", "넓은 실내 공간에 맞춤 공기분배"],
];

// image에 사진 경로를 넣고 title과 description을 수정하면 됩니다.
const slides: { title: string; image: string | null; description: string }[] = [
  {
    title: "광저우 물류센터",
    image: "/images/fabric-duct/application-warehouse.jpg",
    description:
      "적재 배치와 보관 구역을 고려해 공기를 고르게 공급,\n보관 환경에 맞는 기류공급을 조성합니다.",
  },
  {
    title: "오리온 생산설비",
    image: "/images/fabric-duct/application-production.png",
    description:
      "생산 설비와 작업 구역에 맞춰\n공기를 고르게 공급해 쾌적한 작업환경을 조성합니다.",
  },
  {
    title: "상업시설",
    image: "/images/fabric-duct/application-commercial.jpg",
    description:
      "넓은 상업공간에 공기를 균일하게 분배해\n공간별 온도 편차를 줄이고 쾌적함을 높입니다.",
  },
  {
    title: "구례 실내수영장",
    image: "/images/fabric-duct/hero.png",
    description:
      "실내수영장의 온/습도 조건을 고려한 고른 공기 분배와\n세척 가능한 섬유덕트로 쾌적하고 위생적인 실내 환경을 조성합니다.",
  },
];
const underlinePositions = [0, 370, 740, 1110];

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
      className="mx-auto h-auto w-full lg:w-[1440px] mb-9 lg:mb-[100px] scroll-mt-[110px] px-5 lg:px-0 lg:pl-[46px] pt-[24px] lg:pt-[36.12px]"
    >
      <div className="h-auto lg:h-[145.882px]">
        <SectionHeading eyebrow="APPLICATION" title="다양한 공간에 적용됩니다.">
          <p className="hidden lg:block">
            섬유덕트는 저온저장고, 식품 생산시설, 물류센터, 스마트팜, 체육시설, 상업/공공시설 등에
            적용할 수 있습니다.
          </p>
        </SectionHeading>
      </div>
      <div
        role="tablist"
        aria-label="섬유덕트 적용 공간"
        className="mt-[24px] lg:mt-[63.118px] grid grid-cols-2 lg:flex gap-x-4 gap-y-3 lg:gap-[60px] font-semibold"
      >
        {applications.map(([title, description], index) => (
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
            className={`min-h-12 min-w-0 w-full lg:w-[310px] shrink-0 cursor-pointer border-b-2 pb-3 text-left lg:border-0 lg:pb-0 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#00ADDB] ${index === activeIndex ? "border-[#00ADDB]" : "border-[#B7C6CF]"}`}
          >
            <span
              className={`mb-2 block text-base lg:text-[25px] leading-6 lg:leading-[30px] transition-colors ${index === activeIndex ? "text-[#00ADDB]" : "text-[#102D4A]/80"}`}
            >
              {title}
            </span>
            <span className="mt-[6px] hidden lg:block lg:whitespace-nowrap text-[20px] leading-[24px] text-[#102D4A]/60">
              {description}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-[#102D4A]/70 lg:hidden">
        {applications[activeIndex][1]}
      </p>
      <div className="hidden lg:block relative ml-[4px] mt-[24px] lg:mt-[26px]">
        <Image
          src="/images/fabric-duct/application-line.svg"
          width={1363}
          height={2}
          alt=""
          aria-hidden="true"
        />
        <Image
          src="/images/fabric-duct/application-active-line.svg"
          width={253}
          height={2}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 transition-transform duration-300 motion-reduce:transition-none"
          style={{ transform: `translateX(${underlinePositions[activeIndex]}px)` }}
        />
      </div>
      <div
        role="tabpanel"
        id="fabric-application-panel"
        aria-labelledby={`fabric-application-tab-${activeIndex}`}
        tabIndex={0}
        className="mt-[24px] lg:mt-[26px] flex flex-col lg:flex-row gap-[28px] lg:gap-[36px] focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
      >
        <figure className="relative aspect-[904/504] lg:aspect-auto lg:h-[504px] w-full lg:w-[904px] shrink-0 overflow-hidden rounded-[10px]">
          {slide.image ? (
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
                alt={`${slide.title} 섬유덕트 설치 현장`}
                fill
                sizes="(max-width: 1023px) 100vw, 904px"
                quality={100}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#DFEEF5] text-[16px] lg:text-[25px] text-[#102D4A]/60">
              준비 중입니다.
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[76.761%] via-black/60 via-[87.383%] to-black/80"
          />
          <figcaption className="absolute bottom-5 left-5 lg:bottom-[27px] lg:left-[44px] text-[16px] lg:text-[25px] font-semibold text-white/80">
            {slide.title}
          </figcaption>
        </figure>
        <div className="w-full lg:w-[428px] pt-0 lg:pt-[38px]">
          <p className="flex h-9 lg:h-[47px] w-fit lg:min-w-[187px] items-center justify-center border-[1.5px] border-[#00ADDB] px-[20px] lg:px-[21px] text-[16px] lg:text-[25px] leading-[24px] lg:leading-[35px] text-[#00ADDB]">
            {applications[activeIndex][0]}
          </p>
          <h3 className="mt-4 lg:mt-[34px] text-[24px] lg:text-[45px] font-bold leading-[1.35] lg:leading-[54px] tracking-[1px] lg:tracking-[2.25px] text-[#102D4A]">
            {slide.title}
          </h3>
          <p className="mt-3 lg:mt-[28px] whitespace-pre-line text-[15px] lg:text-[20px] leading-[26px] lg:leading-[35px]">
            {slide.description}
          </p>
        </div>
      </div>
    </section>
  );
}
