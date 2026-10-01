import type { Metadata } from "next";
import Applications from "../../../src/components/precision-ac/Applications";
import CaseStudy from "../../../src/components/precision-ac/CaseStudy";
import Hero from "../../../src/components/precision-ac/Hero";
import Products from "../../../src/components/precision-ac/Products";
import Services from "../../../src/components/precision-ac/Services";
import WorkProcess from "../../../src/components/precision-ac/WorkProcess";

export const metadata: Metadata = {
  title: "항온항습기 | 산정엔지니어링",
  description: "항온항습기 설치와 교체, 수리, 부품 교체 및 정기점검 서비스를 소개합니다.",
};

export default function PrecisionAcPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <Hero />
      <div className="relative z-10 mx-auto h-[64px] w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <Services />
      <Applications />
      <WorkProcess />
      <Products />
      <CaseStudy />
    </main>
  );
}
