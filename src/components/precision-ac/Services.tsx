import Image from "next/image";

const services = [
  [
    "01",
    "항온항습기 설치, 교체",
    "공간 용도와 요구 온/습도, 설치 조건을 확인 후",
    "장비 설치 및 노후 설비 교체",
    "service-install-figma.png",
  ],
  [
    "02",
    "수리, 부품교체",
    "운전 이상 원인을 점검하고",
    "필요한 부품 수리, 교체 진행",
    "service-parts-figma.png",
  ],
  [
    "03",
    "유지보수, 정기점검",
    "온/습도 제어 상태와 주요 부품을 확인하고",
    "설비 상태에 따른 정비 진행",
    "service-maintenance-figma.png",
  ],
] as const;

export default function Services() {
  return (
    <section className="mx-auto h-auto w-full lg:max-w-[1440px] bg-white px-5 lg:px-10 py-9 lg:py-[60px]">
      <header className="text-center">
        <p
          data-section-eyebrow
          className="text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-brand-blue"
        >
          AIR CONDITIONER SERVICE
        </p>
        <h2 className="mt-[10px] text-[28px] lg:text-[50px] font-bold tracking-[1px] lg:tracking-[2.5px] text-brand-navy">
          항온항습기 주요 서비스
        </h2>
        <p className="mt-[10px] lg:mt-[25px] text-[15px] lg:text-[25px] font-semibold text-brand-text/60">
          항온항습기 설치부터 유지관리까지.
        </p>
      </header>
      <div className="mx-auto mt-7 grid w-full max-w-[1200px] grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-[minmax(0,390fr)_minmax(0,666fr)] lg:gap-8">
        <div className="relative h-[260px] lg:min-h-[520px] w-full min-w-0 shrink-0 overflow-hidden rounded-[24px] border border-brand-navy/10 shadow-[0_12px_32px_rgba(16,46,73,0.1)] lg:h-auto">
          <Image
            src="/images/projects/warehouse-precision-ac/4.jpg"
            alt="항온항습기 내부 전기 설비"
            fill
            sizes="(min-width: 1440px) 422px, (min-width: 1024px) 34vw, calc(100vw - 40px)"
            quality={85}
            className="object-cover"
          />
        </div>
        <div className="flex w-full min-w-0 flex-col gap-3 lg:gap-4">
          {services.map(([number, title, line1, line2, image]) => (
            <article
              key={number}
              className="flex min-w-0 flex-1 items-center gap-4 rounded-[22px] border border-brand-navy/10 bg-white p-5 shadow-[0_4px_18px_rgba(16,46,73,0.05)] lg:gap-5 lg:p-6"
            >
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[#EFF8FC] lg:size-24">
                <Image
                  src={`/images/precision-ac/${image}`}
                  alt=""
                  width={80}
                  height={80}
                  sizes="(min-width: 1024px) 80px, 64px"
                  className="size-16 object-contain lg:size-20"
                />
              </div>
              <div className="min-w-0">
                <h3 className="break-keep text-[21px] font-bold leading-snug text-brand-navy lg:text-[29px]">
                  {title}
                </h3>
                <p className="mt-2 break-keep text-[16px] font-medium leading-7 text-brand-text/80 lg:text-[21px] lg:leading-8">
                  {line1}
                  <br className="hidden lg:block" />
                  {line2}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
