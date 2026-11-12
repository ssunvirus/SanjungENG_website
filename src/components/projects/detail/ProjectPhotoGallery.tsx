import type { ReactNode } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { normalizeFabricDuctText } from "@/src/lib/fabric-duct-label";

type ProjectPhoto = { src: string; alt: string; caption?: string; displayWidth?: number } & (
  { width: number; height: number } | { width?: never; height?: never }
);

export function ProjectGalleryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-5 w-full max-w-[1000px]">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="flex min-w-0 items-center gap-2 text-xl font-bold text-brand-navy lg:gap-3 lg:text-[28px]">
          <Images aria-hidden="true" className="size-6 shrink-0 lg:size-7" />
          <span className="whitespace-nowrap">현장 사진</span>
        </h2>
      </div>
      <div className="flex flex-col gap-4 lg:gap-[30px]">{children}</div>
    </div>
  );
}

export default function ProjectPhotoGallery({
  photos,
  showAltCaption = true,
}: {
  photos: ProjectPhoto[];
  showAltCaption?: boolean;
}) {
  return (
    <ProjectGalleryLayout>
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className={photo.displayWidth ? "mx-auto w-full" : undefined}
          style={photo.displayWidth ? { maxWidth: photo.displayWidth } : undefined}
        >
          <div
            className={
              photo.width === undefined
                ? "relative aspect-[4/3] lg:aspect-auto lg:h-[563px] overflow-hidden"
                : undefined
            }
          >
            <Image
              src={photo.src}
              alt={normalizeFabricDuctText(photo.alt)}
              width={photo.width}
              height={photo.height}
              fill={photo.width === undefined}
              sizes={
                photo.displayWidth
                  ? `(max-width: ${photo.displayWidth + 40}px) calc(100vw - 40px), ${photo.displayWidth}px`
                  : "(max-width: 1439px) calc(100vw - 40px), 1000px"
              }
              quality={100}
              unoptimized={photo.src.startsWith("/api/")}
              className={photo.width === undefined ? "object-cover" : "h-auto w-full"}
            />
          </div>
          {(photo.caption ?? (showAltCaption ? photo.alt : "")) && (
            <figcaption className="whitespace-pre-line px-1 pb-2 pt-3 text-[15px] leading-6 text-slate-500 sm:text-[16px]">
              {normalizeFabricDuctText(photo.caption ?? photo.alt)}
            </figcaption>
          )}
        </figure>
      ))}
    </ProjectGalleryLayout>
  );
}
