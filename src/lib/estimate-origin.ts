/** Check browser origins against public configuration, not an SSR proxy's internal URL. */
export function isEstimateOriginAllowed(
  request: Request,
  options: { siteUrl?: string; production?: boolean; requireOrigin?: boolean } = {},
) {
  const origin = request.headers.get("origin");
  if (!origin) return !options.requireOrigin;
  try {
    const parsed = new URL(origin);
    if (origin !== parsed.origin || parsed.username || parsed.password) return false;
    if (options.siteUrl) {
      const publicUrl = new URL(options.siteUrl);
      if (
        publicUrl.username ||
        publicUrl.password ||
        (options.production && publicUrl.protocol !== "https:")
      )
        return false;
      return origin === publicUrl.origin;
    }
    // In production a client-controlled Host/Forwarded header must never decide
    // which site is trusted. Local development keeps same-origin requests working.
    if (options.production) return false;
    const requestUrl = new URL(request.url);
    return (
      parsed.protocol === requestUrl.protocol &&
      parsed.host === (request.headers.get("host") || requestUrl.host)
    );
  } catch {
    return false;
  }
}
