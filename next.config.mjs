/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'prestigious-goshawk-521.convex.cloud',
        port: '',
      },
    ],
  },
};

export default nextConfig;
