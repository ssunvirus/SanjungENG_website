import Image from "next/image";
import { Fragment } from "react";

const services = [
  {
    number: "01",
    title: "냉각탑 설치, 교체",
    description: (
      <>
        현장 조건과 설비 용량을 고려해
        <br />
        냉각탑을 설치하고 노후 설비를 교체합니다.
      </>
    ),
    icon: "/images/cooling-tower/service-install-replace.png",
  },
  {
    number: "02",
    title: "충진물, 부품교체",
    description: (
      <>
        노후된 충진물과 노즐, 팬, 모터, 벨트 등<br />
        주요 부품을 점검하고 교체합니다.
      </>
    ),
    icon: "/images/cooling-tower/service-parts-replace.png",
  },
  {
    number: "03",
    title: "수리, 정기점검",
    description: (
      <>
        배관 누수 및 손상 부위를 수리하고
        <br />
        운전 상태와 주요 설비를 정기적으로 점검합니다.
      </>
    ),
    icon: "/images/cooling-tower/service-repair-inspection.png",
  },
];

export default function Services() {
  return (
    <section className="mx-auto h-[auto] w-full lg:max-w-[1440px] bg-white px-[20px] lg:px-[120px] py-[36px] lg:py-[60px]">
      <header className="text-center">
        <p className="text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-brand-blue">
          COOLING TOWER SERVICE
        </p>
        <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          냉각탑 주요 서비스
        </h2>
        <p className="mt-[10px] lg:mt-[25px] text-[15px] lg:text-[25px] font-semibold text-brand-text/60">
          냉각탑 설치부터 유지관리까지 한 번에 제공합니다.
        </p>
      </header>

      <div className="mx-auto mt-[24px] lg:mt-[67px] flex flex-col lg:flex-row h-auto lg:h-[623px] w-full lg:w-[1159px] gap-[28px] lg:gap-[52px]">
        <div className="relative h-[240px] lg:h-[623px] w-full lg:w-[467px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Image
            src="/images/projects/church-cooling-tower/photo-1.jpg"
            alt="냉각탑 충진물을 교체하는 작업 현장"
            fill
            sizes="467px"
            quality={100}
            className="object-cover"
          />
        </div>
        <div className="flex w-full lg:w-[640px] flex-col gap-[16px] lg:gap-[30px]">
          {services.map((service, index) => (
            <Fragment key={service.number}>
              <article className="flex h-auto lg:h-[166px] shrink-0 items-center gap-[16px] lg:gap-[20px]">
                <Image
                  src={service.icon}
                  alt=""
                  width={120}
                  height={120}
                  className="hidden lg:block shrink-0"
                />
                <div>
                  <p className="text-[15px] lg:text-[25px] font-bold tracking-[3px] lg:tracking-[5px] text-brand-blue">
                    {service.number}
                  </p>
                  <h3 className="mt-[10px] text-[20px] lg:text-[35px] font-bold tracking-[1px] lg:tracking-[1.75px] text-brand-navy">
                    {service.title}
                  </h3>
                  <p className="mt-[10px] lg:whitespace-nowrap text-[15px] lg:text-[25px] font-semibold leading-[24px] lg:leading-[40px] tracking-[1px] lg:tracking-[1.25px] text-brand-text/80">
                    {service.description}
                  </p>
                </div>
              </article>
              {index < services.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block h-[2px] w-full lg:w-[620px] shrink-0 bg-brand-blue/30"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
