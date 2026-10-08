import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { src: "photo-1.jpg", alt: "구례 실내수영장 천장에 설치된 섬유덕트 전경" },
  { src: "photo-2.jpg", alt: "구례 실내수영장 내부와 섬유덕트 배치" },
  { src: "photo-3.jpg", alt: "수영장 천장을 따라 설치된 섬유덕트" },
  { src: "photo-4.jpg", alt: "실내수영장 섬유덕트 연결부와 설치 상태" },
];

export default function GuryeGallery() {
  return (
    <div className="mx-auto mt-[20px] w-[1000px]">
      <Link
        href="/projects"
        className="mb-[20px] flex h-[40px] w-fit items-center gap-[5px] text-[25px] font-medium hover:text-[#00ADDB] focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
      >
        <ArrowLeft size={40} aria-hidden="true" />
        목록으로 돌아가기
      </Link>
      <div className="flex flex-col gap-[30px]">
        {photos.map((photo) => (
          <figure key={photo.src} className="relative h-[563px] overflow-hidden">
            <Image
              src={`/images/projects/gurye-pool/${photo.src}`}
              alt={photo.alt}
              fill
              sizes="1000px"
              quality={100}
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
