import type { Metadata } from "next";
import Link from "next/link";
import { List } from "lucide-react";
import Hero from "../../../src/components/projects/Hero";
import ProjectOverview from "../../../src/components/projects/detail/ProjectOverview";
import OrionGallery from "../../../src/components/projects/detail/OrionGallery";
import BlogBanner from "../../../src/components/projects/detail/BlogBanner";

export const metadata: Metadata = {
  title: "오리온 생산설비 섬유덕트 설치 | 산정엔지니어링",
  description: "공장의 생산환경에 적합한 공조 시스템 구축을 위한 섬유덕트 설치 현장입니다.",
};

export default function OrionProductionPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#102D4A]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-[1440px] pb-[89px] pt-[89px]">
        <ProjectOverview
          title="오리온 생산설비 섬유덕트 설치"
          description="공장의 생산환경에 적합한 공조 시스템 구축을 위한 섬유덕트 설치 현장입니다."
          category="섬유덕트"
          work="섬유덕트 설치"
          location="중국"
        />
        <OrionGallery />
        <Link
          href="/projects"
          className="mx-auto mt-[33px] flex h-[48px] w-[208px] items-center justify-center gap-[12px] rounded-[5px] bg-[#102D4A] text-[25px] font-medium text-white hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB]"
        >
          <List size={30} aria-hidden="true" />
          목록으로
        </Link>
        <BlogBanner />
      </article>
    </main>
  );
}
