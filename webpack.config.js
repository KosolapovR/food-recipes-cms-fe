const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
  mope = 'production';
  target = 'browserslist';
}

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = Object.keys(env).reduce((acc, next) => {
    acc[`process.env.${next}`] = JSON.stringify(env[next]);
    return acc;
  }, {});

  return {
    mode,
    target,
    entry: './src/index.tsx',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
    },
    devServer: {
      port: '5000',
      static: {
        directory: path.join(__dirname, 'public'),
      },
      hot: true,
      liveReload: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node-modules/,
        },
        {
          test: /\.css?$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.svg$/,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
