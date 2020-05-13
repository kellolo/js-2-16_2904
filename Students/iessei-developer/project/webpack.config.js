const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

	entry:
	'./src/js/index.js',

	output: {

		path: path.resolve(__dirname, 'dist'),

		publicPath: 'dist',

		filename: 'main.js'

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
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					},
					{
						loader: 'postcss-loader',
						options: { sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
					}

				]
			}
		]
	},

	devServer: {
		overlay: true
	},


	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
			chunkFilename: '[id].css',
		}),
	],

};
