import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[600px] w-[1920px] overflow-hidden px-[245px] pt-[108px] text-white">
      <div className="absolute inset-x-0 top-0 h-[1080px]">
        <Image
          src="/images/fabric-duct/hero.png"
          alt="실내 천장에 설치된 섬유덕트"
          fill
          priority
          sizes="1920px"
          quality={100}
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#102D4A] via-[#102D4A]/70 via-[40%] to-transparent"
      />
      <div className="relative flex flex-col items-start gap-[34px]">
        <nav
          aria-label="현재 위치"
          className="flex items-center text-[22.5px] font-bold text-[#00ADDB]"
        >
          <Link href="/">홈</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <Link href="/fabric-duct">섬유덕트</Link>
          <ChevronRight size={38} aria-hidden="true" />
          <span aria-current="page">섬유덕트</span>
        </nav>
        <h1 className="text-[45px] font-extrabold leading-[1.2]">섬유덕트 솔루션</h1>
        <p className="text-[33.75px] font-medium leading-[1.2]">
          공간에 맞춘 설계로, 온도 편차를 줄입니다.
        </p>
        <p className="text-[22.5px] leading-[1.2]">
          CFD설계&nbsp; | &nbsp; 섬유덕트 공급&nbsp; | &nbsp; 설치/시공
        </p>
        <div className="flex gap-[26px]">
          <Link
            href="#fabric-case"
            className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[22.5px] bg-[#00ADDB] text-[30px] font-semibold"
          >
            시공사례 <ArrowRightCircle size={38} aria-hidden="true" />
          </Link>
          <Link
            href="/#contact"
            className="flex h-[65px] w-[210px] items-center justify-center gap-[14px] rounded-[22.5px] bg-white/30 text-[30px] font-semibold"
          >
            견적문의 <ArrowRightCircle size={38} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
