// Original files preserved without recompression, in attachment order.
export const siheungCommercialChillerPhotos = [
  {
    width: 1086,
    height: 1448,
    caption: "체인블록을 이용한 흡수식 냉동기 수실 커버 분리 작업",
  },
  {
    width: 3000,
    height: 4000,
    caption: "냉동기 정비에 필요한 금속 부재 가공 작업",
  },
  {
    width: 3000,
    height: 4000,
    caption: "냉동기 내부 전열관과 주변 부품 상태 점검",
  },
  {
    width: 3000,
    height: 4000,
    caption: "점검등을 이용한 냉동기 내부 부식 및 오염 상태 확인",
  },
  {
    width: 3000,
    height: 4000,
    caption: "분리한 수실 커버를 인양하며 이동하는 작업",
  },
  {
    width: 4000,
    height: 3000,
    caption: "수실을 개방한 흡수식 냉동기 점검 현장",
  },
  {
    width: 4000,
    height: 3000,
    caption: "수실 커버 분리 후 전열관과 연결 배관 상태 확인",
  },
  {
    width: 3000,
    height: 4000,
    caption: "전용 세관기를 이용한 흡수식 냉동기 전열관 세척",
  },
  {
    width: 1050,
    height: 1400,
    caption: "분해한 진공펌프 부품의 오염 및 마모 상태 확인",
  },
  {
    width: 1400,
    height: 1050,
    caption: "세척한 진공펌프 부품을 정리하고 조립 전 점검",
  },
  {
    width: 1448,
    height: 1086,
    caption: "냉동기 하부 전열관과 수실 정비 작업",
  },
  {
    width: 4032,
    height: 3024,
    caption: "냉동기 정비를 위해 현장에 준비한 작업 자재",
  },
  {
    width: 4000,
    height: 3000,
    caption: "정비 후 제어 화면에서 냉동기 운전 상태 확인",
  },
].map((photo, index) => ({
  ...photo,
  alt: `시흥시 대형상업시설 흡수식냉동기 수리: ${photo.caption}`,
  displayWidth: 760,
  src:
    index === 0
      ? "/images/projects/siheung-commercial-absorption-chiller-repair/cover-01.png"
      : index === 10
        ? "/images/projects/siheung-commercial-absorption-chiller-repair/safety-11.png"
        : `/images/projects/siheung-commercial-absorption-chiller-repair/original-${String(index + 1).padStart(2, "0")}.jpg`,
}));
