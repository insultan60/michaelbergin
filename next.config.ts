import type { NextConfig } from "next";

// GitHub Pages build (set by .github/workflows/deploy.yml): a fully static export under /<repo>
const pages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(pages && {
    output: "export",
    basePath,
    trailingSlash: true,
    images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  }),
  // Lets the dev server be previewed at 127.0.0.1 as well as localhost
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    agentFeedback: true,
  },
  // Both need a server, so they are off for the static GitHub Pages export
  cacheComponents: !pages,
  partialPrefetching: !pages,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
