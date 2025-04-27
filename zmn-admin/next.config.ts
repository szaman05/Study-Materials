import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        // Optional: You can specify port and pathname if needed
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io", // Add Appwrite storage hostname too
      },
      // Add other hostnames if needed
    ],
  },
  /* other config options here */
};

export default nextConfig;
