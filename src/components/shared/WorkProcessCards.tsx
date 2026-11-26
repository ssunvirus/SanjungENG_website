"use client";

import Image from "next/image";
import { useId, useRef, useState, type ReactNode } from "react";

export type WorkProcessStep = {
  number: string;
  title: string;
  mobileTitle?: string;
  description: ReactNode;
  image: string;
  alt?: string;
  unoptimized?: boolean;
  imageClassName?: string;
  imageSizes?: string;
};

export default function WorkProcessCards({
  steps,
  mobileCarousel = false,
  desktopColumns = 4,
}: {
  steps: readonly WorkProcessStep[];
  mobileCarousel?: boolean;
  desktopColumns?: 3 | 4;
}) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLOListElement>(null);
  const listId = useId();
  function moveTo(index: number) {
    const list = track.current;
    const card = list?.children[index] as HTMLElement | undefined;
    const first = list?.children[0] as HTMLElement | undefined;
    if (!list || !card || !first) return;
    list.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div className="relative mt-8 lg:mt-10">
      {mobileCarousel && (
        <nav aria-label="작업 단계" className="mb-3 lg:hidden">
          <ol className="flex">
            {steps.map((step, index) => (
              <li key={step.number} className="relative min-w-0 flex-1">
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 right-[-50%] top-[21px] h-px bg-brand-blue/25"
                  />
                )}
                <button
                  type="button"
                  aria-current={active === index ? "step" : undefined}
                  aria-controls={listId}
                  onClick={() => moveTo(index)}
                  className="relative flex min-h-20 w-full cursor-pointer flex-col items-center gap-2 rounded-md px-1 text-center focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-full border-2 text-lg font-bold tabular-nums ${active === index ? "border-brand-blue bg-brand-blue text-white" : "border-brand-blue/25 bg-[#E3F6FC] text-brand-navy"}`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-[13px] font-bold leading-5 break-keep ${active === index ? "text-brand-blue" : "text-brand-navy"}`}
                  >
                    {step.mobileTitle || step.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <ol
        id={listId}
        ref={track}
        aria-label={mobileCarousel ? "단계별 작업 사진" : undefined}
        onScroll={
          mobileCarousel
            ? (event) => {
                const list = event.currentTarget;
                const first = list.children[0] as HTMLElement | undefined;
                if (!first) return;
                let nearest = 0;
                let distance = Infinity;
                Array.from(list.children).forEach((child, index) => {
                  const delta = Math.abs(
                    (child as HTMLElement).offsetLeft - first.offsetLeft - list.scrollLeft,
                  );
                  if (delta < distance) {
                    nearest = index;
                    distance = delta;
                  }
                });
                setActive(nearest);
              }
            : undefined
        }
        className={
          mobileCarousel
            ? `relative z-10 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid ${desktopColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} lg:gap-5 lg:overflow-visible lg:p-0`
            : `relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${desktopColumns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} lg:gap-5`
        }
      >
        {steps.map((step) => (
          <li
            key={step.number}
            className={`group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none ${mobileCarousel ? "w-[90%] shrink-0 snap-start last:mr-[10%] lg:w-auto lg:last:mr-0" : ""}`}
          >
            <div
              className={
                mobileCarousel
                  ? "relative aspect-[4/3] overflow-hidden bg-[#F1FAFD] lg:aspect-auto lg:h-[410px]"
                  : "relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]"
              }
            >
              <Image
                src={step.image}
                alt={step.alt || `${step.title} 작업 현장`}
                fill
                sizes={
                  step.imageSizes || "(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                }
                quality={100}
                unoptimized={step.unoptimized}
                className={`object-cover ${step.imageClassName || ""}`}
              />
            </div>
            <div
              className={`relative px-5 pb-6 pt-8 ${mobileCarousel ? "min-h-[150px] lg:min-h-0" : ""}`}
            >
              <span className="absolute -top-5 left-5 inline-flex h-10 items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{Number(step.number)}</span>
              </span>
              <h3 className="text-xl font-bold text-brand-navy lg:text-[23px]">{step.title}</h3>
              <p className="mt-2 text-base font-semibold leading-7 text-brand-text/70">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {mobileCarousel && (
        <div
          className="mt-3 flex items-center justify-center gap-3 lg:hidden"
          aria-label="현재 단계"
        >
          {steps.map((step, index) => (
            <span
              key={step.number}
              aria-hidden="true"
              className={`h-2 rounded-full ${active === index ? "w-5 bg-brand-blue" : "w-2 bg-brand-navy/20"}`}
            />
          ))}
          <span className="sr-only" aria-live="polite">
            전체 {steps.length}단계 중 {active + 1}단계
          </span>
        </div>
      )}
    </div>
  );
}
