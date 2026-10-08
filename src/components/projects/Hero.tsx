import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[600px] w-full max-w-[1920px] overflow-hidden text-white">
      <Image
        src="/images/projects-page/hero.jpg"
        alt="작업자가 고소작업대에서 냉동공조 설비를 설치하는 현장"
        fill
        priority
        sizes="1920px"
        quality={100}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.7)_40%,rgba(16,45,74,0)_100%)]"
      />
      <div className="relative mx-auto w-[1430px] pt-[108px]">
        <nav
          aria-label="현재 위치"
          className="flex items-center text-[22.5px] font-bold text-[#00ADDB]"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <span aria-current="page">시공사례</span>
        </nav>
        <h1 className="mt-[34px] text-[80px] font-extrabold leading-[96px]">시공사례</h1>
        <p className="mt-[34px] text-[33.75px] font-medium leading-[41px]">
          냉동공조부터 섬유덕트까지
          <br />
          산정엔지니어링의 현장을 소개합니다.
        </p>
      </div>
    </section>
  );
}
