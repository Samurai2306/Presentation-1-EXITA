import type { NextConfig } from "next";

/** Must match the GitHub repository name (project Pages URL segment). */
const repoBasePath = "/Presentation-1-EXITA";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    // Avoid warnings when parent folders contain lockfiles.
    root: __dirname,
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
