/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://206.189.145.130/api/:path*",
      },
      {
        source: "/public/:path*",
        destination: "http://206.189.145.130/public/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
