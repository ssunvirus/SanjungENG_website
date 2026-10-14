import type { MetadataRoute } from "next";
import { siteUrl } from "../src/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
