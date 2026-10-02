import type { Metadata } from "next";
import CompanyOverview from "../../src/components/about/CompanyOverview";
import BusinessAreas from "../../src/components/about/BusinessAreas";
import Hero from "../../src/components/about/Hero";
import Highlights from "../../src/components/about/Highlights";
import Introduction from "../../src/components/about/Introduction";

export const metadata: Metadata = {
  title: "회사소개 | 산정엔지니어링",
  description: "30년의 현장 경험과 기술을 바탕으로 냉동공조 솔루션을 제공하는 산정엔지니어링을 소개합니다.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#243447]">
      <Hero />
      <div className="relative z-10 mx-auto h-[64px] w-[1920px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]" />
      <Introduction />
      <Highlights />
      <CompanyOverview />
      <BusinessAreas />
    </main>
  );
}
