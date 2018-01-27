# webpack.config.js

参考 [banmunongtian/react-es6-webpack](https://github.com/banmunongtian/react-es6-webpack/blob/master/webpack.config.js)  
https://github.com/banmunongtian/react-es6-webpack/blob/master/webpack.config.js

可参考 demo：https://github.com/zhangwang1990/blogs/tree/master/sources/MultiPageWebpackDemos
* 一份比较完整的webpack配置文件:https://www.liayal.com/article/5a5d770924f2803679a960e5  
  [点击查看具体代码](#查看具体代码)
```
/**
 * __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
 * 注意这里是exports不是export
 */

/**
 * resolve属性中的extensions数组中用于配置程序可以自行补全哪些后缀
 * 比如说我们要require一个common.js文件，添加了这个配置我们只要写：require('common')
 */

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
//获取入口js
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 删除文件夹
var CleanPlugin = require('clean-webpack-plugin');

var entries = getEntry('src/**/*.js', 'src');
var prod = process.env.NODE_ENV === 'production' ? true : false;

module.exports = {
    entry: entries,      //获取项目入口js文件
    output: {//输出目录
        path: path.join(__dirname, "build"), //文件输出目录
        publicPath: 'build',
        filename: "[name].min.js",      //根据入口文件输出的对应多个文件名
    },
    module: {
        rules:  [
            //css和sass处理
            {
                test: /\.css|\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader', 'resolve-url-loader'],
                })
            },
            { test: /\.less/,loader: 'style-loader!css-loader!less-loader'},
            {
                test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader',
                query:{
                    limit:'10000', name:'img/[name].[ext]'
                }
            },
            // image & font
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets:['react','es2015']
                }
            }
        ]
    },
    resolve:{
        extensions:['.js','.json']
    },
    devtool: prod ? null : 'source-map',//生成sourcemap,便于开发调试
    plugins: [
        // new  webpack.optimize.CommonsChunkPlugin({
        //     // 与 entry 中的 entries 对应
        //     name: entries,
        //     // 输出的公共资源名称
        //     filename: 'common.min.js',
        //     // 对所有entry实行这个规则
        //     minChunks: Infinity
        // }),

        // 构建之前先删除dist目录下面的文件夹
        new CleanPlugin(['build','dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'common/vendors.js',
            minChunks: 3
        }),
        // 分离css extractTextPlugin 指定生成的css文件路径
        // new ExtractTextPlugin('[name].min.css'),
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('css/[name].min.css').replace('\\js', '').replace('\\', '');
            },
            allChunks: true
        }),
        //new ExtractTextPlugin('css/style.css'),
        //如果你想设置更多，可以这样写：
        // new ExtractTextPlugin({
        //     filename:'[name].css'
        // }),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // 自动刷新插件
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/src/views during development,
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./'] }
        })
    ],
};

if (process.env.NODE_ENV === 'production') {// 判断开发环境还是生产环境,添加uglify等插件
    module.exports.plugins = (module.exports.plugins || [])
        .concat([
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            // 压缩插件 自带  //混合压缩js
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: false,
                },
                mangle: {
                    except: ['$super', '$', 'exports', 'require']
                    //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
                },
            }),
            //css压缩 需要安装 optimize-css-assets-webpack-plugin
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: false
            }),
        ]);
} else {
    //dev
    console.log('dev');
    // module.exports.devServer = {
    //     contentBase: './src/views',//本地服务器所加载的页面所在的目录
    //     historyApiFallback: true,//不跳转
    //     inline: true,//实时刷新
    //     colors:  true,//终端中输出结果为彩色
    // };
}
/**
 * 获取入口的函数
 */
function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = ['./' + entry];
    }
    return entries;
}

/**
 * 配置plugins
 */
var pages = Object.keys(getEntry('src/*/*.html', 'src'));

pages.forEach(function(pathname) {
    var conf = {
        filename: pathname + '.html', //生成的html存放路径，相对于path
        template: 'src' + pathname + '.html', //html模板路径
        inject: false,    //js插入的位置，true/'head'/'body'/false
    };
    if (pathname in entries) {
        conf.inject = false;
        conf.chunks = ['vendors', pathname];//引入特定的js
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});

```

### 查看具体代码

webpack.base.js

```
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const sourcePath = path.join(__dirname, '../web');
const nodeModules = path.resolve(__dirname, '../node_modules');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        // threadPool: happyThreadPool,
    });
}
var cssLoader = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
        'happypack/loader?id=happy-css'
    ]
});
var lessLoader = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
        'happypack/loader?id=happy-less'
    ]
})
var babelPreset = process.env.NODE_ENV == 'development' ? {development: {presets: ['react-hmre']}} : {};
module.exports = {
    context: sourcePath,
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: nodeModules,
            include: sourcePath,
            use: ['happypack/loader?id=happy-babel-js'],
            // use: [{
            //     loader: 'babel-loader',
            //     options: {
            //         cacheDirectory: true
            //     }
            // }],
        }, {
            test: /\.css$/,
            exclude: nodeModules,
            use: cssLoader
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            //     use: [{
            //         loader: 'css-loader',
            //         options: {
            //             minimize: true
            //         }
            //     }, {
            //         loader: 'postcss-loader',
            //         options: {
            //             config: {
            //                 path: path.join(__dirname, './postcss.config.js')
            //             }
            //         }
            //     }]
            // }),
        }, {
            test: /\.less$/,
            use: lessLoader
            // use: ExtractTextPlugin.extract({
            //     fallback: "style-loader",
            //     use: [{
            //         loader: 'css-loader',
            //         options: {
            //             minimize: true
            //         }
            //     }, {
            //         loader: 'postcss-loader',
            //         options: {
            //             config: {
            //                 path: path.join(__dirname, './postcss.config.js')
            //             }
            //         }
            //     }, 'less-loader']
            // })
        }, {
            test: /.(gif|jpg|png)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            // use: ['happypack/loader?id=happy-font']
            use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: 'font/[name].[hash:8].[ext]'
                    }
                }
            ]
        }, {
            // test: require.resolve('jquery'),
            // use: [{
            //     loader: 'expose-loader',
            //     options: '$'
            // }, {
            //     loader: 'expose-loader',
            //     options: 'Zepto'
            // }]
        }],
        noParse: /node_modules\/(jquey|js\-cookie\.js)/
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            sourcePath,
            nodeModules
        ],
        alias: {
            Components: path.join(__dirname, '../web/components/')
        },
    },
    externals: {
        jquery: "$"
    },
    plugins: [
        new ExtractTextPlugin('css/[name].[contenthash:8].css'),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "../"),
            manifest: require('./vendor-manifest.json'),
        }),
        createHappyPlugin('happy-babel-js', [{
            loader: 'babel-loader',
            query: {
                cacheDirectory: true,
                env: babelPreset
            }
        }]),
        createHappyPlugin('happy-css', [{
            loader: 'css-loader',
            query: {
                minimize: true
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                }
            }
        }]),
        createHappyPlugin('happy-less', [{
            loader: 'css-loader',
            query: {
                minimize: true
            }
        }, {
            loader: 'postcss-loader',
            query: {
                config: {
                    path: path.join(__dirname, './postcss.config.js')
                }
            }
        }, 'less-loader']),
        // createHappyPlugin('happy-font', [{
        //     loader: "file-loader",
        //     query: {
        //         limit: 8192,
        //         name: 'font/[name].[hash:8].[ext]'
        //     }
        // }]),
        new ProgressBarPlugin({
            format: chalk.blue.bold("build  ") + chalk.cyan("[:bar]")  + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
            clear: false
        }),
        new LodashModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/[name].js' })
    ]
};
```

webpack.dev.config.js

```
开发环境的配置文件

var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var Html = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const outputPath = path.join(__dirname, '../dist/client/');
const templateSrc = path.join(__dirname, '../web/page/');
module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    entry: {
        admin: [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr',
            '../web/page/admin/index.js',
        ],
        blog: [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr',
            '../web/page/blog/index.js',
        ]
    },
    output: {
        path: outputPath,
        publicPath: '/',
        filename: 'js/[name].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new Html({
            filename: 'admin.html',
            template: path.join(templateSrc, '/admin/index.html'),
            alwaysWriteToDisk: true,
            chunks: ["admin"],
        }),
        new Html({
            filename: 'blog.html',
            template: path.join(templateSrc, '/blog/index.html'),
            html: '<%- html %>',
            script: '<%- JSON.stringify(ServerData) %>',
            alwaysWriteToDisk: true,
            chunks: ["blog"],
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackHarddiskPlugin()
    ]
})
webpack.product.config.js
线上打包的配置文件

var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var Html = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const templateSrc = path.join(__dirname, '../web/page/');
const outputPath = path.join(__dirname, '../dist/client/');
module.exports = merge(baseWebpackConfig, {
    devtool: false,
    entry: {
        admin: '../web/page/admin/index.js',
        blog: '../web/page/blog/index.js'
    },
    output: {
        path: outputPath,
        publicPath: '//static.liayal.com/',
        filename: 'js/[name]_[chunkhash:8].js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                DEBUG: false
            }
        }),
        new Html({
            filename: 'admin.html',
            template: path.join(templateSrc, '/admin/index.html'),
            chunks: ["admin"],
        }),
        new Html({
            filename: 'blog.html',
            template: path.join(templateSrc, '/blog/index.html'),
            chunks: ["blog"],
            html: '<%- html %>',
            script: '<%- JSON.stringify(ServerData) %>',
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new OptimizeCSSPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new BundleAnalyzerPlugin()
    ]
});

```
webpack.dll.config.js

```
DllPlugin 配置文件，DllPlugin 是什么？ 戳这里

const path = require('path');
const webpack = require('webpack');
const outputPath = path.join(__dirname, '../dist/client/');
module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'axios', 'classnames', "moment", "react-router-dom"]
    },
    output: {
        path: outputPath,
        filename: 'lib/[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                DEBUG: false
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, "../"),
            path: path.resolve(__dirname, './[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句
                // 还可以兼容ie浏览器
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        })
    ]
}
～～～简单说一下这里面用到的几个插件吧～～～

Happypack
一般我们本地构建都是单进程的，而Happypack则希望通过多进程模型，来加速代码构建。你可以根据你的cpu内核来开启多个进程来构建，对构建速度的提升会有不少的提高（不过我自己在本地测了下效果不是特别明显:see_no_evil: :see_no_evil::see_no_evil:）。
如果对其原理感兴趣可以看一下：happypack 原理解析

progress-bar-webpack-plugin
这个是一个构建进度条，看下图:point_down:


ExtractTextPlugin
这个插件不用说了，webpack css抽离处理标配。不清楚的默默的学习去 extract-text-webpack-plugin

html-webpack-plugin
html-webpack-plugin可以根据你设置的模板，在每次运行后生成对应的模板文件，同时所依赖的CSS/JS也都会被引入，如果CSS/JS中含有hash值，则html-webpack-plugin生成的模板文件也会引入正确版本的CSS/JS文件。这个还是很实用的东西，用法看这里:point_right:HTML Webpack Plugin用法

webpack-bundle-analyzer
强烈推荐！！！ 这个插件可以将webpack打包后的内容束展示为方便交互的直观树状图，让你明白你所构建包中真正引入的内容；我们可以借助她，发现它大体有哪些模块组成，找到不合时宜的存在，然后优化它。
```
