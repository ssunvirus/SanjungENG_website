import ProjectPhotoGallery from "./ProjectPhotoGallery";

const photos = [
  "cc_1",
  "cc_2",
  "cc_3",
  "cc_P5243334",
  "cc_P5243348",
  "cc_P5243349",
  "cc_P5243355",
  "cc_P5243359",
  "cc_P5243366",
  "cc_P5243368",
];

export default function OrionGallery() {
  return (
    <ProjectPhotoGallery
      photos={photos.map((photo, index) => ({
        src: `/images/projects/orion-production/${photo}.jpg`,
        alt: `오리온 생산설비 섬유덕트 설치 현장 사진 ${index + 1}`,
      }))}
    />
  );
}
