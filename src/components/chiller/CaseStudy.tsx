import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Settings, Wrench } from "lucide-react";

const details = [
  { icon: Settings, title: "작업 내용", description: "기존 노후 설비 교체 및 냉동시스템 신설" },
  { icon: Wrench, title: "주요 작업", description: "현장 진단, 맞춤 설계, 설비 설치, 시운전" },
  { icon: FileText, title: "작업 결과", description: "새로운 냉동기 설치 및 냉방성능 향상" },
];

export default function CaseStudy() {
  return (
    <section className="mx-auto h-[728px] w-[1440px] bg-[#EFF7FB] px-[120px] py-[60px]">
      <header className="flex h-[88px] w-[1295px] items-end gap-[500px]">
        <div><p className="flex items-center gap-[20px] text-[20px] font-medium tracking-[6px] text-[#00ADDB]/60">CASE STUDY <span className="h-[2px] w-[46px] bg-[#00ADDB]/60" /></p><h2 className="mt-[10px] text-[45px] font-bold tracking-[2px] text-[#102D4A]">시공사례</h2></div>
        <p className="text-[19px] font-semibold leading-[30px] text-[#243447]/80">다양한 산업 현장에서 축적한 경험으로<br />고객의 환경에 최적화된 냉동공조 솔루션을 제안합니다.</p>
      </header>
      <article className="relative mt-[61px] flex h-[459px] w-[1164px] items-center gap-[100px] overflow-hidden rounded-[5px] bg-white py-[30px] pl-[20px] pr-[30px]">
        <div className="relative h-[399px] w-[532px] shrink-0 overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <Image src="/images/chiller/case-semiconductor-factory.jpg" alt="반도체 공장 냉동시스템 설치 사례" fill sizes="532px" quality={100} className="object-cover" />
        </div>
        <span className="absolute left-[41px] top-[40px] flex h-[49px] w-[159px] items-center justify-center rounded-[20px] bg-[#00ADDB]/30 text-[20px] font-semibold tracking-[1px] text-white"># 냉동기 설치</span>
        <div className="flex h-[399px] w-[482px] flex-col justify-center">
          <h3 className="h-[72px] text-[30px] font-bold leading-[36px] tracking-[1.5px] text-[#164A84]">반도체 공장<br />냉동시스템 구축</h3>
          <div className="mt-[30px] flex flex-col gap-[30px]">
            {details.map(({ icon: Icon, title, description }) => <div key={title} className="flex items-center gap-[30px]"><Icon size={40} className="shrink-0 text-[#1D1B20]" aria-hidden="true" /><div><h4 className="text-[20px] font-bold text-[#00ADDB]">{title}</h4><p className="mt-[5px] text-[15px] font-semibold text-[#243447]/80">{description}</p></div></div>)}
          </div>
          <Link href="/#projects" className="mt-[30px] flex h-[41px] w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#102D4A] text-[20px] font-semibold text-white">시공사례 보러가기 <ArrowRight size={22} aria-hidden="true" /></Link>
        </div>
      </article>
    </section>
  );
}
