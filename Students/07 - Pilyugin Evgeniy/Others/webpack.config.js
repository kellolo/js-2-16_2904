const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {

    // указываем путь, который будет считаться за корневую директорию бля сборки
    context: path.resolve(__dirname, 'src'),

    // как запускаем вебпак
    mode: 'development',

    // точка входа
    entry: './index.js',

    // выходные данные, в какой файл и папку собираем
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    // подключаем плагины
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
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
        port: 9000
    }
};