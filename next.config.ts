import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/nabadi", destination: "/stories/nabadi", permanent: true },
      { source: "/nabadi/:path*", destination: "/stories/nabadi", permanent: true },
      { source: "/utopia", destination: "/stories/utopia", permanent: true },
    ];
  },
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
