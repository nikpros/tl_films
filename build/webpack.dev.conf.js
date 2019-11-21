const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const Dotenv = require('dotenv-webpack');
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,    // настройка для devServer, которая подсказывает где именно искать файл html (index.html)
        port: 8080,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            jQuery: 'jquery'
        }),
        new Dotenv({
            path: path.resolve(__dirname, '../.env')
        })
        // new webpack.DefinePlugin({
        //     ENV: JSON.stringify(process.env)
        // })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})