# 2026-11-02 정적 파일 최적화와 화면 점검

## 적용 결과

- public 전체: 610.32 MiB → 272.48 MiB, 약 55.4% 감소.
- 1 MiB 이상 JPEG 중 111개 최적화, 283.11 MiB 감소.
- 큰 사진은 긴 변 최대 2560px, JPEG 품질 90, 색상 샘플링 4:4:4로 저장.
- 파일 주소와 확장자 유지. 동일 원본의 호환용 이미지도 같은 바이트로 변환해 기존 URL 호환을 유지.
- 로고, 투명 PNG, 인증서와 시험성적서 이미지는 변환 대상에서 제외.
- 원본 백업: `C:\Users\user\Desktop\SanJungEng_asset_backup_20261102`.

| PDF | 이전 | 이후 | 검증 |
| --- | ---: | ---: | --- |
| klimagiel-catalogue.pdf | 69.54 MiB | 14.99 MiB | 24페이지, 텍스트/링크/페이지 크기/목차 유지 |
| multixair-product-catalog.pdf | 21.31 MiB | 21.12 MiB | 12페이지, 무손실 구조 압축만 적용 |

MultixAir PDF는 이미지 재압축 시 일부 도면이 검게 변해 해당 결과를 폐기했다.
대신 이미지 데이터를 유지하는 구조 압축을 사용했으며 전체 페이지 렌더링 픽셀 차이는 0이다.
Klimagiel PDF는 모든 페이지의 렌더링을 비교하고 작은 글씨와 그래프가 있는 샘플 페이지를 시각 확인했다.
PDF 후보 생성, 비교 이미지, 파일별 압축 결과 JSON은 원본 백업 폴더에 보관했다.

## 화면 확인

- 로컬 프로덕션 서버, Edge headless.
- 너비 390px, 1024px, 1440px에서 8개 경로, 총 24개 조합.
- `/`, `/solutions`, `/solutions/cold-storage`, `/solutions/cooling-tower`, `/solutions/precision-ac`, `/fabric-duct`, `/fabric-duct/resources`, `/projects/wonsam-nonghyup`.
- lazy 이미지 로딩 후 캡처. 가로 스크롤 넘침과 pageerror 없음.
- 섬유덕트 적용 공간 탭의 고정 너비 및 고정 밑줄 위치를 비율 기반 grid로 수정.
- 사진 슬라이드 다음 버튼, PC 하위 메뉴 호버, 모바일 메뉴 열기 확인.
- 캡처/검사 JSON: `%TEMP%\sanjung-visual-audit`.
- 실제 모바일 기기, 모든 운영 DB 사례를 전수 확인한 결과는 아님.

## AWS 점검 상태

로컬 AWS 환경변수와 기본 자격 증명 파일이 없으며 SDK 조회 준비 단계에서
`CredentialsProviderError`가 발생했다. 이후 사용자가 CloudShell에서 제공한 결과로 다음을 확인했다.

- DynamoDB `sanjung-projects`: TTL `ENABLED`, 속성 `expiresAt`으로 코드와 일치.
- S3 `sanjung-project-images-235390156511`의 `projects/`: 현재 객체 10개, 2.2 MiB.
- 미사용 사진 여부와 이전 버전 저장 용량, 수명 주기 설정은 아직 미확인.

스토리지 삭제나 TTL 변경은 실행하지 않았다. 사용자는 앞선 수정사항 배포 완료를 알렸다.
이후 공통 UI 리팩터링은 별도 변경이므로 추가 배포가 필요하다.

CloudShell에서 우선 확인할 읽기 전용 명령:

```sh
aws dynamodb describe-time-to-live --table-name sanjung-projects --region ap-southeast-2
```

기대값은 `TimeToLiveStatus: ENABLED`, `AttributeName: expiresAt`이다.
실제 테이블 이름이 다르면 운영 환경변수 `PROJECTS_TABLE_NAME` 값을 사용한다.

권한이 있는 Node 실행 환경에서는 다음 스크립트로 TTL과 파일 참조, S3 현재 객체 용량,
버전 관리와 수명 주기 설정을 조회할 수 있다. 버킷 이름은 실제 `PROJECTS_IMAGES_BUCKET` 값으로 지정한다.

```sh
node scripts/audit-aws-storage.mjs --region=ap-southeast-2 --table=sanjung-projects --bucket=ACTUAL_BUCKET_NAME
```

읽기 권한: `dynamodb:DescribeTimeToLive`, `dynamodb:Scan`, `s3:ListBucket`, `s3:ListBucketVersions`,
`s3:GetBucketVersioning`, `s3:GetLifecycleConfiguration`.
스크립트는 집계 결과만 출력하고 데이터 수정이나 삭제는 하지 않는다.
S3 이전 버전 용량은 현재 객체 목록과 분리해 집계한다.
버전 목록 조회 권한이 없으면 `previousVersions.checked: false`로 표시한다.

## 공통 UI 정리 후속 작업

- 네 설비 페이지의 시공사례 레이아웃을 `shared/EquipmentCaseStudy.tsx`로 통합.
- 네 설비 페이지의 단계별 카드를 `shared/WorkProcessCards.tsx`로 통합.
- 각 설비 폴더의 `CaseStudy.tsx`, `WorkProcess.tsx`에는 기존 문구·사진·순서 및 개별 이미지 옵션 유지.
- 너비 390px, 1440px에서 8개 영역의 전후 캡처 16쌍 비교. 배치와 크기 변화 없음.
- 캡처 비교: `%TEMP%\sanjung-visual-audit\refactor-comparison.json`.
- `assets:audit`에 코드 문자열에서 참조를 찾지 못한 이미지 후보 목록 추가.
  동적 경로, DB 경로, 외부 링크의 실제 사용 여부를 증명하는 검사는 아니므로 자동 삭제하지 않음.
- 현재 후보 16개. `application-line.svg` 등 CSS로 대체된 장식과 구버전 이미지 포함.
- 사용자는 버전 관리 조회 시 출력이 없었다고 알려왔으며, 출력 형식을 JSON으로 고정한 재조회 결과 확인 대기 중.
