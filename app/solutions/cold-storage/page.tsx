import type { Metadata } from "next";
import CaseStudy from "../../../src/components/cold-storage/CaseStudy";
import Equipment from "../../../src/components/cold-storage/Equipment";
import Hero from "../../../src/components/cold-storage/Hero";
import WorkProcess from "../../../src/components/cold-storage/WorkProcess";

export const metadata: Metadata = {
  alternates: { canonical: "/solutions/cold-storage" },
  title: "저온저장고 냉동설비 설치 | 산정엔지니어링",
  description: "저온저장고의 CDU·유니트쿨러 설치와 냉매 배관, 제어설비 시공 내용을 소개합니다.",
};

export default function ColdStoragePage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-[#243447]">
      <Hero />
      <div className="relative z-10 mx-auto h-4 w-full lg:h-[69px] lg:max-w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <Equipment />
      <WorkProcess />
      <CaseStudy />
    </main>
  );
}
