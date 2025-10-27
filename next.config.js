/** @type {import('next').NextConfig} */

// Clean up experimental.images if it exists
const nextConfig = {
  basePath: '/woth-toolbox',
  assetPrefix: '/woth-toolbox/',
  output: 'export',
  trailingSlash: true,
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
