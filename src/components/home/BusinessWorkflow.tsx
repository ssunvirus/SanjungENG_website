import Image from "next/image";

const steps = [
  {
    title: "상담 & 현장확인",
    lines: ["설비 상태와 현장을 정확히", "진단하고 맞춤 상담을 진행합니다."],
    image: "workflow-consultation.svg",
    className: "lg:w-[409px]",
    arrowClassName: "lg:left-[311px]",
  },
  {
    title: "설치 & 시공",
    lines: ["최적의 설비 구성과 검증된 기술로", "안정적으로 시공합니다"],
    image: "workflow-installation.svg",
    className: "lg:w-[423px]",
    arrowClassName: "lg:left-[325px]",
  },
  {
    title: "유지보수 & 사후관리",
    lines: ["정기점검과 신속한 대응으로", "설비의 최적 상태를 유지합니다."],
    image: "workflow-maintenance.svg",
    className: "lg:w-[309px]",
    arrowClassName: "",
  },
];

export default function BusinessWorkflow() {
  return (
    <ol
      aria-label="상담부터 사후관리까지"
      className="flex flex-col gap-6 text-left lg:w-max lg:flex-row lg:gap-[72px]"
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={`relative flex min-w-0 items-start gap-[18px] lg:h-[85px] lg:shrink-0 ${step.className}`}
        >
          <Image
            src={`/images/business/${step.image}`}
            alt=""
            width={70}
            height={70}
            className="mt-[3px] shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-[18px] font-extrabold leading-[30px] text-brand-navy lg:whitespace-nowrap lg:text-[25px]">
              {step.title}
            </h3>
            <p className="mt-2 text-[14px] font-semibold leading-[21px] text-[#627284]/80 lg:mt-[13px] lg:whitespace-nowrap lg:text-[18px]">
              {step.lines[0]}
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              {step.lines[1]}
            </p>
          </div>
          {index < steps.length - 1 && (
            <Image
              src="/images/business/workflow-connector.svg"
              alt=""
              width={98}
              height={40}
              className={`absolute top-[18px] hidden lg:block ${step.arrowClassName}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
