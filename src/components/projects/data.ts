export type Project = {
  id: string;
  category: "냉동공조" | "섬유덕트";
  tag: string;
  title: string;
  description: string;
  image: string;
  imageTop: string;
  imageLeft?: string;
  href: string;
  homeImage?: string;
  mobileTag?: string;
  location?: string;
  workDescription?: string;
  blogUrl?: string;
};

export const ansanPaintFactoryProject = {
  id: "ansan-paint-factory-precision-ac-repair",
  href: "/projects/ansan-paint-factory-precision-ac-repair",
  category: "냉동공조",
  tag: "항온항습기",
  title: "페인트공장 항온항습기 수리",
  blogUrl: "https://blog.naver.com/sanjungeng/224355542281",
  description: "압축기 및 필터드라이어 교체",
  location: "안산시",
  workDescription:
    "공장 항온항습기의 압축기 및 필터드라이어를 교체하여 설비의 정상 운전을 복구하였습니다.",
  image: "/images/projects/ansan-paint-factory-precision-ac-repair/photo-06.jpg",
  imageTop: "0%",
} satisfies Project;

export const projects: Project[] = [
  {
    id: "seoanseong-cooling-tower-inspection",
    href: "/projects/seoanseong-cooling-tower-inspection",
    category: "냉동공조",
    tag: "냉각탑",
    title: "냉각탑 정기 점검",
    description: "냉각탑 흡입그릴 청소 및 팬 구동부 점검",
    location: "서안성",
    workDescription:
      "냉각탑 흡입그릴 청소 및 팬, 구동부 점검, 그리스 주입 작업을 통해 냉각탑의 성능을 개선하였습니다.",
    blogUrl: "https://blog.naver.com/sanjungeng/224378454682",
    image: "/images/projects/seoanseong-cooling-tower-inspection/photo-01.jpg",
    imageTop: "0%",
  },
  {
    id: "seoanseong-chiller-valve-replacement",
    href: "/projects/seoanseong-chiller-valve-replacement",
    category: "냉동공조",
    tag: "냉동기",
    title: "냉동창고 냉동기 밸브 교체",
    description: "냉동기 밸브 교체",
    location: "서안성",
    workDescription:
      "냉동기 냉각수라인의 노후 밸브 교체 및 배관 정비를 통해 냉동 설비를 보수했습니다.",
    blogUrl:
      "https://blog.naver.com/PostView.naver?blogId=sanjungeng&logNo=224367095697&categoryNo=23&parentCategoryNo=&from=thumbnailList",
    image: "/images/projects/seoanseong-chiller-valve-replacement/photo-03.jpg",
    imageTop: "0%",
  },
  {
    id: "hwaseong-absorption-chiller-cleaning",
    href: "/projects/hwaseong-absorption-chiller-cleaning",
    category: "냉동공조",
    tag: "냉동기",
    title: "자원순환시설 흡수식냉동기 세관",
    description: "흡수식냉동기 세관",
    location: "화성시",
    workDescription:
      "자원순환시설 흡수식냉동기의 열교환기 내부 오염물을 제거하고, 냉동기 운전 효율과 안정성을 개선하였습니다.",
    blogUrl:
      "https://blog.naver.com/PostView.naver?blogId=sanjungeng&logNo=224359079016&categoryNo=23&parentCategoryNo=&from=thumbnailList",
    image: "/images/projects/hwaseong-absorption-chiller-cleaning/photo-06.jpg",
    imageTop: "0%",
  },
  {
    id: "pyeongtaek-food-factory-duct-cleaning",
    href: "/projects/pyeongtaek-food-factory-duct-cleaning",
    category: "섬유덕트",
    tag: "섬유덕트",
    title: "식품가공공장 섬유덕트 세탁",
    description: "페브릭덕트 세탁",
    location: "평택시",
    workDescription:
      "장기간 사용으로 오염된 섬유덕트를 탈착, 세탁 후 재설치하여 공기 분배 효율을 개선하였습니다.",
    blogUrl: "https://blog.naver.com/PostList.naver?blogId=sanjungeng&from=postList&categoryNo=1",
    image: "/images/projects/pyeongtaek-food-factory-duct-cleaning/photo-01.jpg",
    imageTop: "0%",
  },
  ansanPaintFactoryProject,
  {
    id: "aju-pharmaceutical",
    href: "/projects/aju-pharmaceutical",
    category: "냉동공조",
    tag: "냉동기",
    title: "아주약품 터보냉동기 설치공사",
    description: "터보냉동기 교체",
    image: "/images/projects/aju-pharmaceutical/5.jpg",
    imageTop: "-12.54%",
  },
  {
    id: "orion-production",
    blogUrl: "https://blog.naver.com/PostList.naver?blogId=sanjungeng&from=postList&categoryNo=1",
    href: "/projects/orion-production",
    category: "섬유덕트",
    tag: "섬유덕트",
    title: "오리온 생산설비 섬유덕트 설치",
    description: "섬유덕트 설계 / 설치",
    image: "/images/projects/orion-production/cc_P5243334.jpg",
    imageTop: "-12.54%",
  },
  {
    id: "nonghyup-cold-storage",
    blogUrl: "https://blog.naver.com/sanjungeng/224403631010",
    homeImage: "/images/projects-page/cold-storage.jpg",
    mobileTag: "저온저장고 시공",
    href: "/projects/wonsam-nonghyup",
    category: "냉동공조",
    tag: "저온저장고",
    title: "농협 저온저장고 냉동설비 설치",
    description: "CDU / 유니트쿨러 설치",
    image: "/images/projects-page/cold-storage.jpg",
    imageTop: "-24.92%",
  },
  {
    id: "gurye-pool",
    blogUrl: "https://blog.naver.com/PostList.naver?blogId=sanjungeng&from=postList&categoryNo=1",
    homeImage: "/images/projects/pool-fabric-duct.jpg",
    mobileTag: "섬유덕트 시공",
    href: "/projects/gurye-pool",
    category: "섬유덕트",
    tag: "섬유덕트",
    title: "구례 실내수영장 섬유덕트 설치",
    description: "섬유덕트 설계 / 설치",
    image: "/images/projects-page/pool.jpg",
    imageTop: "-0.15%",
    imageLeft: "-0.02%",
  },
  {
    id: "semiconductor-chiller",
    blogUrl: "https://blog.naver.com/sanjungeng/222380530287",
    homeImage: "/images/projects/semiconductor-chiller/source-7.jpg",
    mobileTag: "냉동기 교체",
    href: "/projects/semiconductor-chiller",
    category: "냉동공조",
    tag: "냉동기",
    title: "반도체 공장 칠러 시스템 구축",
    description: "공냉식 냉동기 교체",
    // Preserve the legacy cover identity used by older DB photo records.
    image: "/images/projects-page/chiller.jpg",
    imageTop: "0.02%",
    imageLeft: "0.16%",
  },
  {
    id: "seoanseong-maintenance",
    blogUrl: "https://blog.naver.com/sanjungeng/224366829288",
    homeImage: "/images/projects/warehouse-maintenance.jpg",
    href: "/projects/seoanseong-maintenance",
    category: "냉동공조",
    tag: "냉동기",
    title: "서안성 냉동창고 정기점검",
    description: "정기점검 / 유지보수",
    image: "/images/projects-page/maintenance.jpg",
    imageTop: "-25.1%",
  },
  {
    id: "church-cooling-tower",
    blogUrl: "https://blog.naver.com/sanjungeng/224359345662",
    mobileTag: "냉각탑 정비",
    href: "/projects/church-cooling-tower",
    category: "냉동공조",
    tag: "냉각탑",
    title: "감리교회 냉각탑 유지보수",
    description: "냉각탑 충진물 교체",
    image: "/images/projects-page/cooling-tower.jpg",
    imageTop: "-16.02%",
  },
  {
    id: "warehouse-precision-ac",
    blogUrl: "https://blog.naver.com/sanjungeng/224428194190",
    href: "/projects/warehouse-precision-ac",
    category: "냉동공조",
    tag: "항온항습기",
    title: "S 기업 물류창고 항온항습기 설치",
    description: "항온항습기 설치",
    image: "/images/projects-page/precision-ac.jpg",
    imageTop: "-12.45%",
    imageLeft: "-0.02%",
  },
];

function selectProjects(ids: string[]): Project[] {
  return ids.map((id) => {
    const project = projects.find((item) => item.id === id);
    if (!project) throw new Error(`Unknown project: ${id}`);
    return project;
  });
}

export const desktopFeaturedProjects = selectProjects([
  "hwaseong-absorption-chiller-cleaning",
  "seoanseong-cooling-tower-inspection",
  "nonghyup-cold-storage",
  "gurye-pool",
  "semiconductor-chiller",
  "seoanseong-maintenance",
]);

export const mobileFeaturedProjects = selectProjects([
  "hwaseong-absorption-chiller-cleaning",
  "seoanseong-cooling-tower-inspection",
  "nonghyup-cold-storage",
  "gurye-pool",
  "semiconductor-chiller",
  "church-cooling-tower",
]);
