import Image from "next/image";

const maintenanceServices = [
  {
    number: "01",
    title: "냉동기 세관",
    description: "열교환기 내부의 스케일과 이물질을 제거",
    image: "/images/chiller/maintenance-cleaning.png",
    alt: "냉동기 열교환기 세관 작업",
    width: 400,
  },
  {
    number: "02",
    title: "수리 & 오버홀",
    description: "주요 부품을 분해, 점검하고 마모·손상 부품을 정비",
    image: "/images/chiller/maintenance-overhaul.png",
    alt: "냉동기 주요 부품 수리와 오버홀 작업",
    width: 400,
  },
  {
    number: "03",
    title: "정기점검",
    description: "운전 상태와 주요 부품을 주기적으로 점검",
    image: "/images/chiller/maintenance-inspection.png",
    alt: "냉동공조 설비 정기점검 작업",
    width: 407,
  },
];

export default function Maintenance() {
  return (
    <section className="mx-auto w-[1440px] overflow-hidden px-[63px] py-[60px]">
      <header>
        <p className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">
          MAINTENANCE
          <span aria-hidden="true" className="h-[2px] w-[46px] bg-[#00ADDB]/60" />
        </p>
        <h2 className="mt-[10px] text-[50px] font-bold tracking-[2.5px] text-[#102D4A]">
          유지보수 &amp; 정기점검
        </h2>
        <p className="mt-[25px] text-[19px] font-semibold text-[#243447]">
          운전 상태와 주요 부품을 점검하고, 설비 상태에 맞춰 필요한 정비를 진행합니다.
        </p>
      </header>

      <div className="mt-[72px] flex items-start gap-[50px]">
        {maintenanceServices.map((service) => (
          <article key={service.number} style={{ width: service.width }} className="shrink-0">
            <div className="relative h-[300px]">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes={`${service.width}px`}
                className="rounded-[10px] object-cover shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="mt-[20px]">
              <div className="flex items-center gap-[19px]">
                <span className="text-[30px] font-bold tracking-[3px] text-[#00ADDB]">
                  {service.number}
                </span>
                <span aria-hidden="true" className="h-[27px] w-[3px] bg-[#00ADDB]" />
                <h3 className="text-[30px] font-semibold text-[#243447]">{service.title}</h3>
              </div>
              <p className="mt-[20px] whitespace-nowrap text-[22px] font-semibold leading-[30px] text-[#243447]/80">
                {service.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
