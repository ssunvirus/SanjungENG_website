// Attachment order; dimensions include EXIF orientation.
export const seoanseongCoolingTowerPhotos = [
  {
    width: 960,
    height: 1280,
    alt: "서안성 냉각탑 정기 점검 작업 현장",
    caption: "냉각탑 외관과 상부 설비 상태 확인",
  },
  {
    width: 4000,
    height: 3000,
    alt: "냉각탑 1호기 팬 모터와 벨트 구동부 점검",
    caption: "냉각탑 1호기 팬 및 구동부 점검",
  },
  {
    width: 3000,
    height: 4000,
    alt: "냉각탑 2호기 팬과 풀리 구동부 점검",
    caption: "냉각탑 2호기 팬 및 구동부 점검",
  },
  {
    width: 1050,
    height: 1400,
    alt: "냉각탑 팬 구동부 그리스 주입 부위",
    caption: "팬 구동부 윤활을 위한 그리스 주입",
  },
  {
    width: 1050,
    height: 1400,
    alt: "그리스건으로 냉각탑 구동부에 그리스를 주입하는 작업자",
    caption: "그리스건을 사용하여 구동부 그리스 보충",
  },
  {
    width: 1050,
    height: 1400,
    alt: "냉각탑 측면 흡입그릴과 배관 점검",
    caption: "흡입그릴과 주변 설비 상태 확인",
  },
  {
    width: 1400,
    height: 1050,
    alt: "냉각탑 흡입그릴을 분리하여 청소하는 작업자",
    caption: "냉각탑 흡입그릴 분리 및 청소 진행",
  },
  {
    width: 1400,
    height: 1050,
    alt: "냉각탑 흡입그릴 탈착과 내부 오염 상태 확인",
    caption: "흡입그릴을 탈착하여 내부 오염 상태 확인",
  },
  {
    width: 1050,
    height: 1400,
    alt: "냉각탑에서 분리한 흡입그릴 청소 작업",
    caption: "분리한 흡입그릴의 이물질 제거 및 청소",
  },
  {
    width: 1050,
    height: 1400,
    alt: "냉각탑 점검을 위해 분리해 둔 흡입그릴",
    caption: "흡입그릴 상태 확인 및 재설치 준비",
  },
  {
    width: 1400,
    height: 1050,
    alt: "냉각탑 2호기 내부 살수상태를 확인하는 작업자",
    caption: "냉각탑 2호기 살수상태 확인 및 시운전 점검",
  },
  {
    width: 1400,
    height: 1050,
    alt: "시운전 중 냉각탑 1호기 내부 살수상태",
    caption: "냉각탑 1호기 살수상태 확인 및 시운전 점검",
  },
].map((photo, index) => ({
  ...photo,
  displayWidth: Math.min(760, photo.width),
  src: `/images/projects/seoanseong-cooling-tower-inspection/photo-${String(index + 1).padStart(2, "0")}.jpg`,
}));
