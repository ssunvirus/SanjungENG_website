import Image from "next/image";

const equipmentPoints = [
  {
    number: "01",
    title: "보관 품목과 목표 온도",
    description: "냉장, 냉동 용도와 보관 조건을 확인합니다.",
    icon: "/images/cold-storage/storage-condition-icon.png",
  },
  {
    number: "02",
    title: "저온저장고 규모와 사용 방식",
    description: "공간 크기, 입출고량, 출입문 개폐 빈도를 검토합니다.",
    icon: "/images/cold-storage/storage-size-icon.png",
  },
  {
    number: "03",
    title: "장비 배치와 공기 순환",
    description: "적재 위치와 통로를 고려해 냉동설비를 배치합니다.",
    icon: "/images/cold-storage/airflow-layout-icon.png",
  },
];

export default function Equipment() {
  return (
    <section className="mx-auto h-auto w-full lg:max-w-[1440px] bg-white px-[20px] lg:px-10 py-[36px] lg:py-[60px]">
      <header className="text-center">
        <p
          data-section-eyebrow
          className="text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-brand-blue"
        >
          COLD STORAGE SERVICE
        </p>
        <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          저온저장고 냉동설계
          <br className="lg:hidden" /> 핵심요소
        </h2>
        <p className="mt-[10px] lg:mt-[25px] text-[15px] lg:text-[25px] font-semibold text-brand-text/60">
          보관 품목과 공간에 맞춰 냉동설비를 구성합니다.
        </p>
      </header>

      <div className="mx-auto mt-7 grid w-full max-w-[1200px] grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-[minmax(0,390fr)_minmax(0,666fr)] lg:gap-8">
        <div className="relative h-[260px] lg:min-h-[520px] w-full min-w-0 shrink-0 overflow-hidden rounded-[24px] border border-brand-navy/10 shadow-[0_12px_32px_rgba(16,46,73,0.1)] lg:h-auto">
          <Image
            src="/images/cold-storage/equipment-unit-cooler.jpg"
            alt="저온저장고 천장 증발기 설치 현장"
            fill
            sizes="(min-width: 1440px) 422px, (min-width: 1024px) 34vw, calc(100vw - 40px)"
            quality={100}
            className="object-cover object-[center_38%] lg:object-center"
          />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-3 lg:gap-4">
          {equipmentPoints.map((point) => (
            <article
              key={point.number}
              className="flex min-w-0 flex-1 items-center gap-4 rounded-[22px] border border-brand-navy/10 bg-white p-5 shadow-[0_4px_18px_rgba(16,46,73,0.05)] lg:gap-5 lg:p-6"
            >
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[#EFF8FC] lg:size-24">
                <div className="relative size-16 lg:size-20">
                  <Image
                    src={point.icon}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 80px, 64px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="break-keep text-[21px] font-bold leading-snug text-brand-navy lg:text-[29px]">
                  {point.title}
                </h3>
                <p className="mt-2 break-keep text-[16px] font-medium leading-7 text-brand-text/80 lg:text-[21px] lg:leading-8">
                  {point.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
