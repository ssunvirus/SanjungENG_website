import Image from "next/image";
import { FileText, Mail, PhoneCall } from "lucide-react";

export default function ContactInfo() {
  return (
    <aside className="pt-[24px] lg:pt-[67px]">
      <div className="flex items-center gap-[12px] lg:gap-[20px]">
        <p className="text-[14px] lg:text-[20px] font-semibold tracking-[3px] lg:tracking-[6px] text-[#00ADDB]/60">CONTACT</p>
        <Image
          src="/images/contact/heading-line.svg"
          width={46.3058}
          height={2}
          alt=""
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-[12px] lg:mt-[16px] text-[28px] lg:text-[45px] font-extrabold leading-[36px] lg:leading-[54px]">
        현장에 맞는 견적
        <br />
        무료로 상담하세요.
      </h2>
      <p className="ml-0 lg:ml-[7px] mt-[12px] lg:mt-[23px] text-[14px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[25px] text-[#243447]/80">
        설치/교체부터 수리, 유지보수와
        <br />
        섬유덕트 시공까지 문의하실 수 있습니다.
      </p>
      <div className="ml-0 lg:ml-[7px] mt-[24px] lg:mt-[48px] flex items-start gap-[20px] lg:gap-[31.8px]">
        <span className="mt-[12px] lg:mt-[3px] flex size-[51.2px] shrink-0 items-center justify-center rounded-full bg-[#00ADDB] text-white">
          <PhoneCall size={28} aria-hidden="true" />
        </span>
        <div className="font-bold">
          <p className="text-[16px] lg:text-[25px] leading-[24px] lg:leading-[30px] tracking-[0px] lg:tracking-[1.25px] text-[#102D4A]/80">전화상담</p>
          <a href="tel:01053401728" className="mt-[12px] lg:mt-[6px] block text-[21px] lg:text-[35px] leading-[36px] lg:leading-[42px] tracking-[0px] lg:tracking-[1.75px]">
            010-5340-1728
          </a>
          <p className="mt-[24px] lg:mt-[31px] text-[16px] lg:text-[25px] leading-[24px] lg:leading-[30px] tracking-[0px] lg:tracking-[1.25px] text-[#102D4A]/80">대표전화</p>
          <a href="tel:028911728" className="mt-[12px] lg:mt-[6px] block text-[21px] lg:text-[35px] leading-[36px] lg:leading-[42px] tracking-[0px] lg:tracking-[1.75px]">
            02-891-1728
          </a>
        </div>
      </div>
      <div className="ml-0 lg:ml-[7px] mt-[24px] lg:mt-[31px] flex items-start gap-[20px] lg:gap-[31.8px]">
        <span className="flex size-[51.2px] shrink-0 items-center justify-center rounded-full bg-[#00ADDB] text-white">
          <Mail size={28} aria-hidden="true" />
        </span>
        <div className="text-[21px] lg:text-[30px] font-bold leading-[24px] lg:leading-[36px] tracking-[0px] lg:tracking-[1.5px]">
          <p className="text-[#102D4A]/80">이메일</p>
          <a href="mailto:sanjungeng@naver.com" className="mt-[12px] lg:mt-[6px] block">sanjungeng@naver.com</a>
        </div>
      </div>
      <Image
        src="/images/contact/contact-line.svg"
        width={466}
        height={2}
        alt=""
        aria-hidden="true"
        className="ml-0 lg:ml-[7px] mt-[24px] lg:mt-[87px]"
      />
      <div className="ml-0 lg:ml-[18px] mt-[24px] lg:mt-[56px] flex h-auto py-4 lg:py-0 lg:h-[124px] w-full lg:w-[453px] items-center gap-[12px] lg:gap-[25px] bg-[#00ADDB]/15 px-[16px] lg:px-[25px]">
        <FileText size={40} strokeWidth={1.7} className="shrink-0 text-[#00ADDB]" aria-hidden="true" />
        <div className="lg:whitespace-nowrap font-bold">
          <p className="text-[16px] lg:text-[25px] leading-[24px] lg:leading-[30px] tracking-[0px] lg:tracking-[1.25px]">사진과 도면을 함께 보내주세요</p>
          <p className="mt-[12px] lg:mt-[16px] text-[14px] lg:text-[20px] leading-[24px] lg:leading-[24px] tracking-[0px] lg:tracking-[1px] text-[#102D4A]/60">
            현장 정보를 확인하는데 도움이 됩니다.
          </p>
        </div>
      </div>
    </aside>
  );
}
