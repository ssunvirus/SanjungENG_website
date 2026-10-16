# 산정엔지니어링 웹사이트

Next.js App Router, React, TypeScript, Tailwind CSS로 구성한 기업 홈페이지입니다. AWS Amplify에서 배포하며 견적문의는 네이버 SMTP로 발송합니다.

## 실행 및 검사

Node.js 24 환경을 기준으로 합니다. Windows PowerShell에서는 다음 명령을 사용합니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

개발 페이지: http://localhost:3000

```powershell
npm.cmd run lint
npm.cmd run format:check
npm.cmd test
npm.cmd run build
```

GitHub Actions에서도 main 브랜치 변경과 PR에 같은 검사를 실행합니다. 워크플로는 코드를 검사하며 배포하지 않습니다.

## 코드 관리 기준

- `app/`: 페이지, 공통 레이아웃, 메타데이터, 문의 API.
- `src/components/`: 페이지·영역별 화면. 같은 영역의 파일은 `./`, 다른 영역은 `@/src/...`로 참조합니다.
- `src/hooks/`: 문의 전송 상태와 Hero 슬라이드 등 브라우저 상태 처리.
- `src/lib/`: 문의 검증·전송·SMTP·발송 제한, 공통 사이트 정보.
- `src/components/projects/data.ts`: 시공사례 원본과 메인 PC·모바일 추천 목록.
- `src/components/home/hero-slides.ts`: PC·모바일 Hero의 공통 콘텐츠.
- `src/components/projects/detail/ProjectPhotoGallery.tsx`: 사진 순서·원본 비율을 전달받는 공통 갤러리.
- `app/globals.css`: 글꼴·반응형 기준·브랜드 색상. 현재 `lg` 기준은 1440px입니다.

타입은 `import type` 또는 혼합 import의 `type` 표기를 사용합니다. 브랜드 색상은 `brand-navy`, `brand-blue`, `brand-text` 유틸리티를 사용합니다. 원본 사진의 비율과 개별 페이지 제목·설명을 유지하며, 반복되는 데이터와 처리만 공유합니다.

## 견적문의

로컬 환경은 `.env.example`을 참고해 `.env.local`을 작성합니다. 실제 비밀번호는 Git에 올리지 않습니다. Amplify에서는 `scripts/amplify-runtime-env.mjs`가 필요한 설정을 빌드에 전달하고 SMTP 비밀번호는 런타임에 Parameter Store에서 조회합니다.

문의 한도와 검증 규칙은 `src/lib/estimate-rules.ts`에서 관리합니다. 브라우저 검사와 별도로 API에서도 검증하고, 첨부파일의 실제 시그니처를 확인합니다. 이 순수 검증 코드는 Node 테스트에서도 직접 실행하므로 해당 모듈 간 참조에는 `.ts` 확장자를 명시할 수 있습니다.

현재 발송 횟수 제한은 서버 인스턴스의 메모리를 사용합니다. 여러 인스턴스에 걸친 공통 제한이 필요하면 공유 저장소 또는 AWS WAF 설정을 별도로 적용해야 합니다.
