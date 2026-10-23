import { connection } from "next/server";
import { publicProject, publicProjectMetadata } from "@/src/lib/public-projects";
import SavedProjectDetail from "@/src/components/projects/detail/SavedProjectDetail";
import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "@/src/components/projects/detail/ProjectOverview";
import WonsamGallery from "@/src/components/projects/detail/WonsamGallery";
import BlogBanner from "@/src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/wonsam-nonghyup" },
  title: "원삼농협 저온저장고 냉동설비 설치 | 산정엔지니어링",
  description: "경기도 용인 원삼농협 저온저장고의 CDU 및 유니트 쿨러 설치 현장을 소개합니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("nonghyup-cold-storage", fallbackMetadata);
}

export default async function WonsamNonghyupPage() {
  await connection();
  const saved = await publicProject("nonghyup-cold-storage");
  if (saved) return <SavedProjectDetail project={saved} legacyGallery={<WonsamGallery />} />;
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview />
        <WonsamGallery />
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
