const HtmlWebPackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    path = require('path');

const environment = process.env.NODE_ENV || 'development';

module.exports = {
    mode: environment,
    devtool: 'inline-source-map',
    entry:  [path.join(path.join(__dirname, '../src'), 'index.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    watch: true,
    devServer: {
        inline: true,
        watchContentBase: true,
        contentBase: path.resolve(__dirname, '../dist'),
        host: 'localhost',
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: environment === 'development',
                        },
                    },
                    'css-loader',
                    { 
                        loader: 'postcss-loader',
                        options: { 
                            config: { 
                                path: path.join(path.join(__dirname, '../config'), 'postcssconfig.js') 
                            } 
                        } 
                    },
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    node: {
        console: true,
        __dirname: true,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(path.join(__dirname, '../public'), 'index.html'),
            filename: 'index.html',
            favicon: path.join(path.join(__dirname, '../public/images'), 'favicon.ico') 
        }),
        new MiniCssExtractPlugin({
            template: path.join(path.join(__dirname, '../public/css'), 'styles.css'),
            filename: 'styles.css'
        }),
        new UglifyJsPlugin()
    ]
}