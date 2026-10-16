import Image from "next/image";
import { Link as LinkIcon } from "lucide-react";

export default function BlogBanner() {
  return (
    <a
      href="https://blog.naver.com/sanjungeng"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="산정엔지니어링 공식 블로그에서 작업 과정 확인하기 (새 창)"
      className="relative mx-auto mt-[21px] block h-auto w-full p-5 lg:p-0 lg:h-[268px] lg:w-[1268px] overflow-hidden rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-1/2 h-[90px] -translate-y-1/2 opacity-20 lg:inset-x-auto lg:left-[40.24%] lg:top-[6.21%] lg:h-[87.4%] lg:w-[60.69%] lg:translate-y-0"
      >
        <Image
          src="/images/projects/wonsam-nonghyup/blog-logo.png"
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 770px"
          className="object-contain lg:object-fill"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.8)_71.044%,rgba(16,45,74,0.4)_100%)] lg:bg-[linear-gradient(90deg,#102D4A_0%,rgba(16,45,74,0.7)_71.044%,rgba(16,45,74,0)_100%)]"
      />
      <div className="relative flex items-center gap-3 lg:contents">
        <div className="relative h-[43px] w-[50px] shrink-0 lg:absolute lg:left-[50px] lg:top-[25px] lg:h-auto lg:w-auto">
          <div className="origin-top-left scale-[0.5386] lg:scale-100">
            <span
              aria-hidden="true"
              className="absolute left-[6px] top-[17px] h-[38px] w-[79px] bg-white"
            />
            <Image
              src="/images/projects/wonsam-nonghyup/naver-blog.svg"
              width={92.8296}
              height={79.47}
              alt=""
              className="relative max-w-none"
            />
          </div>
        </div>
        <p className="relative min-w-0 lg:absolute lg:left-[164px] lg:top-[43px] text-[16px] lg:text-[30px] font-bold leading-6 lg:leading-[36px] text-brand-blue/80">
          산정엔지니어링 공식 블로그
        </p>
        <LinkIcon
          size={40}
          aria-hidden="true"
          className="size-5 shrink-0 lg:size-10 lg:absolute lg:left-[504px] lg:top-[41px] text-brand-blue"
        />
      </div>
      <p className="relative mt-5 lg:mt-0 lg:absolute lg:left-[65px] lg:top-[125px] text-lg lg:text-[30px] font-semibold leading-7 lg:leading-[36px] text-white">
        이 현장의 작업 과정이 궁금하신가요?
      </p>
      <p className="relative mt-3 lg:mt-0 lg:absolute lg:left-[65px] lg:top-[174px] text-sm lg:text-[20px] font-semibold leading-[26px] text-white/80">
        설치부터 시운전까지, 자세한 작업 내용과 현장 기록을
        <br />
        산정엔지니어링 공식 블로그에서 확인해 보세요
      </p>
    </a>
  );
}
