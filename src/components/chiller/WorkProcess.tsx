import WorkProcessCards from "@/src/components/shared/WorkProcessCards";

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
        <strong className="font-extrabold text-brand-blue">산정엔지니어링</strong>이 책임집니다.
      </p>
      <WorkProcessCards
        steps={steps.map((step) => ({
          ...step,
          unoptimized: step.number === "03" || step.number === "04",
          imageClassName: step.number === "04" ? "object-[56%_center]" : "",
        }))}
      />
    </section>
  );
}
