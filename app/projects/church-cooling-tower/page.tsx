import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "@/src/components/projects/detail/ProjectOverview";
import CoolingTowerGallery from "@/src/components/projects/detail/CoolingTowerGallery";
import BlogBanner from "@/src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/church-cooling-tower" },
  title: "감리교회 냉각탑 유지보수 | 산정엔지니어링",
  description: "냉각탑의 원활한 열교환과 냉각 성능 유지를 위한 충진물 교체 현장입니다.",
};

export default function ChurchCoolingTowerPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview
          title="감리교회 냉각탑 유지보수"
          description="냉각탑의 원활한 열교환과 냉각 성능 유지를 위한 충진물 교체 현장입니다."
          category="냉각탑"
          work="냉각탑 충진물 교체"
          location="인천"
        />
        <CoolingTowerGallery />
        <Link
          href="/projects"
          className="mx-auto mt-[33px] flex h-[48px] w-[208px] items-center justify-center gap-[12px] rounded-[5px] bg-brand-navy text-lg lg:text-[25px] font-medium text-white hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <List size={30} aria-hidden="true" />
          목록으로
        </Link>
        <BlogBanner />
      </article>
    </main>
  );
}
