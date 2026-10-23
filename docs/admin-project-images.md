# 관리자 시공사례 사진 업로드

기존 public 사진은 유지하고 새 사진만 S3에 저장합니다.
현재 사진 조회 API는 관리자 인증을 요구합니다. 일반 홈페이지 게시 연결은 별도 작업입니다.

## 1. S3 버킷 생성

AWS S3 → 버킷 만들기:

- 리전: 아시아 태평양(시드니), ap-southeast-2
- 유형: 범용
- 이름 예: sanjung-project-images-235390156511 (사용 가능한 이름으로 지정)
- 객체 소유권: ACL 비활성화, 버킷 소유자 적용
- 모든 퍼블릭 액세스 차단: 켜짐 유지
- 버전 관리: 초기에는 비활성화
- 기본 암호화: SSE-S3

브라우저는 같은 사이트의 서버 API로 업로드하므로 S3 CORS와 퍼블릭 버킷 정책은 필요하지 않습니다.
이미지 이름은 무작위 UUID로 생성하며 원래 파일명은 저장하지 않습니다.

## 2. 컴퓨팅 역할 권한

IAM → 역할 → SanjungAmplifyComputeRole → 인라인 정책 추가.
이름 예: SanjungProjectImagesReadWrite. 아래 버킷 이름을 실제 생성한 이름으로 바꿉니다.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::sanjung-project-images-235390156511/projects/*"
    }
  ]
}
```

기존 DynamoDB·Cognito·메일 권한은 유지합니다. AWS 액세스 키를 별도로 만들 필요는 없습니다.

## 3. Amplify 환경변수 및 배포

호스팅 환경변수 `PROJECTS_IMAGES_BUCKET`에 실제 버킷 이름을 입력합니다.
기존 `PROJECTS_AWS_REGION=ap-southeast-2`를 함께 사용합니다.
코드를 배포한 뒤 관리자에서 사진 선택 → 설명 입력 → DB에 저장 → 새로고침으로 확인합니다.

## 동작과 제한

- JPG·PNG·WEBP만 지원, 사진당 3MiB, 사례당 최대 30장.
- 서버 업로드 경로의 요청 크기를 제한하기 위해 한 장씩 순차 전송합니다.
- 인증·동일 출처·MIME·파일 시그니처·크기를 서버에서 검사합니다. 시그니처 검사는 완전한 이미지 디코딩 검사가 아닙니다.
- 사진 업로드와 DB 저장은 별개입니다. 업로드 후 DB 저장 버튼을 눌러야 사례에 연결됩니다.
- 부분 실패 시 성공한 사진은 화면에 남깁니다. 해당 사진을 DB에 저장한 후 실패한 사진만 다시 선택합니다.
- 사진 목록에서 삭제는 DB 연결 해제입니다. S3 파일은 자동으로 삭제하지 않습니다.
- 저장하지 않고 나간 업로드나 통신 중단으로 생성된 미연결 파일은 S3에 남을 수 있습니다. 자동 정리는 아직 구현하지 않았습니다.
- 기존 public 사진을 S3로 일괄 이동하거나 기존 홈페이지 데이터를 변경하지 않습니다.

[AWS S3 PutObject 문서](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/)
