import Image from "next/image";

const items = [
  ["01", "충진물", "오염, 막힘, 변형 상태 확인 및 교체", "maintenance-fill.png"],
  ["02", "팬, 모터, 벨트, 윤활유", "작동 상태 및 마모, 진동, 소음 확인", "maintenance-fan-motor.png"],
  ["03", "노즐, 살수계통", "막힘 및 냉각수 분사 상태 확인", "maintenance-nozzle.png"],
  ["04", "수조, 스트레이너", "이물질 및 오염 상태 확인, 세척", "maintenance-basin.png"],
  ["05", "배관, 밸브", "누수, 부식 상태 확인 및 보수", "maintenance-pipe-valve.png"],
  ["06", "냉각탑 세척", "내부 오염물과 침전물 제거", "maintenance-cleaning.png"],
];

export default function Maintenance() {
  return (
    <section className="mx-auto h-[798.725px] w-[1440px] bg-white px-[120px] py-[60px]">
      <header className="h-[140.882px] w-[1200px]">
        <div className="flex items-center gap-[17.647px] text-[17.65px] font-medium tracking-[5.295px] text-[#00ADDB]/60">
          MAINTENANCE <span className="h-[1.76px] w-[40.858px] bg-current" />
        </div>
        <h2 className="mt-[8.824px] text-[51.38px] font-bold tracking-[2.569px] text-[#102D4A]">냉각탑 주요 정비</h2>
        <p className="mt-[22.059px] text-[16.54px] font-semibold">충진물부터 구동부, 살수계통, 배관까지 설비 상태에 맞춰 점검, 정비합니다.</p>
      </header>

      <div className="mt-[36.667px] grid h-[501.176px] w-[1200px] grid-cols-3 gap-[21.176px]">
        {items.map(([number, title, description, image]) => (
          <article key={number} className="h-[240px] rounded-[10.588px] bg-[#EFF7FB] px-[26.471px] py-[21.176px]">
            <div className="flex h-[100.588px] items-start justify-between">
              <Image src={`/images/cooling-tower/${image}`} alt="" width={97} height={97} />
              <span className="text-[18.529px] font-bold leading-[27.353px] text-[#00ADDB]">{number}</span>
            </div>
            <h3 className="mt-[10.588px] text-[26.471px] font-bold leading-[38.824px] text-[#102D4A]">{title}</h3>
            <p className="mt-[10.588px] text-[17.647px] leading-[25.588px] text-[#526075]">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
