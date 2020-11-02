const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m4a|\.ico$/,
      use: {
        loader: "file-loader",
      },
    });
    config.node = {
      fs: "empty",
    };
    return config;
  },
});
