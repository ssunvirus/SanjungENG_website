import Image from "next/image";

const steps = [
  { number: "01", title: "장비 반입 및 현장 확인", description: <>CDU, 유니트쿨러 반입</>, image: "/images/cold-storage/process-equipment-delivery.png" },
  { number: "02", title: "CDU, 유니트쿨러 설치", description: <>장비 배치와 공기 흐름을 고려해<br />지정 위치에 설치, 고정</>, image: "/images/cold-storage/process-unit-installation.png" },
  { number: "03", title: "배관, 전원, 제어 연결", description: <>냉매배관, 보온, 드레인 시공 및<br />전원, 제어배선 연결</>, image: "/images/cold-storage/process-piping-controls.png" },
  { number: "04", title: "기밀 점검 및 시운전", description: <>누설 확인, 진공 작업, 냉매 충전 후<br />설정 온도와 운전 상태 확인</>, image: "/images/cold-storage/process-testing-commissioning.png" },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto h-[965px] w-[1440px] bg-[#00ADDB]/5 px-[120px] py-[60px]">
      <p className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">WORK PROCESS <span className="h-[2px] w-[46px] bg-current" /></p>
      <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">저온저장고 냉동설비 이렇게 시공합니다.</h2>
      <p className="mt-[25px] text-[19px] font-semibold text-[#243447]">냉동설비 입고부터 배관, 제어까지, 모두 책임지고 수행합니다.</p>

      <div className="mt-[60px] grid grid-cols-4 gap-[15px]">
        {steps.map((step, index) => (
          <div key={step.number} className="relative h-[400px] overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <Image src={step.image} alt={`${step.title} 작업 현장`} fill sizes="300px" quality={100} className={`object-cover ${index === 3 ? "object-[60%_center]" : ""}`} />
          </div>
        ))}
      </div>
      <div className="mt-[40px] grid grid-cols-4 gap-[15px]">
        {steps.map((step, index) => (
          <article key={step.number} className="relative text-center">
            {index < 3 && <span aria-hidden="true" className="absolute left-[204px] top-[38px] h-[2px] w-[200px] bg-[#00ADDB]" />}
            <span className="relative z-10 mx-auto flex size-[76px] items-center justify-center rounded-full bg-[#00ADDB] text-[30px] font-bold text-white">{step.number}</span>
            <h3 className="mt-[25px] whitespace-nowrap text-[30px] font-semibold text-[#243447]">{step.title}</h3>
            <p className="mt-[15px] whitespace-nowrap text-[22px] font-semibold leading-normal text-[#243447]/80">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
