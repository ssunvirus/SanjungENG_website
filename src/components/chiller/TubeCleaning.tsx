"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    title: "수실 개방 및 세관",
    description: "수실 커버를 열고 전열관 내부의 스케일과 이물질을 제거합니다.",
    photo: "/images/chiller/tube-cleaning-work.png",
    alt: "수실 커버를 개방한 냉동기의 전열관을 세관하는 작업자",
  },
  {
    title: "건조 및 방청 도장",
    description: "세척한 부위를 건조한 뒤, 방청이 필요한 부위에 방청도료를 도포합니다.",
    photo: "/images/chiller/tube-cleaning-rustproofing.jpeg",
    alt: "냉동기 수실 내부와 커버에 방청도료를 도포한 모습",
  },
  {
    title: "조립 및 시운전",
    description: "분해한 부위를 조립하고, 시운전을 통해 누수 여부와 운전 상태를 확인합니다.",
    photo: "/images/chiller/tube-cleaning-completed.png",
    alt: "수실 커버 조립을 마친 냉동기와 주변 배관이 보이는 설비실 전경",
  },
];

function mobilePhoto(src: string) {
  return src.replace("/chiller/", "/chiller/mobile/").replace(/\.[^.]+$/, ".webp");
}

function CleaningImage({ src, alt, ...props }: Omit<ImageProps, "src"> & { src: string }) {
  return (
    <picture>
      <source media="(max-width: 1023px)" srcSet={mobilePhoto(src)} type="image/webp" />
      <Image {...props} src={src} alt={alt} />
    </picture>
  );
}

