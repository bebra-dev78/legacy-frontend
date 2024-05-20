/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/my",
        destination: "/my/overview",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
