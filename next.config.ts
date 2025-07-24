import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL('https://user-images.githubusercontent.com/**'),
      new URL('https://github.com/user-attachments/assets/**'),
    ],
  },
};

export default nextConfig;
