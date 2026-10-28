import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type ProjectPhoto = { src: string; alt: string; caption?: string } & (
  { width: number; height: number } | { width?: never; height?: never }
);

export function ProjectGalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-5 w-full lg:w-[1000px]">
      <Link
        href="/projects"
        className="mb-5 flex h-10 w-fit items-center gap-[5px] text-base lg:text-[25px] font-medium hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-brand-blue"
      >
        <ArrowLeft size={40} aria-hidden="true" className="size-6 lg:size-10" />
        목록으로 돌아가기
      </Link>
      <div className="flex flex-col gap-4 lg:gap-[30px]">{children}</div>
    </div>
  );
}

export default function ProjectPhotoGallery({
  photos,
  showAltCaption = false,
}: {
  photos: ProjectPhoto[];
  showAltCaption?: boolean;
}) {
  return (
    <ProjectGalleryLayout>
      {photos.map((photo) => (
        <figure key={photo.src}>
          <div
            className={
              photo.width === undefined
                ? "relative aspect-[4/3] lg:aspect-auto lg:h-[563px] overflow-hidden"
                : undefined
            }
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              fill={photo.width === undefined}
              sizes="(max-width: 1439px) calc(100vw - 40px), 1000px"
              quality={100}
              unoptimized={photo.src.startsWith("/api/")}
              className={photo.width === undefined ? "object-cover" : "h-auto w-full"}
            />
          </div>
          {(photo.caption ?? (showAltCaption ? photo.alt : "")) && (
            <figcaption className="px-1 pb-2 pt-3 text-[15px] leading-6 text-slate-500 sm:text-[16px]">
              {photo.caption ?? photo.alt}
            </figcaption>
          )}
        </figure>
      ))}
    </ProjectGalleryLayout>
  );
}
