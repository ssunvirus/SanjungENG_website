import Image from "next/image";

const companyDetails = [
  { term: "회사명", lines: ["주식회사 산정엔지니어링"], height: "lg:min-h-[70px]" },
  { term: "대표자", lines: ["김윤환"], height: "lg:min-h-[70px]" },
  { term: "설립연도", lines: ["1993년"], height: "lg:min-h-[70px]" },
  { term: "주요사업", lines: ["냉동공조 설비, 섬유덕트"], height: "lg:min-h-[70px]" },
  { term: "소재지", lines: ["서울시 금천구 시흥대로 97, 6-213", "(시흥동, 시흥산업 용재 유통센터)"], height: "lg:min-h-[89px]" },
  { term: "연락처", lines: ["010-5340-1728", "sanjungeng@naver.com"], height: "lg:min-h-[68px]" },
] as const;

export default function CompanyOverview() {
  return (
    <section className="mx-auto h-auto lg:h-[819px] w-full lg:w-[1440px] px-[20px] lg:px-[110px] py-[36px] lg:py-[73px]">
      <header>
        <p className="flex items-center gap-[16px] lg:gap-[18px] text-[14px] lg:text-[18px] font-semibold tracking-[3px] lg:tracking-[5.3px] text-[#00ADDB]/60">COMPANY OVERVIEW<span aria-hidden="true" className="h-[2px] w-[41px] bg-current" /></p>
        <h2 className="mt-[10px] lg:mt-[9px] text-[28px] lg:text-[51px] font-bold tracking-[1px] lg:tracking-[2.6px] text-[#102D4A]">회사 개요</h2>
      </header>
      <div className="mt-[24px] lg:mt-[54px] flex flex-col lg:flex-row h-auto lg:h-[520px] w-full lg:w-[1212px] items-center gap-[28px] lg:gap-[100px] rounded-[10px] bg-[#00ADDB]/10">
        <div className="relative h-[240px] w-full lg:size-[520px] shrink-0"><Image src="/images/about/company-logo-card.png" alt="산정엔지니어링 로고" fill sizes="520px" className="object-cover" /></div>
        <dl className="w-full px-4 pb-6 lg:px-0 lg:pb-0 lg:w-[396px]">
          {companyDetails.map(({ term, lines, height }) => (
            <div
              key={term}
              className={`flex min-h-[60px] items-center justify-between gap-3 border-b-2 border-[#00ADDB]/20 py-2 last:border-b-0 ${height}`}
            >
              <dt className="shrink-0 text-[15px] font-bold tracking-[1px] text-[#102D4A] lg:text-[25px] lg:tracking-[1.25px]">
                {term}
              </dt>
              <dd className="min-w-0 text-right text-[14px] font-semibold leading-[24px] text-[#243447]/90 lg:text-[20px]">
                {lines.map((line) => (
                  <span key={line} className="block break-words">{line}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
