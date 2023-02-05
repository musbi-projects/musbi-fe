/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['musbi-bucket.s3.ap-northeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
