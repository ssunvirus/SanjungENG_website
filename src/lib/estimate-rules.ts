export const estimateCategories = ["냉동공조", "섬유덕트"] as const;

export const estimateLimits = {
  company: 100,
  manager: 100,
  phone: 30,
  email: 254,
  location: 300,
  message: 3000,
  attachmentCount: 3,
  attachmentBytes: 3 * 1024 * 1024,
  jsonBytes: 16000,
  multipartBytes: 4 * 1024 * 1024,
} as const;

export const attachmentTypes = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
  zip: "application/zip",
} as const;

export const attachmentTypeError = "JPG, PNG, WEBP, PDF 또는 ZIP 파일을 선택해주세요.";

export function matchesAttachmentMime(
  extension: keyof typeof attachmentTypes,
  mime: string,
): boolean {
  if (extension === "zip") {
    // ZIP MIME types vary by browser and operating system; the API also checks its signature.
    return [
      attachmentTypes.zip,
      "application/x-zip-compressed",
      "application/octet-stream",
      "",
    ].includes(mime);
  }
  return mime === attachmentTypes[extension];
}

export const attachmentAccept = Object.keys(attachmentTypes)
  .map((extension) => `.${extension}`)
  .join(",");

export function validatePhone(phone: string): string | null {
  if (!/^[+\d()\s-]{8,30}$/.test(phone) || phone.replace(/\D/g, "").length < 8) {
    return "연락처를 확인해주세요.";
  }
  return null;
}

export function validateAttachments(files: File[]): string | null {
  if (
    files.length > estimateLimits.attachmentCount ||
    files.reduce((total, file) => total + file.size, 0) > estimateLimits.attachmentBytes
  ) {
    return "첨부파일은 최대 3개, 전체 3MB 이내로 선택해주세요.";
  }
  for (const file of files) {
    const extension = file.name.split(".").at(-1)?.toLowerCase();
    if (
      !extension ||
      !Object.hasOwn(attachmentTypes, extension) ||
      !matchesAttachmentMime(extension as keyof typeof attachmentTypes, file.type)
    ) {
      return attachmentTypeError;
    }
  }
  return null;
}

export type EstimateFields = {
  company: string;
  manager: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  location: string;
  website: string;
  privacy: boolean;
};

export function readEstimateFields(data: Record<string, unknown>): EstimateFields {
  const get = (key: string) => (typeof data[key] === "string" ? data[key].trim() : "");
  return {
    company: get("company"),
    manager: get("manager"),
    phone: get("phone"),
    email: get("email"),
    category: get("category"),
    message: get("message"),
    location: get("location"),
    website: get("website"),
    privacy: data.privacy === true,
  };
}

export function validateEstimateFields(fields: EstimateFields): string | null {
  const { company, manager, phone, email, category, message, location, privacy } = fields;
  if (company.length > estimateLimits.company) return "회사명은 100자 이내로 입력해주세요.";
  if (!manager || manager.length > estimateLimits.manager)
    return "담당자명을 입력해주세요. (100자 이내)";
  const phoneError = validatePhone(phone);
  if (phoneError) return phoneError;
  if (
    email &&
    (email.length > estimateLimits.email ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email))
  )
    return "이메일 주소를 확인해주세요.";
  if (!estimateCategories.some((value) => value === category)) return "문의 분야를 선택해주세요.";
  if (!message) return "문의 내용을 입력해주세요.";
  if (message.length > estimateLimits.message) return "문의 내용은 3000자 이내로 입력해주세요.";
  if (location.length > estimateLimits.location) return "현장 위치는 300자 이내로 입력해주세요.";
  if (!privacy) return "개인정보 수집 및 이용에 동의해주세요.";
  return null;
}
