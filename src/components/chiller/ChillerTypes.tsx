import Image from "next/image";
import type { CSSProperties } from "react";

const chillers = [
  { title: "스크류 냉동기", image: "/images/chiller/chiller-screw.png", width: 375 },
  { title: "터보 냉동기", image: "/images/chiller/chiller-turbo.png", width: 455 },
  { title: "흡수식 냉동기", image: "/images/chiller/chiller-absorption.png", width: 338 },
];

export default function ChillerTypes() {
  return (
    <section className="mx-auto h-auto lg:h-[710px] w-full lg:max-w-[1440px] bg-white px-[20px] lg:px-[120px] py-[36px] lg:py-[60px]">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[179px] items-center gap-[28px] lg:gap-[200px]">
        <div className="relative order-2 h-[75px] w-[180px] overflow-hidden lg:order-1 lg:h-[179px] lg:w-[430px]">
          <Image
            src="/images/chiller/century-logo.png"
            alt="Century"
            fill
            sizes="(max-width: 1023px) 180px, 430px"
            className="object-contain"
          />
        </div>
        <div className="order-1 w-full lg:order-2 lg:w-auto">
          <p className="flex items-center gap-[12px] lg:gap-[20px] text-[12px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
            CHILLER <span className="h-[2px] w-[46px] bg-brand-blue/60" />
          </p>
          <h2 className="mt-[12px] lg:mt-[10px] text-[28px] lg:text-[45px] font-bold tracking-[1px] lg:tracking-[2px] text-brand-navy">
            주요 취급 냉동기
          </h2>
          <p className="mt-[12px] lg:mt-[25px] text-[15px] lg:text-[19px] font-semibold leading-[30px]">
            산정엔지니어링은
            <br className="block lg:hidden" />
            <br className="hidden lg:block" />
            최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.
          </p>
        </div>
      </div>
      <div className="mt-[24px] lg:mt-[80px] flex flex-col lg:flex-row items-start gap-[28px] lg:gap-[40px]">
        {chillers.map((chiller) => (
          <article
            key={chiller.title}
            className="w-full lg:w-[var(--card-width)] text-center"
            style={{ "--card-width": `${chiller.width}px` } as CSSProperties}
          >
            <div className="relative h-[240px] lg:h-[250px] w-full overflow-hidden bg-[#F4F4F4]">
              <Image
                src={chiller.image}
                alt={chiller.title}
                fill
                sizes={`${chiller.width}px`}
                className="object-contain"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-black/10" />
            </div>
            <h3 className="mt-[24px] lg:mt-[33px] text-[28px] lg:text-[40px] font-semibold">
              {chiller.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
