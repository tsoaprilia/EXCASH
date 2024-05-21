/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hsvcoyrktzxkriou.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
