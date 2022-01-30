const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const csp = {
  "default-src": "'self' 'unsafe-eval'",
  "font-src": "'self' https://fonts.gstatic.com",
  "img-src": "'self' https://ya-praktikum.tech data: https:",
  "connect-src": "'self' https://ya-praktikum.tech wss://ya-praktikum.tech",
  "style-src": "'self' https://fonts.googleapis.com",
}

module.exports = {
  entry: {
    app: './src/app.ts',
    hot: 'webpack/hot/dev-server.js',
    client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    chunkFilename: '[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: './dist',
    hot: false,
    liveReload: true,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    client: {
      reconnect: true,
      progress: false,
      overlay: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: '@webdiscus/pug-loader',
      },
      {
        test: /\.svg/,
        use: 'svg-url-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          // TODO: Понять в чём проблема с SVG in CSS (bg url)
          context: path.resolve(__dirname, 'src', 'assets'),
          from: '**/*',
          to: './assets',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
      meta: {
        'Content-Security-Policy': {
          'http-equiv': 'Content-Security-Policy',
          'content': Object.entries(csp).map(e => e.join(' ')).join(';')
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
  ],
};
