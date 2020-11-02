module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m4a|\.ico$/,
      use: {
        loader: "file-loader",
      },
    });
    config.node = {
      fs: 'empty'
    }
    return config;
  },
};
