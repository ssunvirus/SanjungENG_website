import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronRight } from "lucide-react";

export default function ResourcesHero() {
  return (
    <section className="relative mx-auto h-[600px] w-[1920px] overflow-hidden px-[245px] pt-[108px] text-white">
      <div className="absolute inset-x-0 top-[-158.04px] h-[1080px]">
        <Image
          src="/images/fabric-duct/resources/hero.png"
          alt="생산시설에 설치된 섬유덕트"
          fill
          priority
          sizes="1920px"
          quality={100}
          className="object-fill"
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
          <span aria-current="page">인증서, 카탈로그</span>
        </nav>
        <h1 className="text-[45px] font-extrabold leading-[1.2]">인증서, 카탈로그</h1>
        <p className="text-[33.75px] font-medium leading-[1.2]">
          소재와 성능을 확인할 수 있는
          <br />
          제조사 인증서 및 시험성적서를 소개합니다.
        </p>
        <p className="text-[22.5px] leading-[1.2]">
          인증서&nbsp; | &nbsp; 시험성적서&nbsp; | &nbsp; 제품 카탈로그
        </p>
        <div className="flex gap-[26px]">
          <Link
            href="/fabric-duct#fabric-case"
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
