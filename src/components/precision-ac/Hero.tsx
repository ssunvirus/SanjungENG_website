import Image from "next/image";
import Link from "next/link";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto min-h-[320px] px-7 py-[45px] lg:min-h-0 lg:px-0 lg:py-0 w-full max-w-[1920px] lg:h-[600px] overflow-hidden text-white">
      <Image
        src="/images/precision-ac/hero-current.jpg"
        alt="산업용 항온항습기 압축기 설비"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 1920px"
        quality={100}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#042750] lg:from-brand-navy via-brand-navy/70 lg:via-[40%] to-transparent" />
      <div className="relative lg:absolute lg:right-auto lg:left-[245px] lg:top-[108px] flex flex-col items-start gap-5 lg:gap-[34px]">
        <nav
          aria-label="현재 위치"
          className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions">냉동공조</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <span>항온항습기</span>
        </nav>
        <h1 className="text-[30px] lg:text-[45px] font-extrabold">항온항습기 솔루션</h1>
        <p className="text-[15px] lg:text-[34px] font-medium">
          공간에 필요한 온도와 습도, 설치부터 유지관리까지
        </p>
        <p className="text-[11px] leading-5 lg:text-[22.5px]">
          항온항습기 설치, 교체&nbsp;&nbsp; | &nbsp;&nbsp;수리, 부품 교체&nbsp;&nbsp; |
          &nbsp;&nbsp;정기점검
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-[26px]">
          <Link
            href={projectListHref(1, "냉동공조")}
            className="flex min-h-11 h-auto w-[180px] max-w-full py-2 lg:py-0 lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[22.5px] bg-brand-blue text-lg lg:text-[30px] font-semibold"
          >
            시공사례 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={38} aria-hidden="true" className="hidden lg:block" />
          </Link>
          <Link
            href="/contact"
            className="flex min-h-11 h-auto w-[180px] max-w-full py-2 lg:py-0 lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[22.5px] border border-white lg:border-0 lg:bg-white/30 text-lg lg:text-[30px] font-semibold"
          >
            견적문의 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={38} aria-hidden="true" className="hidden lg:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
