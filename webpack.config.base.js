/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */

const webpack = require('webpack');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const path = require('path');
const happyThreadPool = HappyPack.ThreadPool({size: 5});
const customTheme = require('./theme');
const vendor = require('./webpack/vendor');
vendor.push('./src/containers/Vendor');

const setEntry = () => {
  const prodConfig = {
    vendor,
    app: './src/index'
  };
  const devConfig = {};
  Object.keys(prodConfig).forEach(k => {
    if (Array.isArray(prodConfig[k])) {
      devConfig[k] = prodConfig[k];
    } else {
      devConfig[k] = [];
      devConfig[k].push('babel-polyfill');
      devConfig[k].push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
      devConfig[k].push(prodConfig[k]);
    }
  });
  return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
};

module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : false,
  entry: setEntry(),
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          {
            loader: require.resolve('less-loader'),
            options: {
              modifyVars: customTheme,
              plugins: [
                new CleanCSSPlugin({advanced: true})
              ]
            }
          }
        ])
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'happypack/loader?id=js',
        include: [
          path.resolve(__dirname, 'src')
        ],
        query: {
          id: 'js'
        }
      },
      {test: /\.(ttf|eot|woff|woff2|otf|svg)/, loader: 'file-loader?name=./font/[name].[ext]'},
      {test: /\.json$/, loader: 'file-loader?name=./json/[name].json'},
      {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]'}
    ],
    noParse: [/iconv-loader.js$/]
  },
  plugins: [
    new CleanPlugin(['./public'], {verbose: true}),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Quote Board',
      filename: 'view/index.html',
      template: './webpack/template.ejs',
      inject: true
    })
  ]
};
