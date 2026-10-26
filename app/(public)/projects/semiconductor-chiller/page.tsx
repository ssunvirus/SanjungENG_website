import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import ChillerGallery from "@/src/components/projects/detail/ChillerGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/semiconductor-chiller" },
  title: "반도체 공장 칠러 시스템 구축 | 산정엔지니어링",
  description: "반도체 공장의 안정적인 냉각환경 조성을 위한 공냉식 냉동기 교체 현장입니다",
};

export function generateMetadata() {
  return publicProjectMetadata("semiconductor-chiller", fallbackMetadata);
}

export default function SemiconductorChillerPage() {
  return (
    <LegacyProjectDetail
      id="semiconductor-chiller"
      overview={{
        title: "반도체 공장 칠러 시스템 구축",
        description: "반도체 공장의 안정적인 냉각환경 조성을 위한 공냉식 냉동기 교체 현장입니다",
        category: "냉동기",
        work: "냉동기 교체공사",
        location: "청주",
      }}
      gallery={<ChillerGallery />}
    />
  );
}
