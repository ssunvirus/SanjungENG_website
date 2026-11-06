import SectionNavigation from "@/src/components/shared/SectionNavigation";
import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import CaseStudy from "@/src/components/cooling-tower/CaseStudy";
import Hero from "@/src/components/cooling-tower/Hero";
import Maintenance from "@/src/components/cooling-tower/Maintenance";
import Services from "@/src/components/cooling-tower/Services";
import WorkProcess from "@/src/components/cooling-tower/WorkProcess";
import CoolingTowerFaq from "@/src/components/cooling-tower/CoolingTowerFaq";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions/cooling-tower" },
  title: "냉각탑 설치·교체·정비 | 산정엔지니어링",
  description: "냉각탑 설치와 교체, 충진물·부품 교체, 세척 및 정비 서비스를 소개합니다.",
};

const navigationItems = [
  ["cooling-tower-services", "주요 서비스"],
  ["cooling-tower-maintenance", "주요 정비"],
  ["cooling-tower-process", "시공 과정"],
  ["cooling-tower-cases", "시공사례"],
  ["cooling-tower-questions", "자주 묻는 질문"],
  ["cooling-tower-inquiry", "견적문의"],
] as const;

export default function CoolingTowerPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation items={navigationItems} label="냉각탑 페이지 구간 이동" />
      <WaveSurface>
        <div
          id="cooling-tower-services"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <Services />
        </div>
        <div
          id="cooling-tower-maintenance"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <Maintenance />
        </div>
        <div
          id="cooling-tower-process"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <WorkProcess />
        </div>
        <div
          id="cooling-tower-cases"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <CaseStudy />
        </div>
        <div
          id="cooling-tower-questions"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <CoolingTowerFaq />
        </div>
        <div
          id="cooling-tower-inquiry"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <div className="lg:hidden">
            <MobileEstimate />
          </div>
          <div className="hidden lg:block">
            <EstimateCta />
          </div>
        </div>
      </WaveSurface>
    </main>
  );
}
