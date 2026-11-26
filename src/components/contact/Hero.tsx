import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative mx-auto h-[320px] lg:h-[600px] w-full overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/contact/hero-rooftop-chiller-panorama.webp"
          alt="옥상에 설치된 냉동공조 설비"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover scale-[1.05]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.7)_40%,rgba(16,45,74,0)_100%)]"
      />
      <div className="relative mx-auto w-full max-w-[1920px] h-full">
        <div className="absolute left-7 right-5 top-[45px] lg:right-auto lg:left-[245px] lg:top-[108px]">
          <nav
            aria-label="현재 위치"
            className="hidden lg:flex items-center text-[22.5px] font-bold text-brand-blue"
          >
            <Link href="/">홈</Link>
            <ChevronRight size={38} aria-hidden="true" />
            <span aria-current="page">견적문의</span>
          </nav>
          <h1 className="mt-0 lg:mt-[34px] text-[30px] lg:text-[80px] font-extrabold leading-normal lg:leading-[96px]">
            견적문의
          </h1>
          <p className="mt-5 lg:mt-[34px] text-[20px] text-white/80 lg:text-[33.75px] font-medium leading-7 lg:leading-15">
            냉동공조부터 패브릭덕트까지
            <br />
            현장에 맞는 솔루션을 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
