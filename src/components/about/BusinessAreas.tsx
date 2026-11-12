import Image from "next/image";
import Link from "next/link";

const areas = [
  {
    title: "냉동설비",
    href: "/solutions",
    image: "/images/about/business-refrigeration.jpg",
    quality: 75,
    top: "-35.91%",
    lines: [
      "냉동기 설치/교체/철거",
      "스크류, 흡수식, 터보 냉동기",
      "항온항습기 설치/교체",
      "냉각탑 설치/교체",
      "공조기 설치/교체",
      "냉동/공조 배관 공사",
    ],
  },
  {
    title: "패브릭덕트",
    href: "/fabric-duct",
    image: "/images/about/business-fabric-duct.jpg",
    quality: 100,
    top: "-24.56%",
    lines: [
      "패브릭덕트 설계/공급/설치",
      "현장별 덕트 배치 검토",
      "CFD 설계",
      "공기분배 방식 검토",
      "기존 공조설비 연결",
    ],
  },
  {
    title: "저온저장고",
    href: "/solutions/cold-storage",
    image: "/images/projects/wonsam-nonghyup/photo-4.jpg",
    quality: 100,
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
    href: "/solutions#chiller-services-heading",
    image: "/images/projects/church-cooling-tower/photo-1.jpg",
    quality: 75,
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
        <div className="flex max-w-full items-center gap-3 lg:gap-[16px] text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-brand-blue">
          <span aria-hidden="true" className="h-0.5 min-w-0 w-8 bg-brand-blue sm:w-20" />
          <p className="shrink-0 whitespace-nowrap">BUSINESS AREA</p>
          <span aria-hidden="true" className="h-0.5 min-w-0 w-8 bg-brand-blue sm:w-20" />
        </div>
        <h2
          id="about-business-heading"
          className="text-[28px] lg:text-[50px] font-bold leading-[36px] lg:leading-[60px] tracking-[1px] lg:tracking-[2.5px] text-brand-navy"
        >
          사업영역
        </h2>
      </header>
      <div className="mt-[24px] lg:mt-[54px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px] lg:gap-[30px]">
        {areas.map((area) => (
          <article
            key={area.title}
            className="flex w-full lg:w-[300px] flex-col items-center gap-[16px] lg:gap-[22px] overflow-hidden rounded-2xl bg-white/80 pb-[30px] ring-1 ring-inset ring-brand-navy/15 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:ring-brand-blue/60 hover:shadow-[0_10px_26px_rgba(16,47,73,0.09)] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Link
              href={area.href}
              aria-label={`${area.title} 자세히 보기`}
              className="relative block h-[260px] lg:h-[294px] w-full overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
            >
              <div className="absolute h-[136.05%] w-full" style={{ top: area.top }}>
                {/* 4:3 사진이 높이 400px에 맞춰 약 534px 폭으로 확대된 뒤 잘립니다. */}
                <Image
                  src={area.image}
                  alt={`${area.title} 설비 현장`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 534px"
                  quality={area.quality}
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute bottom-0 h-[44px] w-full bg-gradient-to-b from-transparent to-white"
              />
            </Link>
            <div className="flex flex-1 h-auto lg:min-h-[316px] px-5 lg:px-0 w-full lg:w-[215px] flex-col gap-[16px]">
              <h3 className="text-center text-[20px] lg:text-[30px] font-bold leading-[24px] lg:leading-[36px] tracking-[0px] lg:tracking-[-3px] text-brand-navy">
                {area.title}
              </h3>
              <span aria-hidden="true" className="h-0.5 w-full shrink-0 bg-brand-blue/40" />
              <ul className="text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[30px] text-brand-text/60">
                {area.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <Link
                href={area.href}
                aria-label={`${area.title} 자세히 보기`}
                className="group mt-auto inline-flex min-h-11 items-center justify-between gap-4 pt-6 text-[16px] font-semibold text-brand-navy transition-colors hover:text-brand-blue focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue lg:text-[18px]"
              >
                자세히 보기
                <span
                  aria-hidden="true"
                  className="text-brand-blue transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
