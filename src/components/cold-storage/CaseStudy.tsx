import EquipmentCaseStudy from "@/src/components/shared/EquipmentCaseStudy";
import { projectListHref } from "@/src/lib/project-list-navigation";
import { FileText, Settings, Wrench } from "lucide-react";

const details = [
  { icon: Settings, title: "작업 내용", description: <>저온저장고 CDU, 유니트쿨러 신규 설치</> },
  {
    icon: Wrench,
    title: "주요 작업",
    description: (
      <>
        CDU, 유니트쿨러 냉매배관, 보온 시공, 연결
        <br />
        기밀시험, 진공 작업 및 냉매 충전
      </>
    ),
  },
  {
    icon: FileText,
    title: "작업 결과",
    description: <>냉동설비 설치 완료 및 안정적인 저온저장고 환경 구축</>,
  },
];

export default function CaseStudy() {
  return (
    <EquipmentCaseStudy
      title={
        <>
          농협 저온저장고
          <br />
          냉동설비 신설공사
        </>
      }
      image="/images/projects-page/cold-storage.jpg"
      imageAlt="농협 저온저장고 냉동설비 신설공사"
      href={projectListHref(1, "냉동공조")}
      details={details}
    />
  );
}
