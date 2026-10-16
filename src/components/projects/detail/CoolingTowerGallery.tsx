import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = [
  { src: "photo-1.jpg", alt: "감리교회 냉각탑 충진물 철거 현장", portrait: true },
  { src: "photo-2.jpg", alt: "냉각탑 내부 노후 충진물 철거 작업" },
  { src: "photo-3.jpg", alt: "철거한 냉각탑 충진물", portrait: true },
  { src: "photo-4.jpg", alt: "냉각탑 팬 구동부 정비 작업" },
  { src: "photo-5.jpg", alt: "냉각탑 모터 점검 및 정비", portrait: true },
  { src: "photo-6.jpg", alt: "냉각탑 구동 부품 분해 정비" },
  { src: "photo-7.jpg", alt: "현장에 반입한 교체용 충진물" },
  { src: "photo-8.jpg", alt: "설치를 준비하는 새 냉각탑 충진물" },
  { src: "photo-9.jpg", alt: "냉각탑 내부 새 충진물 설치 작업" },
];

export default function CoolingTowerGallery() {
  return (
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/church-cooling-tower/${photo.src}`,
        alt: photo.alt,
        width: photo.portrait ? 3024 : 4032,
        height: photo.portrait ? 4032 : 3024,
      }))}
    />
  );
}
