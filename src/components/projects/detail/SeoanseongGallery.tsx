import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { file: "1.jpg", width: 1400, height: 1050, alt: "서안성 냉동창고 냉동설비 정기점검 현장" },
  { file: "1-2.jpg", width: 3000, height: 4000, alt: "냉동설비 열화상 점검" },
  { file: "2.jpg", width: 1050, height: 1400, alt: "열화상 카메라를 이용한 냉동설비 온도 확인" },
  { file: "3.jpg", width: 1050, height: 1400, alt: "냉동설비 배관 점검 및 게이지 연결" },
  { file: "4.jpg", width: 1050, height: 1400, alt: "냉동설비 압력 점검 작업" },
  { file: "5.jpg", width: 1050, height: 1400, alt: "냉동설비 압력 게이지 확인" },
  { file: "6.jpg", width: 3000, height: 4000, alt: "전기 제어반 열화상 점검" },
  { file: "7.jpg", width: 3000, height: 4000, alt: "냉동설비 펌프 및 배관 점검" },
  { file: "8.jpeg", width: 864, height: 1152, alt: "냉각탑 상부 설비 점검" },
  { file: "9.jpg", width: 1050, height: 1400, alt: "냉각탑 모터 점검 작업" },
  { file: "10.jpg", width: 1050, height: 1400, alt: "고소작업대를 이용한 냉동창고 천장 설비 점검" },
];

export default function SeoanseongGallery() {
  return (
    <div className="mx-auto mt-5 w-full lg:w-[1000px]">
      <Link
        href="/projects"
        className="mb-5 flex h-10 w-fit items-center gap-[5px] text-base font-medium hover:text-[#00ADDB] focus-visible:outline-2 focus-visible:outline-[#00ADDB] lg:text-[25px]"
      >
        <ArrowLeft aria-hidden="true" className="size-6 lg:size-10" />
        목록으로 돌아가기
      </Link>
      <div className="flex flex-col gap-4 lg:gap-[30px]">
        {photos.map((photo) => (
          <figure key={photo.file}>
            <Image
              src={`/images/projects/seoanseong-maintenance/${photo.file}`}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 1023px) calc(100vw - 40px), 1000px"
              quality={100}
              className="h-auto w-full"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
