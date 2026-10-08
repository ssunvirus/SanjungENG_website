import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Settings, Wrench } from "lucide-react";

const details = [
  [Settings, "작업 내용", "노후 냉각탑 충진물 교체 및 내부 정비"],
  [Wrench, "주요 작업", "기존 충진물 철거, 신규 충진물 설치, 내부 점검"],
  [FileText, "작업 결과", "충진물 교체 및 냉각탑 정비 완료, 냉각 성능 회복"],
] as const;

export default function CaseStudy() {
  return (
    <section id="cooling-tower-case" className="mx-auto h-[680px] w-[1440px] bg-[#EFF7FB] px-[120px] py-[60px]">
      <header className="flex h-[88px] w-[1295px] items-end gap-[500px]">
        <div>
          <div className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">
            CASE STUDY <span className="h-[2px] w-[46px] bg-current" />
          </div>
          <h2 className="mt-[10px] text-[45px] font-bold tracking-[2px] text-[#102D4A]">시공사례</h2>
        </div>
        <p className="text-[19px] font-semibold leading-[30px] text-[#243447]/80">다양한 산업 현장에서 축적한 경험으로<br />고객의 환경에 최적화된 냉동공조 솔루션을 제안합니다.</p>
      </header>

      <article className="relative mt-[61px] flex h-[439px] w-[1164px] items-center gap-[100px] rounded-[5px] bg-white py-[20px] pl-[20px] pr-[30px]">
        <div className="relative h-[399px] w-[532px] shrink-0 overflow-hidden rounded-[10px]">
          <Image src="/images/cooling-tower/case-study.jpg" alt="교회 냉각탑 충진물 교체공사" fill sizes="532px" quality={100} className="object-cover" />
        </div>
        <span className="absolute left-[39px] top-[21px] flex h-[49px] w-[152px] items-center justify-center rounded-[20px] bg-[#00ADDB]/50 text-[20px] font-semibold tracking-[1px] text-white"># 냉각탑</span>
        <div className="w-[482px]">
          <h3 className="h-[72px] text-[30px] font-bold leading-[36px] tracking-[1.5px] text-[#164A84]">H 교회 냉각탑 충진물 교체공사</h3>
          <div className="mt-[30px] flex flex-col gap-[17px]">
            {details.map(([Icon, title, description]) => (
              <div key={title} className="flex items-center gap-[30px]">
                <Icon size={40} className="shrink-0 text-[#1D1B20]" aria-hidden="true" />
                <div>
                  <h4 className="text-[20px] font-bold text-[#00ADDB]">{title}</h4>
                  <p className="mt-[5px] whitespace-nowrap text-[15px] font-semibold text-[#243447]/80">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/projects" className="mt-[40px] flex h-[43px] w-[240px] items-center justify-center gap-[10px] rounded-[10px] bg-[#102D4A] text-[20px] font-semibold text-white">
            시공사례 보러가기 <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </div>
      </article>
    </section>
  );
}
