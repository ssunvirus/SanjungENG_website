"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroSlides = [
  {
    image: "/images/hero/hvac-slide.png",
    imagePosition: "object-[40%_center]",
    label: "냉동공조 솔루션",
    title: ["냉동기 설치부터", "유지보수까지"],
    description: "현장에 맞는 솔루션을 제공합니다.",
  },
  {
    image: "/images/hero/fabric-duct-slide.png",
    imagePosition: "object-[80%_center]",
    label: "섬유덕트 솔루션",
    title: ["공간에 맞춘 설계", "고르게 퍼지는 공기"],
    description: "섬유덕트 설계부터 시공까지 함께합니다.",
  },
];

export default function MobileHero() {
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const slide = heroSlides[heroIndex];

  useEffect(() => {
    if (isTouching) return;

    const timer = window.setTimeout(() => {
      setHeroIndex((index) => (index + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearTimeout(timer);
  }, [heroIndex, isTouching]);

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
        setIsTouching(true);
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        setIsTouching(false);
        if (!start || event.changedTouches.length === 0) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (event.cancelable) event.preventDefault();

        setHeroIndex(
          (index) => (index + (deltaX < 0 ? 1 : -1) + heroSlides.length) % heroSlides.length,
        );
      }}
      onTouchCancel={() => {
        touchStart.current = null;
        setIsTouching(false);
      }}
      className="relative isolate flex min-h-[480px] flex-col justify-center overflow-hidden px-6 pb-20 pt-16 text-white"
    >
      <Image
        src={slide.image}
        alt="산정엔지니어링 시공 현장"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 1px"
        className={`-z-20 object-cover ${slide.imagePosition}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102D4A]/95 via-[#102D4A]/60 to-[#102D4A]/20"
      />
      <div className="mx-auto w-full max-w-[600px]">
        <p className="text-base font-bold text-[#00ADDB]">{slide.label}</p>
        <h1 className="mt-6 text-[34px] font-extrabold leading-[1.3]">
          {slide.title[0]}
          <br />
          {slide.title[1]}
        </h1>
        <p className="mt-3 text-base font-semibold leading-7">{slide.description}</p>
        <div className="mt-6 flex max-w-[210px] flex-col gap-3">
          <Link
            href="/projects"
            className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#00ADDB] font-bold"
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
                key={item.label}
                onClick={() => setHeroIndex(index)}
                aria-label={`${item.label} 보기`}
                aria-pressed={heroIndex === index}
                className="flex size-11 items-center justify-center"
              >
                <span
                  className={`h-[6px] w-6 rounded-full ${
                    heroIndex === index ? "bg-[#00ADDB]" : "bg-white/40"
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
