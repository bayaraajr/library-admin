/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://library-backend-green.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
