import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import AjuGallery from "@/src/components/projects/detail/AjuGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/aju-pharmaceutical" },
  title: "아주약품 터보냉동기 설치공사 | 산정엔지니어링",
  description: "시설의 효율적인 냉방 시스템 구축을 위해 터보냉동기를 설치한 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("aju-pharmaceutical", fallbackMetadata);
}

export default function AjuPharmaceuticalPage() {
  return (
    <LegacyProjectDetail
      id="aju-pharmaceutical"
      overview={{
        title: "아주약품 터보냉동기 설치공사",
        description: "시설의 효율적인 냉방 시스템 구축을 위해 터보냉동기를 설치한 현장입니다.",
        category: "냉동기",
        work: "터보냉동기 교체",
        location: "평택",
      }}
      gallery={<AjuGallery />}
    />
  );
}
