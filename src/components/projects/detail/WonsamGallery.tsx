import { legacyProjectPhotos } from "@/src/lib/legacy-project-photos";
import Image from "next/image";
import { ProjectGalleryLayout } from "./ProjectPhotoGallery";
import { ArrowLeft } from "lucide-react";

const photos = legacyProjectPhotos["nonghyup-cold-storage"];

export default function WonsamGallery() {
  return (
    <ProjectGalleryLayout>
      {photos.map((photo, index) => (
        <figure
          key={photo.src}
          className={`relative overflow-hidden lg:h-[563px] ${index === 5 ? "aspect-[3/4] lg:aspect-auto" : "aspect-[4/3] lg:aspect-auto"}`}
        >
          <div
            className={
              index === 5
                ? "absolute inset-0 lg:inset-auto lg:top-[-39.47%] lg:h-[236.83%] w-full"
                : "absolute inset-0"
            }
          >
            <Image
              src={
                photo.src.startsWith("/")
                  ? photo.src
                  : `/images/projects/wonsam-nonghyup/${photo.src}`
              }
              alt={photo.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 1000px"
              quality={100}
              className={index === 5 ? "object-cover lg:object-fill" : "object-cover"}
            />
          </div>
          {index === 4 && (
            <ArrowLeft
              size={40}
              aria-hidden="true"
              className="absolute bottom-[34px] left-1/2 -translate-x-1/2 text-[#1D1B20]"
            />
          )}
        </figure>
      ))}
    </ProjectGalleryLayout>
  );
}
