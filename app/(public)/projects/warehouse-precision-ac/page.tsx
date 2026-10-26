import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import WarehousePrecisionGallery from "@/src/components/projects/detail/WarehousePrecisionGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/warehouse-precision-ac" },
  title: "S 기업 물류창고 항온항습기 설치 | 산정엔지니어링",
  description: "공간에 필요한 온/습도 환경을 안정적으로 유지하기 위한 항온항습기 설치 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("warehouse-precision-ac", fallbackMetadata);
}

export default function WarehousePrecisionPage() {
  return (
    <LegacyProjectDetail
      id="warehouse-precision-ac"
      overview={{
        title: "S 기업 물류창고 항온항습기 설치",
        description:
          "공간에 필요한 온/습도 환경을 안정적으로 유지하기 위한 항온항습기 설치 현장입니다.",
        category: "항온항습기",
        work: "항온항습기 설치",
        location: "서울",
      }}
      gallery={<WarehousePrecisionGallery />}
    />
  );
}
