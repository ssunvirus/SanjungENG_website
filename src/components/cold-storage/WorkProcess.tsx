import Image from "next/image";

const steps = [
  { number: "01", title: "장비 반입 및 현장 확인", description: <>CDU, 유니트쿨러 반입</>, image: "/images/cold-storage/process-equipment-delivery.png" },
  { number: "02", title: "CDU, 유니트쿨러 설치", description: <>장비 배치와 공기 흐름을 고려해<br />지정 위치에 설치, 고정</>, image: "/images/cold-storage/process-unit-installation.png" },
  { number: "03", title: "배관, 전원, 제어 연결", description: <>냉매, 보온, 드레인, 배관 시공<br />전원, 제어배선 연결</>, image: "/images/cold-storage/process-piping-controls.png" },
  { number: "04", title: "기밀 점검 및 시운전", description: <>누설 확인, 진공 작업, 냉매 충전 후<br />설정 온도와 운전 상태 확인</>, image: "/images/cold-storage/process-testing-commissioning.png" },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto h-auto w-full lg:w-[1440px] bg-[#00ADDB]/5 px-5 py-9 lg:px-[120px] lg:py-[60px]">
      <p className="flex items-center gap-[20px] text-xs lg:text-[20px] font-medium tracking-[3px] lg:tracking-[6px] text-[#00ADDB]/60">WORK PROCESS <span className="h-[2px] w-[46px] bg-current" /></p>
      <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold lg:tracking-[1px] text-[#102D4A]">저온저장고 냉동설비 이렇게 시공합니다.</h2>
      <p className="mt-[25px] text-[15px] lg:text-[19px] font-semibold text-[#243447]">냉동설비 입고부터 배관, 제어까지, 모두 책임지고 수행합니다.</p>

      <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 lg:mt-[60px] lg:grid-cols-4 lg:gap-[15px]">
        {steps.map((step, index) => (
          <article key={step.number} className="min-w-0 text-center">
            <div className="relative h-[180px] sm:h-[260px] lg:h-[400px] overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Image src={step.image} alt={`${step.title} 작업 현장`} fill sizes="(max-width: 1023px) 45vw, 300px" quality={100} unoptimized={step.number === "04"} className={`object-cover ${index === 3 ? "object-[60%_center]" : ""}`} />
            </div>
            <div className="relative mt-5 lg:mt-[40px]">
              {index < 3 && <span aria-hidden="true" className="absolute left-[calc(50%+60px)] right-[calc(-50%+60px)] top-[38px] hidden lg:block h-[2px] bg-[#00ADDB]" />}
              <span className="relative z-10 mx-auto flex size-11 lg:size-[76px] items-center justify-center rounded-full bg-[#00ADDB] text-lg lg:text-[30px] font-bold text-white">{step.number}</span>
              <h3 className="mt-3 lg:mt-[25px] lg:whitespace-nowrap text-lg lg:text-[30px] font-semibold text-[#243447]">{step.title}</h3>
              <p className="hidden lg:block mt-2 lg:mt-[15px] lg:whitespace-nowrap text-sm lg:text-[22px] font-semibold leading-normal text-[#243447]/80">{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
