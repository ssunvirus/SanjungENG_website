import type { Metadata } from "next";
import CaseStudy from "@/src/components/cooling-tower/CaseStudy";
import Hero from "@/src/components/cooling-tower/Hero";
import Maintenance from "@/src/components/cooling-tower/Maintenance";
import Services from "@/src/components/cooling-tower/Services";
import WorkProcess from "@/src/components/cooling-tower/WorkProcess";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions/cooling-tower" },
  title: "냉각탑 설치·교체·정비 | 산정엔지니어링",
  description: "냉각탑 설치와 교체, 충진물·부품 교체, 세척 및 정비 서비스를 소개합니다.",
};

export default function CoolingTowerPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <div className="relative z-10 mx-auto h-4 w-full lg:h-[64px] lg:max-w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <Services />
      <Maintenance />
      <WorkProcess />
      <CaseStudy />
    </main>
  );
}
