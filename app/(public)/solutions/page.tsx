import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import CaseStudy from "@/src/components/chiller/CaseStudy";
import ChillerTypes from "@/src/components/chiller/ChillerTypes";
import EquipmentFaq from "@/src/components/shared/EquipmentFaq";
import Hero from "@/src/components/chiller/Hero";
import Maintenance from "@/src/components/chiller/Maintenance";
import Services from "@/src/components/chiller/Services";
import WorkProcess from "@/src/components/chiller/WorkProcess";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";
import SectionNavigation from "@/src/components/chiller/SectionNavigation";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions" },
  title: "냉동기 설치·수리·유지보수 | 산정엔지니어링",
  description: "냉동기 설치와 교체부터 수리, 오버홀, 정기점검까지 냉동공조 서비스를 소개합니다.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation />
      <WaveSurface>
        <div
          id="chiller-service"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px] [&>section]:bg-transparent"
        >
          <Services />
        </div>
        <div
          id="chiller-process"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px] bg-[#E3F6FC]"
        >
          <WorkProcess />
        </div>
        <div
          id="chiller-maintenance"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <Maintenance />
        </div>
        <div
          id="chiller-products"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px] bg-white"
        >
          <ChillerTypes />
        </div>
        <div
          id="chiller-cases"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <CaseStudy />
        </div>
        <div
          id="chiller-questions"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <EquipmentFaq />
        </div>
        <div
          id="chiller-inquiry"
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


