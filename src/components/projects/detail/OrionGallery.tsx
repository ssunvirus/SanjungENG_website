import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  "cc_1",
  "cc_2",
  "cc_3",
  "cc_P5243334",
  "cc_P5243348",
  "cc_P5243349",
  "cc_P5243355",
  "cc_P5243359",
  "cc_P5243366",
  "cc_P5243368",
];

export default function OrionGallery() {
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
          <figure key={photo} className="relative aspect-[4/3] lg:aspect-auto lg:h-[563px] overflow-hidden">
            <Image
              src={`/images/projects/orion-production/${photo}.jpg`}
              alt={`오리온 생산설비 섬유덕트 설치 현장 사진 ${index + 1}`}
              fill
              sizes="(max-width: 1023px) 100vw, 1000px"
              quality={100}
              className="object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
