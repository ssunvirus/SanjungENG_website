"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import WorkProcessCards from "@/src/components/shared/WorkProcessCards";
import { projectListHref } from "@/src/lib/project-list-navigation";

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

function previewPhoto(src: string) {
  return src.replace("/chiller/", "/chiller/preview/").replace(/\.[^.]+$/, ".webp");
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
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeStep]);

  const [comparisonIndex, setComparisonIndex] = useState(0);
  const comparisonTrack = useRef<HTMLDivElement>(null);
  const comparisonSection = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDialogElement>(null);
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null);
  useEffect(() => {
    const dialog = previewRef.current;
    if (!preview || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);
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
  useEffect(() => {
    const section = comparisonSection.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        for (const src of [comparison.before, comparison.after]) {
          const photo = new window.Image();
          photo.fetchPriority = "low";
          photo.src = previewPhoto(src);
        }
        observer.disconnect();
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [comparison.before, comparison.after]);
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
            <span className="block">전열관 내부의 스케일과 이물질을 브러시로 세척.</span>
            <span className="mt-2 block">냉동기 종류와 오염 상태에 맞춰 세관을 진행합니다.</span>
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
            냉동기 세관 작업 과정
          </h3>
        </div>
        <div className="-mt-8 min-w-0 lg:hidden">
          <WorkProcessCards
            mobileCarousel
            steps={steps.map((step, index) => ({
              number: String(index + 1).padStart(2, "0"),
              title: step.title,
              mobileTitle: ["수실 개방 및 세관", "건조 및 방청 도장", "조립 및 시운전"][index],
              description: step.description,
              image: mobilePhoto(step.photo),
              alt: step.alt,
              unoptimized: true,
            }))}
          />
        </div>
        <div
          id="cleaning-step-photo"
          role="region"
          aria-label={`${selectedStep.title} 사진`}
          className="relative hidden overflow-hidden rounded-[10px] bg-[#E8EFF3] lg:block lg:min-h-0 lg:self-stretch"
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
        <ol className="hidden divide-y divide-brand-navy/10 lg:col-start-2 lg:block">
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

      <div
        ref={comparisonSection}
        className="mt-12 border-t border-brand-navy/15 pt-7 lg:mt-16 lg:pt-9"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[26px] font-bold text-brand-navy lg:text-[32px]">사진으로 보는 세관 효과</h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="이전 세관 전후 사례"
              onClick={() =>
                setComparisonIndex(
                  (current) => (current + comparisons.length - 1) % comparisons.length,
                )
              }
              className="hidden size-11 lg:flex cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-sm hover:bg-brand-blue/10 focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <p className="text-base font-bold tabular-nums text-brand-navy" aria-live="polite">
              사례 {comparisonIndex + 1} / {comparisons.length}
            </p>
            <button
              type="button"
              aria-label="다음 세관 전후 사례"
              onClick={() => setComparisonIndex((current) => (current + 1) % comparisons.length)}
              className="hidden size-11 lg:flex cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white text-brand-navy shadow-sm hover:bg-brand-blue/10 focus-visible:outline-2 focus-visible:outline-brand-blue"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="lg:hidden">
          <div
            ref={comparisonTrack}
            aria-label="세관 전후 사례 사진, 좌우로 넘겨보기"
            className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(event) => {
              const track = event.currentTarget;
              const first = track.children[0] as HTMLElement | undefined;
              if (!first) return;
              let nearest = 0;
              let distance = Infinity;
              Array.from(track.children).forEach((child, index) => {
                const delta = Math.abs(
                  (child as HTMLElement).offsetLeft - first.offsetLeft - track.scrollLeft,
                );
                if (delta < distance) {
                  nearest = index;
                  distance = delta;
                }
              });
              setComparisonIndex(nearest);
            }}
          >
            {comparisons.map((item, index) => (
              <div
                key={item.before}
                role="group"
                aria-label={`사례 ${index + 1}`}
                className="w-[90%] shrink-0 snap-start rounded-[24px] border border-brand-navy/10 bg-white/85 p-4 shadow-[0_10px_30px_rgba(16,45,74,0.07)] last:mr-[10%]"
              >
                <div className="grid gap-4">
                  {[
                    { label: "세관 전", src: item.before },
                    { label: "세관 후", src: item.after },
                  ].map((photo) => (
                    <figure key={photo.label} className="min-w-0">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`사례 ${index + 1} ${photo.label} 사진 확대`}
                        onClick={() =>
                          setPreview({ src: photo.src, title: `사례 ${index + 1} ${photo.label}` })
                        }
                        className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[8px] bg-[#E8EFF3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      >
                        <Image
                          src={mobilePhoto(photo.src)}
                          alt={`사례 ${index + 1} ${photo.label} 냉동기 수실 내부`}
                          fill
                          unoptimized
                          sizes="90vw"
                          className="object-cover object-center"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-brand-navy/80 text-white"
                        >
                          <ZoomIn size={18} />
                        </span>
                      </button>
                      <figcaption
                        className={`mt-2 text-sm font-bold ${photo.src === item.after ? "text-brand-blue" : "text-brand-navy"}`}
                      >
                        {photo.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-center gap-1">
            {comparisons.map((item, index) => (
              <button
                key={item.before}
                type="button"
                aria-label={`세관 전후 사례 ${index + 1} 보기`}
                aria-pressed={comparisonIndex === index}
                onClick={() => {
                  const track = comparisonTrack.current;
                  const card = track?.children[index] as HTMLElement | undefined;
                  const first = track?.children[0] as HTMLElement | undefined;
                  if (track && card && first)
                    track.scrollTo({
                      left: card.offsetLeft - first.offsetLeft,
                      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "instant"
                        : "smooth",
                    });
                }}
                className="flex size-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 rounded-full ${comparisonIndex === index ? "w-5 bg-brand-blue" : "w-2 bg-brand-navy/20"}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="hidden rounded-[28px] border border-brand-navy/10 bg-white/85 p-5 shadow-[0_10px_30px_rgba(16,45,74,0.07)] lg:block lg:p-6">
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
              <figure key={label} className="relative min-w-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[#E8EFF3]">
                  <CleaningImage
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="(min-width: 1440px) 647px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption
                  className={`absolute left-4 top-4 rounded-full px-4 py-2 text-base font-bold shadow-sm ${src === comparison.after ? "bg-brand-blue text-white" : "bg-white/95 text-brand-navy"}`}
                >
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center lg:mt-8">
        <Link
          href={projectListHref(1, "냉동기")}
          className="flex min-h-[53px] w-fit max-w-full items-center justify-center gap-[8px] rounded-[23px] border-[4px] border-brand-navy bg-brand-navy px-3 text-[30px] font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.25)] transition-colors hover:bg-[#16436b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          세관 시공사례 보기
          <ArrowRight size={34} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>
      <dialog
        ref={previewRef}
        aria-label={preview ? `${preview.title} 확대 보기` : "사진 확대 보기"}
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) previewRef.current?.close();
        }}
        className="fixed inset-0 m-auto w-[96vw] max-w-[1400px] max-h-[94dvh] overflow-auto rounded-xl border-0 bg-brand-navy p-3 text-white shadow-xl backdrop:bg-black/80 sm:p-5"
      >
        {preview && (
          <>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-lg font-bold">{preview.title}</p>
              <button
                type="button"
                aria-label="확대 사진 닫기"
                onClick={() => previewRef.current?.close()}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[75dvh]">
              <Image
                key={preview.src}
                src={previewPhoto(preview.src)}
                alt={`${preview.title} 냉동기 수실 내부`}
                fill
                unoptimized
                sizes="96vw"
                className="object-contain"
              />
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
