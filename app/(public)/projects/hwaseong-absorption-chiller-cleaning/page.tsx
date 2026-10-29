import type { Metadata } from "next";
import { projects } from "@/src/components/projects/data";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import { hwaseongChillerPhotos } from "@/src/lib/hwaseong-chiller-photos";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import ProjectPhotoGallery from "@/src/components/projects/detail/ProjectPhotoGallery";

const project = projects.find((item) => item.id === "hwaseong-absorption-chiller-cleaning")!;
const fallbackMetadata: Metadata = {
  alternates: { canonical: project.href },
  title: `${project.title} | 산정엔지니어링`,
  description: project.workDescription,
};

export function generateMetadata() {
  return publicProjectMetadata(project.id, fallbackMetadata);
}

export default function HwaseongChillerCleaningPage() {
  return (
    <LegacyProjectDetail
      id={project.id}
      overview={{
        title: project.title,
        description: project.workDescription,
        category: project.tag,
        work: project.description,
        location: project.location,
      }}
      gallery={<ProjectPhotoGallery photos={hwaseongChillerPhotos} />}
    />
  );
}
