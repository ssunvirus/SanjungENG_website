import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = [
  { src: "source-1.jpg", alt: "교체 전 기존 공냉식 냉동기" },
  { src: "source-2.jpg", alt: "기존 냉동기 철거 후 설치 공간 정리" },
  { src: "source-3.jpg", alt: "크레인을 이용한 신규 공냉식 냉동기 반입" },
  { src: "source-4.jpg", alt: "반도체 공장 옥상으로 인양하는 냉동기" },
  { src: "source-5.jpg", alt: "냉동기를 설치 위치에 안착시키는 작업" },
  { src: "source-6.jpg", alt: "신규 공냉식 냉동기 설치 작업" },
  { src: "source-7.jpg", alt: "교체 후 설치된 공냉식 냉동기 전경" },
];

export default function ChillerGallery() {
  return (
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/semiconductor-chiller/${photo.src}`,
        alt: photo.alt,
      }))}
    />
  );
}
