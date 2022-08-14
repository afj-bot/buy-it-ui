const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const plugins = () => (
  [
    new HtmlWebpackPlugin({
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      manifest: "./public/manifest.json"
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_ENV": JSON.stringify(process.env.REACT_APP_ENV),
      "process.env.REACT_APP_API_URL": JSON.stringify(
        process.env.REACT_APP_API_URL
      ),
      "process.env.REACT_APP_VERSION": JSON.stringify(
        process.env.REACT_APP_VERSION
      ),
    }),
  ]
)

module.exports = {
  output: {
    path: path.join(__dirname, '/build'),
    filename: "bundle.[fullhash].js",
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /__jest__/],
        use: {
          loader: 'babel-loader'
        },
        resolve: {
          extensions: ["*", ".js", ".jsx"],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader",
      },
    ]
  },
  plugins: plugins(),
}