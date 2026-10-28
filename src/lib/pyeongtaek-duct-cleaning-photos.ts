const photos = [
  {
    alt: "평택 식품가공공장 세탁 전 섬유덕트 표면 오염 상태",
    caption: "섬유덕트 장시간 사용으로 토출구 및 상부에 먼지가 쌓여 세탁을 요청",
    width: 966,
    height: 725,
  },
  {
    alt: "식품가공공장 생산라인 천장에 설치된 세탁 전 섬유덕트",
    caption: "공장 내 주간 진입이 어려워 공정 마감 후 철거작업 진행",
    width: 966,
    height: 725,
  },
  {
    alt: "세탁 후 재설치한 식품가공공장 섬유덕트 연결부",
    caption: "일주일간의 세탁공정을 마치고 설치작업",
    width: 4032,
    height: 3024,
  },
  {
    alt: "식품가공공장 생산라인을 따라 재설치한 섬유덕트 전경",
    caption: "유니트 쿨러 가동하여 시운전 완료",
    width: 4032,
    height: 3024,
  },
  {
    alt: "세탁 후 재설치된 섬유덕트의 공기 분배 구멍과 연결부",
    caption: "",
    width: 4032,
    height: 3024,
  },
  {
    alt: "분리한 섬유덕트를 접어 비닐에 포장한 모습",
    caption: "ZONE별로 마킹 후 톤백을 활용하여 수거 및 세탁",
    width: 966,
    height: 725,
  },
].map((photo, index) => ({
  ...photo,
  src: `/images/projects/pyeongtaek-food-factory-duct-cleaning/photo-${String(index + 1).padStart(2, "0")}.jpg`,
}));

// Keep image URLs stable while changing the display order.
export const pyeongtaekDuctCleaningPhotos = [
  photos[0],
  photos[1],
  photos[5],
  photos[2],
  photos[4],
  photos[3],
];
