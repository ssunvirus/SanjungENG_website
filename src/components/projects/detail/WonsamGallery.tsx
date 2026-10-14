import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { src: "photo-1.jpg", alt: "원삼농협 냉동설비 운반 및 반입 현장" },
  { src: "photo-2.jpg", alt: "냉동설비 설치를 준비하는 저온저장고 내부" },
  { src: "photo-3.jpg", alt: "고소작업대를 이용한 천장 유니트 쿨러 설치" },
  { src: "photo-4.jpg", alt: "저온저장고 내부 냉동설비 설치 작업" },
  { src: "photo-5.jpg", alt: "천장에 설치된 유니트 쿨러와 냉매 배관" },
  { src: "photo-6.jpg", alt: "저온저장고 외부의 냉동설비 설치 공간" },
  { src: "photo-7.jpg", alt: "저온저장고 외벽을 따라 시공한 배관" },
  { src: "photo-8.jpg", alt: "외부에 설치된 CDU 냉동설비" },
  { src: "photo-9.jpg", alt: "CDU 내부 냉동설비 점검" },
  { src: "/images/projects-page/cold-storage.jpg", alt: "냉동설비 설치 후 저온저장고 내부 전경" },
];

export default function WonsamGallery() {
  return (
    <div className="mx-auto mt-[20px] w-full lg:w-[1000px]">
      <Link
        href="/projects"
        className="mb-[20px] flex h-[40px] w-fit items-center gap-[5px] text-base lg:text-[25px] font-medium hover:text-[#00ADDB] focus-visible:outline-2 focus-visible:outline-[#00ADDB]"
      >
        <ArrowLeft size={40} aria-hidden="true" className="size-6 lg:size-10" />
        목록으로 돌아가기
      </Link>
      <div className="flex flex-col gap-4 lg:gap-[30px]">
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
      </div>
    </div>
  );
}
