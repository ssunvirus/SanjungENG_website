import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import { ansanPaintFactoryProject as project } from "@/src/components/projects/data";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import AnsanRepairGallery from "@/src/components/projects/detail/AnsanRepairGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: project.href },
  title: `${project.title} | 산정엔지니어링`,
  description: project.workDescription,
};

export function generateMetadata() {
  return publicProjectMetadata(project.id, fallbackMetadata);
}

export default function AnsanPaintFactoryRepairPage() {
  return (
    <LegacyProjectDetail
      id={project.id}
      overview={{
        title: project.title,
        description: project.description,
        category: project.tag,
        work: project.description,
        location: project.location,
      }}
      gallery={<AnsanRepairGallery />}
    />
  );
}
