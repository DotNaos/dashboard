/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/weather',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'supabase-auth-token',
          },
        ],
      },
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
