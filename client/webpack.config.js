const path = require("path");
const fs = require('fs');
const webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {


    devtool: 'cheap-moudle-source-map',

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        historyApiFallback: true,
        open: true
    },

    entry: path.resolve(__dirname, "./src/index.js"),

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(png|jp(e*)g|svg|gif|JPG)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { name: 'images/[hash]-[name].[ext]' },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'fonts/[hash]-[name].[ext]' },
                    },
                ],
            }
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),

        new webpack.DefinePlugin({
            DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
            DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),
            DEPLOYED_ADDRESS_TOKENSALES: JSON.stringify(fs.readFileSync('deployedAddress_TokenSales', 'utf8').replace(/\n|\r/g, "")),
            DEPLOYED_ABI_TOKENSALES: fs.existsSync('deployedABI_TokenSales') && fs.readFileSync('deployedABI_TokenSales', 'utf8')
        }),

    ],

    resolve: {
        alias: {
            assets: path.resolve(__dirname, "./src/assets"),
            components: path.resolve(__dirname, "./src/components"),
            views: path.resolve(__dirname, "./src/views"),
            variables: path.resolve(__dirname, "./src/variables"),
        }
    }

};