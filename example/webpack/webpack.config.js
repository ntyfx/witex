const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DEBUG = !process.argv.includes('--release');
const indexHtmlWebpackPluginConfig = Object.assign({}, {
    template: path.resolve(__dirname, './index.html'),
    chunks: ['app'],
    minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
    }
});

var plugins = [
    new HtmlWebpackPlugin(indexHtmlWebpackPluginConfig)
];

if (!DEBUG) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
    entry: {
        app: path.resolve(__dirname, './app.js')
    },
    output: {
        path: 'dist/example/webpack',
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: plugins
};