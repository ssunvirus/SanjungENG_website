import type { ProjectRecord } from "./project-record.ts";
import { ansanPaintFactoryPhotos } from "./ansan-paint-factory-project.ts";
import { hwaseongChillerPhotos } from "./hwaseong-chiller-photos.ts";
import { seoanseongValvePhotos } from "./seoanseong-valve-photos.ts";
import { seoanseongCoolingTowerPhotos } from "./seoanseong-cooling-tower-photos.ts";
import { pyeongtaekDuctCleaningPhotos } from "./pyeongtaek-duct-cleaning-photos.ts";

export type LegacyProjectPhoto = {
  src: string;
  alt: string;
  caption?: string;
  displayWidth?: number;
} & ({ width: number; height: number } | { width?: never; height?: never });

const ajuPhotos = [
  { number: 0, alt: "기존 터보냉동기 분해 및 이동 작업" },
  { number: 1, alt: "체인블록을 이용한 터보냉동기 분해 작업", portrait: true },
  { number: 2, alt: "분해한 냉동기 부품 반출 작업", portrait: true },
  { number: 3, alt: "크레인을 이용한 냉동기 부품 인양", portrait: true },
  { number: 5, alt: "아주약품에 설치된 터보냉동기 정면" },
  { number: 6, alt: "터보냉동기와 연결 배관 전경" },
  { number: 7, alt: "설치 완료된 터보냉동기" },
];

