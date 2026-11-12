import EquipmentCaseStudy from "@/src/components/shared/EquipmentCaseStudy";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { FileText, Settings, Wrench } from "lucide-react";

const details = [
  [Settings, "작업 내용", "노후 냉각탑 충진물 교체 및 내부 정비"],
  [Wrench, "주요 작업", "기존 충진물 철거, 신규 충진물 설치, 내부 점검"],
  [FileText, "작업 결과", "충진물 교체 및 냉각탑 정비 완료, 냉각 성능 회복"],
] as const;

export default function CaseStudy() {
  return (
    <EquipmentCaseStudy
      id="cooling-tower-case"
      title={
        <>
          H 교회 냉각탑
          <br /> 충진물 교체공사
        </>
      }
      image="/images/projects/church-cooling-tower/photo-9.jpg"
      imageAlt="교회 냉각탑 충진물 교체공사"
      href={projectListHref(1, "냉동공조")}
      details={details.map(([icon, title, description]) => ({ icon, title, description }))}
    />
  );
}
