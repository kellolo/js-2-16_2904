
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlagin = require("html-webpack-plugin")

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlagin({
            template: "./public/index.html"
        })
    ]
};