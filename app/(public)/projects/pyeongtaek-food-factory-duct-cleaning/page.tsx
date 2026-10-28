import type { Metadata } from "next";
import { projects } from "@/src/components/projects/data";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import DuctCleaningGallery from "@/src/components/projects/detail/DuctCleaningGallery";

const project = projects.find((item) => item.id === "pyeongtaek-food-factory-duct-cleaning")!;
const fallbackMetadata: Metadata = {
  alternates: { canonical: project.href },
  title: `${project.title} | 산정엔지니어링`,
  description: project.workDescription,
};

export function generateMetadata() {
  return publicProjectMetadata(project.id, fallbackMetadata);
}

export default function PyeongtaekDuctCleaningPage() {
  return (
    <LegacyProjectDetail
      id={project.id}
      overview={{
        title: project.title,
        description: "장기간 사용으로 오염된 섬유덕트를 탈착, 세탁 후 재설치하여 공기 분배 효율을 개선하였습니다.",
        category: project.tag,
        work: "섬유덕트 탈착 후 세척",
        location: project.location,
      }}
      gallery={<DuctCleaningGallery />}
    />
  );
}
