module.exports = {
    configureWebpack: {
        externals: {
          "BMap": "BMap"
        }
      },
    devServer: {
        port:8000,
        proxy: {
            //   /api/login
            '/api': {
                target: 'http://lihangsoft.com:3001', // http://localhost:3000/api/login
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            },
            "/upload":{
                target: 'http://lihangsoft.com:3001', 
                changeOrigin: true
            }
        }
    }
}