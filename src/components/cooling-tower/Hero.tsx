import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[320px] w-full max-w-[1920px] lg:h-[627px] overflow-hidden text-white">
      <Image
        src="/images/cooling-tower/hero.jpg"
        alt="냉각탑 하부에서 설비를 점검하는 작업자"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 1920px"
        quality={100}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#042750] lg:from-brand-navy via-brand-navy/70 lg:via-[40%] to-transparent" />

      <div className="absolute left-7 right-5 top-[45px] lg:right-auto lg:left-[245px] lg:top-[108px] flex flex-col items-start gap-5 lg:gap-[34px]">
        <nav
          aria-label="현재 위치"
          className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions">냉동공조</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions/cooling-tower">냉각탑</Link>
        </nav>
        <h1 className="text-[30px] lg:text-[45px] font-extrabold">냉각탑 솔루션</h1>
        <p className="text-[15px] lg:text-[34px] font-medium">
          현장 환경에 맞춘 냉각탑 설치부터 유지관리까지
        </p>
        <p className="text-[11px] leading-5 lg:text-[22.5px]">
          냉각탑 설치, 교체&nbsp;&nbsp; | &nbsp;&nbsp;충진물, 부품 교체&nbsp;&nbsp; |
          &nbsp;&nbsp;세척, 정비
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-[26px]">
          <Link
            href="#cooling-tower-case"
            className="flex h-10 w-[180px] lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[22.5px] bg-brand-blue text-lg lg:text-[30px] font-semibold"
          >
            시공사례 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={38} aria-hidden="true" className="hidden lg:block" />
          </Link>
          <Link
            href="/contact"
            className="flex h-10 w-[180px] lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[22.5px] border border-white lg:border-0 lg:bg-white/30 text-lg lg:text-[30px] font-semibold"
          >
            견적문의 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={38} aria-hidden="true" className="hidden lg:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
