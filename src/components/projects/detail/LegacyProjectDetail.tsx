import type { ReactNode } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { List } from "lucide-react";
import { publicProject } from "@/src/lib/public-projects";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview, { type ProjectOverviewProps } from "./ProjectOverview";
import SavedProjectDetail from "./SavedProjectDetail";
import BlogBanner from "./BlogBanner";
import ProjectInquiryBanner from "./ProjectInquiryBanner";

export default async function LegacyProjectDetail({
  id,
  overview,
  gallery,
}: {
  id: string;
  overview?: ProjectOverviewProps;
  gallery: ReactNode;
}) {
  await connection();
  const saved = await publicProject(id);
  if (saved) return <SavedProjectDetail project={saved} legacyGallery={gallery} />;
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
        <ProjectOverview {...overview} />
        {gallery}
        <Link
          href="/projects"
          className="mx-auto mt-[33px] flex h-[48px] w-[208px] items-center justify-center gap-[12px] rounded-[5px] bg-brand-navy text-lg lg:text-[25px] font-medium text-white hover:bg-[#164366] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
        >
          <List size={30} aria-hidden="true" />
          목록으로
        </Link>
        <ProjectInquiryBanner />
        <BlogBanner />
      </article>
    </main>
  );
}
