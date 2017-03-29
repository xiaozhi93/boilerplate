var path                          = require('path');
var paths                         = require('./paths');
var webpack                       = require('webpack');
var HtmlWebpackPlugin             = require('html-webpack-plugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = {
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?'+ paths.target +':'+ paths.defaultPort, //webpack热加载
      path.resolve(__dirname, paths.appIndexJs) //入口文件
    ]
  },
  output: {
    path: path.join(paths.appBuild),
    filename: '[name].[hash:8].js'
  },
  watch: true,
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js.?$/,
        loaders: 'babel-loader',
        exclude: /node_modules/ //剔除node_modules文件夹
      }, {
        test: /\.css.?$/,
        loaders: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:6]-[hash:base32:4]&sourceMap=true', //使用CSS Modules
        exclude: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')] //剔除lib和static文件夹
      }, {
        test: /\.css.?$/,
        loader: 'style-loader!css-loader?sourceMap=true',
        include: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')] //对lib和static文件夹内的css使用普通编译
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:6]-[hash:base32:4]&sourceMap=true!sass-loader',
        exclude: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')]
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot).?$/,
        loader: 'url-loader?limit=1000000&name=media/[name].[hash:8].[ext]'
      }
    ]
  },
  plugins: [
    // html模板（生成注入到模板中）
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    // 开发者模式
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    // 打开webpack热加载模块
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码
    new webpack.NoEmitOnErrorsPlugin(),
    // 确保新引入包时强制重新编译项目（监听新引入包重新编译）
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ]
};
