import Image from "next/image";

export default function Introduction() {
  return (
    <section className="mx-auto flex h-[730px] w-[1440px] items-center justify-center px-[120px] py-[103px]">
      <div className="flex h-[524px] items-center justify-center gap-[82px]">
        <div className="flex h-[524px] w-[650px] shrink-0 flex-col items-start gap-[15px]">
          <div className="flex w-[568px] flex-col items-start gap-[26px]">
            <p className="flex items-center gap-[19px] text-[20px] font-bold tracking-[6px] text-[#00ADDB]">ABOUT SANJUNG<span aria-hidden="true" className="h-[2px] w-[166px] bg-[#00ADDB]" /></p>
            <h2 className="text-[50px] font-bold leading-[60px] text-[#102D4A]">온도와 공기의 흐름을 설계해,<br />산업 환경을 완성합니다.</h2>
          </div>
          <div className="relative h-[151px] w-[453px]"><Image src="/images/about/anniversary-logo.png" alt="산정엔지니어링 30주년" fill sizes="453px" className="object-contain" /></div>
          <p className="text-[25px] font-semibold leading-normal text-[#243447]/60">다양한 산업 현장에서 쌓아온 경험과 기술력을 바탕으로<br />고객의 환경에 최적화된 냉동/공조 솔루션을 제공합니다.<br /><br />정확한 진단과 신뢰할 수 있는 시공, 지속적인 유지관리로<br />고객의 안정적인 운영을 돕는 것이 산정엔지니어링의 약속입니다.</p>
        </div>
        <div className="relative h-[524px] w-[424px] shrink-0 overflow-hidden"><Image src="/images/about/facility.png" alt="산업용 냉동기 설비" fill sizes="424px" quality={100} className="object-cover object-top" /></div>
      </div>
    </section>
  );
}
