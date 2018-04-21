/**
 * Created by happia.zhang on 2017/8/10.
 */

const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 5});
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require('less-plugin-clean-css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const vendor = require('./vendor');
const theme = require('./theme');
const isProd = process.env.NODE_ENV === 'production';
const _output = () => {
  const output = {
    path: path.resolve(__dirname, './public')
  };
  output.filename = isProd ? 'js/[name].[hash].js' : 'js/[name].js';
  return output;
};
const _plugins = () => {
  const plugins = [
    new CleanPlugin(['./public'], {verbose: true}),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader']
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack',
      filename: 'index.html',
      template: './src/client/views/template.ejs',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
      }
    })
  ];

  if (isProd) {
    plugins.push(new ExtractTextPlugin('css/[name].[contenthash].css'));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({names: ['vendor'], filenames: ['vendor.[chunkhash].js']}));
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ExtractTextPlugin('css/[name].css'));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({names: ['vendor']}));
  }
  return plugins;
};
const config = {
  devtool: isProd ? false : 'eval-source-map',
  entry: {
    vendor,
    app: './src/client/app'
  },
  output: _output(),
  module: {
    rules: [
      {
        test: /\.(less)$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          {
            loader: require.resolve('less-loader'),
            /*
            options: {
              modifyVars: theme,
              plugins: [
                new CleanCSSPlugin({advanced: true})
              ]
            } */
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
      {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=10000&name=./images/[name].[ext]'}
    ],
    noParse: [/iconv-loader.js$/]
  },
  plugins: _plugins()
};
if (!isProd) {
  config.devServer = {
    contentBase: path.join(__dirname, './public'),
    port: 8080,
    historyApiFallback: true
  }
}
module.exports = config;
