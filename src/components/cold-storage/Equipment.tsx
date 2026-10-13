import Image from "next/image";

const equipmentPoints = [
  {
    number: "01",
    title: "보관 품목과 목표 온도",
    description: "냉장, 냉동 용도와 보관 조건을 확인합니다.",
    icon: "/images/cold-storage/storage-condition-icon.png",
  },
  {
    number: "02",
    title: "저온저장고 규모와 사용 방식",
    description: "공간 크기, 입출고량, 출입문 개폐 빈도를 검토합니다.",
    icon: "/images/cold-storage/storage-size-icon.png",
  },
  {
    number: "03",
    title: "장비 배치와 공기 순환",
    description: "적재 위치와 통로를 고려해 냉동설비를 배치합니다.",
    icon: "/images/cold-storage/airflow-layout-icon.png",
  },
];

export default function Equipment() {
  return (
    <section className="mx-auto h-auto w-full lg:w-[1440px] bg-white px-[20px] lg:px-[120px] py-[36px] lg:py-[60px]">
      <header className="text-center">
        <p className="text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-[#00ADDB]">COLD STORAGE SERVICE</p>
        <h2 className="mt-[10px] lg:mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-[#102D4A]">저온저장고 냉동설계<br className="lg:hidden" /> 핵심요소</h2>
        <p className="mt-[10px] lg:mt-[25px] text-[15px] lg:text-[25px] font-semibold text-[#243447]/60">보관 품목과 공간에 맞춰 냉동설비를 구성합니다.</p>
      </header>

      <div className="mx-auto mt-[24px] lg:mt-[51px] flex flex-col lg:flex-row w-full lg:w-[1092px] gap-[28px] lg:gap-[52px]">
        <div className="relative h-[260px] lg:h-[520px] w-full lg:w-[390px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Image src="/images/cold-storage/equipment-overview.png" alt="저온저장고 냉동설비" fill sizes="374px" className="object-cover" />
        </div>
        <div className="flex w-full lg:w-[666px] flex-col gap-[16px] lg:gap-[30px]">
          {equipmentPoints.map((point, index) => (
            <article key={point.number} className={`flex h-auto min-h-[120px] lg:min-h-0 lg:h-[159px] items-center gap-4 lg:gap-[20px] ${index < equipmentPoints.length - 1 ? "border-b border-[#00ADDB]/30 lg:border-b-2" : ""}`}>
              <div className="relative size-[56px] lg:size-[100px] shrink-0">
                <Image src={point.icon} alt="" fill sizes="100px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[15px] lg:text-[25px] font-bold tracking-[3px] lg:tracking-[5px] text-[#00ADDB]">{point.number}</p>
                <h3 className="mt-[10px] lg:mt-[10px] lg:whitespace-nowrap text-[21px] lg:text-[35px] font-bold tracking-[1px] lg:tracking-[1.75px] text-[#102D4A]">{point.title}</h3>
                <p className="mt-[10px] lg:mt-[10px] lg:whitespace-nowrap text-[15px] lg:text-[25px] font-semibold leading-6 lg:leading-[40px] tracking-[1px] lg:tracking-[1.25px] text-[#243447]/80">{point.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
