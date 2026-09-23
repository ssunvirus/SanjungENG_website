import type { Metadata } from "next";
import CaseStudy from "../../src/components/solutions/CaseStudy";
import ChillerServices from "../../src/components/solutions/ChillerServices";
import ChillerTypes from "../../src/components/solutions/ChillerTypes";
import SolutionsHero from "../../src/components/solutions/SolutionsHero";
import WorkProcess from "../../src/components/solutions/WorkProcess";

export const metadata: Metadata = {
  title: "냉동공조 | 산정엔지니어링",
  description: "냉동기 설치와 교체, 수리와 오버홀, 정기점검 서비스를 소개합니다.",
};

export default function SolutionsPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <SolutionsHero />
      <ChillerServices />
      <WorkProcess />
      <ChillerTypes />
      <CaseStudy />
    </main>
  );
}
