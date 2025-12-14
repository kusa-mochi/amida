import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== 'production'

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isDevelopment ? '' : './',
  reactStrictMode: true,
  /* config options here */
};

export default nextConfig;
