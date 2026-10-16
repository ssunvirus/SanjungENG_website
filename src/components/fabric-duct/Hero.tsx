import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[320px] lg:h-[600px] w-full max-w-[1920px] overflow-hidden px-7 pt-[45px] lg:px-[245px] lg:pt-[108px] text-white">
      <div className="absolute inset-x-0 top-0 h-full lg:h-[1080px]">
        <Image
          src="/images/fabric-duct/hero.jpg"
          alt="실내 천장에 설치된 섬유덕트"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1920px"
          quality={100}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#042750] lg:from-brand-navy via-brand-navy/70 lg:via-[40%] to-transparent"
      />
      <div className="relative flex flex-col items-start gap-5 lg:gap-[34px]">
        <nav
          aria-label="현재 위치"
          className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/fabric-duct">섬유덕트</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <span aria-current="page">섬유덕트</span>
        </nav>
        <h1 className="text-[30px] lg:text-[45px] font-extrabold leading-[1.2]">섬유덕트 솔루션</h1>
        <p className="text-[15px] lg:text-[33.75px] font-medium leading-[1.2]">
          공간에 맞춘 설계로, 온도 편차를 줄입니다.
        </p>
        <p className="text-[11px] leading-5 lg:text-[22.5px] lg:leading-[1.2]">
          CFD 설계&nbsp; | &nbsp; 섬유덕트 공급&nbsp; | &nbsp; 설치/시공
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-[26px]">
          <Link
            href="/projects"
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
