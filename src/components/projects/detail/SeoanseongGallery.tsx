import ProjectPhotoGallery from "./ProjectPhotoGallery";

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
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/seoanseong-maintenance/${photo.file}`,
        alt: photo.alt,
        width: photo.width,
        height: photo.height,
      }))}
    />
  );
}
