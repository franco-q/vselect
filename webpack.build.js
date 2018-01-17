var path = require('path')
var webpack = require('webpack')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: 'vslct',
		umdNamedDefine: true
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
		}
		]
	},
	plugins: [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"'
		}
	}),
	new UglifyJsPlugin()
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
}