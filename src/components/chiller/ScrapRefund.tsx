import Image from "next/image";
import { RefreshCw, Tag } from "lucide-react";

const items = [
  {
    icon: "/images/chiller/scrap-value.svg",
    title: "고재 가치 평가",
    description: "재질, 수량, 상태 확인",
  },
  {
    icon: "/images/chiller/cost-settlement.svg",
    title: "철거비와 정산",
    description: "협의된 기준으로 정산",
  },
  { icon: "/images/chiller/refund.svg", title: "차액 환급", description: "철거비 초과 시 환급" },
];

export default function ScrapRefund() {
  return (
    <aside
      aria-labelledby="removal-scrap-heading"
      className="relative isolate mt-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E1F3FF] via-[#F5FAFE] to-[#DDF1FF] p-6 lg:mt-10 lg:p-8"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 440 150"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[36%] w-full opacity-40"
      >
        <path d="M0 150C80 150 110 78 230 76S340 110 440 34V150Z" fill="#D1E8FC" />
        <path d="M150 150C240 122 300 18 440 20V150Z" fill="#A9D3FA" fillOpacity="0.7" />
      </svg>
      <div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div className="flex flex-col items-center justify-center lg:border-r lg:border-brand-blue/15 lg:pr-7">
          <div className="w-[224px] max-w-full shrink-0 lg:w-[212px]">
            <Image
              src="/images/chiller/scrap-refund-character-transparent.png"
              alt="고재비 환급을 안내하는 산정엔지니어링 캐릭터"
              width={1389}
              height={1132}
              sizes="(min-width: 1200px) 212px, 224px"
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="relative z-10 -mt-3 flex w-[240px] max-w-full items-center justify-center gap-2.5 rounded-[18px] bg-brand-navy px-3 py-3 text-left text-[15px] font-bold leading-6 text-white lg:w-full lg:gap-2 lg:px-2.5 lg:text-[17px] lg:leading-[22px]">
            <RefreshCw aria-hidden="true" className="size-8 shrink-0 lg:size-7" />
            <span className="whitespace-nowrap">
              고재비 정산 후<br />
              <span className="text-[#FFE183]">차액을 환급</span>해 드려요
            </span>
          </p>
        </div>
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-blue/25 px-4 py-2 text-base font-bold text-brand-navy lg:text-lg">
            <Tag aria-hidden="true" size={22} /> 고재 매각대금 환급
          </p>
          <h3
            id="removal-scrap-heading"
            className="mt-4 text-[26px] font-extrabold leading-[1.4] tracking-tight text-brand-navy lg:text-[34px]"
          >
            고재 평가금액이 철거비를 초과하면 <br className="hidden lg:block" />
            <span className="text-brand-blue">차액을 환급</span>받을 수 있습니다.
          </h3>
          <p className="mt-3 text-lg font-semibold leading-8 text-brand-navy/75 lg:text-xl">
            회수 가능한 고재는 재질과 수량, 현장 조건에 따라 가치를 산정하고, 협의한 철거 비용과
            함께 정산합니다.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {items.map(({ icon, title, description }) => (
              <li
                key={title}
                className="flex items-center gap-3 rounded-[20px] border border-white bg-white/85 px-4 py-4 shadow-[0_2px_8px_rgba(16,45,74,0.04)] lg:flex-col lg:items-start xl:flex-row xl:items-center"
              >
                <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-brand-blue/15 bg-[#EAF8FD]">
                  <Image src={icon} alt="" width={48} height={48} className="size-12" />
                </span>
                <div>
                  <p className="text-lg font-bold leading-7 text-brand-navy">{title}</p>
                  <p className="mt-1 text-base font-medium leading-6 text-brand-navy/70">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
