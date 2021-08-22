module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
    future: {
      webpack5: false,
    },
    images: {
        domains: ['avatars.githubusercontent.com'],
      },
}