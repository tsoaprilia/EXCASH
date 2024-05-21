/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c4ovpt7tex9v6qb2.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
