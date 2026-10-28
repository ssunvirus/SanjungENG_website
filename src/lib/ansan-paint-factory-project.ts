const id = "ansan-paint-factory-precision-ac-repair";

// Keep original file numbers stable when photos are removed or reordered.
// Dimensions account for EXIF rotation; original image bytes are unchanged.
export const ansanPaintFactoryPhotos = [
  {
    number: 2,
    source: "20260516_094941.jpg",
    portrait: true,
    alt: "교체 작업 전 항온항습기 기존 압축기와 전기 연결부",
  },
  { number: 3, source: "20260516_094952.jpg", portrait: true, alt: "교체용 압축기 외관" },
  {
    number: 4,
    source: "20260516_101946.jpg",
    portrait: false,
    alt: "항온항습기 교체 전후 압축기 비교",
  },
  {
    number: 5,
    source: "20260516_100144.jpg",
    portrait: false,
    alt: "페인트 공장 항온항습기 수리 작업 현장",
  },
  { number: 6, source: "20260516_105917.jpg", portrait: true, alt: "신형 압축기 설치 및 배관연결" },
  {
    number: 8,
    source: "20260516_103707.jpg",
    portrait: false,
    alt: "구형 필터드라이어 확인",
  },
  {
    number: 9,
    source: "20260516_110201.jpg",
    portrait: true,
    alt: "항온항습기 필터드라이어 교체 작업",
  },
  {
    number: 10,
    source: "20260516_110349.jpg",
    portrait: false,
    alt: "필터드라이어 교체완료",
  },
  {
    number: 11,
    source: "20260516_121400.jpg",
    portrait: false,
    alt: "현장에서 사용한 진공/압력 게이지",
  },
].map((photo) => ({
  ...photo,
  src: `/images/projects/${id}/photo-${String(photo.number).padStart(2, "0")}.jpg`,
  width: photo.portrait ? 3000 : 4000,
  height: photo.portrait ? 4000 : 3000,
}));
