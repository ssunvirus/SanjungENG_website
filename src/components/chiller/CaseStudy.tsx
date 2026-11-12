import EquipmentCaseStudy from "@/src/components/shared/EquipmentCaseStudy";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { FileText, Settings, Wrench } from "lucide-react";

const details = [
  { icon: Settings, title: "작업 내용", description: "기존 노후 설비 교체 및 신설" },
  { icon: Wrench, title: "주요 작업", description: "현장 진단, 맞춤 설계, 설비 설치, 시운전" },
  { icon: FileText, title: "작업 결과", description: "새로운 냉동기 설치 및 냉방 성능 향상" },
];

export default function CaseStudy() {
  return (
    <EquipmentCaseStudy
      title={
        <>
          반도체 공장
          <br />
          칠러 시스템 구축
        </>
      }
      image="/images/projects/semiconductor-chiller/source-7.jpg"
      imageAlt="반도체 공장 칠러 시스템 구축 사례"
      href={projectListHref(1, "냉동공조")}
      details={details}
    />
  );
}
