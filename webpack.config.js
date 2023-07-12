const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
require("dotenv").config()

module.exports = {
  entry: path.join(__dirname, "./src/index.tsx"),
  output: {
    path: path.join(__dirname, process.env.OUTPUT_DIR),
    filename: "js/[name].[fullhash].js",
    chunkFilename: "js/[id].[fullhash].js",
    publicPath: process.env.PUBLIC_PATH,
    assetModuleFilename: 'fonts/[name][ext]'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: "file-loader",
        options: {
          outputPath: "img/",
          name: "[name].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/favicon.png",
    }),
  ],
}
