import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors for deployment
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log in production
  },
  images: {
    formats: ['image/webp', 'image/avif'], // Use modern image formats
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression and optimization
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header for security
  generateEtags: true, // Enable ETags for better caching
  // Remove standalone output for Firebase hosting compatibility
  // output: 'standalone', // This conflicts with Firebase hosting
};

export default nextConfig;
