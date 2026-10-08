import type { Metadata } from "next";
import Hero from "../../src/components/projects/Hero";
import ProjectGallery from "../../src/components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "시공사례 | 산정엔지니어링",
  description: "냉동공조 설비와 섬유덕트 설치, 교체 및 유지보수 시공사례를 소개합니다.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 bg-[#EFF7FB] text-[#102D4A]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <ProjectGallery />
    </main>
  );
}
