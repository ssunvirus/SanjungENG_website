"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 사진과 사진 안의 설명은 이 목록에서 수정합니다.
const photos = [
  {
    src: "/images/chiller/removal-aju-turbo.jpg",
    alt: "아주약품 기계실에서 해체한 터보 냉동기를 이동하는 작업자들",
    caption: "아주약품 터보 냉동기 해체공사",
    position: "object-center",
  },
  {
    src: "/images/projects/hwaseong-absorption-chiller-removal/photo-03.jpg",
    alt: "화성시 자원순환시설의 노후 흡수식 냉동기를 해체하는 작업자",
    caption: "자원순환시설 흡수식 냉동기 철거공사",
    position: "object-[center_60%]",
  },
  {
    src: "/images/chiller/removal-market-reciprocating.jpg",
    alt: "농수산물 시장 옥상에서 왕복동식 냉동기를 철거하는 작업자들",
    caption: "농수산물 시장 왕복동식 냉동기 철거",
    position: "object-[center_65%]",
  },
];

export default function RemovalGallery() {
  const [index, setIndex] = useState(0);
  const move = (direction: number) =>
    setIndex((current) => (current + direction + photos.length) % photos.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [index]);

  return (
    <figure
      aria-label="냉동기 철거 현장 사진"
      aria-roledescription="캐러셀"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-[10px] bg-[#E8EFF3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
    >
      {photos.map((photo, photoIndex) => (
        <div
          key={photo.src}
          aria-hidden={photoIndex !== index}
          className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${photoIndex === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1440px) 658px, (min-width: 1200px) 50vw, calc(100vw - 40px)"
            quality={90}
            className={`object-cover ${photo.position}`}
          />
        </div>
      ))}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/95 via-black/60 to-transparent"
      />
      <button
        type="button"
        aria-label="이전 철거 현장 사진"
        onClick={() => move(-1)}
        className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white/90 text-brand-navy shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <ChevronLeft size={28} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="다음 철거 현장 사진"
        onClick={() => move(1)}
        className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brand-navy/10 bg-white/90 text-brand-navy shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <ChevronRight size={28} aria-hidden="true" />
      </button>
      <p
        aria-hidden="true"
        className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-sm font-semibold tabular-nums text-white"
      >
        {index + 1} / {photos.length}
      </p>
      <figcaption
        aria-live="off"
        aria-atomic="true"
        className="absolute inset-x-0 bottom-0 px-5 py-4 text-lg font-semibold text-white lg:px-6 lg:py-5 lg:text-xl"
      >
        {photos[index].caption}
      </figcaption>
    </figure>
  );
}
