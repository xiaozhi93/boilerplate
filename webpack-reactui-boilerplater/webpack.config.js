/**
 * @author Yong93
 * @time 2017/3/6.
 */
var webpack = require('webpack');
module.exports = {
	entry: [
		'./src/main.js'
	],
	output: {
		path: __dirname + '/dist/',
		publicPath: "/dist/",
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
		proxy:{
			'/api/*':{
				target: 'http://localhost:8080',
				secure: false
			}
		}
	},
	module: {
		loaders: [
			{
				test: /\.js.?$/,
				loaders: 'babel-loader',
				exclude: /node_modules/ //剔除node_modules文件夹
			},{
				test: /\.scss$/,
				loader: "style!css!sass"
			},
			{
				test: /\.css.?$/,
				loaders: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:6]-[hash:base32:4]&sourceMap=true', //使用CSS Modules
				exclude: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')] //剔除lib和static文件夹
			}, {
				test: /\.css.?$/,
				loader: 'style-loader!css-loader?sourceMap=true',
				include: [path.resolve(__dirname, '../src/lib'), path.resolve(__dirname, '../src/static')] //对lib和static文件夹内的css使用普通编译
			}, {
				test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot).?$/,
				loader: 'url-loader?limit=1000000&name=media/[name].[hash:8].[ext]'
			}
		]
	}
};