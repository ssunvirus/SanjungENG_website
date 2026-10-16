import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "@/src/components/projects/detail/ProjectOverview";
import ChillerGallery from "@/src/components/projects/detail/ChillerGallery";
import BlogBanner from "@/src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/semiconductor-chiller" },
  title: "반도체 공장 칠러 시스템 구축 | 산정엔지니어링",
  description: "반도체 공장의 안정적인 냉각환경 조성을 위한 공냉식 냉동기 교체 현장입니다",
};

export default function SemiconductorChillerPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview
          title="반도체 공장 칠러 시스템 구축"
          description="반도체 공장의 안정적인 냉각환경 조성을 위한 공냉식 냉동기 교체 현장입니다"
          category="냉동기"
          work="냉동기 교체공사"
          location="청주"
        />
        <ChillerGallery />
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
