"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

const applications = [
  ["물류센터", "보관 구역과 적재물 맞춤 공기분배"],
  ["생산시설", "작업 구역과 설비 배치에 맞춤 공기분배"],
  ["스마트팜", "재배공간과 환경 조건에 맞춤 공기분배"],
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
      "생산 설비와 작업 구역에 맞춰\n공기를 고르게 공급해 쾌적한 작업환경을 조성했습니다.",
  },
  {
    title: "스마트팜",
    image: null,
    description:
      "작물과 재배 구역의 배치를 고려해 공기를 고르게\n 공급하고 균일한 재배 환경 조성합니다.",
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
      className="mx-auto h-auto w-[1440px] mb-[100px] scroll-mt-[110px] pl-[46px] pt-[36.12px]"
    >
      <div className="h-[145.882px]">
        <SectionHeading eyebrow="APPLICATION" title="다양한 공간에 적용됩니다.">
          <p>
            섬유덕트는 저온저장고, 식품 생산시설, 물류센터, 스마트팜, 체육시설, 상업/공공시설 등에
            적용할 수 있습니다.
          </p>
        </SectionHeading>
      </div>
      <div
        role="tablist"
        aria-label="섬유덕트 적용 공간"
        className="mt-[63.118px] flex gap-[60px] font-semibold"
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
            className="w-[310px] shrink-0 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#00ADDB]"
          >
            <span
              className={`mb-[10px] block text-[25px] leading-[30px] transition-colors ${index === activeIndex ? "text-[#00ADDB]" : "text-[#102D4A]/80"}`}
            >
              {title}
            </span>
            <span className="mt-[6px] block whitespace-nowrap text-[20px] leading-[24px] text-[#102D4A]/60">
              {description}
            </span>
          </button>
        ))}
      </div>
      <div className="relative ml-[4px] mt-[26px]">
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
        className="mt-[26px] flex gap-[36px] focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
      >
        <figure className="relative h-[504px] w-[904px] shrink-0 overflow-hidden rounded-[10px]">
          {slide.image ? (
            <div
              className={
                activeIndex === 1 ? "absolute top-[-16.12%] h-[134.47%] w-full" : "absolute inset-0"
              }
            >
              <Image
                key={slide.image}
                src={slide.image}
                alt={`${slide.title} 섬유덕트 설치 현장`}
                fill
                sizes="904px"
                quality={100}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#DFEEF5] text-[25px] text-[#102D4A]/60">
              준비중입니다.
            </div>
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[76.761%] via-black/60 via-[87.383%] to-black/80"
          />
          <figcaption className="absolute bottom-[27px] left-[44px] text-[25px] font-semibold text-white/80">
            {slide.title}
          </figcaption>
        </figure>
        <div className="w-[428px] pt-[38px]">
          <p className="flex h-[47px] w-fit min-w-[187px] items-center justify-center border-[1.5px] border-[#00ADDB] px-[21px] text-[25px] leading-[35px] text-[#00ADDB]">
            {applications[activeIndex][0]}
          </p>
          <h3 className="mt-[34px] text-[45px] font-bold leading-[54px] tracking-[2.25px] text-[#102D4A]">
            {slide.title}
          </h3>
          <p className="mt-[28px] whitespace-pre-line text-[20px] leading-[35px]">
            {slide.description}
          </p>
        </div>
      </div>
    </section>
  );
}
