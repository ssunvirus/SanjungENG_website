import SectionNavigation from "@/src/components/shared/SectionNavigation";
import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import CaseStudy from "@/src/components/cold-storage/CaseStudy";
import ColdStorageFaq from "@/src/components/cold-storage/ColdStorageFaq";
import Equipment from "@/src/components/cold-storage/Equipment";
import Hero from "@/src/components/cold-storage/Hero";
import WorkProcess from "@/src/components/cold-storage/WorkProcess";
import EstimateCta from "@/src/components/home/EstimateCta";
import MobileEstimate from "@/src/components/home/mobile/MobileEstimate";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions/cold-storage" },
  title: "저온저장고 냉동설비 설치 | 산정엔지니어링",
  description: "저온저장고의 CDU·유니트쿨러 설치와 냉매 배관, 제어설비 시공 내용을 소개합니다.",
};

const navigationItems = [
  ["cold-storage-equipment", "주요 설비"],
  ["cold-storage-process", "시공 과정"],
  ["cold-storage-cases", "시공사례"],
  ["cold-storage-questions", "자주 묻는 질문"],
  ["cold-storage-inquiry", "견적문의"],
] as const;

export default function ColdStoragePage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation items={navigationItems} label="저온저장고 페이지 구간 이동" />
      <WaveSurface>
        <div id="cold-storage-equipment" tabIndex={-1} className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]">
          <Equipment />
        </div>
        <div id="cold-storage-process" tabIndex={-1} className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]">
          <WorkProcess />
        </div>
        <div id="cold-storage-cases" tabIndex={-1} className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]">
          <CaseStudy />
        </div>
        <div id="cold-storage-questions" tabIndex={-1} className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]">
          <ColdStorageFaq />
        </div>
        <div id="cold-storage-inquiry" tabIndex={-1} className="scroll-mt-[144px] outline-none lg:scroll-mt-[170px]">
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

