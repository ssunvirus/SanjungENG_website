import WaveSurface from "@/src/components/shared/WaveSurface";
import type { ReactNode } from "react";
import { connection } from "next/server";
import ProjectListButton from "./ProjectListButton";
import { publicProject } from "@/src/lib/public-projects";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview, { type ProjectOverviewProps } from "./ProjectOverview";
import SavedProjectDetail from "./SavedProjectDetail";
import BlogBanner from "./BlogBanner";
import ProjectVideo from "./ProjectVideo";
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
  if (saved) return <SavedProjectDetail project={saved} />;
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <WaveSurface>
        <article className="mx-auto w-full px-5 py-9 lg:max-w-[1440px] lg:px-0 lg:pb-[89px] lg:pt-[89px]">
          <ProjectOverview {...overview} />
          {gallery}
          <ProjectVideo projectId={id} />
          <div className="mt-[33px] flex justify-center">
            <ProjectListButton />
          </div>
          <ProjectInquiryBanner />
          <BlogBanner projectId={id} />
        </article>
      </WaveSurface>
    </main>
  );
}
