import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[600px] w-[1920px] overflow-hidden text-white">
      <Image src="/images/about/hero.png" alt="산업용 냉동공조 설비 설치 현장" fill priority sizes="1920px" quality={100} className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102D4A] via-[#102D4A]/70 via-[40%] to-transparent" />
      <div className="absolute left-[245px] top-[108px] flex flex-col items-start gap-[34px]">
        <nav aria-label="현재 위치" className="flex items-center text-[22.5px] font-bold text-[#00ADDB]">
          <Link href="/">홈</Link><ChevronRight size={38} aria-hidden="true" /><Link href="/about">회사소개</Link>
        </nav>
        <h1 className="text-[80px] font-extrabold">회사소개</h1>
        <p className="text-[34px] font-medium leading-[48px] opacity-80">30년의 현장 경험으로<br />공간의 가치를 높이는<br />냉동/공조 서비스를 제공합니다.</p>
      </div>
    </section>
  );
}
