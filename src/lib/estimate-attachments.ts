import { matchesAttachmentMime } from "./estimate-rules.ts";

const signatures = {
  jpg: {
    matches: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  jpeg: {
    matches: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  png: {
    matches: (bytes: Uint8Array) =>
      [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte),
  },
  webp: {
    matches: (bytes: Uint8Array) =>
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP",
  },
  pdf: {
    matches: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-",
  },
  zip: {
    matches: (bytes: Uint8Array) =>
      bytes[0] === 0x50 &&
      bytes[1] === 0x4b &&
      ((bytes[2] === 0x03 && bytes[3] === 0x04) || (bytes[2] === 0x05 && bytes[3] === 0x06)),
  },
} as const;

export async function isSupportedAttachment(file: File): Promise<boolean> {
  const extension = file.name.split(".").at(-1)?.toLowerCase();
  if (!extension || !Object.hasOwn(signatures, extension)) return false;
  const supportedExtension = extension as keyof typeof signatures;
  const signature = signatures[supportedExtension];
  if (!matchesAttachmentMime(supportedExtension, file.type)) return false;
  if (supportedExtension === "zip" && file.size < 22) return false;
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  return signature.matches(bytes);
}
