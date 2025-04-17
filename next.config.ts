import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: [
      'plus.unsplash.com',
      'images.unsplash.com',
      'unsplash.com',
      'source.unsplash.com'
    ],
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
