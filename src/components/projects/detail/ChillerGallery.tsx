import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { src: "source-1.jpg", alt: "교체 전 기존 공냉식 냉동기" },
  { src: "source-2.jpg", alt: "기존 냉동기 철거 후 설치 공간 정리" },
  { src: "source-3.jpg", alt: "크레인을 이용한 신규 공냉식 냉동기 반입" },
  { src: "source-4.jpg", alt: "반도체 공장 옥상으로 인양하는 냉동기" },
  { src: "source-5.jpg", alt: "냉동기를 설치 위치에 안착시키는 작업" },
  { src: "source-6.jpg", alt: "신규 공냉식 냉동기 설치 작업" },
  { src: "source-7.jpg", alt: "교체 후 설치된 공냉식 냉동기 전경" },
];

export default function ChillerGallery() {
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
              src={`/images/projects/semiconductor-chiller/${photo.src}`}
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
