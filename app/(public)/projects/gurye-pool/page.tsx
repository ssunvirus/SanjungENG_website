import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import GuryeGallery from "@/src/components/projects/detail/GuryeGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/gurye-pool" },
  title: "구례 실내수영장 섬유덕트 설치 | 산정엔지니어링",
  description: "실내수영장의 균일한 공기 분배를 위한 섬유덕트 설치 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("gurye-pool", fallbackMetadata);
}

export default function GuryePoolPage() {
  return (
    <LegacyProjectDetail
      id="gurye-pool"
      overview={{
        title: "구례 실내수영장 섬유덕트 설치",
        description: "실내수영장의 균일한 공기 분배를 위한 섬유덕트 설치 현장입니다.",
        category: "섬유덕트",
        work: "섬유덕트 설치",
        location: "전라남도 구례",
      }}
      gallery={<GuryeGallery />}
    />
  );
}
