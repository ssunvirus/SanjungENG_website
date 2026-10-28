import type { ReactNode } from "react";
import Link from "next/link";
import Hero from "@/src/components/projects/Hero";
import ProjectOverview from "./ProjectOverview";
import ProjectPhotoGallery from "./ProjectPhotoGallery";
import BlogBanner from "./BlogBanner";
import ProjectInquiryBanner from "./ProjectInquiryBanner";
import type { ProjectRecord } from "@/src/lib/project-record";
import { publicPhotoPath } from "@/src/lib/public-project-data";
import { projects } from "@/src/components/projects/data";
import { hasDefaultLegacyPhotos, legacyPhotoDimensions } from "@/src/lib/legacy-project-photos";

export default function SavedProjectDetail({
  project,
  legacyGallery,
}: {
  project: ProjectRecord;
  legacyGallery?: ReactNode;
}) {
  const base = projects.find((item) => item.id === project.id);
  const keepGallery =
    legacyGallery && base && hasDefaultLegacyPhotos(project, base.image, base.title);
  return (
    <main className="min-w-0 flex-1 bg-[#EFF7FB] text-brand-navy">
      <Hero />
      <div
        aria-hidden="true"
        className="relative z-10 h-4 lg:h-[64px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      />
      <article className="mx-auto w-full max-w-[1440px] px-5 py-9 lg:py-[89px]">
        <ProjectOverview
          title={project.title}
          description=""
          category={project.category}
          work={project.category}
          location={project.location || "—"}
        />
        {project.description && (
          <p className="mx-auto mt-8 max-w-[1000px] whitespace-pre-wrap break-words text-base leading-8">
            {project.description}
          </p>
        )}
        {keepGallery ? (
          legacyGallery
        ) : project.photos.length > 0 ? (
          <ProjectPhotoGallery
            showAltCaption
            photos={project.photos.map((photo) =>
              legacyPhotoDimensions(
                { ...photo, src: publicPhotoPath(photo.src) },
                project.id,
                base?.image,
              ),
            )}
          />
        ) : null}
        <Link
          href="/projects"
          className="mx-auto mt-8 flex h-12 w-52 items-center justify-center rounded bg-brand-navy text-white"
        >
          목록으로
        </Link>
        <ProjectInquiryBanner />
        <BlogBanner projectId={project.id} />
      </article>
    </main>
  );
}
