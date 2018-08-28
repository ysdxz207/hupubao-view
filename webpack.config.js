const resolve = require('path').resolve
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SshWebpackPlugin = require('ssh-webpack-plugin');
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
    entry: {
        vendor: './src/vendor',
        index: './src/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    performance: {
        hints: "warning", // 枚举
        maxAssetSize: 300000, // 整数类型（以字节为单位）
        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.less') || assetFilename.endsWith('.js');

        }
    },
    plugins: [
        new VueLoaderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': require('./config/dev.env')
        // }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json', '.css']
    },
    devServer: {
        host: '127.0.0.1',
        port: 8011,
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map',
    externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        'axios': 'axios'

    }
})

console.log(options)
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new SshWebpackPlugin({
            host: 'puyixiaowo.win',
            port: '22',
            username: 'root',
            privateKey: require('fs').readFileSync('E:/huangfeihong/id_rsa_2048_hupubao'),
            from: 'dist',
            to: '/app/www/htdocs/hupubao-view',//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
            max_buffer: 5000 * 1024,
            before: ['rm -rf /app/www/htdocs/hupubao-view/*'],
            after: ['chmod 755 /app/www/htdocs/hupubao-view/*']
        })
    )
}