const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
        main: './src/app'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            "axios": 'axios/dist/axios.min.js',
            "echarts": 'echarts/dist/echarts.min.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue',
            axios: 'axios',
            echarts: 'echarts'
        }),
		new HtmlWebpackPlugin({
            //favicon路径                     
            //favicon:'src/favicon.ico', 
            //需要修改入口js的文件地址
            filename: path.resolve(__dirname, 'build/index.html'),
            //修改的模板
            template: path.resolve(__dirname, 'src/index.html'),
            //允许插件修改哪些内容，包括head与body
            inject: true,
            //为静态资源生成hash值
            //hash:true,
            //压缩HTML文件
            minify: {
                //移除HTML中的注释
                removeComments: true,
                //删除空白符与换行符  
                collapseWhitespace: false
            }
        })
    ],
    devServer: {
        contentBase: './build',
        inline: true
    }
}