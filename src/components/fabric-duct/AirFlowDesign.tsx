import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function AirFlowDesign() {
  return (
    <section className="mx-auto h-[1276px] w-[1440px] bg-white pl-[57px] pt-[48.12px]">
      <div className="ml-[6px] h-[145.882px]">
        <SectionHeading eyebrow="AIR FLOW DESIGN" title="공기흐름을 계산하고 분배합니다.">
          <p>
            CFD시뮬레이션을 통한 공기 흐름과 온도 분포를 사전에 검토해, 공간 조건에 맞는 섬유덕트
            배치와 공기 분배 방식을 설계합니다.
          </p>
        </SectionHeading>
      </div>
      <div className="mt-[68.118px] flex w-[1258px] flex-col items-center gap-[83px]">
        <div className="relative flex w-[816px] flex-col gap-[35px] font-semibold">
          <h3 className="text-center text-[40px] leading-[48px]">CFD(전산유체공학) 설계</h3>
          <div className="flex items-end gap-[11px]">
            <figure className="w-[400px] shrink-0">
              <div className="relative h-[436px]">
                <Image
                  src="/images/fabric-duct/cfd-velocity.png"
                  alt="CFD 풍속 분포 해석 도표"
                  fill
                  sizes="400px"
                  quality={100}
                  className="object-fill"
                />
                <span className="absolute bottom-[4px] right-[63px] text-[10px] leading-[25px] text-[#102D4A]/50">
                  (출처:Klimagiel)
                </span>
              </div>
              <figcaption className="mt-[10px] text-center text-[16.544px] leading-[25px] text-[#102D4A]">
                CFD 풍속 해석 예시
              </figcaption>
            </figure>
            <figure className="w-[400px] shrink-0">
              <div className="relative h-[428px] overflow-hidden">
                <div className="absolute left-[-0.03%] top-[-2.34%] h-[102.34%] w-[100.07%]">
                  <Image
                    src="/images/fabric-duct/cfd-temperature.png"
                    alt="CFD 온도 분포 해석 도표"
                    fill
                    sizes="400px"
                    quality={100}
                    className="object-fill"
                  />
                </div>
                <span className="absolute bottom-[4px] right-[62px] text-[10px] leading-[25px] text-[#102D4A]/50">
                  (출처:Klimagiel)
                </span>
              </div>
              <figcaption className="mt-[5px] text-center text-[16.544px] leading-[25px] text-[#102D4A]">
                CFD 온도 해석 적용 예시
              </figcaption>
            </figure>
          </div>
          <p className="ml-[7px] whitespace-nowrap text-[16.544px] leading-[25px]">
            CFD 시뮬레이션은 공기가 어떻게 흐르고, 온도가 어떻게 분포하는지, 계산하여 실제 환경에
            가까운 시뮬레이션을 수행합니다.
            <br />
            이를 통해 공간의 각 지점에서 온도와 풍속를 평가할 수 있습니다.
          </p>
        </div>
        <div className="relative h-[244px] w-full bg-[#00ADDB]/10 px-[44px] py-[41px]">
          <div className="flex items-start justify-between">
            <div className="flex w-[318px] flex-col gap-[19px]">
              <h3 className="whitespace-nowrap text-[20px] font-bold leading-[24px]">
                공간 전체의 기류를 계산하고 검토합니다.
              </h3>
              <Image
                src="/images/fabric-duct/cfd-line.svg"
                width={82.0549}
                height={2}
                alt=""
                aria-hidden="true"
                className="self-start"
              />
              <p className="whitespace-nowrap text-[18px] font-semibold leading-[25px] text-[#243447]/80">
                공간의 각 지점에서 온도와 풍속을
                <br />
                평가하여 효율적인 공기 분배를 설계합니다.
              </p>
            </div>
            <div className="relative h-[162px] w-[790px] overflow-hidden">
              <div className="absolute top-[-29.48%] h-[163.01%] w-[100.01%]">
                <Image
                  src="/images/fabric-duct/cfd-airflow.png"
                  alt="공간 전체의 CFD 공기 속도 분포"
                  fill
                  sizes="790px"
                  quality={100}
                  className="object-fill"
                />
              </div>
            </div>
          </div>
          <p className="absolute bottom-[10px] right-[44px] text-[16.544px] font-semibold leading-[25px] text-[#102D4A]/50">
            CFD 해석 예시(출처:Klimagiel)
          </p>
        </div>
      </div>
    </section>
  );
}
