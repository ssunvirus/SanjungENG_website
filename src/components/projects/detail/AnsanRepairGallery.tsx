import Image from "next/image";
import { ansanPaintFactoryPhotos } from "@/src/lib/ansan-paint-factory-project";
import { ProjectGalleryLayout } from "./ProjectPhotoGallery";

const captions = [
  "교체 작업 전 기존 압축기",
  "교체용 압축기 외관",
  "기존 압축기와 교체용 압축기 비교",
  "페인트 공장 항온항습기 수리 작업 현장",
  "신형 압축기 설치 및 배관연결",
  "구형 필터드라이어 확인",
  "필터드라이어 교체 작업",
  "필터드라이어 교체완료",
  "현장에서 사용한 진공/압력 게이지",
];

export default function AnsanRepairGallery() {
  return (
    <ProjectGalleryLayout>
      {ansanPaintFactoryPhotos.map((photo, index) => (
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
          <figcaption className="px-1 pb-2 pt-3 text-[15px] leading-6 text-slate-500 sm:text-[16px]">
            <span aria-hidden="true" className="mr-2 text-slate-400">
              {String(index + 1).padStart(2, "0")}.
            </span>
            {captions[index]}
          </figcaption>
        </figure>
      ))}
    </ProjectGalleryLayout>
  );
}
