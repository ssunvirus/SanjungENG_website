import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const photos = [
  { number: 1, alt: "항온항습기 온도 및 습도 표시 화면" },
  { number: 2, alt: "항온항습기 내부 열교환기와 압력 게이지" },
  { number: 3, alt: "설치된 항온항습기 실외기" },
  { number: 4, alt: "항온항습기 내부 전기 제어반" },
  { number: 5, alt: "항온항습기 배관 및 배수 연결", portrait: true },
  { number: 6, alt: "물류창고 항온항습기 설치 및 진공 작업" },
  { number: 7, alt: "실외기 배관 연결과 진공 측정", portrait: true },
  { number: 8, alt: "항온항습기 실외기 진공 측정 확인", portrait: true },
];

export default function WarehousePrecisionGallery() {
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
          <figure key={photo.number}>
            <Image
              src={`/images/projects/warehouse-precision-ac/${photo.number}.jpg`}
              alt={photo.alt}
              width={photo.portrait ? 3000 : 4000}
              height={photo.portrait ? 4000 : 3000}
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
