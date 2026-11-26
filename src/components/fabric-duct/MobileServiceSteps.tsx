import WorkProcessCards from "@/src/components/shared/WorkProcessCards";

type Step = {
  number: string;
  title: string;
  mobileTitle: string;
  description: string;
  image: string;
};

export default function MobileServiceSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="min-w-0 lg:hidden [&>div]:mt-0">
      <WorkProcessCards
        mobileCarousel
        steps={steps.map((step) => ({
          ...step,
          description: step.description.replaceAll("\n", " "),
        }))}
      />
    </div>
  );
}
