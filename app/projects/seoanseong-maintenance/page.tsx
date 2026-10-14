import type { Metadata } from "next";
import Hero from "../../../src/components/projects/Hero";
import ProjectOverview from "../../../src/components/projects/detail/ProjectOverview";
import SeoanseongGallery from "../../../src/components/projects/detail/SeoanseongGallery";
import BlogBanner from "../../../src/components/projects/detail/BlogBanner";
import Link from "next/link";
import { List } from "lucide-react";

export const metadata: Metadata = {
  title: "서안성 냉동창고 정기점검 | 산정엔지니어링",
  description: "냉동창고의 안정적인 온도 유지를 위한 냉동설비 정기점검 현장입니다.",
};

export default function SeoanseongMaintenancePage() {
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-[#102D4A]">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview
          title="서안성 냉동창고 정기점검"
          description="냉동창고의 안정적인 온도 유지를 위한 냉동설비 정기점검 현장입니다."
          category="정기점검"
          work="냉동설비 정기점검"
          location="서안성"
        />
        <SeoanseongGallery />
        <Link
          href="/projects"
          className="mx-auto mt-[33px] flex h-[48px] w-[208px] items-center justify-center gap-[12px] rounded-[5px] bg-[#102D4A] text-lg lg:text-[25px] font-medium text-white hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB]"
        >
          <List size={30} aria-hidden="true" />
          목록으로
        </Link>
        <BlogBanner />
      </article>
    </main>
  );
}
