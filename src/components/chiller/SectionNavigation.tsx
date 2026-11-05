import SectionNavigation from "@/src/components/shared/SectionNavigation";

const items = [
  ["chiller-service", "주요 서비스"],
  ["chiller-process", "시공 과정"],
  ["chiller-maintenance", "유지보수"],
  ["chiller-products", "주요 냉동기"],
  ["chiller-cases", "시공사례"],
  ["chiller-questions", "자주 묻는 질문"],
  ["chiller-inquiry", "견적문의"],
] as const;

export default function ChillerSectionNavigation() { return <SectionNavigation items={items} label="냉동기 페이지 구간 이동" />; }

