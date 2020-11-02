const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});
const withPWA = require("next-pwa");

module.exports = withPWA(
  withMDX({
    pwa: {
      // disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
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
  })
);
