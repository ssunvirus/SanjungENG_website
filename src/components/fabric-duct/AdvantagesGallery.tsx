"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const photos = [
  { src: "/images/fabric-duct/advantages.png", alt: "기계실에 설치된 섬유덕트" },
  {
    src: "/images/projects/orion-production/cc_P5243349.jpg",
    alt: "생산라인 천장에 설치된 흰색 섬유덕트",
  },
  { src: "/images/fabric-duct/advantages-factory.jpg", alt: "공장 천장을 따라 설치된 섬유덕트" },
  { src: "/images/fabric-duct/advantages-gym.png", alt: "실내 배드민턴 체육관에 설치된 섬유덕트" },
  {
    src: "/images/fabric-duct/advantages-commercial.jpeg",
    alt: "유리 지붕 실내 공간 양쪽에 설치된 섬유덕트",
  },
];

export default function AdvantagesGallery() {
  const [index, setIndex] = useState(0);
  const move = (direction: number) =>
    setIndex((current) => (current + direction + photos.length) % photos.length);

  return (
    <div
      role="region"
      aria-roledescription="캐러셀"
      aria-label="섬유덕트 설치 사진"
      className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-2xl bg-brand-navy lg:h-[528px] min-w-0"
    >
      <Image
        src={photos[index].src}
        alt={photos[index].alt}
        fill
        sizes="(min-width: 1024px) 717px, calc(100vw - 40px)"
        quality={100}
        className="object-cover"
      />
      <button
        type="button"
        aria-label="이전 사진"
        onClick={() => move(-1)}
        className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <ChevronLeft aria-hidden="true" size={28} />
      </button>
      <button
        type="button"
        aria-label="다음 사진"
        onClick={() => move(1)}
        className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-md transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <ChevronRight aria-hidden="true" size={28} />
      </button>
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {photos[index].alt}, {index + 1} / {photos.length}
      </span>
    </div>
  );
}
