"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides as slides } from "./hero-slides";
import { useHeroCarousel } from "@/src/hooks/use-hero-carousel";

export default function Hero() {
  const { currentSlide, setCurrentSlide, isPlaying, setIsPlaying, move } = useHeroCarousel(
    slides.length,
    true,
  );

  const showPreviousSlide = () => {
    setIsPlaying(false);
    move(-1);
  };

  const showNextSlide = () => {
    setIsPlaying(false);
    move(1);
  };

  const showSlide = (index: number) => {
    setIsPlaying(false);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative isolate mx-auto h-[900px] w-full max-w-[1920px] overflow-hidden bg-brand-navy text-white"
      aria-roledescription="carousel"
      aria-label="산정엔지니어링 주요 서비스"
    >
      {slides.map((item, index) => (
        <div
          key={item.image}
          className={`pointer-events-none absolute inset-0 bg-[#082d56] transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={index === 1 ? "absolute inset-y-0 left-[20%] w-[80%]" : "absolute inset-0"}
          >
            <Image
              src={item.image}
              alt={index === currentSlide ? item.imageAlt : ""}
              fill
              priority={index === 0}
              sizes={index === 1 ? "1536px" : "1920px"}
              style={index === 1 ? { objectPosition: "center 42%" } : undefined}
              className="pointer-events-none z-0 object-cover"
            />
          </div>
          {index === 1 && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,#082d56_0%,#082d56_20%,rgba(8,45,86,0.75)_28%,rgba(8,45,86,0.4)_38%,rgba(8,45,86,0.1)_50%,transparent_60%)]"
            />
          )}
        </div>
      ))}

      <div
        key={currentSlide}
        className="absolute top-[178px] left-[239px] z-10 animate-[hero-content_700ms_ease-out]"
        aria-live="polite"
      >
        <p className="text-[23px] font-bold leading-[29px] text-brand-blue">{slide.category}</p>

        <h2 className="mt-[34px] text-[45px] font-extrabold leading-[56px]">
          {slide.title[0]}
          <br />
          {slide.title[1]}
        </h2>

        <p className="mt-[34px] text-[34px] font-medium leading-[42px]">{slide.subtitle}</p>

        <p className="mt-[34px] whitespace-pre text-[23px] font-normal leading-[29px]">
          {slide.details}
        </p>

        <div className="mt-[34px] flex gap-[26px]">
          <Link
            href={slide.projectsHref}
            className="flex h-[65px] w-[210px] items-center justify-center rounded-[23px] bg-brand-blue text-[30px] font-semibold"
          >
            시공사례&nbsp; →
          </Link>
          <Link
            href="/contact"
            className="flex h-[65px] w-[210px] items-center justify-center rounded-[23px] border border-white bg-white/30 text-[30px] font-semibold"
          >
            견적 문의&nbsp; →
          </Link>
        </div>
      </div>

      <div
        className="pointer-events-auto absolute bottom-[60px] left-[237px] z-20 flex h-12 items-center gap-2"
        aria-label="Hero 슬라이드 컨트롤"
      >
        <div className="mr-5 flex gap-3">
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => showSlide(index)}
              className="group flex h-12 w-20 cursor-pointer items-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={`${index + 1}번 슬라이드 보기`}
              aria-current={index === currentSlide}
            >
              <span
                aria-hidden="true"
                className={`h-[3px] w-full transition-colors ${
                  index === currentSlide ? "bg-brand-blue" : "bg-white/75 group-hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={isPlaying ? "슬라이드 일시 정지" : "슬라이드 자동 재생"}
        >
          {isPlaying ? (
            <Pause size={18} aria-hidden="true" />
          ) : (
            <Play size={18} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={showPreviousSlide}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={showNextSlide}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-brand-navy text-white transition-colors hover:bg-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label="다음 슬라이드"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
