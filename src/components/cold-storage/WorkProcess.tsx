import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "장비 반입 및 현장 확인",
    description: <>CDU, 유니트쿨러 반입</>,
    image: "/images/cold-storage/process-equipment-delivery.jpg",
  },
  {
    number: "02",
    title: "CDU, 유니트쿨러 설치",
    description: (
      <>
        장비 배치와 공기 흐름을 고려해
        <br />
        지정 위치에 설치, 고정
      </>
    ),
    image: "/images/cold-storage/process-unit-installation.jpg",
  },
  {
    number: "03",
    title: "배관, 전원, 제어 연결",
    description: (
      <>
        냉매, 보온, 드레인, 배관 시공
        <br />
        전원, 제어배선 연결
      </>
    ),
    image: "/images/cold-storage/process-piping-controls.jpg",
  },
  {
    number: "04",
    title: "기밀 점검 및 시운전",
    description: (
      <>
        누설 확인, 진공 작업, 냉매 충전 후<br />
        설정 온도와 운전 상태 확인
      </>
    ),
    image: "/images/cold-storage/process-testing-commissioning.jpg",
  },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto w-full bg-[#E3F6FC] px-5 py-9 lg:max-w-[1600px] lg:px-10 lg:py-[64px]">
      <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-[20px] lg:text-[20px] lg:tracking-[6px]">
        WORK PROCESS <span className="h-[2px] w-[46px] bg-brand-blue/60" />
      </p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[50px] lg:tracking-[2.5px]">
        저온저장고 냉동설비 이렇게 시공합니다.
      </h2>
      <p className="mt-3 text-[15px] font-semibold text-brand-text lg:mt-[25px] lg:text-[19px]">
        냉동설비 입고부터 배관, 제어까지, 모두 책임지고 수행합니다.
      </p>

      <div className="relative mt-8 lg:mt-10">
        <ol className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step, index) => (
          <li key={step.number} className="group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
            <div className="relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]">
              <Image
                src={step.image}
                alt={`${step.title} 작업 현장`}
                fill
                sizes="(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                quality={100}
                unoptimized={step.number === "04"}
                className={`object-cover ${index === 3 ? "object-[60%_center]" : ""}`}
              />
            </div>
            <div className="relative px-5 pb-6 pt-8">
              <span className="absolute -top-5 left-5 inline-flex h-10 items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{Number(step.number)}</span>
              </span>
              <h3 className="text-xl font-bold text-brand-navy lg:text-[23px]">
                {step.title}
              </h3>
              <p className="mt-2 text-base font-semibold leading-7 text-brand-text/70">
                {step.description}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
