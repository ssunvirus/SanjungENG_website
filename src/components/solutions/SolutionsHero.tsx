import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronRight } from "lucide-react";

export default function SolutionsHero() {
  return (
    <section className="relative mx-auto h-[627px] w-full max-w-[1920px] overflow-hidden text-white">
      <Image src="/images/solutions/hero-source-1.png" alt="옥상에 설치된 산업용 냉동공조 설비" fill priority sizes="1920px" className="object-cover" />
      <div className="absolute left-[245px] top-[108px]">
        <nav aria-label="현재 위치" className="flex items-center text-[22.5px] font-bold text-[#00ADDB]">
          <Link href="/">홈</Link><ChevronRight size={38} /><span>냉동공조</span><ChevronRight size={38} /><span>냉동기</span>
        </nav>
        <h1 className="mt-[34px] text-[45px] font-extrabold">냉동기 솔루션</h1>
        <p className="mt-[34px] text-[34px] font-medium">현장 진단부터 설치, 유지보수까지</p>
        <p className="mt-[24px] text-[22.5px]">설치 · 교체&nbsp;&nbsp; | &nbsp;&nbsp;수리 · 오버홀&nbsp;&nbsp; | &nbsp;&nbsp;정기점검</p>
        <div className="mt-[34px] flex gap-[26px]">
          <Link href="/#projects" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[23px] bg-[#00ADDB] text-[30px] font-semibold">시공사례 <ArrowRightCircle size={32} /></Link>
          <Link href="/#contact" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[23px] bg-white/30 text-[30px] font-semibold">견적문의 <ArrowRightCircle size={32} /></Link>
        </div>
      </div>
    </section>
  );
}
