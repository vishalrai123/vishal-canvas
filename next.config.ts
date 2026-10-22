import type { NextConfig } from "next";

// GitHub project site: https://vishalrai123.github.io/vishal-canvas/
// For a user site or a custom domain, set NEXT_PUBLIC_BASE_PATH="" (and NEXT_PUBLIC_SITE_URL) at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/vishal-canvas";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
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
