"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { heroSlides } from "@/src/components/home/hero-slides";
import { useHeroCarousel } from "@/src/hooks/use-hero-carousel";

export default function MobileHero() {
  const {
    currentSlide: heroIndex,
    setCurrentSlide: setHeroIndex,
    setIsInteracting,
    move,
  } = useHeroCarousel(heroSlides.length, false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const slide = heroSlides[heroIndex];

  return (
    <section
      aria-label="주요 솔루션"
      onTouchStart={(event) => {
        if (event.touches.length !== 1) {
          touchStart.current = null;
          return;
        }
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
        setIsInteracting(true);
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        setIsInteracting(false);
        if (!start || event.changedTouches.length === 0) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (event.cancelable) event.preventDefault();

        move(deltaX < 0 ? 1 : -1);
      }}
      onTouchCancel={() => {
        touchStart.current = null;
        setIsInteracting(false);
      }}
      className="relative isolate flex min-h-[480px] flex-col justify-center overflow-hidden px-6 pb-20 pt-16 text-white"
    >
      <Image
        src={slide.image}
        alt="산정엔지니어링 시공 현장"
        fill
        priority
        sizes="(max-width: 1439px) 100vw, 1px"
        className={`-z-20 object-cover ${slide.imagePosition}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/95 via-brand-navy/60 to-brand-navy/20"
      />
      <div className="mx-auto w-full max-w-[600px]">
        <p className="text-base font-bold text-brand-blue">{slide.category}</p>
        <h2 className="mt-6 text-[34px] font-extrabold leading-[1.3]">
          {slide.title[0]}
          <br />
          {slide.title[1]}
        </h2>
        <p className="mt-3 text-base font-semibold leading-7">{slide.mobileDescription}</p>
        <div className="mt-6 flex max-w-[210px] flex-col gap-3">
          <Link
            href="/projects"
            className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-blue font-bold"
          >
            시공사례 보기
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-white font-bold"
          >
            견적문의
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 flex items-center gap-6">
          <span className="text-sm tracking-widest">0{heroIndex + 1} / 02</span>
          <div className="flex gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.category}
                onClick={() => setHeroIndex(index)}
                aria-label={`${item.category} 보기`}
                aria-pressed={heroIndex === index}
                className="flex size-11 items-center justify-center"
              >
                <span
                  className={`h-[6px] w-6 rounded-full ${
                    heroIndex === index ? "bg-brand-blue" : "bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
