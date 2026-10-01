import Image from "next/image";

const companyDetails = [
  ["회사명", "주식회사 산정엔지니어링"],
  ["대표자", "김윤환"],
  ["설립년도", "1993년"],
  ["주요사업", "냉동공조 설비, 섬유덕트"],
] as const;

export default function CompanyOverview() {
  return (
    <section className="mx-auto h-[819px] w-[1440px] px-[110px] py-[73px]">
      <header>
        <p className="flex items-center gap-[18px] text-[18px] font-semibold tracking-[5.3px] text-[#00ADDB]/60">COMPANY OVERVIEW<span aria-hidden="true" className="h-[2px] w-[41px] bg-current" /></p>
        <h2 className="mt-[9px] text-[51px] font-bold tracking-[2.6px] text-[#102D4A]">회사 개요</h2>
      </header>
      <div className="mt-[54px] flex h-[520px] w-[1212px] items-center gap-[100px] rounded-[10px] bg-[#00ADDB]/10">
        <div className="relative size-[520px] shrink-0"><Image src="/images/about/company-logo-card.png" alt="산정엔지니어링 로고" fill sizes="520px" className="object-cover" /></div>
        <dl className="w-[396px]">
          {companyDetails.map(([term, value]) => <div key={term} className="flex h-[70px] items-start justify-between border-b-2 border-[#00ADDB]/20 pt-[1px]"><dt className="text-[25px] font-bold tracking-[1.25px] text-[#102D4A]">{term}</dt><dd className="pt-[3px] text-[20px] font-semibold text-[#243447]/90">{value}</dd></div>)}
          <div className="flex h-[89px] items-center justify-between border-b-2 border-[#00ADDB]/20"><dt className="text-[25px] font-bold tracking-[1.25px] text-[#102D4A]">소재지</dt><dd className="text-right text-[20px] font-semibold leading-[24px] text-[#243447]/90">서울시 금천구 시흥대로 97, 6-213<br />(시흥동, 시흥산업 용재 유통센터)</dd></div>
          <div className="flex h-[68px] items-center justify-between"><dt className="text-[25px] font-bold tracking-[1.25px] text-[#102D4A]">연락처</dt><dd className="text-right text-[20px] font-semibold leading-[24px] text-[#243447]/90">010-5340-1728<br />sanjungeng@naver.com</dd></div>
        </dl>
      </div>
    </section>
  );
}
