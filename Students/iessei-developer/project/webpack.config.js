const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        })
    ]
};
// const path = require('path');
// const miniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// // const compiler = require ('vue-template-compiler');
// const VueLoaderPlugin = require('vue-loader-plugin');
//
//
//
// module.exports = {
//
// 	entry:
// 	'./src/public/index.js',
//
// 	output: {
//
// 		path: path.resolve(__dirname, 'dist'),
//
// 		publicPath: 'dist',
//
// 		filename: 'main1.js'
//
// 	},
//
// 	module: {
//
// 		rules: [
// 			{
// 				test: /\.m?js$/,
// 				exclude: /(node_modules|bower_components)/,
// 				use: {
// 					loader: 'babel-loader',
// 					options: {
// 						presets: ['@babel/preset-env']
// 					}
// 				}
// 			},
//
// 			{
//                 test: /\.html$/,
//                 use: [
//                     {
//                         loader: "html-loader"
//                     }
//                 ]
//             },
//
// 			{
// 				test: /\.vue$/,
// 				loader: 'vue-loader'
// 			},
//
// 			// {
// 			// 	test: /\.css$/i,
// 			// 	use: [
// 			// 		{
// 			// 			loader: miniCssExtractPlugin.loader,
// 			// 			options: {
// 			// 				esModule: true,
// 			// 			},
// 			// 		},
// 			// 		'css-loader',
// 			// 	],
// 			// },
// 			{
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//             },
//
// 		]
// 	},
//
// devServer: {
// 	overlay: true
// },
//
//
// plugins: [
// 	new miniCssExtractPlugin({
// 		filename: 'css/main.css',
// 		chunkFilename: '[id].css',
// 	}),
// ],
// plugins: [
// 	new HtmlWebpackPlugin({
// 		template:'src/public/index.html',
// 		filename: 'index.html'
// 	}),
// ],
// plugins: [
//     new VueLoaderPlugin()
// ]
//
//
//
//
// };
