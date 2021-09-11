// @ts-ignore
const proxy = require('http-proxy-middleware')

module.exports = function (app: any) {
    app.use(proxy('/api', {
        target: 'http://www.test.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/api"
        }
    }))
}