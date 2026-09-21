import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

const businessCards = [
    {
        number: "01",
        title: "냉동공조",
        description: "현장에 맞는 설계, 설치, 교체",
        services: "냉동기 / 공조기 / CDU / 냉각탑",
        image: "/images/business/business-hvac.png",
        imageAlt: "산업용 냉동공조 설비",
        href: "/solutions",
    },
    {
        number: "02",
        title: "섬유덕트",
        description: "공간에 맞춘 공기 분배 설계",
        services: "맞춤 설계 / 제작 / 시공",
        image: "/images/business/business-fabric-duct.png",
        imageAlt: "실내 천장에 설치된 섬유덕트",
        href: "/fabric-duct",
    },
    {
        number: "03",
        title: "수리 & 오버홀",
        description: "고장 원인 진단과 성능 복구",
        services: "고장 진단 / 부품 교체 / 분해 정비",
        image: "/images/business/business-overhaul.png",
        imageAlt: "냉동공조 설비 수리 및 오버홀 현장",
        href: "/solutions#overhaul",
    },
    {
        number: "04",
        title: "유지보수",
        description: "안정적인 가동을 위한 정기점검",
        services: "정기점검 / 예방정비 / 설비관리",
        image: "/images/business/business-maintenance.png",
        imageAlt: "냉동공조 설비 유지보수 현장",
        href: "/solutions#maintenance",
    },
];

function SectionEyebrow() {
    return (
        <div className="flex items-center gap-[14px]">
            <span className="h-[3px] w-12 bg-[#00ADDB]" />
            <span className="text-[20px] font-medium leading-6 text-[#00ADDB]">
                OUR BUSINESS
            </span>
        </div>
    );
}

function BusinessOverview() {
    return (
        <section className="relative mx-auto h-[1081px] w-full max-w-[1920px] overflow-hidden">
            <Image
                src="/images/business/business-overview.png"
                alt="냉동공조와 섬유덕트가 적용된 산업 시설"
                fill
                sizes="1920px"
                className="object-cover"
            />

            <div className="absolute top-[51px] left-[240px]">
                <SectionEyebrow />
                <h2 className="mt-[54px] text-[60px] font-extrabold leading-[72px] text-[#102D4A]">
                    냉동기부터 섬유덕트까지
                </h2>
                <p className="mt-[12px] text-[60px] font-extrabold leading-[72px] text-[#00ADDB]">
                    냉동공조 설계 &amp; 시공.
                </p>
            </div>

            <ol aria-label="주요 사업 안내">
                {[
                    { title: "냉동설비", description: "설치 & 교체", x: 389, y: 399, width: 171, offset: 8, end: 624 },
                    { title: "수리&오버홀", description: "성능 복구", x: 771, y: 485, width: 220, offset: 10, end: 695 },
                    { title: "유지보수", description: "정기점검", x: 1166, y: 543, width: 166, offset: 8, end: 728 },
                    { title: "섬유덕트", description: "CFD 설계 & 시공", x: 1526, y: 213, width: 204, offset: 8, end: 442 },
                ].map((service, index) => (
                    <li key={service.title} className="absolute" style={{ left: service.x, top: service.y }}>
                        <span
                            aria-hidden="true"
                            className="absolute top-[34px] w-[3px] -translate-x-1/2 bg-[#0075BB]"
                            style={{ height: service.end - service.y - 34 }}
                        />
                        <span
                            aria-hidden="true"
                            className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#0075BB] bg-white"
                            style={{ top: service.end - service.y }}
                        />
                        <div
                            className="relative flex h-[76px] flex-col justify-center rounded-[20px] bg-white pl-[42px] pr-[12px] shadow-[0_4px_2px_rgba(0,0,0,0.25)]"
                            style={{ width: service.width, left: -service.offset }}
                        >
                            <h3 className="whitespace-nowrap text-[30px] font-bold leading-9 text-[#006EB8]">{service.title}</h3>
                            <p className="ml-[8px] whitespace-nowrap text-[20px] font-semibold leading-6 text-[#243447]">{service.description}</p>
                        </div>
                        <span style={{ left: 8 - service.offset }} className="absolute top-[12px] flex size-[44px] -translate-x-1/2 items-center justify-center rounded-full border-[4px] border-white bg-[#00ADDB] text-[20px] font-semibold text-[#243447]">
                            {index + 1}
                        </span>
                    </li>
                ))}
            </ol>

            <div className="absolute top-[980px] left-[512px] flex items-center text-[30px] font-semibold leading-9 text-[#243447]">
                <span>상담 &amp; 현장확인</span>
                <span className="ml-[50px] mr-[88px] flex items-center" aria-hidden="true">
                    <Image src="/images/business/process-arrow.svg" alt="" width={90} height={15} />
                </span>
                <span>설치 &amp; 시공</span>
                <span className="ml-[90px] mr-[58px] flex items-center" aria-hidden="true">
                    <Image src="/images/business/process-arrow.svg" alt="" width={90} height={15} />
                </span>
                <span>사후관리</span>
            </div>
        </section>
    );
}

function BusinessCard({ card }: { card: (typeof businessCards)[number] }) {
    return (
        <article className="h-[632px] w-[266px] shrink-0 overflow-hidden rounded-[10px] bg-white">
            <div className="relative h-[346px] overflow-hidden rounded-[10px]">
                <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="266px"
                    className="object-cover"
                />
            </div>

            <div className="px-[12px] pt-[19px] pb-[15px]">
                <p className="text-[15px] font-medium leading-5 text-[#00ADDB]">{card.number}</p>
                <h3 className="mt-[18px] whitespace-nowrap text-[34px] font-extrabold leading-[42px] text-[#102D4A]">
                    {card.title}
                </h3>
                <p className="mt-[19px] whitespace-nowrap text-[18px] font-semibold leading-[26px] text-[#243447]">
                    {card.description}
                </p>
                <div className="mx-[5px] mt-[18px] border-t border-black/15 pt-[15px]">
                    <p className="whitespace-nowrap text-[15px] leading-5 text-[#243447]/80">
                        {card.services}
                    </p>
                </div>
                <Link
                    href={card.href}
                    className="mx-[5px] mt-[16px] flex items-center justify-between border-t border-black/15 px-[2px] pt-[15px] text-[15px] font-medium leading-5 text-[#243447]"
                >
                    <span>자세히 보기</span>
                    <ArrowRightCircle size={36} strokeWidth={2} aria-hidden="true" />
                </Link>
            </div>
        </article>
    );
}

function BusinessAreas() {
    return (
        <section className="mx-auto h-[875px] w-[1440px] overflow-hidden bg-[#EFF7FB] pt-[40px]">
            <div className="mx-auto w-[1200px]">
                <div className="flex h-6 items-center gap-[20px] text-[#00ADDB]/60">
                    <span className="text-[20px] font-medium tracking-[6px]">OUR BUSINESS</span>
                    <span aria-hidden="true" className="h-[2px] w-[46px] bg-current" />
                </div>
                <h2 className="mt-[10px] text-[60px] font-bold leading-[72px] tracking-[3px] text-[#102D4A]">
                    사업영역
                </h2>
                <div className="mt-[57px] flex w-[1200px] justify-center gap-[17px]">
                    {businessCards.map((card) => (
                        <BusinessCard key={card.number} card={card} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function Business() {
    return (
        <>
            <BusinessOverview />
            <BusinessAreas />
        </>
    );
}
