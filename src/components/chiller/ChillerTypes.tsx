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
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div>
          <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-5 lg:text-[20px] lg:tracking-[6px]">
            CHILLER <span aria-hidden="true" className="h-[2px] w-[46px] bg-brand-blue/60" />
          </p>
          <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[45px] lg:tracking-[2px]">
            주요 취급 냉동기
          </h2>
          <p className="mt-3 text-[15px] font-semibold leading-[30px] lg:mt-5 lg:text-[19px]">
            산정엔지니어링은
            <br />
            최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.
          </p>
        </div>
        <Image
          src="/images/chiller/century-logo.png"
          alt="Century 센추리"
          width={400}
          height={167}
          sizes="(min-width: 1440px) 400px, 260px"
          className="h-[110px] w-[260px] max-w-full shrink-0 object-contain lg:h-[167px] lg:w-[400px]"
        />
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
    </section>
  );
}
