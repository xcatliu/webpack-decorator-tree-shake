const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    usedExports: true, // 标记未使用的导出
    minimize: true,
    minimizer: [new TerserPlugin({
        terserOptions: {
        compress: {
            pure_getters: true,
            // other options
        },
        output: {
            comments: false,
        },
        }
    })],
  },
  //   mode: 'development'
};
