/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/account/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_DOMAIN}/account/:path*`,
      },
    ];
  },
};

export default nextConfig;
