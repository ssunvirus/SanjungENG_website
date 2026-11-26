import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[320px] w-full lg:h-[600px] overflow-hidden text-white">
      <Image
        src="/images/about/hero-cooling-towers-panorama.webp"
        alt="산업시설에 설치된 대형 냉각탑과 배관 설비"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover lg:object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 via-[40%] to-transparent" />
      <div className="relative mx-auto w-full max-w-[1920px] h-full">
        <div className="absolute left-7 right-5 top-[45px] lg:right-auto lg:left-[245px] lg:top-[108px] flex flex-col items-start gap-5 lg:gap-[34px]">
          <nav
            aria-label="현재 위치"
            className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
          >
            <Link href="/">홈</Link>
            <ChevronRight size={38} aria-hidden="true" />
            <Link href="/about">회사소개</Link>
          </nav>
          <h1 className="text-[30px] lg:text-[80px] font-bold">회사소개</h1>
          <p className="text-[18px] lg:text-[34px] font-medium leading-8 lg:leading-[48px] opacity-80">
            30년의 현장 경험으로
            <br />
            고객이 믿고 맡길 수 있는
            <br />
            냉동공조 서비스를 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