const orionPhotos = [
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

const wonsamPhotos = [
  { src: "photo-1.jpg", alt: "원삼농협 냉동설비 운반 및 반입 현장" },
  { src: "photo-2.jpg", alt: "냉동설비 설치를 준비하는 저온저장고 내부" },
  { src: "photo-3.jpg", alt: "고소작업대를 이용한 천장 유니트 쿨러 설치" },
  { src: "photo-4.jpg", alt: "저온저장고 내부 냉동설비 설치 작업" },
  { src: "photo-5.jpg", alt: "천장에 설치된 유니트 쿨러와 냉매 배관" },
  { src: "photo-6.jpg", alt: "저온저장고 외부의 냉동설비 설치 공간" },
  { src: "photo-7.jpg", alt: "저온저장고 외벽을 따라 시공한 배관" },
  { src: "photo-8.jpg", alt: "외부에 설치된 CDU 냉동설비" },
  { src: "photo-9.jpg", alt: "CDU 내부 냉동설비 점검" },
  { src: "/images/projects-page/cold-storage.jpg", alt: "냉동설비 설치 후 저온저장고 내부 전경" },
];

const guryePhotos = [
  { src: "photo-1.jpg", alt: "구례 실내수영장 천장에 설치된 섬유덕트 전경" },
  { src: "photo-2.jpg", alt: "구례 실내수영장 내부와 섬유덕트 배치" },
  { src: "photo-3.jpg", alt: "수영장 천장을 따라 설치된 섬유덕트" },
  { src: "photo-4.jpg", alt: "실내수영장 섬유덕트 연결부와 설치 상태" },
];

const chillerPhotos = [
  { src: "source-1.jpg", alt: "교체 전 기존 공냉식 냉동기" },
  { src: "source-2.jpg", alt: "기존 냉동기 철거 후 설치 공간 정리" },
  { src: "source-3.jpg", alt: "크레인을 이용한 신규 공냉식 냉동기 반입" },
  { src: "source-4.jpg", alt: "반도체 공장 옥상으로 인양하는 냉동기" },
  { src: "source-5.jpg", alt: "냉동기를 설치 위치에 안착시키는 작업" },
  { src: "source-6.jpg", alt: "신규 공냉식 냉동기 설치 작업" },
  { src: "source-7.jpg", alt: "교체 후 설치된 공냉식 냉동기 전경" },
];

const seoanseongPhotos = [
  { file: "1.jpg", width: 1400, height: 1050, alt: "서안성 냉동창고 냉동설비 정기점검 현장" },
  { file: "1-2.jpg", width: 3000, height: 4000, alt: "냉동설비 열화상 점검" },
  { file: "2.jpg", width: 1050, height: 1400, alt: "열화상 카메라를 이용한 냉동설비 온도 확인" },
  { file: "3.jpg", width: 1050, height: 1400, alt: "냉동설비 배관 점검 및 게이지 연결" },
  { file: "4.jpg", width: 1050, height: 1400, alt: "냉동설비 압력 점검 작업" },
  { file: "5.jpg", width: 1050, height: 1400, alt: "냉동설비 압력 게이지 확인" },
  { file: "6.jpg", width: 3000, height: 4000, alt: "전기 제어반 열화상 점검" },
  { file: "7.jpg", width: 3000, height: 4000, alt: "냉동설비 펌프 및 배관 점검" },
  { file: "8.jpeg", width: 864, height: 1152, alt: "냉각탑 상부 설비 점검" },
  { file: "9.jpg", width: 1050, height: 1400, alt: "냉각탑 모터 점검 작업" },
  { file: "10.jpg", width: 1050, height: 1400, alt: "고소작업대를 이용한 냉동창고 천장 설비 점검" },
];

const towerPhotos = [
  { src: "photo-1.jpg", alt: "감리교회 냉각탑 충진물 철거 현장", portrait: true },
  { src: "photo-2.jpg", alt: "냉각탑 내부 노후 충진물 철거 작업" },
  { src: "photo-3.jpg", alt: "철거한 냉각탑 충진물", portrait: true },
  { src: "photo-4.jpg", alt: "냉각탑 팬 구동부 정비 작업" },
  { src: "photo-5.jpg", alt: "냉각탑 모터 점검 및 정비", portrait: true },
  { src: "photo-6.jpg", alt: "냉각탑 구동 부품 분해 정비" },
  { src: "photo-7.jpg", alt: "현장에 반입한 교체용 충진물" },
  { src: "photo-8.jpg", alt: "설치를 준비하는 새 냉각탑 충진물" },
  { src: "photo-9.jpg", alt: "냉각탑 내부 새 충진물 설치 작업" },
];

const warehousePhotos = [
  { number: 1, alt: "항온항습기 온도 및 습도 표시 화면" },
  { number: 2, alt: "항온항습기 내부 열교환기와 압력 게이지" },
  { number: 3, alt: "설치된 항온항습기 실외기" },
  { number: 4, alt: "항온항습기 내부 전기 제어반" },
  { number: 5, alt: "항온항습기 배관 및 배수 연결", portrait: true },
  { number: 6, alt: "물류창고 항온항습기 설치 및 진공 작업" },
  { number: 7, alt: "실외기 배관 연결과 진공 측정", portrait: true },
  { number: 8, alt: "항온항습기 실외기 진공 측정 확인", portrait: true },
];

export const legacyProjectPhotos: Record<string, LegacyProjectPhoto[]> = {
  "seoanseong-cooling-tower-inspection": seoanseongCoolingTowerPhotos,
  "seoanseong-chiller-valve-replacement": seoanseongValvePhotos,
  "hwaseong-absorption-chiller-cleaning": hwaseongChillerPhotos,
  "pyeongtaek-food-factory-duct-cleaning": pyeongtaekDuctCleaningPhotos,
  "ansan-paint-factory-precision-ac-repair": ansanPaintFactoryPhotos,
  "aju-pharmaceutical": ajuPhotos.map((photo) => ({
    src: `/images/projects/aju-pharmaceutical/${photo.number}.jpg`,
    alt: photo.alt,
    width: photo.portrait ? 720 : 960,
    height: photo.portrait ? 960 : 720,
  })),
  "orion-production": orionPhotos.map((photo, index) => ({
    src: `/images/projects/orion-production/${photo}.jpg`,
    alt: `오리온 생산설비 섬유덕트 설치 현장 사진 ${index + 1}`,
  })),
  "nonghyup-cold-storage": wonsamPhotos.map((photo) => ({
    src: photo.src.startsWith("/") ? photo.src : `/images/projects/wonsam-nonghyup/${photo.src}`,
    alt: photo.alt,
  })),
  "gurye-pool": guryePhotos.map((photo) => ({
    src: `/images/projects/gurye-pool/${photo.src}`,
    alt: photo.alt,
  })),
  "semiconductor-chiller": chillerPhotos.map((photo) => ({
    src: `/images/projects/semiconductor-chiller/${photo.src}`,
    alt: photo.alt,
  })),
  "seoanseong-maintenance": seoanseongPhotos.map((photo) => ({
    src: `/images/projects/seoanseong-maintenance/${photo.file}`,
    alt: photo.alt,
    width: photo.width,
    height: photo.height,
  })),
  "church-cooling-tower": towerPhotos.map((photo) => ({
    src: `/images/projects/church-cooling-tower/${photo.src}`,
    alt: photo.alt,
    width: photo.portrait ? 3024 : 4032,
    height: photo.portrait ? 4032 : 3024,
  })),
  "warehouse-precision-ac": warehousePhotos.map((photo) => ({
    src: `/images/projects/warehouse-precision-ac/${photo.number}.jpg`,
    alt: photo.alt,
    width: photo.portrait ? 3000 : 4000,
    height: photo.portrait ? 4000 : 3000,
  })),
};

export const legacyCoverAliases: Record<string, string> = {
  "semiconductor-chiller": "/images/projects/semiconductor-chiller/source-7.jpg",
};

export function initialLegacyPhotos(id: string, cover: string, alt: string) {
  const equivalent = legacyCoverAliases[id] || cover;
  return [
    { src: cover, alt },
    ...(legacyProjectPhotos[id] || [])
      .filter((photo) => photo.src !== equivalent)
      .map(({ src, alt }) => ({ src, alt })),
  ];
}

export function completeLegacyProject(record: ProjectRecord, cover?: string): ProjectRecord {
  if (record.deleted || record.photosVersion === 1 || !cover || !legacyProjectPhotos[record.id])
    return record;
  const seed = record.photos.find((photo) => photo.src === cover);
  // Only repair the old card-photo seed format. Empty or explicitly customized
  // static-photo lists must not have intentionally removed photos resurrected.
  const oldSeed =
    seed &&
    record.photos.every(
      (photo) => photo.src === cover || photo.src.startsWith("/api/admin/project-images/"),
    );
  if (!oldSeed) return { ...record, photosVersion: 1 };
  const present = new Set(record.photos.map((photo) => photo.src));
  const missing = initialLegacyPhotos(record.id, cover, seed.alt).filter(
    (photo) => !present.has(photo.src),
  );
  return { ...record, photosVersion: 1, photos: [...record.photos, ...missing] };
}

export function hasDefaultLegacyPhotos(record: ProjectRecord, cover: string, alt: string) {
  const expected = initialLegacyPhotos(record.id, cover, alt);
  return (
    record.photos.length === expected.length &&
    record.photos.every(
      (photo, index) => photo.src === expected[index].src && photo.alt === expected[index].alt,
    )
  );
}

export function legacyPhotoDimensions(
  photo: { src: string; alt: string },
  id: string,
  cover?: string,
): LegacyProjectPhoto {
  const source = photo.src === cover ? legacyCoverAliases[id] || photo.src : photo.src;
  const original = legacyProjectPhotos[id]?.find((item) => item.src === source);
  const caption = original?.caption !== undefined ? { caption: original.caption } : {};
  const display = original?.displayWidth ? { displayWidth: original.displayWidth } : {};
  return original?.width !== undefined
    ? { ...photo, ...caption, ...display, width: original.width, height: original.height }
    : { ...photo, ...caption, ...display };
}
