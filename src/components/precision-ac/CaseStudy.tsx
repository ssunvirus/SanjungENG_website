import EquipmentCaseStudy from "@/src/components/shared/EquipmentCaseStudy";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { FileText, Settings, Wrench } from "lucide-react";

const details = [
  { icon: Settings, title: "작업 내용", description: "신설 물류창고 항온항습기 설치" },
  { icon: Wrench, title: "주요 작업", description: "항온항습기 설치 및 전원, 배관 연결" },
  { icon: FileText, title: "작업 결과", description: "물류창고 항온항습 환경 구축" },
];

export default function CaseStudy() {
  return (
    <EquipmentCaseStudy
      id="precision-case"
      title={<>S 기업 물류창고 항온항습기 설치</>}
      image="/images/projects-page/precision-ac.jpg"
      imageAlt="S 기업 물류창고 항온항습기 설치 현장"
      href={projectListHref(1, "냉동공조")}
      details={details}
      transparentBackground
    />
  );
}
