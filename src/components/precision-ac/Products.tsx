import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";

export default function Products() {
  return (
    <section className="mx-auto h-auto lg:h-[960px] w-full lg:w-[1440px] bg-white px-[20px] lg:px-[120px] py-[36px] lg:py-[60px]">
      <header className="flex flex-col lg:flex-row h-auto lg:h-[179px] items-start lg:items-center gap-4 lg:gap-[200px]">
        <div className="relative order-2 lg:order-1 mt-3 lg:mt-0 self-center h-[75px] lg:h-[179px] w-[180px] lg:w-[430px]"><Image src="/images/precision-ac/century-logo-current.png" alt="Century 센추리" fill sizes="(max-width: 1023px) 180px, 430px" className="object-contain" /></div>
        <div className="order-1 lg:order-2 w-full lg:w-auto"><SectionEyebrow>AIR CONDITIONER</SectionEyebrow><h2 className="mt-[10px] lg:mt-[10px] text-[28px] lg:text-[45px] font-bold tracking-[1px] lg:tracking-[2.25px] text-[#102D4A]">주요 항온항습기</h2><p className="mt-[10px] lg:mt-[25px] text-[14px] lg:text-[19px] font-semibold">산정엔지니어링은<br /><br className="hidden lg:block" />최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.</p></div>
      </header>
      <div className="mt-[24px] lg:mt-[80px] flex flex-col lg:flex-row items-center justify-center gap-[28px] lg:gap-[200px]">
        <article className="flex w-full lg:w-[375px] flex-col items-center gap-[28px] lg:gap-[33px]"><div className="relative h-[240px] lg:h-[500px] w-full lg:w-[290px]"><Image src="/images/precision-ac/product-upflow-current.png" alt="상부 토출형 항온항습기" fill sizes="290px" className="object-contain" /></div><h3 className="text-[28px] lg:text-[40px] font-semibold">상부 토출형</h3></article>
        <article className="flex w-full lg:w-[500px] flex-col items-center gap-[28px] lg:gap-[33px]"><div className="relative h-[260px] w-full lg:size-[500px]"><Image src="/images/precision-ac/product-downflow-current.png" alt="하부 토출형 항온항습기" fill sizes="500px" className="object-contain" /></div><h3 className="text-[28px] lg:text-[40px] font-semibold">하부 토출형</h3></article>
      </div>
    </section>
  );
}
