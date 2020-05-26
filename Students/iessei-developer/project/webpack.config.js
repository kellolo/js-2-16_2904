const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

	entry:
	'./src/index.js',

	output: {

		path: path.resolve(__dirname, 'dist'),

		publicPath: 'dist',

		filename: 'main1.js'

	},

	module: {

		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					{
						loader: miniCssExtractPlugin.loader,
						options: {
							esModule: true,
						},
					},
					'css-loader',
				],
			},

	]
},

devServer: {
	overlay: true
},


plugins: [
	new miniCssExtractPlugin({
		filename: 'css/main.css',
		chunkFilename: '[id].css',
	}),
],
plugins: [
	new htmlWebpackPlugin({
		template:'src/public/index.html'
	}),
]



};
