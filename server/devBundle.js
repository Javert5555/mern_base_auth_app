import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'
import config from './../config/config'

// In this method, the Webpack middleware uses the values set
// in webpack.config.client.js, and we enable hot reloading from the server-side
// using Webpack Hot Middleware.

const compile = (app) => {
    if (config.env === 'development') {
        const compiler = webpack(webpackConfig)
        const middleware = webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

export default {
    compile
}