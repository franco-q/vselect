var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	// entry: './example/index.js',
	entry: './src/app.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		compress: true,
		historyApiFallback: true,
		noInfo: true,
		overlay: true
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: [
			'vue-style-loader',
			'css-loader'
			],
		},
		{
			test: /\.scss$/,
			use: [
			'vue-style-loader',
			'css-loader',
			'sass-loader'
			],
		},
		{
			test: /\.sass$/,
			use: [
			'vue-style-loader',
			'css-loader',
			'sass-loader?indentedSyntax'
			],
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					'scss': [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
					],
					'sass': [
					'vue-style-loader',
					'css-loader',
					'sass-loader?indentedSyntax'
					]
				}
			}
		},
		{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		},
		{
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}
		]
	},
	plugins: [
		// new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({template: './example/index.html'})
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devtool: '#eval-source-map'
}