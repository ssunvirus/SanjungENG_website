import type { Metadata } from "next";
import { projects } from "@/src/components/projects/data";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import { seoanseongCoolingTowerPhotos } from "@/src/lib/seoanseong-cooling-tower-photos";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import ProjectPhotoGallery from "@/src/components/projects/detail/ProjectPhotoGallery";

const project = projects.find((item) => item.id === "seoanseong-cooling-tower-inspection")!;
const fallbackMetadata: Metadata = {
  alternates: { canonical: project.href },
  title: `${project.title} | 산정엔지니어링`,
  description: project.workDescription,
};

export function generateMetadata() {
  return publicProjectMetadata(project.id, fallbackMetadata);
}

export default function SeoanseongCoolingTowerInspectionPage() {
  return (
    <LegacyProjectDetail
      id={project.id}
      overview={{
        title: project.title,
        description: project.description,
        category: project.tag,
        work: "흡입그릴 청소 / 구동부 점검 / 그리스 주입",
        location: project.location,
      }}
      gallery={<ProjectPhotoGallery photos={seoanseongCoolingTowerPhotos} />}
    />
  );
}
