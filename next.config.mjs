/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // 暂时
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["three"],
};

export default nextConfig;
