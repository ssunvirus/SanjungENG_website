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
`CredentialsProviderError`가 발생했다. 실제 S3 버킷, DynamoDB TTL 상태는 아직 미확인.
스토리지 삭제, TTL 변경, 운영 배포는 실행하지 않았다.

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

읽기 권한: `dynamodb:DescribeTimeToLive`, `dynamodb:Scan`, `s3:ListBucket`,
`s3:GetBucketVersioning`, `s3:GetLifecycleConfiguration`.
스크립트는 집계 결과만 출력하고 데이터 수정이나 삭제는 하지 않는다.
S3 이전 버전 용량은 현재 객체 목록에 포함되지 않는다.
