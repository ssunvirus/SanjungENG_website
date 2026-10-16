import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.30.1.51"],
  async redirects() {
    return [
      { source: "/company/about.asp", destination: "/about", permanent: true },
      { source: "/company/maintenance.asp", destination: "/solutions", permanent: true },
      { source: "/company/prodInfoList.asp", destination: "/solutions", permanent: true },
      { source: "/company/textile.asp", destination: "/fabric-duct", permanent: true },
      { source: "/product/prodList.asp", destination: "/projects", permanent: true },
      { source: "/customer/data.asp", destination: "/fabric-duct/resources", permanent: true },
      { source: "/member/person.asp", destination: "/privacy", permanent: true },
      { source: "/member/sitemap.asp", destination: "/sitemap.xml", permanent: true },
    ];
  },
  images: {
    qualities: [75, 100],
  },
};

export default nextConfig;
