import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[627px] w-full max-w-[1920px] overflow-hidden text-white">
      <Image
        src="/images/cold-storage/hero.png"
        alt="저온저장고 내부 냉동설비"
        fill
        priority
        sizes="1920px"
        quality={100}
        className="object-cover"
      />
      <div className="absolute inset-y-0 left-0 w-[1119px] bg-gradient-to-r from-[#042750] via-[#102D4A]/70 to-transparent" />
      <div className="absolute left-[245px] top-[108px]">
        <nav aria-label="현재 위치" className="flex items-center text-[22.5px] font-bold text-[#00ADDB]">
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions">냉동공조</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions/cold-storage">저온저장고</Link>
        </nav>
        <h1 className="mt-[34px] text-[45px] font-extrabold">저온저장고 솔루션</h1>
        <p className="mt-[34px] text-[34px] font-medium">저장고 환경에 맞춘 설치, 안정적인 온도 관리</p>
        <p className="mt-[24px] text-[22.5px]">CDU, 유니트쿨러 설치&nbsp;&nbsp; | &nbsp;&nbsp;냉매 배관 시공&nbsp;&nbsp; | &nbsp;&nbsp;제어설비</p>
        <div className="mt-[34px] flex gap-[26px]">
          <Link href="/projects" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[23px] bg-[#00ADDB] text-[30px] font-semibold">
            시공사례 <ArrowRightCircle size={32} />
          </Link>
          <Link href="/contact" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[23px] bg-white/30 text-[30px] font-semibold">
            견적문의 <ArrowRightCircle size={32} />
          </Link>
        </div>
      </div>
    </section>
  );
}
