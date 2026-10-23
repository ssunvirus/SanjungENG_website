import type { MetadataRoute } from "next";
import { publicProjectCards } from "@/src/lib/public-projects";
import { connection } from "next/server";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const projects = await publicProjectCards();
  return [...pages, ...projects.map((project) => project.href)].map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
