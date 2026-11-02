import Image from "next/image";

const steps = [
  ["01", "현장 확인 및 설비 점검", "운전 상태와 주요 설비 확인", "process-inspection.jpg"],
  ["02", "정비 항목 확인", "충진물, 부품, 배관 상태 점검", "process-scope-card.jpg"],
  ["03", "부품 교체 및 보수 작업", "노후 부품 교체 및 설비 보수", "process-repair.jpg"],
  ["04", "시운전 및 최종 확인", "작동 상태와 이상 여부 확인", "process-test.jpg"],
];

export default function WorkProcess() {
  return (
    <section className="mx-auto w-full bg-[#E3F6FC] px-5 py-9 lg:max-w-[1600px] lg:px-10 lg:py-[64px]">
      <header>
        <div className="flex items-center gap-[16px] lg:gap-[20px] text-[14px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60">
          WORK PROCESS <span className="h-[2px] w-[46px] bg-current" />
        </div>
        <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          냉각탑, 이렇게 점검하고 정비합니다.
        </h2>
        <p className="mt-[10px] lg:mt-[25px] text-[14px] lg:text-[19px] font-semibold">
          설비 상태 확인부터 부품 교체와 시운전까지 현장에 맞춰 진행합니다.
        </p>
      </header>

      <div className="relative mt-8 lg:mt-10">
        <ol className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {steps.map(([number, title, description, image]) => (
          <li key={number} className="group min-w-0 overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-[0_4px_16px_rgba(16,46,73,0.08)] transition-[border-color,box-shadow,transform] duration-200 hover:border-brand-blue hover:shadow-[0_8px_24px_rgba(0,173,219,0.15)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none">
            <div className="relative h-[300px] overflow-hidden bg-[#F1FAFD] sm:h-[340px] lg:h-[410px]">
              <Image
                src={`/images/cooling-tower/${image}`}
                alt={`${title} 작업 현장`}
                fill
                sizes="(min-width: 1440px) 365px, (min-width: 640px) 45vw, 90vw"
                quality={100}
                unoptimized={number === "04"}
                className="object-cover"
              />
            </div>
            <div className="relative px-5 pb-6 pt-8">
              <span className="absolute -top-5 left-5 inline-flex h-10 items-center gap-2 rounded-full border-[3px] border-white bg-brand-blue px-4 text-sm font-bold tracking-wide text-white shadow-sm">
                STEP <span className="text-lg tabular-nums">{Number(number)}</span>
              </span>
              <h3 className="text-xl font-bold text-brand-navy lg:text-[23px]">
                {title}
              </h3>
              <p className="mt-2 text-base font-semibold leading-7 text-brand-text/70">
                {description}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
