import Image from "next/image";

const chillers = [
  {
    title: "스크류 냉동기",
    image: "/images/chiller/chiller-screw.png",
  },
  {
    title: "터보 냉동기",
    image: "/images/chiller/chiller-turbo.png",
  },
  {
    title: "흡수식 냉동기",
    image: "/images/chiller/chiller-absorption.png",
  },
];

export default function ChillerTypes() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white px-5 py-9 lg:px-10 lg:py-[60px]">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-5 lg:text-[20px] lg:tracking-[6px]">
            CHILLER <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
          </p>
          <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[45px] lg:tracking-[2px]">
            주요 취급 냉동기
          </h2>
          <p className="mt-3 break-keep text-[15px] font-semibold leading-[30px] text-brand-navy lg:mt-5 lg:text-[19px]">
            산정엔지니어링은
            <br />
            냉동공조 전문기업 (주)센추리의 파트너사입니다.
          </p>
        </div>
        <div className="w-full max-w-[400px] shrink-0 lg:w-[400px]">
          <Image
            src="/images/chiller/century-logo.png"
            alt="Century 센추리"
            width={400}
            height={167}
            sizes="(min-width: 1440px) 400px, (max-width: 440px) calc(100vw - 40px), 400px"
            className="h-auto w-full object-contain"
          />
        </div>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-3">
        {chillers.map((chiller) => (
          <article
            key={chiller.title}
            className="overflow-hidden rounded-xl border border-brand-navy/10 bg-[#F1FAFD] p-6 shadow-[0_4px_16px_rgba(16,46,73,0.06)] transition-[border-color,box-shadow] duration-200 hover:border-brand-blue/40 hover:shadow-[0_8px_24px_rgba(16,46,73,0.1)] motion-reduce:transition-none"
          >
            <h3 className="text-[28px] font-bold text-brand-navy lg:text-[34px]">
              {chiller.title}
            </h3>
            <div className="relative mt-5 h-[260px] w-full sm:h-[300px] lg:h-[310px]">
              <Image
                src={chiller.image}
                alt={chiller.title}
                fill
                sizes="(min-width: 1440px) 390px, 85vw"
                className={`object-contain ${chiller.title === "흡수식 냉동기" ? "scale-[1.18]" : ""}`}
              />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-brand-blue/15 bg-[#F1FAFD] p-5 lg:mt-8 lg:px-7 lg:py-6">
        <h3 className="text-lg font-bold text-brand-navy lg:text-[21px]">
          다양한 제조사 설비 상담
        </h3>
        <p className="mt-3 break-keep text-[16px] font-semibold leading-7 text-brand-navy lg:text-[19px] lg:leading-8">
          LG, 범양, 캐리어 등 기존 냉동설비의 교체, 수리 및 유지보수를 상담해드립니다.
        </p>
        <p className="mt-2 break-keep text-sm leading-6 text-brand-navy/70 lg:text-base lg:leading-7">
          제조사와 모델, 장비 상태에 따라 작업 가능 여부를 안내드립니다.
        </p>
      </div>
    </section>
  );
}
