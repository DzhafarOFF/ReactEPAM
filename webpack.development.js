/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(common[1], {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		hot: true,
		headers: {
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Methods':'GET',
			'Access-Control-Allow-Headers':'application/json',
		},
	},
	plugins: [
		new HtmlWebPackPlugin({
		    template: "./src/client/index.html",
		    filename: "./index.html"
		}),
		new MiniCssExtractPlugin({ filename: 'static/main.css' }),
	],
});
