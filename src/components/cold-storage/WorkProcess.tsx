import WorkProcessCards from "@/src/components/shared/WorkProcessCards";

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
        냉동설비 입고부터 배관, 제어까지, {" "}
        <strong className="font-extrabold text-brand-blue">산정엔지니어링</strong>이 책임집니다.
      </p>

      <WorkProcessCards
        steps={steps.map((step) => ({
          ...step,
          unoptimized: step.number === "04",
          imageClassName: step.number === "04" ? "object-[60%_center]" : "",
        }))}
      />
    </section>
  );
}
