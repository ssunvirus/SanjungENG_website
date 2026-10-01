import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[600px] w-[1920px] overflow-hidden text-white">
      <Image src="/images/precision-ac/hero-current.png" alt="산업용 항온항습기 압축기 설비" fill priority sizes="1920px" quality={100} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102D4A] via-[#102D4A]/70 via-[40%] to-transparent" />
      <div className="absolute left-[245px] top-[108px] flex flex-col items-start gap-[34px]">
        <nav aria-label="현재 위치" className="flex items-center text-[22.5px] font-bold text-[#00ADDB]">
          <Link href="/">홈</Link><ChevronRight size={38} aria-hidden="true" />
          <Link href="/solutions">냉동공조</Link><ChevronRight size={38} aria-hidden="true" />
          <span>항온항습기</span>
        </nav>
        <h1 className="text-[45px] font-extrabold">항온습기 솔루션</h1>
        <p className="text-[34px] font-medium">공간에 필요한 온도와 습도, 설치부터 유지관리까지</p>
        <p className="text-[22.5px]">항온항습기 설치, 교체&nbsp;&nbsp; | &nbsp;&nbsp;수리, 부품 교체&nbsp;&nbsp; | &nbsp;&nbsp;정기점검</p>
        <div className="flex gap-[26px]">
          <Link href="#precision-case" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[22.5px] bg-[#00ADDB] text-[30px] font-semibold">시공사례 <ArrowRightCircle size={38} aria-hidden="true" /></Link>
          <Link href="/#contact" className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[22.5px] bg-white/30 text-[30px] font-semibold">견적문의 <ArrowRightCircle size={38} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
