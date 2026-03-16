import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: '/sanctum/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/sanctum/:path*`,
    },
    {
      source: '/auth/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/auth/:path*`,
    },
    {
      source: '/api/:path*',
      destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
    },
  ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
