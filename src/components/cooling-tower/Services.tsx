import Image from "next/image";
import { Fragment } from "react";

const services = [
  {
    number: "01",
    title: "냉각탑 설치, 교체",
    description: <>현장 조건과 설비 용량을 고려해<br />냉각탑을 설치하고 노후 설비를 교체합니다.</>,
    icon: "/images/cooling-tower/service-install-replace.png",
  },
  {
    number: "02",
    title: "충진물, 부품교체",
    description: <>노후된 충진물과 노즐, 팬, 모터, 벨트 등<br />주요 부품을 점검하고 교체합니다.</>,
    icon: "/images/cooling-tower/service-parts-replace.png",
  },
  {
    number: "03",
    title: "수리, 정기점검",
    description: <>배관 누수 및 손상 부위를 수리하고<br />운전 상태와 주요 설비를 정기적으로 점검합니다.</>,
    icon: "/images/cooling-tower/service-repair-inspection.png",
  },
];

export default function Services() {
  return (
    <section className="mx-auto h-[auto] w-[1440px] bg-white px-[120px] py-[60px]">
      <header className="text-center">
        <p className="text-[20px] font-bold tracking-[6px] text-[#00ADDB]">COOLING TOWER SERVICE</p>
        <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">냉각탑 주요 서비스</h2>
        <p className="mt-[25px] text-[25px] font-semibold text-[#243447]/60">냉각탑 설치부터 유지관리까지 한 번에 제공합니다.</p>
      </header>

      <div className="mx-auto mt-[67px] flex h-[623px] w-[1159px] gap-[52px]">
        <div className="relative h-[623px] w-[467px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Image src="/images/cooling-tower/services-main.jpg" alt="냉각탑 충진물을 교체하는 작업 현장" fill sizes="467px" quality={100} className="object-cover" />
        </div>
        <div className="flex w-[640px] flex-col gap-[30px]">
          {services.map((service, index) => (
            <Fragment key={service.number}>
              <article className="flex h-[166px] shrink-0 items-center gap-[20px]">
                <Image src={service.icon} alt="" width={120} height={120} className="" />
                <div>
                  <p className="text-[25px] font-bold tracking-[5px] text-[#00ADDB]">{service.number}</p>
                  <h3 className="mt-[10px] text-[35px] font-bold tracking-[1.75px] text-[#102D4A]">{service.title}</h3>
                  <p className="mt-[10px] whitespace-nowrap text-[25px] font-semibold leading-[40px] tracking-[1.25px] text-[#243447]/80">{service.description}</p>
                </div>
              </article>
              {index < services.length - 1 && <span aria-hidden="true" className="h-[2px] w-[620px] shrink-0 bg-[#00ADDB]/30" />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
