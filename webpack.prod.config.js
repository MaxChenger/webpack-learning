const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'null',  // 注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: './public/',
        historyApiFallback: true,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {loader: "babel-loader"},
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"  //new一个这个插件的实力，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), // 热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    }
}