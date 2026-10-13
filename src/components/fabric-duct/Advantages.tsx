import Image from "next/image";
import SectionHeading from "./SectionHeading";

const advantages = [
  {
    title: "균일한 공기분배",
    description: ["공간 전체에 공기를 고르게 분산시켜", "핫존, 콜드존과 같은 온도 편차를 줄입니다."],
    image: "distribution-icon.png",
    slot: "h-[77px] w-[107px]",
    crop: "h-[188.52%] w-[135.29%] left-[-17.65%] top-[-27.87%]",
  },
  {
    title: "다양한 공간 적용 가능",
    description: ["저온저장고, 물류창고, 스마트팜, 생산시설 등", "다양한 공간에 맞춤 적용 가능합니다."],
    image: "applications-icon.png",
    slot: "h-[43px] w-[113px]",
    crop: "h-[113.73%] w-[130.34%] left-[-14.61%] top-[-12.75%]",
  },
  {
    title: "설치 / 유지관리 편의성",
    description: [
      "가벼운 소재로 설치 부담을 줄이고,",
      "분리/세척 할 수 있어 유지 관리가 편리합니다.",
    ],
    image: "maintenance-icon.png",
    slot: "h-[75px] w-[77px]",
    crop: "h-[150.7%] w-[146.58%] left-[-24.66%] top-[-26.76%]",
  },
];

export default function Advantages() {
  return (
    <section className="mx-auto w-full lg:w-[1440px] px-[20px] lg:px-[51px] py-[36px] lg:py-[70px]">
      <div className="h-auto lg:h-[170.882px]">
        <SectionHeading
          eyebrow="ADVANTAGES"
          title={
            <>
              섬유덕트의{" "}
              <span className="text-[28px] lg:text-[58.235px] tracking-[1px] lg:tracking-[2.9118px] text-[#00ADDB]">주요 장점</span>
            </>
          }
        >
          <p className="hidden lg:block">섬유덕트는 섬유 소재로 제작된 공기 분배 시스템으로,</p>
          <p className="hidden lg:block">
            공간 전체에 공기를 균일하게 배분하여 특정 구역에 냉기나 열기가 집중되는 현상을 줄이고,
            보다 균일한 실내 환경을 만듭니다.
          </p>
        </SectionHeading>
      </div>
      <div className="mt-[24px] lg:mt-[41px] flex flex-col lg:flex-row w-full lg:w-[1276px] items-center gap-[16px] lg:gap-[16px]">
        <div className="relative h-[240px] lg:h-[528px] w-full lg:w-[717px] shrink-0">
          <Image
            src="/images/fabric-duct/advantages.png"
            alt="기계실에 설치된 섬유덕트"
            fill
            sizes="717px"
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="flex w-full lg:w-[543px] flex-col gap-[16px] lg:gap-[27px]">
          {advantages.map((advantage, index) => (
            <article
              key={advantage.title}
              className={`flex h-auto lg:h-[158px] w-full lg:w-[539px] items-center gap-4 lg:gap-[33px] rounded-[20px] bg-white/60 px-4 lg:px-[47px] py-4 lg:py-[14px] ${index ? "ml-[4px]" : ""}`}
            >
              <div className="flex size-[70px] lg:size-[130px] shrink-0 items-center justify-center rounded-full bg-[#00ADDB]/10">
                <div className={`relative scale-[0.55] lg:scale-100 overflow-hidden ${advantage.slot}`}>
                  <div className={`absolute ${advantage.crop}`}>
                    <Image
                      src={`/images/fabric-duct/${advantage.image}`}
                      alt=""
                      fill
                      sizes="150px"
                      className="object-fill"
                    />
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 lg:flex-none w-full lg:w-[278px] font-bold leading-[1.45]">
                <h3 className="text-[16px] lg:text-[25px] text-[#102D4A]">{advantage.title}</h3>
                <p className="mt-[10px] lg:mt-[9px] text-[14px] lg:text-[15px] text-[#102D4A]/80">
                  {advantage.description[0]}
                  <br />
                  {advantage.description[1]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
