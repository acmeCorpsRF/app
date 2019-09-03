'use strict';
// const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const PATHS = {
    pages: path.resolve(__dirname, 'development/pages'),
    entries: path.resolve(__dirname, 'development/assets/js/pages'),
    public: path.resolve(__dirname, 'www/public')
};
const plugins = [];
// const PAGES_DIR = PATHS.pages;
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'));

module.exports = {
    context: path.resolve(__dirname, 'development'),
    mode: NODE_ENV,
    entry: {
        main: `${PATHS.entries}/main/index.js`,
        page2: `${PATHS.entries}/page2/index.js`
    },
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'public/js/[name].[chunkhash].js',
    },
    watch: NODE_ENV === 'development',
    devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : false,
    devServer: {
        overlay: true,
        contentBase: path.resolve(__dirname, 'www')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /[\\/]node_modules[\\/]/,
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./public/css/*', './public/js/*'],
        }),
        new webpack.DefinePlugin({
            NODE_ENV: NODE_ENV
        }),
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            uglifyOptions: {
                exclude: /[\\/]node_modules[\\/]/,
                compress: {
                    unsafe: true,
                    inline: true,
                    keep_fargs: false,
                },
                output: {
                    beautify: false,
                },
                mangle: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'public/css/styles.[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            filename: 'index.html',
            inject: false,
            chunks: ['vendors', 'main']
        }),
        new HtmlWebpackPlugin({
            template: 'pages/page2.html',
            filename: 'page2.html',
            inject: false,
            chunks: ['vendors', 'page2']
        }),
        // ...PAGES.map(page => new HtmlWebpackPlugin({
        //     template: `${PAGES_DIR}/${page}`,
        //     filename: `./${page}`,
        //     inject: false,
        //     chunks: ['vendors', 'styles']
        // })),
        new webpack.SourceMapDevToolPlugin({
            filename: 'public/js/[name].js.map',
            exclude: ['vendors.js']
        }),
        new WebpackMd5Hash(),
        new ProgressBarPlugin()
    ]

};
