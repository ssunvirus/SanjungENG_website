import Image from "next/image";

const areas = [
  {
    title: "냉동설비",
    image: "business-refrigeration.jpg",
    top: "-35.91%",
    lines: [
      "냉동기 설치/교체",
      "스크류, 흡수식, 터보 냉동기",
      "항온항습기 설치/교체",
      "냉각탑 설치/교체",
      "공조기 설치/교체",
      "냉동/공조 배관 공사",
    ],
  },
  {
    title: "섬유덕트",
    image: "business-fabric-duct.jpg",
    top: "-24.56%",
    lines: [
      "섬유덕트 설계/공급/설치",
      "현장별 덕트 배치 검토",
      "CFD 설계",
      "공기분배 방식 검토",
      "기존 공조설비 연결",
    ],
  },
  {
    title: "저온저장고",
    image: "business-cold-storage.jpg",
    top: "-17.96%",
    lines: [
      "저온저장고 설비 설치",
      "CDU설치/교체",
      "유니트쿨러 설치/교체",
      "냉매 배관/보온 공사",
      "냉매 충전/시운전",
      "온도 제어/운전 확인",
    ],
  },
  {
    title: "수리 & 정기점검",
    image: "business-maintenance.jpg",
    top: "-20.52%",
    lines: [
      "냉동기 수리/오버홀",
      "응축기/오일쿨러 세관",
      "냉각탑 세척/충진물 교체",
      "팬/모터/벨트 점검",
      "항온항습기 수리/부품교체",
      "설비 정기점검/예방정비",
    ],
  },
];

export default function BusinessAreas() {
  return (
    <section
      aria-labelledby="about-business-heading"
      className="mx-auto w-full lg:max-w-[1440px] px-[20px] lg:px-[75px] py-[36px] lg:py-20"
    >
      <header className="flex flex-col items-center gap-[16px] lg:gap-[10px]">
        <div className="flex max-w-full items-center gap-3 lg:gap-[16px] text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-[#00ADDB]">
          <span aria-hidden="true" className="h-0.5 min-w-0 w-8 bg-[#00ADDB] sm:w-20" />
          <p className="shrink-0 whitespace-nowrap">BUSINESS AREA</p>
          <span aria-hidden="true" className="h-0.5 min-w-0 w-8 bg-[#00ADDB] sm:w-20" />
        </div>
        <h2
          id="about-business-heading"
          className="text-[28px] lg:text-[50px] font-bold leading-[36px] lg:leading-[60px] tracking-[1px] lg:tracking-[2.5px] text-[#102D4A]"
        >
          사업영역
        </h2>
      </header>
      <div className="mt-[24px] lg:mt-[54px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] lg:gap-[30px]">
        {areas.map((area) => (
          <article
            key={area.title}
            className="flex w-full lg:w-[300px] flex-col items-center gap-[16px] lg:gap-[22px] bg-white/80 pb-[30px]"
          >
            <div className="relative h-[260px] lg:h-[294px] w-full overflow-hidden">
              <div className="absolute h-[136.05%] w-full" style={{ top: area.top }}>
                {/* 4:3 사진이 높이 400px에 맞춰 약 534px 폭으로 확대된 뒤 잘립니다. */}
                <Image
                  src={`/images/about/${area.image}`}
                  alt={`${area.title} 설비 현장`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 534px"
                  quality={
                    area.image === "business-fabric-duct.jpg" ||
                    area.image === "business-cold-storage.jpg"
                      ? 100
                      : 75
                  }
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute bottom-0 h-[44px] w-full bg-gradient-to-b from-transparent to-white"
              />
            </div>
            <div className="flex h-auto lg:h-[248px] px-5 lg:px-0 w-full lg:w-[215px] flex-col gap-[16px] lg:gap-[16px]">
              <h3 className="text-center text-[20px] lg:text-[30px] font-bold leading-[24px] lg:leading-[36px] tracking-[0px] lg:tracking-[-3px] text-[#102D4A]">
                {area.title}
              </h3>
              <span aria-hidden="true" className="h-0.5 w-full bg-[#00ADDB]/40" />
              <ul className="text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[30px] text-[#243447]/60">
                {area.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
