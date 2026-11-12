import EquipmentFaq from "@/src/components/shared/EquipmentFaq";

const categories = ["전체", "설치 및 교체", "설계 및 상담", "유지관리"];
const questions = [
  {
    category: "설치 및 교체",
    question: "기존 유니트쿨러나 공조기에 연결할 수 있나요?",
    answer:
      "기존 장비의 공급 풍량과 정압, 토출구 형태, 설치 공간 등을 확인한 후 연결 가능 여부를 검토합니다. 장비 명판과 토출구 사진을 보내주시면 연결 방식과 필요한 작업을 상담하는 데 도움이 됩니다.",
  },
  {
    category: "설치 및 교체",
    question: "냉장창고나 식품 생산시설에도 설치할 수 있나요?",
    answer:
      "보관 품목과 작업 공간의 온도, 습도, 위생관리 조건을 확인한 후 적용 여부를 검토합니다. 현장에 필요한 원단과 공기 분배 방식, 세척 및 관리 조건을 함께 협의합니다.",
  },
  {
    category: "설계 및 상담",
    question: "결로나 물방울 발생은 어떻게 검토하나요?",
    answer:
      "실내 온도와 습도, 공급 공기의 온도, 운전 시간과 원단 특성 등을 함께 검토합니다. 이미 결로나 물방울이 발생하고 있다면 발생 위치와 시점, 현장 사진을 알려주세요. 현장 조건에 맞춰 원단과 공기 분배 방식, 운전 조건을 검토합니다.",
  },
  {
    category: "유지관리",
    question: "세척은 어떻게 하고, 주기는 어떻게 정하나요?",
    answer:
      "원단과 제품의 제조사 관리 기준에 따라 분리, 세척, 건조 및 재설치 방법을 확인합니다. 세척 주기는 먼지와 오염 정도, 사용 시간, 현장의 위생관리 기준을 고려해 협의합니다. 기존 제품의 세척은 제조사와 원단 정보를 먼저 알려주세요.",
  },
  {
    category: "설치 및 교체",
    question: "기존 금속덕트를 교체할 수 있나요?",
    answer:
      "기존 덕트의 용도와 연결 장비, 천장 구조, 설치 경로를 확인해 교체 가능 범위를 검토합니다. 전체 교체 또는 일부 구간 변경 여부와 철거, 지지 구조 및 연결부 작업을 현장 조건에 맞춰 협의합니다.",
  },
  {
    category: "설계 및 상담",
    question: "견적 문의 시 어떤 자료가 필요한가요?",
    answer:
      "현장 위치와 사진, 공간 크기와 천장 높이, 사용 용도, 필요한 작업 내용을 알려주세요. 도면이나 기존 장비 명판 사진이 있으면 함께 보내주시면 좋습니다.\n공급 풍량과 정압 같은 전문 정보는 알고 계신 경우에만 전달해주세요. 추가 확인이 필요한 항목은 상담 과정에서 안내드립니다.",
  },
];

export default function FabricDuctFaq() {
  return (
    <EquipmentFaq
      id="fabric-duct-faq"
      categories={categories}
      questions={questions}
      image="/images/projects/pharmaceutical-cold-storage-fabric-duct/thumbnail.jpg"
      introduction="패브릭덕트 설계와 설치부터 세척 및 유지관리까지"
    />
  );
}
