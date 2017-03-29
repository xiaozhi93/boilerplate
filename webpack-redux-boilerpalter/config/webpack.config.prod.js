var path              = require('path');
var paths             = require('./paths');
var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    main: paths.appIndexJs,
    common: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-custom-scrollbars', 'js-polyfills', 'ie-placeholder']
  },
  output: {
    path: path.join(paths.appBuild),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.js.?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/ //剔除node_modules文件夹
      }, {
        test: /\.css.?$/,
        loaders: ExtractTextPlugin.extract('css-loader?minimize&modules&localIdentName=_[hash:6]-[hash:base64:6]-[hash:base32:4]&sourceMap=true'),
        exclude: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')]
      }, {
        test: /\.css.?$/,
        loader: ExtractTextPlugin.extract('css-loader?minimize&sourceMap=true'),
        include: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')]
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?minimize&modules&localIdentName=_[hash:6]-[hash:base64:6]-[hash:base32:4]&sourceMap=true!sass-loader',
        exclude: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')]
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot).?$/,
        loader: 'url-loader?limit=1000&name=media/[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    // html
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // 生成单独的css文件
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css'
    }),
    // 生产者模式
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    // 打包公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js'
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // 去除无效声明和不可用代码的警告
        drop_console: true // 去除console.*
      },
      output: {
        comments: false // 去除注释
      }
    }),
    new webpack.optimize.MinChunkSizePlugin({
      compress: {
        warnings: false
      }
    }),
    // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    new webpack.optimize.DedupePlugin(),
    // 按引用频度来排序 ID，以便达到减少文件大小的效果
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    })
  ]
};
