const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: __dirname + "/app/main.js", //__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map', //生成Source Maps使调试更容易
    // webpack-dev-server是一个单独的组件，可以让浏览器监听你的代码的修改并自动刷新显示修改后的结果
    devServer: {
        contentBase: './public/', //本地服务器所加载的页面所在的目录
        historyApiFallback: true,  //不跳转
        inline: true //实时刷新
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
                            module: true
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
        })
    ]
}