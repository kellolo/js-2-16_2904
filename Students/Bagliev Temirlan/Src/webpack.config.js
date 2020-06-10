let miniCss = require('mini-css-extract-plugin')
let htmlPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                      loader: miniCss.loader,
                      options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new miniCss({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }), 
        new htmlPlugin({
            template: './src/public/index.html'
        })
    ],
    devServer: {
        open: true,
        hot: true,
        port: 3000
    }
} 