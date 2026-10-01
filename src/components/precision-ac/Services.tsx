import Image from "next/image";

const services = [
  ["01", "항온항습기 설치, 교체", "공간 용도와 요구, 온/습도, 설치 조건을 확인 후", "장비 선정 및 노후 설비 교체", "service-install-figma.png"],
  ["02", "수리, 부품교체", "운전 이상 원인을 점검하고", "필요한 부품 수리, 교체 진행", "service-parts-figma.png"],
  ["03", "유지보수, 정기점검", "온/습도 제어 상태와 주요 부품을 확인하고", "설비 상태에 따른 정비 진행", "service-maintenance-figma.png"],
] as const;

export default function Services() {
  return (
    <section className="mx-auto flex h-[963px] w-[1920px] flex-col items-center gap-[67px] bg-white px-[120px] py-[60px]">
      <header className="text-center">
        <p className="text-[20px] font-bold tracking-[6px] text-[#00ADDB]">AIR CONDITIONER SERVICE</p>
        <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">항온항습기 주요 서비스</h2>
        <p className="mt-[25px] text-[25px] font-semibold text-[#243447]/60">항온항습기 설치부터 유지관리까지</p>
      </header>
      <div className="flex h-[623px] w-[1159px] gap-[52px]">
        <div className="relative h-[623px] w-[467px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Image src="/images/precision-ac/services-main-current.png" alt="항온항습기 내부 전기 설비" fill sizes="467px" quality={100} className="object-cover" />
        </div>
        <div className="flex w-[640px] flex-col justify-center">
          {services.map(([number, title, line1, line2, image], index) => (
            <div key={number}>
              <article className="flex h-[190px] items-center gap-[20px]">
                <div className="relative size-[100px] shrink-0">
                  <Image src={`/images/precision-ac/${image}`} alt="" fill sizes="100px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">{number}</p>
                  <h3 className="mt-[10px] whitespace-nowrap text-[35px] font-bold tracking-[1.75px] text-[#102D4A]">{title}</h3>
                  <p className="mt-[10px] whitespace-nowrap text-[25px] font-semibold leading-[40px] tracking-[1.25px] text-[#243447]/80">
                    {line1}<br />{line2}
                  </p>
                </div>
              </article>
              {index < services.length - 1 && <div className="h-[2px] w-full bg-[#00ADDB]/30" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