export default function TubeCleaning() {
  const [activeStep, setActiveStep] = useState(0);
  const [comparisonIndex, setComparisonIndex] = useState(0);
  const comparisons = [
    {
      before: "/images/chiller/tube-cleaning-before-103719.jpg",
      after: "/images/chiller/tube-cleaning-after-7684-highres.jpeg",
    },
    {
      before: "/images/chiller/tube-cleaning-before.jpg",
      after: "/images/chiller/tube-cleaning-after-highres.jpeg",
    },
    {
      before: "/images/chiller/tube-cleaning-case3-before.png",
      after: "/images/chiller/tube-cleaning-case3-after.png",
    },
  ];
  const comparison = comparisons[comparisonIndex];
  const selectedStep = steps[activeStep];
  const nextComparison = comparisons[(comparisonIndex + 1) % comparisons.length];
  const nextStep = steps[(activeStep + 1) % steps.length];
  useEffect(() => {
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    // Warm only the next mobile photos; leave desktop requests unchanged.
    const timer = window.setTimeout(() => {
      for (const src of [nextStep.photo, nextComparison.before, nextComparison.after]) {
        const photo = new window.Image();
        photo.fetchPriority = "low";
        photo.src = mobilePhoto(src);
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [nextStep.photo, nextComparison.before, nextComparison.after]);
  return (
    <section
      aria-labelledby="chiller-cleaning-heading"
      className="mx-auto max-w-[1440px] break-keep px-5 py-12 lg:px-[63px] lg:py-20"
    >
      <header className="mb-7 lg:mb-10">
        <p
          data-section-eyebrow
          className="flex items-center gap-3 text-sm font-semibold tracking-[3px] text-brand-blue lg:text-[20px]"
        >
          TUBE CLEANING
          <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
        </p>
        <h2
          id="chiller-cleaning-heading"
          className="mt-3 text-[32px] font-bold tracking-[1px] text-brand-navy lg:text-[50px]"
        >
          냉동기 세관은 어떻게 진행되나요?
        </h2>
      </header>

      <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#E8EFF3]">
          <CleaningImage
            src="/images/chiller/tube-cleaning-overview.png"
            unoptimized
            alt="수실 커버를 개방하고 주변을 보양한 냉동기 세관 작업 현장"
            fill
            sizes="(min-width: 1440px) 658px, (min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div>
          <h3 className="text-balance text-[28px] font-bold leading-[1.45] tracking-tight text-brand-navy lg:text-[38px]">
            <span className="block">열교환기 안에 쌓인 오염물,</span>
            <span className="block">
              <span className="text-brand-blue">세관</span>으로 제거합니다.
            </span>
          </h3>
          <p className="mt-5 text-[18px] font-semibold leading-8 text-brand-navy/85 lg:text-[20px] lg:leading-9">
            <span className="block">전열관 내부의 스케일과 이물질을 확인하고 세척합니다.</span>
            <span className="mt-2 block">
              냉동기 종류와 오염 상태에 따라 작업 방법과 범위를 안내해 드립니다.
            </span>
          </p>
          <dl className="mt-7 space-y-3 border-t border-brand-navy/10 pt-6 text-[18px] font-semibold leading-8 text-brand-navy lg:text-[20px]">
            <div className="grid grid-cols-[104px_1fr] items-start gap-3 lg:gap-4">
              <dt className="rounded-[5px] border border-brand-blue/25 bg-brand-blue/10 px-2 py-1 text-center font-bold text-brand-navy">
                작업 부위
              </dt>
              <dd className="py-1">열교환기, 전열관 내부</dd>
            </div>
            <div className="grid grid-cols-[104px_1fr] items-start gap-3 lg:gap-4">
              <dt className="rounded-[5px] border border-brand-blue/25 bg-brand-blue/10 px-2 py-1 text-center font-bold text-brand-navy">
                작업 범위
              </dt>
              <dd className="py-1">수실 개방 및 세관, 건조 및 방청 도장, 조립 및 시운전</dd>
            </div>
          </dl>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-[8px] bg-brand-navy px-6 py-3 text-lg font-bold lg:text-xl text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none"
          >
            세관 작업 문의 <ArrowUpRight aria-hidden="true" size={20} />
          </Link>
        </div>
      </div>

      <div className="mt-12 grid gap-5 border-t border-brand-navy/10 pt-8 lg:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-x-10 lg:gap-y-6 lg:pt-10">
        <div className="flex items-center justify-between gap-4 lg:col-span-2">
          <h3 className="text-[26px] font-bold leading-snug tracking-tight text-brand-navy lg:text-[32px]">
            이런 순서로 진행됩니다
          </h3>
        </div>
        <div
          id="cleaning-step-photo"
          role="region"
          aria-label={`${selectedStep.title} 사진`}
          className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#E8EFF3] lg:aspect-auto lg:min-h-0 lg:self-stretch"
        >
          {selectedStep.photo ? (
            <CleaningImage
              src={selectedStep.photo}
              alt={selectedStep.alt || selectedStep.title}
              fill
              sizes="(min-width: 1440px) 420px, (min-width: 1024px) 33vw, 100vw"
              unoptimized
              className="object-cover object-center"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center px-5 text-center text-lg font-semibold text-brand-navy/75"
              role="status"
            >
              {selectedStep.title} 사진 준비 중
            </div>
          )}
        </div>
        <ol className="divide-y divide-brand-navy/10 lg:col-start-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className={`flex flex-col gap-3 rounded-[10px] px-4 py-5 transition-colors sm:flex-row sm:gap-5 lg:gap-7 lg:px-5 lg:py-6 motion-reduce:transition-none ${activeStep === index ? "bg-brand-blue/10" : "bg-transparent"}`}
            >
              <span className="inline-flex h-10 shrink-0 self-start items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{index + 1}</span>
              </span>
              <div className="min-w-0 flex-1">
                <h4>
                  <button
                    type="button"
                    aria-pressed={activeStep === index}
                    aria-controls="cleaning-step-photo"
                    onClick={() => setActiveStep(index)}
                    className={`flex min-h-11 w-full cursor-pointer items-center rounded-sm text-left text-[22px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue motion-reduce:transition-none lg:text-[24px] ${activeStep === index ? "text-brand-blue" : "text-brand-navy hover:text-brand-blue"}`}
                  >
                    {step.title}
                  </button>
                </h4>
                <p className="mt-3 text-[18px] font-semibold leading-8 text-brand-navy/85 lg:text-[20px] lg:leading-9">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-12 border-t border-brand-navy/15 pt-7 lg:mt-16 lg:pt-9">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[26px] font-bold text-brand-navy lg:text-[32px]">세관 전과 후</h3>
          <p className="text-lg font-semibold tabular-nums text-brand-navy" aria-live="polite">
            사례 {comparisonIndex + 1} / {comparisons.length}
          </p>
        </div>
        <div className="relative px-7 sm:px-12">
          <button
            type="button"
            aria-label="이전 세관 전후 사례"
            onClick={() =>
              setComparisonIndex(
                (current) => (current + comparisons.length - 1) % comparisons.length,
              )
            }
            className="absolute left-0 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-sm hover:bg-brand-blue/10 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                label: "세관 전",
                src: comparison.before,
                alt: "세관 전 오염물과 부식 흔적이 남아 있는 냉동기 수실 내부",
              },
              {
                label: "세관 후",
                src: comparison.after,
                alt: "세관과 방청 도장을 마친 냉동기 수실 내부",
              },
            ].map(({ label, src, alt }) => (
              <figure key={label}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-[#E8EFF3]">
                  <CleaningImage
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1440px) 647px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-3 text-lg font-semibold text-brand-navy lg:text-xl">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            type="button"
            aria-label="다음 세관 전후 사례"
            onClick={() => setComparisonIndex((current) => (current + 1) % comparisons.length)}
            className="absolute right-0 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-sm hover:bg-brand-blue/10 focus-visible:outline-2 focus-visible:outline-brand-blue"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
