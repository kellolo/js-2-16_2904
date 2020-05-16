const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

const optimization = () => {
    const config = {}

    config.splitChunks = {
        chunks: 'all',
        automaticNameDelimiter: '-'
    }

    if (prodMode) {
        config.minimizer = [
            new TerserPlugin(),
            new OptimizeCssAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ]
    }

    return config
}

const filename = ext => {
    if (ext === 'css') {
        return prodMode ? `./css/[name].${ext}` : `./css/[name].[hash].${ext}`
    }

    if (ext === 'js') {
        return prodMode ? `./js/[name].${ext}` : `./js/[name].[hash].${ext}`
    }
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        index: ['@babel/polyfill','./index.js'],
        contact: ['@babel/polyfill','./contact.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        openPage: ['contact.html', 'index.html'],
        open: true
    },
    devtool: devMode ? '[source-map]' : '',
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './components/index.html',
            chunks: ['index']
        }),
        new HTMLWebpackPlugin({
            filename: 'contact.html',
            template: './components/contact.html',
            chunks: ['contact']
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                             "@babel/preset-env"
                        ]
                    }
                }
            }
        ],
    }
};