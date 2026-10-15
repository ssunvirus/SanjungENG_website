const signatures = {
  jpg: {
    mime: "image/jpeg",
    matches: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  jpeg: {
    mime: "image/jpeg",
    matches: (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  png: {
    mime: "image/png",
    matches: (bytes: Uint8Array) =>
      [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte),
  },
  webp: {
    mime: "image/webp",
    matches: (bytes: Uint8Array) =>
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP",
  },
  pdf: {
    mime: "application/pdf",
    matches: (bytes: Uint8Array) => String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-",
  },
} as const;

export async function isSupportedAttachment(file: File): Promise<boolean> {
  const extension = file.name.split(".").at(-1)?.toLowerCase();
  if (!extension || !(extension in signatures)) return false;
  const signature = signatures[extension as keyof typeof signatures];
  if (file.type !== signature.mime) return false;
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  return signature.matches(bytes);
}
