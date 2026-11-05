import type { Metadata } from "next";
import CompanyOverview from "@/src/components/about/CompanyOverview";
import BusinessAreas from "@/src/components/about/BusinessAreas";
import Hero from "@/src/components/about/Hero";
import Highlights from "@/src/components/about/Highlights";
import Introduction from "@/src/components/about/Introduction";
import WaveSurface from "@/src/components/shared/WaveSurface";
import SectionNavigation from "@/src/components/shared/SectionNavigation";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "회사소개 | 산정엔지니어링",
  description:
    "30년의 현장 경험과 기술을 바탕으로 냉동공조 솔루션을 제공하는 산정엔지니어링을 소개합니다.",
};

const navigationItems = [
  ["about-introduction", "산정엔지니어링 소개"],
  ["about-overview", "회사 개요"],
  ["about-business", "사업 영역"],
] as const;

export default function AboutPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-text">
      <Hero />
      <SectionNavigation items={navigationItems} label="회사소개 페이지 구간 이동" />
      <WaveSurface>
        <div id="about-introduction" tabIndex={-1} className="scroll-mt-[160px] outline-none lg:scroll-mt-[190px]">
          <Introduction />
          <div><Highlights /></div>
        </div>
        <div id="about-overview" tabIndex={-1} className="scroll-mt-[160px] outline-none lg:scroll-mt-[190px]">
          <CompanyOverview />
        </div>
        <div id="about-business" tabIndex={-1} className="scroll-mt-[160px] outline-none lg:scroll-mt-[190px]">
          <BusinessAreas />
        </div>
      </WaveSurface>
    </main>
  );
}
