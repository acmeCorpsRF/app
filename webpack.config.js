'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './development/assets/js/pages/'),
    mode: NODE_ENV,
    entry: {
        main: './main/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].[chunkhash].js',
        publicPath: 'public'
    },
    watch: NODE_ENV === 'development',
    // devtool: NODE_ENV == 'development' ? 'cheap-module-source-map' : false,
    devtool: NODE_ENV == 'development' ? 'inline-cheap-module-source-map' : false,
    devServer: {
        overlay: true
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
                            sourceMap: NODE_ENV == 'development' ? true : false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: NODE_ENV == 'development' ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: NODE_ENV == 'development' ? true : false,
                            config: {
                                path: 'development/assets/js/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: NODE_ENV == 'development' ? true : false
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
            filename: 'css/styles.[contenthash].css',
        }),
        new ProgressBarPlugin()
    ]

};
