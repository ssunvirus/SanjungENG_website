import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { number: 0, alt: "기존 터보냉동기 분해 및 이동 작업" },
  { number: 1, alt: "체인블록을 이용한 터보냉동기 분해 작업", portrait: true },
  { number: 2, alt: "분해한 냉동기 부품 반출 작업", portrait: true },
  { number: 3, alt: "크레인을 이용한 냉동기 부품 인양", portrait: true },
  { number: 5, alt: "아주약품에 설치된 터보냉동기 정면" },
  { number: 6, alt: "터보냉동기와 연결 배관 전경" },
  { number: 7, alt: "설치 완료된 터보냉동기" },
];

export default function AjuGallery() {
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
          <figure key={photo.number}>
            <Image
              src={`/images/projects/aju-pharmaceutical/${photo.number}.jpg`}
              alt={photo.alt}
              width={photo.portrait ? 720 : 960}
              height={photo.portrait ? 960 : 720}
              sizes="1000px"
              quality={100}
              className="h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
