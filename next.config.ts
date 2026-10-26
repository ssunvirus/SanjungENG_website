import type { NextConfig } from "next";
import imageAliases from "./config/image-aliases.json";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.51"],
  async rewrites() {
    // Keep image paths stored in older DB records and external links working.
    return Object.entries(imageAliases).map(([source, destination]) => ({ source, destination }));
  },
  async redirects() {
    return [
      { source: "/company/about.asp", destination: "/about", permanent: true },
      { source: "/company/maintenance.asp", destination: "/solutions", permanent: true },
      { source: "/company/prodInfoList.asp", destination: "/solutions", permanent: true },
      { source: "/company/textile.asp", destination: "/fabric-duct", permanent: true },
      { source: "/product/prodList.asp", destination: "/projects", permanent: true },
      { source: "/product/prodEmpRd.asp", destination: "/projects", permanent: true },
      { source: "/customer/data.asp", destination: "/fabric-duct/resources", permanent: true },
      { source: "/customer/estimate.asp", destination: "/contact", permanent: true },
      { source: "/customer/notice.asp", destination: "/", permanent: true },
      { source: "/member/person.asp", destination: "/privacy", permanent: true },
      { source: "/member/sitemap.asp", destination: "/sitemap.xml", permanent: true },
      { source: "/member/useinfo.asp", destination: "/", permanent: true },
    ];
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
