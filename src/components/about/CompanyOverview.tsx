import Image from "next/image";
import { Building2, UserRound, CalendarDays, Layers, MapPin, Phone, Mail } from "lucide-react";

const companyDetails = [
  { term: "회사명", lines: ["주식회사 산정엔지니어링"], icon: Building2 },
  { term: "대표자", lines: ["김윤환"], icon: UserRound },
  { term: "설립연도", lines: ["1993년"], icon: CalendarDays },
  { term: "주요사업", lines: ["냉동공조 설비, 섬유덕트"], icon: Layers },
  {
    term: "소재지",
    lines: ["서울시 금천구 시흥대로 97, 6-213", "(시흥동, 시흥산업 용재 유통센터)"],
    icon: MapPin,
  },
] as const;

export default function CompanyOverview() {
  return (
    <section className="mx-auto h-auto lg:min-h-[819px] w-full lg:max-w-[1440px] px-[20px] lg:px-[110px] py-[36px] lg:py-[73px]">
      <header>
        <p className="flex items-center gap-[16px] lg:gap-[18px] text-[14px] lg:text-[18px] font-semibold tracking-[3px] lg:tracking-[5.3px] text-brand-blue/60">
          COMPANY OVERVIEW
          <span aria-hidden="true" className="h-[2px] w-[41px] bg-current" />
        </p>
        <h2 className="mt-[10px] lg:mt-[9px] text-[28px] lg:text-[51px] font-bold tracking-[1px] lg:tracking-[2.6px] text-brand-navy">
          회사 개요
        </h2>
      </header>
      <div className="mt-6 grid w-full grid-cols-1 gap-6 rounded-[28px] bg-white p-5 shadow-[0_12px_36px_rgba(16,47,73,0.07)] min-[1200px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] min-[1200px]:gap-10 min-[1200px]:p-8 lg:mt-[54px]">
        <div className="relative isolate flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-[#EFF6FD] px-8 min-[1200px]:min-h-[380px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 440 150"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 -z-10 h-[36%] w-full"
          >
            <path d="M0 150C80 150 110 78 230 76S340 110 440 34V150Z" fill="#D1E8FC" />
            <path d="M150 150C240 122 300 18 440 20V150Z" fill="#A9D3FA" fillOpacity="0.7" />
          </svg>
          <Image
            src="/logo-default.svg"
            alt="산정엔지니어링 로고"
            width={340}
            height={105}
            sizes="(min-width: 1200px) 340px, 80vw"
            className="h-auto w-full max-w-[340px]"
          />
        </div>
        <dl className="min-w-0">
          {companyDetails.map(({ term, lines, icon: Icon }) => (
            <div
              key={term}
              className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-x-3 border-b border-brand-navy/10 py-3 first:pt-0 min-[768px]:grid-cols-[46px_120px_minmax(0,1fr)] min-[768px]:gap-x-4"
            >
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-xl bg-[#EDF5FE] text-[#006EB8] min-[768px]:size-[46px]"
              >
                <Icon size={23} strokeWidth={1.9} />
              </span>
              <dt className="text-[18px] font-bold leading-7 text-brand-navy min-[768px]:text-[23px]">
                {term}
              </dt>
              <dd className="col-start-2 min-w-0 break-keep text-[16px] font-medium leading-[1.6] text-brand-navy min-[768px]:col-start-auto min-[768px]:text-[20px]">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          ))}
          <div className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-x-3 gap-y-2 pt-4 min-[768px]:grid-cols-[46px_104px_minmax(0,1fr)] min-[768px]:gap-x-4">
            <span
              aria-hidden="true"
              className="flex size-9 items-center justify-center rounded-xl bg-[#EDF5FE] text-[#006EB8] min-[768px]:size-[46px]"
            >
              <Phone size={23} strokeWidth={1.9} />
            </span>
            <dt className="text-[18px] font-bold text-brand-navy min-[768px]:text-[23px]">
              연락처
            </dt>
            <dd className="col-start-2 flex min-w-0 flex-wrap gap-2 min-[768px]:col-start-auto">
              <a
                href="tel:01053401728"
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-[#EDF5FE] px-3 py-2 text-[15px] font-bold text-[#006EB8] transition-colors hover:bg-brand-blue/15 focus-visible:outline-2 focus-visible:outline-brand-blue min-[768px]:text-[17px]"
              >
                <Phone size={19} aria-hidden="true" />
                010-5340-1728
              </a>
              <a
                href="mailto:sanjungeng@naver.com"
                className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-2xl bg-[#EDF5FE] px-3 py-2 text-[15px] font-bold text-[#006EB8] transition-colors hover:bg-brand-blue/15 focus-visible:outline-2 focus-visible:outline-brand-blue min-[768px]:text-[17px]"
              >
                <Mail size={19} className="shrink-0" aria-hidden="true" />
                <span className="[overflow-wrap:anywhere]">sanjungeng@naver.com</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
