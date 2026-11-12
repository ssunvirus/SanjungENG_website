import WorkProcessCards from "@/src/components/shared/WorkProcessCards";

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
        <div
          data-section-eyebrow
          className="flex items-center gap-[16px] lg:gap-[20px] text-[14px] lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-brand-blue/60"
        >
          WORK PROCESS <span className="h-[2px] w-[46px] bg-current" />
        </div>
        <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          냉각탑, 이렇게 점검하고 정비합니다.
        </h2>
        <p className="mt-[10px] lg:mt-[25px] text-[14px] lg:text-[19px] font-semibold">
          설비 상태 확인부터 부품 교체와 시운전까지 현장에 맞춰 진행합니다.
        </p>
      </header>

      <WorkProcessCards
        steps={steps.map(([number, title, description, image]) => ({
          number,
          title,
          description,
          image: `/images/cooling-tower/${image}`,
          unoptimized: number === "04",
        }))}
      />
    </section>
  );
}
