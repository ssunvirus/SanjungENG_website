import EquipmentFaq from "@/src/components/shared/EquipmentFaq";

const categories = ["전체", "설치 및 교체", "설비 구성", "점검 및 유지관리"];
const questions = [
  {
    category: "설치 및 교체",
    question: "견적 문의 시 어떤 정보를 준비하면 되나요?",
    answer:
      "현장 위치, 저장고 크기, 보관 품목과 목표 온도, 필요한 작업 내용을 알려주세요. 기존 장비의 명판, 저장고 내부와 장비 반입 경로 사진도 함께 보내주시면 상담에 도움이 됩니다.",
  },
  {
    category: "설치 및 교체",
    question: "설치부터 시운전까지 얼마나 걸리나요?",
    answer:
      "저장고 규모, 장비 수급, 배관 거리와 전원 조건에 따라 달라집니다. 현장 확인 후 장비 반입, 설치, 배관과 제어 연결, 시운전 일정을 협의합니다.",
  },
  {
    category: "설치 및 교체",
    question: "기존 저장고의 냉동설비만 교체할 수 있나요?",
    answer:
      "기존 CDU와 유니트쿨러, 배관과 제어설비 상태를 확인한 후 교체 범위를 검토합니다. 보관 중인 물품과 운영 일정을 함께 알려주시면 작업 중 보관 계획과 설비 정지 시간을 협의하는 데 도움이 됩니다.",
  },
  {
    category: "설비 구성",
    question: "냉동설비 용량은 어떻게 결정하나요?",
    answer:
      "저장고 크기와 단열 상태, 보관 품목과 목표 온도, 입출고량과 출입문 개폐 빈도를 함께 검토합니다. 저장고 면적만으로 결정하지 않고 실제 사용 조건에 맞춰 설비 구성을 협의합니다.",
  },
  {
    category: "설비 구성",
    question: "CDU와 유니트쿨러 설치 위치도 확인하나요?",
    answer:
      "장비 설치 공간과 정비 동선, 배관 경로를 확인합니다. 저장고 내부는 적재 위치와 통로, 공기 흐름을 함께 검토하여 장비 배치와 설치 위치를 협의합니다.",
  },
  {
    category: "점검 및 유지관리",
    question: "설정 온도까지 내려가지 않으면 무엇을 알려드리면 되나요?",
    answer:
      "설정 온도와 현재 온도, 증상이 시작된 시점, 경보 표시와 장비 모델을 알려주세요. 최근 입출고 상황과 증발기의 결빙 상태 사진도 함께 전달해주시면 현장 점검 준비에 도움이 됩니다.",
  },
  {
    category: "점검 및 유지관리",
    question: "제상 작업과 정기점검도 상담할 수 있나요?",
    answer:
      "증발기 결빙과 제상 상태, 팬과 배관, 전원 및 제어설비 등 필요한 점검 내용을 상담할 수 있습니다. 장비 상태와 운전 조건을 확인한 후 작업 범위와 일정을 안내합니다.",
  },
  {
    category: "점검 및 유지관리",
    question: "운영 중인 냉동창고도 점검할 수 있나요?",
    answer:
      "운전 중 확인할 수 있는 항목과 설비 정지가 필요한 작업을 구분해 협의합니다. 보관 물품과 입출고 일정, 온도 유지 조건을 확인한 후 작업 시간과 필요한 준비사항을 안내합니다.",
  },
];

export default function ColdStorageFaq() {
  return (
    <EquipmentFaq
      id="cold-storage-faq"
      categories={categories}
      questions={questions}
      image="/images/projects/wonsam-nonghyup/photo-3.jpg"
      imageFit="cover"
      introduction="저온저장고 냉동설비 설치부터 유지관리까지"
    />
  );
}
