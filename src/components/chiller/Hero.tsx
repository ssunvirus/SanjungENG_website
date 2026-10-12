import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[210px] w-full max-w-[1920px] overflow-hidden text-white lg:h-[600px]">
      <Image
        src="/images/chiller/hero-indoor-chillers.jpg"
        alt="실내 기계실에 설치된 냉동기와 배관 설비"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 1920px"
        quality={100}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.7)_40%,rgba(16,45,74,0)_100%)]"
      />
      <div className="absolute left-[28px] top-[12px] lg:left-[245px] lg:top-[108px]">
        <nav aria-label="현재 위치" className="flex h-[12px] items-center text-[9px] font-bold text-[#00ADDB] lg:h-auto lg:text-[22.5px]">
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" className="size-[12px] lg:size-[38px]" />
          <Link href="/solutions">냉동공조</Link>
          <ChevronRight size={38} aria-hidden="true" className="size-[12px] lg:size-[38px]" />
          <Link href="/solutions">냉동기</Link>
        </nav>
        <h1 className="mt-[14px] text-[18px] font-extrabold leading-[22px] lg:mt-[34px] lg:text-[45px] lg:leading-normal">냉동기 솔루션</h1>
        <p className="mt-[14px] text-[13.5px] font-medium leading-[16px] lg:mt-[34px] lg:text-[34px] lg:leading-normal">현장 진단부터 설치, 유지보수까지</p>
        <p className="mt-[14px] text-[9px] leading-[11px] lg:mt-[24px] lg:text-[22.5px] lg:leading-normal">설치 · 교체&nbsp;&nbsp; | &nbsp;&nbsp;수리 · 오버홀&nbsp;&nbsp; | &nbsp;&nbsp;정기점검</p>
        <div className="mt-[14px] flex flex-col gap-[14px] lg:mt-[34px] lg:flex-row lg:gap-[26px]">
          <Link
            href="/projects"
            className="flex h-[26px] w-[118px] items-center justify-center gap-[5.6px] rounded-[9px] bg-[#00ADDB] text-[12px] font-semibold lg:h-[65px] lg:w-[210px] lg:gap-[14px] lg:rounded-[23px] lg:text-[30px]"
          >
            <span className="lg:hidden">시공사례 보기</span>
            <span className="hidden lg:inline">시공사례</span>
            <ArrowRight size={14} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={32} aria-hidden="true" className="hidden lg:block" />
          </Link>
          <Link
            href="/contact"
            className="flex h-[26px] w-[118px] items-center justify-center gap-[5.6px] rounded-[9px] border-[0.5px] border-white text-[12px] font-semibold lg:h-[65px] lg:w-[210px] lg:gap-[14px] lg:rounded-[23px] lg:border-0 lg:bg-white/30 lg:text-[30px]"
          >
            견적문의
            <ArrowRight size={14} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={32} aria-hidden="true" className="hidden lg:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
