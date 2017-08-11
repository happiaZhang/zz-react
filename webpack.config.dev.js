/**
 * Copyright @2016-present, Sumscope, Inc.
 * All rights reserved.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge.smart(baseConfig, {
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor']})
  ]
});
