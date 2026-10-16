import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = [
  { src: "photo-1.jpg", alt: "구례 실내수영장 천장에 설치된 섬유덕트 전경" },
  { src: "photo-2.jpg", alt: "구례 실내수영장 내부와 섬유덕트 배치" },
  { src: "photo-3.jpg", alt: "수영장 천장을 따라 설치된 섬유덕트" },
  { src: "photo-4.jpg", alt: "실내수영장 섬유덕트 연결부와 설치 상태" },
];

export default function GuryeGallery() {
  return (
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/gurye-pool/${photo.src}`,
        alt: photo.alt,
      }))}
    />
  );
}
