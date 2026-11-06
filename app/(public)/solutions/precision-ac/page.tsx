import SectionNavigation from "@/src/components/shared/SectionNavigation";
import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import PrecisionAcFaq from "@/src/components/precision-ac/PrecisionAcFaq";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";
import Applications from "@/src/components/precision-ac/Applications";
import CaseStudy from "@/src/components/precision-ac/CaseStudy";
import Hero from "@/src/components/precision-ac/Hero";
import Products from "@/src/components/precision-ac/Products";
import Services from "@/src/components/precision-ac/Services";
import WorkProcess from "@/src/components/precision-ac/WorkProcess";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions/precision-ac" },
  title: "항온항습기 설치·교체·수리 | 산정엔지니어링",
  description:
    "현장에 맞는 항온항습기 설치와 교체, 수리, 부품 교체 및 정기점검 서비스를 소개합니다.",
};

const navigationItems = [
  ["precision-ac-services", "주요 서비스"],
  ["precision-ac-process", "시공 과정"],
  ["precision-ac-products", "주요 장비"],
  ["precision-ac-cases", "시공사례"],
  ["precision-ac-questions", "자주 묻는 질문"],
  ["precision-ac-inquiry", "견적문의"],
] as const;

export default function PrecisionAcPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation items={navigationItems} label="항온항습기 페이지 구간 이동" />
      <WaveSurface>
        <div
          id="precision-ac-services"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <Services />
          <Applications />
        </div>
        <div
          id="precision-ac-process"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px] bg-[#E3F6FC]"
        >
          <WorkProcess />
        </div>
        <div
          id="precision-ac-products"
          tabIndex={-1}
          className="scroll-mt-[144px] bg-white outline-none lg:scroll-mt-[170px]"
        >
          <Products />
        </div>
        <div
          id="precision-ac-cases"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <CaseStudy />
        </div>
        <div
          id="precision-ac-questions"
          tabIndex={-1}
          className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]"
        >
          <PrecisionAcFaq />
        </div>
        <div
          id="precision-ac-inquiry"
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
