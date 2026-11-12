// Original JPEG files copied without recompression. Dimensions include EXIF rotation.
// Photos follow the user's attachment order. Captions are editable below.
export const yonginBuildingChillerPhotos = [
  { width: 3000, height: 4000, caption: "기계실에 설치된 흡수식냉온수기와 연결 배관 전경" },
  { width: 3000, height: 4000, caption: "세관 작업에 앞서 냉온수기와 주변 배관 비닐 보양" },
  { width: 3000, height: 4000, caption: "개방한 1호기 수실 커버의 녹과 오염 상태 확인" },
  { width: 3000, height: 4000, caption: "1호기 수실 내부와 전열관 입구의 오염 상태 확인" },
  { width: 3000, height: 4000, caption: "주변 설비를 보양하고 상부 수실 커버를 개방한 작업 구역" },
  { width: 3000, height: 4000, caption: "작업 발판에서 진행하는 3호기 전열관 세관 작업" },
  { width: 3000, height: 4000, caption: "3호기 하부 수실과 전열관 세척 작업" },
  { width: 3000, height: 4000, caption: "4호기 수실을 개방하고 전열관 세관 작업 진행" },
  { width: 3000, height: 4000, caption: "4호기 전열관 내부 오염물 제거 작업" },
  { width: 4000, height: 3000, caption: "4호기 세관 작업 완료 후 수실 내부 확인" },
  { width: 4000, height: 3000, caption: "3호기 세관 작업 완료 후 전열관과 수실 상태 확인" },
  { width: 3000, height: 4000, caption: "1호기 세관 후 수실과 전열관 건조 상태 확인" },
  { width: 3000, height: 4000, caption: "3호기 세관 후 수실 내부 건조 작업" },
  { width: 4000, height: 3000, caption: "4호기 상부 수실 커버 조립 작업" },
  { width: 4000, height: 3000, caption: "4호기 수실 커버 조립 완료 후 외관 확인" },
].map((photo, index) => ({
  ...photo,
  alt: `용인시 대형빌딩 흡수식냉온수기 정비: ${photo.caption}`,
  displayWidth: 760,
  src: `/images/projects/yongin-building-absorption-chiller-cleaning/original-${String(index + 1).padStart(2, "0")}.jpg`,
}));
