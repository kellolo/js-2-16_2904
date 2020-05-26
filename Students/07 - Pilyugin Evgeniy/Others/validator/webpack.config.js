const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    // указываем путь, который будет считаться за корневую директорию для сборки
    context: path.join(__dirname, 'src'),

    // как запускаем вебпак
    mode: 'development',

    // точка входа
    entry: './index.js',

    // выходные данные, в какой файл и папку собираем
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },

    // подключаем плагины
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style/[name].css'
        })
    ],

    // лоадеры
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use:  [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    // оптимизаторы
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    // настройки сервера
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    }
}