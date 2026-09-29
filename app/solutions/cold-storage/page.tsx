import type { Metadata } from "next";
import CaseStudy from "../../../src/components/cold-storage/CaseStudy";
import Equipment from "../../../src/components/cold-storage/Equipment";
import Hero from "../../../src/components/cold-storage/Hero";
import WorkProcess from "../../../src/components/cold-storage/WorkProcess";

export const metadata: Metadata = {
  title: "저온저장고 | 산정엔지니어링",
  description: "저온저장고 CDU와 유니트쿨러 설치, 냉매 배관 및 제어설비 시공 서비스를 소개합니다.",
};

export default function ColdStoragePage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <Hero />
      <div className="relative z-10 mx-auto h-[69px] w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <Equipment />
      <WorkProcess />
      <CaseStudy />
    </main>
  );
}
