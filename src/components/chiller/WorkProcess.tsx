import Image from "next/image";

const steps = [
  { number: "01", title: "현장 확인", description: "설비상태, 공간, 운전 조건 검토", image: "/images/chiller/process-site-inspection.png" },
  { number: "02", title: "장비, 작업 계획", description: "용량, 공정, 일정 협의", image: "/images/chiller/process-work-planning.png" },
  { number: "03", title: "철거 & 설치", description: "기존 설비 철거 및 신규 장비 입고", image: "/images/chiller/process-removal-installation.png" },
  { number: "04", title: "시운전 & 인계", description: "운전 확인 및 관리사항 안내", image: "/images/chiller/process-commissioning-handover.png" },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto w-full bg-[#E3F6FC] px-5 py-9 lg:w-[1440px] lg:px-[120px] lg:py-[50px]">
      <p className="flex items-center gap-3 text-xs font-medium tracking-[3px] text-[#00ADDB]/60 lg:gap-[20px] lg:text-[20px] lg:tracking-[6px]">WORK PROCESS <span className="h-[2px] w-[46px] bg-[#00ADDB]/60" /></p>
      <h2 className="mt-3 text-[28px] font-bold tracking-[1px] text-[#102D4A] lg:mt-[10px] lg:text-[50px] lg:tracking-[2.5px]">설치 &amp; 교체, 이렇게 진행합니다.</h2>
      <p className="mt-3 text-[15px] font-semibold lg:mt-[25px] lg:text-[19px]">현장 분석부터 시운전까지, 모두 책임지고 수행합니다.</p>
      <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 lg:mt-[60px] lg:grid-cols-4 lg:gap-[10px]">
        {steps.map((step, index) => (
          <article key={step.number} className="min-w-0 text-center">
          <div className="relative h-[180px] overflow-hidden rounded-[10px] shadow-md sm:h-[260px] lg:h-[400px]">
            <Image
              src={step.image}
              alt={`${step.title} 작업 현장`}
              fill
              sizes="(max-width: 1023px) 45vw, 300px"
              quality={100}
              unoptimized={step.number === "03" || step.number === "04"}
              className={`object-cover ${step.number === "04" ? "object-[56%_center]" : ""}`}
            />
          </div>
          <div className="relative mt-5 lg:mt-[40px]">
            {index < 3 && <span aria-hidden="true" className="absolute left-[calc(50%+60px)] right-[calc(-50%+60px)] top-[38px] hidden h-[2px] bg-[#00ADDB] lg:block" />}
            <span className="relative z-10 mx-auto flex size-11 items-center justify-center rounded-full bg-[#00ADDB] text-lg font-bold text-white lg:size-[76px] lg:text-[30px]">{step.number}</span>
            <h3 className="mt-3 text-lg font-semibold lg:mt-[25px] lg:text-[30px]">{step.title}</h3>
            <p className="mt-2 text-sm font-semibold text-[#243447]/80 lg:mt-[15px] lg:whitespace-nowrap lg:text-[22px]">{step.description}</p>
          </div>
          </article>
        ))}
      </div>
    </section>
  );
}
