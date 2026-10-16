import type { Metadata } from "next";
import Hero from "../../src/components/projects/Hero";
import ProjectGallery from "../../src/components/projects/ProjectGallery";

export const metadata: Metadata = {
  alternates: { canonical: "/projects" },
  title: "냉동공조·섬유덕트 시공사례 | 산정엔지니어링",
  description:
    "냉동기, 저온저장고, 항온항습기, 냉각탑 및 섬유덕트 설치·유지보수 현장을 소개합니다.",
};

export default function ProjectsPage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-[#102D4A]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <ProjectGallery />
    </main>
  );
}
