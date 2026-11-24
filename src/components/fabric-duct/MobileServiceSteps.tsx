import WorkProcessCards from "@/src/components/shared/WorkProcessCards";

type Step = { number: string; title: string; description: string; image: string };
const labels = ["설비 연결", "패브릭덕트 설치", "세척 관리"];

export default function MobileServiceSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="min-w-0 lg:hidden [&>div]:mt-0">
      <WorkProcessCards
        mobileCarousel
        steps={steps.map((step, index) => ({
          ...step,
          mobileTitle: labels[index],
          description: step.description.replaceAll("\n", " "),
        }))}
      />
    </div>
  );
}
