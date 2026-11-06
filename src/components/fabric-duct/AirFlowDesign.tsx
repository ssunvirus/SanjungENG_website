import Image from "next/image";
import SectionHeading from "./SectionHeading";

const reviewItems = [
  { title: "검토 조건", description: "공간 구조, 장비 조건, 목표 온도" },
  { title: "검토 내용", description: "공기 흐름, 도달 범위, 온도 분포" },
  { title: "설계 반영", description: "덕트 배치와 공기 분배 방식" },
];
const examples = [
  {
    image: "cfd-velocity.png",
    title: "공기 속도 분포",
    alt: "공기 속도 분포를 색상으로 나타낸 CFD 풍속 해석 예시",
  },
  {
    image: "cfd-temperature.png",
    title: "온도 분포",
    alt: "공간의 온도 분포를 색상으로 나타낸 CFD 온도 해석 예시",
  },
];

export default function AirFlowDesign() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white px-5 py-9 min-[768px]:px-10 min-[768px]:py-14">
      <SectionHeading eyebrow="AIR FLOW DESIGN" title="현장 조건을 반영한 공기 분배 설계">
        <p className="max-w-[950px] break-keep text-[16px] font-normal leading-[1.7] min-[1200px]:text-[18px]">
          공간 크기와 천장 높이, 설비 배치, 공급 풍량 등을 바탕으로 공기 흐름과 온도 분포를
          검토합니다.
        </p>
      </SectionHeading>
      <div className="mt-8 grid items-center gap-8 min-[1024px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-[1024px]:gap-12 lg:mt-10">
        <div className="min-w-0 rounded-2xl bg-[#F6FAFC] px-4 py-6 min-[768px]:p-7">
          <h3 className="text-[21px] font-semibold leading-snug text-brand-navy min-[768px]:text-[26px]">
            CFD(전산유체역학) 설계
          </h3>
          <div className="mx-auto mt-5 grid max-w-[560px] grid-cols-2 items-end gap-4 min-[768px]:gap-6">
            {examples.map((example) => (
              <figure key={example.image} className="min-w-0">
                <div className="relative aspect-[400/436]">
                  <Image
                    src={`/images/fabric-duct/${example.image}`}
                    alt={example.alt}
                    fill
                    sizes="(max-width: 767px) 40vw, 270px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-center text-[16px] font-medium leading-7 text-brand-navy min-[768px]:text-[19px]">
                  {example.title}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-5 break-keep text-[15px] leading-[1.7] text-brand-navy/75 min-[768px]:text-[16px]">
            색상은 각 도표의 범례에 따른 속도와 온도를 나타냅니다.
            <span className="mt-1 block">CFD 해석 예시 / 출처: Klimagiel</span>
          </p>
        </div>
        <dl className="min-w-0 divide-y divide-brand-navy/10">
          {reviewItems.map((item, index) => (
            <div
              key={item.title}
              className="flex gap-5 py-6 first:pt-0 last:pb-0 min-[768px]:gap-6 min-[768px]:py-8"
            >
              <span
                aria-hidden="true"
                className="pt-1 text-[16px] font-semibold min-[768px]:text-[18px] tabular-nums text-brand-blue"
              >
                0{index + 1}
              </span>
              <div>
                <dt className="text-[24px] font-semibold leading-snug text-brand-navy min-[768px]:text-[30px]">
                  {item.title}
                </dt>
                <dd className="mt-2 break-keep text-[18px] font-medium leading-[1.7] text-brand-navy/85 min-[768px]:text-[21px]">
                  {item.description}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
