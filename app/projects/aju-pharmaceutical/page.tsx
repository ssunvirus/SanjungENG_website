import { connection } from "next/server";
import { publicProject, publicProjectMetadata } from "@/src/lib/public-projects";
import SavedProjectDetail from "@/src/components/projects/detail/SavedProjectDetail";
import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "@/src/components/projects/detail/ProjectOverview";
import AjuGallery from "@/src/components/projects/detail/AjuGallery";
import BlogBanner from "@/src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/aju-pharmaceutical" },
  title: "아주약품 터보냉동기 설치공사 | 산정엔지니어링",
  description: "시설의 효율적인 냉방 시스템 구축을 위해 터보냉동기를 설치한 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("aju-pharmaceutical", fallbackMetadata);
}

export default async function AjuPharmaceuticalPage() {
  await connection();
  const saved = await publicProject("aju-pharmaceutical");
  if (saved) return <SavedProjectDetail project={saved} legacyGallery={<AjuGallery />} />;
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview
          title="아주약품 터보냉동기 설치공사"
          description="시설의 효율적인 냉방 시스템 구축을 위해 터보냉동기를 설치한 현장입니다."
          category="냉동기"
          work="터보냉동기 교체"
          location="평택"
        />
        <AjuGallery />
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
