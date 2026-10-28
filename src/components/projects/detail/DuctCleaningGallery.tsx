import Image from "next/image";
import { pyeongtaekDuctCleaningPhotos } from "@/src/lib/pyeongtaek-duct-cleaning-photos";
import { ProjectGalleryLayout } from "./ProjectPhotoGallery";

export default function DuctCleaningGallery() {
  return (
    <ProjectGalleryLayout>
      {pyeongtaekDuctCleaningPhotos.map((photo) => (
        <figure key={photo.src}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 1439px) calc(100vw - 40px), 1000px"
            quality={100}
            className="h-auto w-full"
          />
          {photo.caption && (
            <figcaption className="px-1 pb-2 pt-3 text-[15px] leading-6 text-slate-500 sm:text-[16px]">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </ProjectGalleryLayout>
  );
}
