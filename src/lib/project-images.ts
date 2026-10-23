export const MAX_PROJECT_IMAGE_BYTES = 3 * 1024 * 1024;
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
