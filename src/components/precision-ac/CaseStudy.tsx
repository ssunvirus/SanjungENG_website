import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Settings, Wrench } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

const details = [
  { icon: Settings, title: "작업 내용", description: "신설 물류창고 항온항습기 설치" },
  { icon: Wrench, title: "주요 작업", description: "항온항습기 설치 및 전원, 배관 연결" },
  { icon: FileText, title: "작업 결과", description: "물류창고 항온항습 환경 구축" },
];

export default function CaseStudy() {
  return (
    <section id="precision-case" className="mx-auto h-auto lg:h-[710px] w-full lg:w-[1440px] px-[20px] lg:px-[120px] py-[36px] lg:py-[60px]">
      <header className="flex flex-col lg:flex-row h-auto lg:h-[88px] w-full lg:w-[1295px] items-start lg:items-end gap-[28px] lg:gap-[500px]"><div><SectionEyebrow>CASE STUDY</SectionEyebrow><h2 className="mt-[10px] lg:mt-[10px] text-[28px] lg:text-[45px] font-bold tracking-[1px] lg:tracking-[2px] text-[#102D4A]">시공사례</h2></div><p className="text-[14px] lg:text-[19px] font-semibold leading-[24px] lg:leading-[30px] text-[#243447]/80">다양한 산업 현장에서 축적한 경험으로<br />고객의 환경에 최적화된 냉동공조 솔루션을 제안합니다.</p></header>
      <article className="relative mt-[24px] lg:mt-[61px] flex flex-col lg:flex-row h-auto lg:h-[469px] w-full lg:w-[1164px] items-center gap-[28px] lg:gap-[100px] overflow-hidden rounded-[5px] bg-white py-5 lg:py-[20px] pl-[20px] pr-5 lg:pr-[30px]">
        <div className="relative h-[240px] lg:h-[399px] w-full lg:w-[532px] shrink-0 overflow-hidden rounded-[10px]"><Image src="/images/precision-ac/case-study-current.png" alt="S 기업 물류창고 항온항습기 설치 현장" fill sizes="532px" quality={100} className="object-cover" /></div>
        <span className="absolute left-8 top-8 lg:left-[45px] lg:top-[35px] hidden lg:flex h-[49px] w-[152px] items-center justify-center rounded-[20px] bg-[#00ADDB]/30 text-[14px] lg:text-[20px] font-semibold tracking-[1px] lg:tracking-[1px] text-white"># 항온항습기</span>
        <div className="w-full lg:w-[482px]"><h3 className="text-[21px] lg:text-[30px] font-bold leading-[24px] lg:leading-[36px] tracking-[1px] lg:tracking-[1.5px] text-[#164A84]">S 기업 물류창고 항온항습기 설치</h3>
          <Image
            src="/images/shared/case-title-divider.svg"
            width={116}
            height={2}
            alt=""
            aria-hidden="true"
            className="mt-[24px] lg:mt-[28px] shrink-0"
          /><div className="mt-[24px] lg:mt-[30px] flex flex-col gap-[16px] lg:gap-[17px]">{details.map(({ icon: Icon, title, description }) => <div key={title} className="flex items-center gap-[16px] lg:gap-[30px]"><Icon size={40} className="shrink-0 text-[#1D1B20]" aria-hidden="true" /><div><h4 className="text-[14px] lg:text-[20px] font-bold text-[#00ADDB]">{title}</h4><p className="mt-[10px] lg:mt-[5px] lg:whitespace-nowrap text-[14px] lg:text-[15px] font-semibold text-[#243447]/80">{description}</p></div></div>)}</div><Link href="/projects" className="mt-[24px] lg:mt-[40px] flex h-[43px] w-full items-center justify-center gap-[16px] lg:gap-[10px] rounded-[10px] bg-[#102D4A] text-[14px] lg:text-[20px] font-semibold text-white">시공사례 보러가기 <ArrowRight size={22} aria-hidden="true" /></Link></div>
      </article>
    </section>
  );
}
