import { connection } from "next/server";
import { publicProject, publicProjectMetadata } from "@/src/lib/public-projects";
import SavedProjectDetail from "@/src/components/projects/detail/SavedProjectDetail";
import type { Metadata } from "next";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "@/src/components/projects/detail/ProjectOverview";
import WarehousePrecisionGallery from "@/src/components/projects/detail/WarehousePrecisionGallery";
import BlogBanner from "@/src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

const fallbackMetadata: Metadata = {
  alternates: { canonical: "/projects/warehouse-precision-ac" },
  title: "S 기업 물류창고 항온항습기 설치 | 산정엔지니어링",
  description: "공간에 필요한 온/습도 환경을 안정적으로 유지하기 위한 항온항습기 설치 현장입니다.",
};

export function generateMetadata() {
  return publicProjectMetadata("warehouse-precision-ac", fallbackMetadata);
}

export default async function WarehousePrecisionPage() {
  await connection();
  const saved = await publicProject("warehouse-precision-ac");
  if (saved)
    return <SavedProjectDetail project={saved} legacyGallery={<WarehousePrecisionGallery />} />;
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview
          title="S 기업 물류창고 항온항습기 설치"
          description="공간에 필요한 온/습도 환경을 안정적으로 유지하기 위한 항온항습기 설치 현장입니다."
          category="항온항습기"
          work="항온항습기 설치"
          location="서울"
        />
        <WarehousePrecisionGallery />
        <Link
          href="/projects"
          className="mx-auto mt-[33px] flex h-[48px] w-[208px] items-center justify-center gap-[12px] rounded-[5px] bg-brand-navy text-lg lg:text-[25px] font-medium text-white hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <List size={30} aria-hidden="true" />
          목록으로
        </Link>
        <BlogBanner />
      </article>
    </main>
  );
}
