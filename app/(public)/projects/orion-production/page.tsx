import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import OrionGallery from "@/src/components/projects/detail/OrionGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/orion-production" },
  title: "오리온 생산설비 섬유덕트 설치 | 산정엔지니어링",
  description: "공장의 생산환경에 적합한 공조 시스템 구축을 위한 섬유덕트 설치 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("orion-production", fallbackMetadata);
}

export default function OrionProductionPage() {
  return (
    <LegacyProjectDetail
      id="orion-production"
      overview={{
        title: "오리온 생산설비 섬유덕트 설치",
        description: "공장의 생산환경에 적합한 공조 시스템 구축을 위한 섬유덕트 설치 현장입니다.",
        category: "섬유덕트",
        work: "섬유덕트 설치",
        location: "중국",
      }}
      gallery={<OrionGallery />}
    />
  );
}
