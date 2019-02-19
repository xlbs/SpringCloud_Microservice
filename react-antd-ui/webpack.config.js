const path = require('path');//设置路径
const ip = require('ip');
const autoprefixer = require('autoprefixer');
var webpack = require("webpack");
var htmlWebpackPlugin = require('html-webpack-plugin'); //使用自动生成html文件的一个插件

const publicPath = 'http://'+ ip.address()+ ':3000/dist/';
console.info('===>>> Address: %s', publicPath);

const config = {//配置正式开始
    entry: [
        "webpack-hot-middleware/client",
        './index.js',//设置入口
    ],
    output: {//设置打包出口
        path : path.join(__dirname,'dist'),//打包文件放在这个目录下
        publicPath : publicPath,
        filename : "js/[name].js"//打包文件名
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx?)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query:{
                    presets:['es2015','env','react','stage-3'],
                    plugins: [
                        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css"}]   //需要配置的地方
                    ]
                }
            },
            //这里配置less文件支持
            {
                test: /\.less$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            localIndetName:"[name]__[local]___[hash:base64:5]"
                        },
                    },
                    {
                        loader: require.resolve('less-loader'), // compiles Less to CSS
                    },
                ],
            },
            //这里配置css文件支持
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            localIndetName: '[name]__[local]__[hash:base64:5]',
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }


        ]
    },//loader 相关配置
    plugins:[
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html',
            inject:true, //是否将js放body的末尾
            hash:true,
            minify:{
                removeComments:true,
                collapseWhitespace:false
            }
        }),
        // new webpack.optimize.OccurrenceOrderPlugin (),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()   //出错时只打印错误，但不重新加载页面
    ],//插件 相关配置
    mode: 'development'//设置模式为开发者模式
};

module.exports = config;
