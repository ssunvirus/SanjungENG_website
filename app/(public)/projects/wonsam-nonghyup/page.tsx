import type { Metadata } from "next";
import { publicProjectMetadata } from "@/src/lib/public-projects";
import LegacyProjectDetail from "@/src/components/projects/detail/LegacyProjectDetail";
import WonsamGallery from "@/src/components/projects/detail/WonsamGallery";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/wonsam-nonghyup" },
  title: "원삼농협 저온저장고 냉동설비 설치 | 산정엔지니어링",
  description: "경기도 용인 원삼농협 저온저장고의 CDU 및 유니트 쿨러 설치 현장을 소개합니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("nonghyup-cold-storage", fallbackMetadata);
}

export default function WonsamNonghyupPage() {
  return <LegacyProjectDetail id="nonghyup-cold-storage" gallery={<WonsamGallery />} />;
}
