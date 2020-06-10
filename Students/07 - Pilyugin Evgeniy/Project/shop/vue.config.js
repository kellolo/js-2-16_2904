module.exports = {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''},
                secure: false,
                changeOrigin: true
            }
        }
    }
}