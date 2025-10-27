/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

// Remove experimental.images if it exists to avoid Next.js 15 error
if (nextConfig.experimental?.images) {
  delete nextConfig.experimental.images;
}

module.exports = nextConfig;
