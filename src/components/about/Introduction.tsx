import Image from "next/image";

export default function Introduction() {
  return (
    <section className="mx-auto flex h-auto lg:h-[730px] w-full lg:max-w-[1440px] items-center justify-center px-[20px] lg:px-[120px] py-[36px] lg:py-[103px]">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[524px] items-center justify-center gap-[28px] lg:gap-[82px]">
        <div className="flex h-auto lg:h-[524px] w-full lg:w-[650px] shrink-0 flex-col items-start gap-[16px] lg:gap-[15px]">
          <div className="flex w-full lg:w-[568px] flex-col items-start gap-[16px] lg:gap-[26px]">
            <p className="flex items-center gap-[16px] lg:gap-[19px] text-[14px] lg:text-[20px] font-bold tracking-[3px] lg:tracking-[6px] text-brand-blue">
              ABOUT SANJUNG
              <span aria-hidden="true" className="h-[2px] w-10 lg:w-[166px] bg-brand-blue" />
            </p>
            <h2 className="text-[28px] lg:text-[50px] font-bold leading-[36px] lg:leading-[60px] text-brand-navy">
              온도와 공기의 흐름을 설계해,
              <br />
              산업 환경을 완성합니다.
            </h2>
          </div>
          <div className="relative h-[90px] lg:h-[151px] w-full lg:w-[453px]">
            <Image
              src="/images/about/anniversary-logo.png"
              alt="산정엔지니어링 30주년"
              fill
              sizes="453px"
              className="object-contain"
            />
          </div>
          <p className="text-[15px] lg:text-[25px] font-semibold leading-normal text-brand-text/60">
            다양한 산업 현장에서 쌓아온 경험과 기술력을 바탕으로
            <br />
            고객의 환경에 최적화된 냉동공조 솔루션을 제공합니다.
            <br />
            <br />
            정확한 진단과 신뢰할 수 있는 시공, 지속적인 유지관리로
            <br />
            고객의 안정적인 냉동공조 운영을 돕겠습니다.
          </p>
        </div>
        <div className="relative aspect-[424/524] lg:h-[524px] w-full lg:w-[424px] shrink-0 overflow-hidden">
          <Image
            src="/images/about/facility.jpg"
            alt="산업용 냉동기 설비"
            fill
            sizes="(max-width: 1023px) calc(100vw - 40px), 424px"
            quality={100}
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
