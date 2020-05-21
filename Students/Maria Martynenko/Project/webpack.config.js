const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPagin = require('html-webpack-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPagin({
            template: './public/index.html'
        })
    ]
}