import type { MetadataRoute } from "next";
import { projects } from "@/src/components/projects/data";
import { siteUrl } from "@/src/lib/site-url";

const pages = [
  "/",
  "/about",
  "/solutions",
  "/solutions/precision-ac",
  "/solutions/cooling-tower",
  "/solutions/cold-storage",
  "/fabric-duct",
  "/fabric-duct/resources",
  "/projects",
  "/contact",
  "/privacy",
  "/email-collection",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...projects.map((project) => project.href)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
