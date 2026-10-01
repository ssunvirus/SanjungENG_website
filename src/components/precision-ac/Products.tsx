import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";

export default function Products() {
  return (
    <section className="mx-auto h-[960px] w-[1440px] bg-white px-[120px] py-[60px]">
      <header className="flex h-[179px] items-center gap-[200px]">
        <div className="relative h-[179px] w-[430px]"><Image src="/images/precision-ac/century-logo-current.png" alt="Century 센추리" fill sizes="430px" className="object-contain" /></div>
        <div><SectionEyebrow>AIR CONDITIONER</SectionEyebrow><h2 className="mt-[10px] text-[45px] font-bold tracking-[2.25px] text-[#102D4A]">주요 항온항습기</h2><p className="mt-[25px] text-[19px] font-semibold">산정엔지니어링은<br /><br />최첨단 냉동공조시스템 전문 기업 (주)센추리의 파트너사입니다.</p></div>
      </header>
      <div className="mt-[80px] flex items-center justify-center gap-[200px]">
        <article className="flex w-[375px] flex-col items-center gap-[33px]"><div className="relative h-[500px] w-[290px]"><Image src="/images/precision-ac/product-upflow-current.png" alt="상부 토출형 항온항습기" fill sizes="290px" className="object-contain" /></div><h3 className="text-[40px] font-semibold">상부 토출형</h3></article>
        <article className="flex w-[500px] flex-col items-center gap-[33px]"><div className="relative size-[500px]"><Image src="/images/precision-ac/product-downflow-current.png" alt="하부 토출형 항온항습기" fill sizes="500px" className="object-contain" /></div><h3 className="text-[40px] font-semibold">하부 토출형</h3></article>
      </div>
    </section>
  );
}
