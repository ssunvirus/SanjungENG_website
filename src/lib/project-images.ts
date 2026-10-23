export const MAX_PROJECT_IMAGE_BYTES = 3 * 1024 * 1024;

export function imageUploadError(error: unknown) {
  const name =
    error && typeof error === "object" && "name" in error ? String(error.name) : "UnknownError";
  switch (name) {
    case "ImagesUnconfigured":
      return {
        code: "S3_CONFIG_MISSING",
        error:
          "S3 환경변수가 없습니다. Amplify에 PROJECTS_IMAGES_BUCKET과 PROJECTS_AWS_REGION을 저장한 뒤 재배포해주세요.",
      };
    case "AccessDenied":
    case "AccessDeniedException":
      return {
        code: "S3_ACCESS_DENIED",
        error:
          "S3 접근이 거부되었습니다. Amplify 컴퓨팅 역할의 s3:PutObject 권한과 버킷 이름을 확인해주세요.",
      };
    case "NoSuchBucket":
      return {
        code: "S3_BUCKET_NOT_FOUND",
        error:
          "S3 버킷을 찾지 못했습니다. PROJECTS_IMAGES_BUCKET에 실제 버킷 이름만 입력했는지 확인해주세요.",
      };
    case "PermanentRedirect":
    case "AuthorizationHeaderMalformed":
    case "IllegalLocationConstraintException":
      return {
        code: "S3_REGION_MISMATCH",
        error: "S3 리전 설정을 확인해주세요. 버킷과 PROJECTS_AWS_REGION의 리전이 같아야 합니다.",
      };
    default:
      return {
        code: "S3_UPLOAD_FAILED",
        error:
          "사진 업로드에 실패했습니다. Amplify 서버 로그의 S3 upload failed 항목을 확인해주세요.",
      };
  }
}
export const projectImageKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/;
export const projectImagePathPattern =
  /^\/api\/admin\/project-images\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(jpg|png|webp)$/;

export function imageExtension(type: string, bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (!bytes.length || bytes.length > MAX_PROJECT_IMAGE_BYTES) return null;
  if (type === "image/jpeg" && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255)
    return "jpg";
  if (type === "image/png" && [137, 80, 78, 71, 13, 10, 26, 10].every((b, i) => bytes[i] === b))
    return "png";
  if (
    type === "image/webp" &&
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP"
  )
    return "webp";
  return null;
}
