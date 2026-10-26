import type { Metadata } from "next";
import CaseStudy from "@/src/components/chiller/CaseStudy";
import ChillerTypes from "@/src/components/chiller/ChillerTypes";
import Hero from "@/src/components/chiller/Hero";
import Maintenance from "@/src/components/chiller/Maintenance";
import Services from "@/src/components/chiller/Services";
import WorkProcess from "@/src/components/chiller/WorkProcess";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions" },
  title: "냉동기 설치·수리·유지보수 | 산정엔지니어링",
  description: "냉동기 설치와 교체부터 수리, 오버홀, 정기점검까지 냉동공조 서비스를 소개합니다.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <Services />
      <WorkProcess />
      <Maintenance />
      <ChillerTypes />
      <CaseStudy />
    </main>
  );
}
