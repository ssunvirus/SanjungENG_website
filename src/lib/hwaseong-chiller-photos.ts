// Original attachment order; dimensions account for EXIF rotation.
export const hwaseongChillerPhotos = [
  {
    portrait: true,
    alt: "화성시 자원순환시설 흡수식냉동기 세관 작업 현장",
    caption: "흡수식냉동기 주변을 보양하고 세관 작업 준비",
  },
  {
    portrait: false,
    alt: "점검구를 개방한 흡수식냉동기와 주변 보양 상태",
    caption: "열교환기 점검구를 개방한 냉동기 전경",
  },
  {
    portrait: true,
    alt: "흡수식냉동기 열교환기 점검구 덮개와 체결 볼트",
    caption: "열교환기 점검구 덮개와 체결부 상태 확인",
  },
  {
    portrait: false,
    alt: "흡수식냉동기 열교환기 전열관 입구와 내부 오염 상태",
    caption: "전열관 입구와 수실 내부의 오염 상태 확인",
  },
  {
    portrait: true,
    alt: "상하 점검구를 개방한 흡수식냉동기 열교환기 내부",
    caption: "상하 점검구를 개방하여 전열관과 내부 상태 점검",
  },
  {
    portrait: false,
    alt: "흡수식냉동기 전열관에 세관 도구를 삽입하는 작업자",
    caption: "전열관 내부에 세관 도구를 삽입하여 오염물 제거",
  },
  {
    portrait: false,
    alt: "흡수식냉동기 열교환기 수실 내부 세척 작업",
    caption: "열교환기 수실 내부를 세척하여 잔여 오염물 제거",
  },
  {
    portrait: true,
    width: 466,
    height: 621,
    alt: "세관 후 방청도장을 마친 흡수식냉동기 하부 수실과 덮개",
    caption: "세관 완료 후 수실 내부와 덮개 방청도장 완료",
  },
  {
    portrait: true,
    width: 466,
    height: 621,
    alt: "세관 및 방청도장을 완료한 흡수식냉동기 상부 수실",
    caption: "상부 수실 내부 방청도장 및 마감 상태 확인",
  },
  {
    portrait: true,
    width: 966,
    height: 1288,
    alt: "점검구 조립과 현장 정리를 마친 흡수식냉동기 전경",
    caption: "점검구 조립 및 현장 정리 후 시운전과 최종점검 완료",
  },
].map((photo, index) => ({
  ...photo,
  displayWidth: Math.min(760, photo.width ?? 760),
  src: `/images/projects/hwaseong-absorption-chiller-cleaning/photo-${String(index + 1).padStart(2, "0")}.jpg`,
  width: photo.width ?? (photo.portrait ? 3000 : 4000),
  height: photo.height ?? (photo.portrait ? 4000 : 3000),
}));
