import ProjectPhotoGallery from "./ProjectPhotoGallery";

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
    <ProjectPhotoGallery
      photos={photos.map((photo) => ({
        src: `/images/projects/aju-pharmaceutical/${photo.number}.jpg`,
        alt: photo.alt,
        width: photo.portrait ? 720 : 960,
        height: photo.portrait ? 960 : 720,
      }))}
    />
  );
}
