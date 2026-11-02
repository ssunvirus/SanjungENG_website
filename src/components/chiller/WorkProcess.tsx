import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "현장 확인",
    description: "설비 상태, 공간, 운전 조건 검토",
    image: "/images/chiller/process-site-inspection.jpg",
  },
  {
    number: "02",
    title: "장비, 작업 계획",
    description: "용량, 공정, 일정 협의",
    image: "/images/chiller/process-work-planning.jpg",
  },
  {
    number: "03",
    title: "철거 & 설치",
    description: "기존 설비 철거 및 신규 장비 입고",
    image: "/images/chiller/process-removal-installation.png",
  },
  {
    number: "04",
    title: "시운전 & 인계",
    description: "운전 확인 및 관리사항 안내",
    image: "/images/chiller/process-commissioning-handover.png",
  },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto w-full bg-[#E3F6FC] px-5 py-9 lg:max-w-[1600px] lg:px-10 lg:py-[64px]">
      <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-brand-blue/60 lg:gap-[20px] lg:text-[20px] lg:tracking-[6px]">
        WORK PROCESS <span className="h-[2px] w-[46px] bg-brand-blue/60" />
      </p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-brand-navy lg:mt-[10px] lg:text-[50px] lg:tracking-[2.5px]">
        설치 &amp; 교체, 어떻게 진행될까요?
      </h2>
      <p className="mt-3 text-[15px] font-semibold lg:mt-[25px] lg:text-[19px]">
        현장 분석부터 설치, 교체, 시운전까지,
        <br />
        체계적이고 신속한 작업으로{" "}
        <strong className="font-extrabold text-brand-blue">산정엔지니어링</strong>
        이 책임집니다.
      </p>
      <div className="relative mt-8 lg:mt-10">
        <ol className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map((step) => (
            <li key={step.number} className="group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
              <div className="relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]">
                <Image
                  src={step.image}
                  alt={`${step.title} 작업 현장`}
                  fill
                  sizes="(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                  quality={100}
                  unoptimized={step.number === "03" || step.number === "04"}
                  className={`object-cover ${step.number === "04" ? "object-[56%_center]" : ""}`}
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
