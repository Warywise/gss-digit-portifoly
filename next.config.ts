import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      new URL('https://**.com/**'),
      new URL('https://user-images.githubusercontent.com/**'),
      new URL('https://github.com/user-attachments/assets/**'),
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
};

export default nextConfig;
