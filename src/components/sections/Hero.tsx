"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        image: "/images/hero/hero-hvac-compact.png",
        imageAlt: "산업용 냉동공조 설비가 설치된 현장",
        category: "냉동공조 솔루션",
        title: ["냉동기 설치부터", "유지보수까지"],
        subtitle: "현장에 맞는 솔루션을 제공합니다",
        details: "설치 ◦ 교체   |   수리 ◦ 오버홀   |   정기점검",
    },
    {
        image: "/images/hero/hero_fabricdut.png",
        imageAlt: "섬유덕트가 설치된 산업 시설 내부",
        category: "섬유덕트 솔루션",
        title: ["공간에 맞춘 설계", "고르게 퍼지는 공기"],
        subtitle: "섬유덕트 설계부터 시공까지 함께",
        details: "CFD 설계   |   제품 공급   |   설치 & 시공",
    },
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying) return;

        const timer = window.setTimeout(() => {
            setCurrentSlide((current) => (current + 1) % slides.length);
        }, 6000);

        return () => window.clearTimeout(timer);
    }, [currentSlide, isPlaying]);

    const showPreviousSlide = () => {
        setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
    };

    const showNextSlide = () => {
        setCurrentSlide((current) => (current + 1) % slides.length);
    };

    const slide = slides[currentSlide];

    return (
        <section
            className="relative mx-auto h-[1080px] w-full max-w-[1920px] overflow-hidden bg-[#102D4A] text-white"
            aria-roledescription="carousel"
            aria-label="산정엔지니어링 주요 서비스"
        >
            {slides.map((item, index) => (
                <Image
                    key={item.image}
                    src={item.image}
                    alt={index === currentSlide ? item.imageAlt : ""}
                    fill
                    priority={index === 0}
                    sizes="1920px"
                    className={`pointer-events-none object-cover transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            <div
                key={currentSlide}
                className="absolute top-[178px] left-[239px] animate-[hero-content_700ms_ease-out]"
                aria-live="polite"
            >
                <p className="text-[23px] font-bold leading-[29px] text-[#00ADDB]">
                    {slide.category}
                </p>

                <h1 className="mt-[34px] text-[45px] font-extrabold leading-[56px]">
                    {slide.title[0]}
                    <br />
                    {slide.title[1]}
                </h1>

                <p className="mt-[34px] text-[34px] font-medium leading-[42px]">
                    {slide.subtitle}
                </p>

                <p className="mt-[34px] whitespace-pre text-[23px] font-normal leading-[29px]">
                    {slide.details}
                </p>

                <div className="mt-[34px] flex gap-[26px]">
                    <Link
                        href="/#projects"
                        className="flex h-[65px] w-[210px] items-center justify-center rounded-[23px] bg-[#00ADDB] text-[30px] font-semibold"
                    >
                        시공사례&nbsp; →
                    </Link>
                    <Link
                        href="/#contact"
                        className="flex h-[65px] w-[210px] items-center justify-center rounded-[23px] border border-white bg-white/30 text-[30px] font-semibold"
                    >
                        견적 문의&nbsp; →
                    </Link>
                </div>
            </div>

            <div
                className="absolute top-[915px] left-[237px] z-10 flex h-[64px] items-center"
                aria-label="Hero 슬라이드 컨트롤"
            >
                <span className="inline-block w-[34px] text-[30px] font-bold tabular-nums">
                    {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <span className="ml-[18px] inline-block w-[10px] text-center text-[30px]">/</span>
                <span className="ml-[15px] inline-block w-[34px] text-[30px] tabular-nums">02</span>

                <div className="ml-[39px] flex gap-[12px]">
                    {slides.map((item, index) => (
                        <button
                            key={item.image}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            className={`h-[3px] w-[80px] cursor-pointer transition-colors ${index === currentSlide ? "bg-[#00ADDB]" : "bg-white/75"
                                }`}
                            aria-label={`${index + 1}번 슬라이드 보기`}
                            aria-current={index === currentSlide}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => setIsPlaying((playing) => !playing)}
                    className="ml-[29px] flex h-8 w-8 cursor-pointer items-center justify-center"
                    aria-label={isPlaying ? "슬라이드 일시 정지" : "슬라이드 자동 재생"}
                >
                    {isPlaying ? (
                        <span className="flex gap-[5px]" aria-hidden="true">
                            <span className="h-[18px] w-[3px] bg-white" />
                            <span className="h-[18px] w-[3px] bg-white" />
                        </span>
                    ) : (
                        <span
                            className="ml-[2px] border-y-[7px] border-l-[11px] border-y-transparent border-l-white"
                            aria-hidden="true"
                        />
                    )}
                </button>

                <button
                    type="button"
                    onClick={showPreviousSlide}
                    className="ml-[16px] flex h-12 w-10 -translate-y-[3px] cursor-pointer items-center justify-center text-[50px] font-normal leading-none"
                    aria-label="이전 슬라이드"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={showNextSlide}
                    className="ml-[15px] flex h-12 w-10 -translate-y-[3px] cursor-pointer items-center justify-center text-[50px] font-normal leading-none"
                    aria-label="다음 슬라이드"
                >
                    ›
                </button>
            </div>
        </section>
    );
}
