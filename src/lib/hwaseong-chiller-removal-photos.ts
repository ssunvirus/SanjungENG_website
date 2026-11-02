// Photos follow the user's attachment order. Dimensions include EXIF orientation.
export const hwaseongChillerRemovalPhotos = [
  { caption: "배관 분리 및 장비 해체를 준비하는 노후 흡수식냉동기", width: 2992, height: 2992 },
  { caption: "배관 분리 후 환기 장비를 배치한 철거 작업 현장", width: 3000, height: 4000 },
  { caption: "흡수식냉동기 본체를 절단하여 해체 작업 진행", width: 2992, height: 2992 },
  { caption: "체인블록을 이용한 해체 준비 및 하부 분리 작업", width: 2992, height: 2992 },
  { caption: "본체 절단 후 드러난 열교환기 전열관", width: 2992, height: 2992 },
  { caption: "흡수식냉동기 내부 전열관과 해체 부위 확인", width: 2992, height: 2992 },
  { caption: "반출을 위해 냉동기 본체와 내부 열교환기 해체 진행", width: 2992, height: 2992 },
  { caption: "냉동기 하부 구조물과 연결 부품 분리", width: 3000, height: 4000 },
].map((photo, index) => ({
  ...photo,
  alt: `화성시 자원순환시설 ${photo.caption}`,
  displayWidth: 760,
  src: `/images/projects/hwaseong-absorption-chiller-removal/photo-${String(index + 1).padStart(2, "0")}.jpg`,
}));
