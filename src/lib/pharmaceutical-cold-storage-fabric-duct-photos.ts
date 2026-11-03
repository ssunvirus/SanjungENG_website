const captions = [
  "냉기를 고르게 분배하기 위해 천장에 설치한 패브릭덕트",
  "의약품 냉장창고 내부 공간을 따라 배치한 패브릭덕트 전경",
  "창고 출입구 인근까지 연결한 패브릭덕트",
  "창고 내부 설비 배치를 고려한 패브릭덕트 시공 현장",
  "유니트쿨러 토출부와 패브릭덕트를 연결한 분기 덕트",
  "유니트쿨러 연결부와 패브릭덕트의 원형 말단 마감",
  "냉장창고 출입구 상부에 설치한 패브릭덕트",
  "창고 내부를 따라 길게 설치한 패브릭덕트",
];

export const pharmaceuticalColdStorageFabricDuctPhotos = captions.map((caption, index) => ({
  src: `/images/projects/pharmaceutical-cold-storage-fabric-duct/photo-${String(index + 1).padStart(2, "0")}.jpg`,
  width: 1920,
  height: 2560,
  alt: `의약품 냉장창고 ${caption}`,
  caption,
}));
