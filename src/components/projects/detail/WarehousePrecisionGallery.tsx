import ProjectPhotoGallery from "./ProjectPhotoGallery";

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
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/warehouse-precision-ac/${photo.number}.jpg`,
        alt: photo.alt,
        width: photo.portrait ? 3000 : 4000,
        height: photo.portrait ? 4000 : 3000,
      }))}
    />
  );
}
