import WaveSurface from "@/src/components/shared/WaveSurface";
import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectGallery from "@/src/components/projects/ProjectGallery";
import { connection } from "next/server";
import { publicProjectCards } from "@/src/lib/public-projects";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "냉동공조·패브릭덕트 시공사례 | 산정엔지니어링",
  description:
    "냉동기, 저온저장고, 항온항습기, 냉각탑 및 패브릭덕트 설치·유지보수 현장을 소개합니다.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[] }>;
}) {
  await connection();
  const params = await searchParams;
  const initialSearch = new URLSearchParams();
  if (typeof params.page === "string") initialSearch.set("page", params.page);
  if (typeof params.category === "string") initialSearch.set("category", params.category);
  const projects = await publicProjectCards();
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero headingTag="h1" />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <WaveSurface>
        <ProjectGallery projects={projects} initialSearch={initialSearch.toString()} />
      </WaveSurface>
    </main>
  );
}
