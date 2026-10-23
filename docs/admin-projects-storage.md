# 시공사례 DB 저장

관리자 로그인 후 `/admin`에서 등록 또는 수정 → **DB에 저장**을 누릅니다.
새로고침하면 저장된 항목을 다시 읽습니다. 기존 정적 사례는 명시적으로 저장하기 전에는 DB에 복사하지 않습니다.
홈페이지 목록·상세 페이지는 DB 저장 사례를 우선 표시합니다. DB 저장 시 공개됩니다. [홈페이지 연결 안내](./public-projects.md)를 참고하세요.
새 사진 업로드는 [S3 설정 안내](./admin-project-images.md)를 따라 연결합니다. 기존 `/images/` 사진 경로와 업로드한 사진 경로, ALT, 순서를 저장합니다.

## AWS 권한 추가

Amplify 컴퓨팅 역할 `SanjungAmplifyComputeRole`에 아래 인라인 정책을 추가합니다.
기존 읽기·메일·인증 정책은 유지합니다. 정책 이름 예: `SanjungProjectsWrite`.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "dynamodb:PutItem",
      "Resource": "arn:aws:dynamodb:ap-southeast-2:235390156511:table/sanjung-projects"
    }
  ]
}
```

환경변수는 기존 `PROJECTS_TABLE_NAME=sanjung-projects`, `PROJECTS_AWS_REGION=ap-southeast-2`를 사용합니다.
코드 배포 후 등록 → 저장 → 새로고침 → 수정 → 저장 → 새로고침 순으로 확인합니다.
개발 환경에서 실DB 테스트하려면 별도의 로컬 AWS 자격 증명이 필요합니다. 브라우저에 AWS 비밀 키를 넣지 않습니다.

## 저장 규칙

- 관리자 세션 확인 후에만 API에서 DB에 접근합니다. POST는 동일 출처 Origin과 JSON을 요구합니다.
- 최대 요청 64KiB, 제목 150자, 내용 5000자, 사진 30장. 임시 blob URL, 외부 URL은 거절합니다.
- 신규 ID는 브라우저에서 한 번 생성합니다. 조건부 PutItem으로 동일 ID 중복 생성과 버전 충돌을 차단합니다.
- 통신이 끊겨 저장 결과가 불명확하면 새로고침해 저장 여부를 확인합니다.
- 목록의 삭제 버튼은 확인 후 삭제 상태(`deleted: true`)를 기록합니다. 물리 삭제가 아닌 기존 PutItem 권한으로 동작하므로 DeleteItem 권한은 필요하지 않습니다. 새로고침 후에도 기존 사례가 다시 나타나지 않게 삭제 기록을 유지합니다.
- id만 있는 현재 테이블은 페이지별 Scan을 사용합니다. 데이터가 많아지면 목록 인덱스와 페이지네이션을 추가합니다.
- 저장 형식: id, entityType(project), version, document(JSON), updatedAt(UTC).
