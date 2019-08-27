'use strict';

const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '/development/assets/'),
    mode: NODE_ENV,
    entry: {
        main: '/js/pages/main/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js',
        publicPath: 'public/js'
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }

                    ]
                })
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
        new ExtractTextPlugin({
            filename:  'css/styles.css'
        })
    ]

};
