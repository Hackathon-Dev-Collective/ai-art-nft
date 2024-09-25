/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // 暂时
    ignoreDuringBuilds: true,
  },
  // 暂时
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  transpilePackages: ["three"],
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "unsplash.com",
  //       port: "",
  //       pathname: "/photos/**",
  //     },
  //   ],
  // },
};

export default nextConfig;
