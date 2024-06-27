const path = require('path');
const loaderUtils = require('loader-utils');

// @see https://gist.github.com/herlon214/7da6a39b885014a5d5f51716f6530ce4
const getLocalIdentHash = (context, localIdentName, localName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${localName}`,
      ),
      'md4',
      'base64',
      6,
    )
    .replace(/^(-?\d|--)/, '_$1')
    .replaceAll('+', '_')
    .replaceAll('/', '_');

/** @type {import('next').NextConfig} */
const config = {
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  pageExtensions: ['tsx'],
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,
  webpack: (config, { dev }) => {
    const rules = config.module.rules
      .find(rule => typeof rule.oneOf === 'object')
      .oneOf.filter(rule => Array.isArray(rule.use));

    // Enable importing SVG images as components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    // Don't change names in development mode
    if (dev) {
      return config;
    }

    rules.forEach(rule => {
      rule.use.forEach(moduleLoader => {
        if (
          moduleLoader.loader?.includes('css-loader') &&
          !moduleLoader.loader?.includes('postcss-loader')
        )
          moduleLoader.options.modules.getLocalIdent = getLocalIdentHash;
      });
    });

    return config;
  }
};

module.exports = config;
