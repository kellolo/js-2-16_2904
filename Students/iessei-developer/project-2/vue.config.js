module.exports = {
	devServer: {
        open: true,
        hot: true,
        port: 9090,
        proxy: {
            '/api': { //'/api/catalog' >>> '/catalog'
                target: 'http://localhost:3000',
                pathRewrite: { '^/api' : '' },
                secure: false,
                changeOrigin: true
            }
        }
    }
}
