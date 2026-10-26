import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[320px] lg:h-[627px] w-full max-w-[1920px] overflow-hidden text-white">
      <Image
        src="/images/projects-page/cold-storage.jpg"
        alt="저온저장고 내부 냉동설비"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 1920px"
        quality={100}
        className="object-cover"
      />
      <div className="absolute inset-y-0 left-0 w-full lg:w-[1119px] bg-gradient-to-r from-[#042750] via-brand-navy/70 to-transparent" />
      <div className="absolute left-7 right-5 top-[45px] lg:right-auto lg:left-[245px] lg:top-[108px]">
        <nav
          aria-label="현재 위치"
          className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions">냉동공조</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions/cold-storage">저온저장고</Link>
        </nav>
        <h1 className="mt-0 text-[30px] lg:mt-[34px] lg:text-[45px] font-extrabold">
          저온저장고 솔루션
        </h1>
        <p className="mt-5 text-[15px] lg:mt-[34px] lg:text-[34px] font-medium">
          저장고 환경에 맞춘 설치, 안정적인 온도 관리
        </p>
        <p className="mt-5 text-[11px] leading-5 lg:mt-[24px] lg:text-[22.5px]">
          CDU, 유니트쿨러 설치&nbsp;&nbsp; | &nbsp;&nbsp;냉매 배관 시공&nbsp;&nbsp; |
          &nbsp;&nbsp;제어설비
        </p>
        <div className="mt-5 flex flex-col gap-3 lg:mt-[34px] lg:flex-row lg:gap-[26px]">
          <Link
            href="/projects"
            className="flex h-10 w-[180px] lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[23px] bg-brand-blue text-lg lg:text-[30px] font-semibold"
          >
            시공사례 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={32} aria-hidden="true" className="hidden lg:block" />
          </Link>
          <Link
            href="/contact"
            className="flex h-10 w-[180px] lg:h-[65px] lg:w-[210px] items-center justify-center gap-2 rounded-[9px] lg:gap-[14px] lg:rounded-[23px] border border-white lg:border-0 lg:bg-white/30 text-lg lg:text-[30px] font-semibold"
          >
            견적문의 <ArrowRight size={18} aria-hidden="true" className="lg:hidden" />
            <ArrowRightCircle size={32} aria-hidden="true" className="hidden lg:block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
