'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const PATH = {
    absolute: path.resolve(__dirname, ''),
    pages: path.resolve(__dirname, './development/pages'),
    assets: path.resolve(__dirname, './development/assets'),
    public: path.resolve(__dirname, './public')
}

module.exports = {
    context: path.resolve(__dirname, ''),
    mode: NODE_ENV,
    entry: {
        main: `${PATH.assets}/js/pages/main/index.js`
    },
    output: {
        path: `${PATH.public}`,
        // filename: 'js/[name].[chunkhash].js',
        filename: 'js/[name].js',
        publicPath: 'public'
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV == 'development' ? 'cheap-module-source-map' : false,
    // devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : false,
    // devtool: NODE_ENV == 'development' ? 'cheap-module-inline-source-map' : false,
    devServer: {
        overlay: true,
        contentBase: `${PATH.absolute}`
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // sourceMap: NODE_ENV == 'development' ? true : false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: NODE_ENV == 'development' ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // sourceMap: NODE_ENV == 'development' ? true : false,
                            config: {
                                path: 'development/assets/js/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // sourceMap: NODE_ENV == 'development' ? true : false
                        }
                    }

                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: NODE_ENV
        }),
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            uglifyOptions: {
                compress: {
                    unsafe: true,
                    inline: true,
                    passes: 2,
                    keep_fargs: false,
                },
                output: {
                    beautify: false,
                },
                mangle: true,
            }
        }),
        new MiniCssExtractPlugin({
            // filename: 'css/styles.[contenthash].css',
            filename: 'css/styles.css',
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATH.pages}/index.html`,
            title: 'app',
            filename: `${PATH.absolute}/index.html`
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: NODE_ENV == 'development' ? 'js/[name].js.map' : false
        }),
        new ProgressBarPlugin()
    ]

};
