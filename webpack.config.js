"use strict";

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: './development/assets/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'index.js',
        publicPath: 'public/'
    },
    watch: NODE_ENV == 'development',
    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
    plugins: [
        new webpack.EnvironmentPlugin(NODE_ENV)
    ]
};
