export type Project = {
  id: string;
  category: "냉동공조" | "섬유덕트";
  tag: string;
  title: string;
  description: string;
  image: string;
  imageTop: string;
  imageLeft?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    id: "orion-production",
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
    href: "/projects/wonsam-nonghyup",
    category: "냉동공조",
    tag: "저온저장고",
    title: "농협 저온저장고 냉동설비 설치",
    description: "CDU / 유니클 쿨러 설치",
    image: "/images/projects-page/cold-storage.jpg",
    imageTop: "-24.92%",
  },
  {
    id: "gurye-pool",
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
    href: "/projects/semiconductor-chiller",
    category: "냉동공조",
    tag: "냉동기",
    title: "반도체 공장 공냉식 냉동기 교체공사",
    description: "공냉식 냉동기 교체",
    image: "/images/projects-page/chiller.jpg",
    imageTop: "0.02%",
    imageLeft: "0.16%",
  },
  {
    id: "seoanseong-maintenance",
    category: "냉동공조",
    tag: "냉동기",
    title: "서안성 냉동창고 정기점검",
    description: "정기점검 / 유지보수",
    image: "/images/projects-page/maintenance.jpg",
    imageTop: "-25.1%",
  },
  {
    id: "church-cooling-tower",
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
    category: "냉동공조",
    tag: "항온항습기",
    title: "S 기업 물류창고 항온항습기 설치",
    description: "항온항습기 설치",
    image: "/images/projects-page/precision-ac.jpg",
    imageTop: "-12.45%",
    imageLeft: "-0.02%",
  },
];
