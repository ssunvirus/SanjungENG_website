import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import CoolingTowerGallery from "@/src/components/projects/detail/CoolingTowerGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/church-cooling-tower" },
  title: "감리교회 냉각탑 유지보수 | 산정엔지니어링",
  description: "냉각탑의 원활한 열교환과 냉각 성능 유지를 위한 충진물 교체 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("church-cooling-tower", fallbackMetadata);
}

export default function ChurchCoolingTowerPage() {
  return (
    <LegacyProjectDetail
      id="church-cooling-tower"
      overview={{
        title: "감리교회 냉각탑 유지보수",
        description: "냉각탑의 원활한 열교환과 냉각 성능 유지를 위한 충진물 교체 현장입니다.",
        category: "냉각탑",
        work: "냉각탑 충진물 교체",
        location: "인천",
      }}
      gallery={<CoolingTowerGallery />}
    />
  );
}
