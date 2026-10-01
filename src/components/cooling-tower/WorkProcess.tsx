import Image from "next/image";

const steps = [
  ["01", "현장 확인 및 설비 점검", "운전 상태와 주요 설비 확인", "process-inspection.jpg"],
  ["02", "정비 항목 및 작업 범위 확인", "충진물, 부품, 배관 상태 점검", "process-scope.jpg"],
  ["03", "부품 교체 및 보수 작업", "노후 부품 교체 및 설비 보수", "process-repair.jpg"],
  ["04", "시운전 및 최종 확인", "작동 상태와 이상 여부 확인", "process-test.jpg"],
];

export default function WorkProcess() {
  return (
    <section className="mx-auto h-auto w-[1440px] bg-[#00ADDB]/5 px-[120px] py-[60px]">
      <header>
        <div className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">
          WORK PROCESS <span className="h-[2px] w-[46px] bg-current" />
        </div>
        <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">냉각탑, 이렇게 점검하고 정비합니다.</h2>
        <p className="mt-[25px] text-[19px] font-semibold">설비 상태 확인부터 부품 교체와 시운전까지 현장에 맞춰 진행합니다.</p>
      </header>

      <div className="mt-[60px] grid w-[1257px] grid-cols-[repeat(4,300px)] gap-[19px]">
        {steps.map(([number, title, description, image]) => (
          <article key={number} className="text-center">
            <div className="relative h-[400px] w-[300px] overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Image src={`/images/cooling-tower/${image}`} alt={`${title} 작업 현장`} fill sizes="300px" quality={100} className="object-cover" />
            </div>
            <div className="relative mt-[40px]">
              {number !== "04" && <span aria-hidden="true" className="absolute left-[calc(50%+60px)] right-[calc(-50%+60px)] top-[38px] h-[2px] bg-[#00ADDB]" />}
              <span className="relative z-10 mx-auto flex size-[76px] items-center justify-center rounded-full bg-[#00ADDB] text-[30px] font-bold text-white">{number}</span>
              <h3 className="mt-[25px] whitespace-nowrap text-[30px] font-semibold text-[#243447]">{title}</h3>
              <p className="mt-[15px] whitespace-nowrap text-[22px] font-semibold leading-[28px] text-[#243447]/80">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
