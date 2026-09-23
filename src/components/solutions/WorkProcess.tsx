import Image from "next/image";

const steps = [
  { number: "01", title: "현장 확인", description: "설비상태, 공간, 운전 조건 검토", image: "/images/solutions/process-1.png" },
  { number: "02", title: "장비, 작업 계획", description: "용량, 공정, 일정 협의", image: "/images/solutions/process-2.png" },
  { number: "03", title: "철거 & 설치", description: "기존 설비 철거 및 신규 장비 입고", image: "/images/solutions/process-3.png" },
  { number: "04", title: "시운전 & 인계", description: "운전 확인 및 관리사항 안내", image: "/images/solutions/process-4.png" },
];

export default function WorkProcess() {
  return (
    <section className="mx-auto w-[1440px] bg-[#E3F6FC] px-[120px] py-[50px]">
      <p className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">WORK PROCESS <span className="h-[2px] w-[46px] bg-[#00ADDB]/60" /></p>
      <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">설치 &amp; 교체, 이렇게 진행합니다.</h2>
      <p className="mt-[25px] text-[19px] font-semibold">현장 분석부터 시운전까지, 모두 책임지고 수행합니다.</p>
      <div className="mt-[60px] grid grid-cols-4 gap-[10px]">
        {steps.map((step) => (
          <div key={step.number} className="relative h-[400px] overflow-hidden rounded-[10px] shadow-md">
            <Image src={step.image} alt={`${step.title} 작업 현장`} fill sizes="300px" className={`object-cover ${step.number === "04" ? "object-[56%_center]" : ""}`} />
          </div>
        ))}
      </div>
      <div className="mt-[40px] grid grid-cols-4 gap-[10px]">
        {steps.map((step, index) => (
          <article key={step.number} className="relative text-center">
            {index < 3 && <span aria-hidden="true" className="absolute left-[203px] top-[38px] h-[2px] w-[184px] bg-[#00ADDB]" />}
            <span className="relative z-10 mx-auto flex size-[76px] items-center justify-center rounded-full bg-[#00ADDB] text-[30px] font-bold text-white">{step.number}</span>
            <h3 className="mt-[25px] text-[30px] font-semibold">{step.title}</h3>
            <p className="mt-[15px] whitespace-nowrap text-[22px] font-semibold text-[#243447]/80">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
