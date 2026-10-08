import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";

export default function BlogBanner() {
  return (
    <a
      href="https://blog.naver.com/sanjungeng"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="산정엔지니어링 공식 블로그에서 작업 과정 확인하기 (새 창)"
      className="relative mx-auto mt-[21px] block h-[268px] w-[1268px] overflow-hidden rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ADDB]"
    >
      <div aria-hidden="true" className="absolute left-[40.24%] top-[6.21%] h-[87.4%] w-[60.69%] opacity-20">
        <Image
          src="/images/projects/wonsam-nonghyup/blog-logo.png"
          alt=""
          fill
          sizes="770px"
          className="object-fill"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.7)_71.044%,rgba(16,45,74,0)_100%)]"
      />
      <div className="absolute left-[50px] top-[25px]">
        <span aria-hidden="true" className="absolute left-[6px] top-[17px] h-[38px] w-[79px] bg-white" />
        <Image src="/images/projects/wonsam-nonghyup/naver-blog.svg" width={92.8296} height={79.47} alt="" className="relative" />
      </div>
      <p className="absolute left-[164px] top-[43px] text-[30px] font-bold leading-[36px] text-[#00ADDB]/80">
        산정엔지니어링 공식 블로그
      </p>
      <LinkIcon size={40} aria-hidden="true" className="absolute left-[504px] top-[41px] text-[#00ADDB]" />
      <p className="absolute left-[65px] top-[125px] text-[30px] font-semibold leading-[36px] text-white">
        이 현장의 작업 과정이 궁금하신가요?
      </p>
      <p className="absolute left-[65px] top-[174px] text-[20px] font-semibold leading-[26px] text-white/80">
        설치부터 시운전까지, 자세한 작업 내용과 현장 기록을
        <br />
        산정엔지니어링 공식 블로그에서 확인해 보세요
      </p>
    </a>
  );
}
