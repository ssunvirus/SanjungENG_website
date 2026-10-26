import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import SeoanseongGallery from "@/src/components/projects/detail/SeoanseongGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/seoanseong-maintenance" },
  title: "서안성 냉동창고 정기점검 | 산정엔지니어링",
  description: "냉동창고의 안정적인 온도 유지를 위한 냉동설비 정기점검 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("seoanseong-maintenance", fallbackMetadata);
}

export default function SeoanseongMaintenancePage() {
  return (
    <LegacyProjectDetail
      id="seoanseong-maintenance"
      overview={{
        title: "서안성 냉동창고 정기점검",
        description: "냉동창고의 안정적인 온도 유지를 위한 냉동설비 정기점검 현장입니다.",
        category: "정기점검",
        work: "냉동설비 정기점검",
        location: "서안성",
      }}
      gallery={<SeoanseongGallery />}
    />
  );
}
