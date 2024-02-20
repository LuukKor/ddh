/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/people',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
