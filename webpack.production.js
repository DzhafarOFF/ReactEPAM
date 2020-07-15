/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common[1], {
	mode: 'production',
	plugins: [
		new HtmlWebPackPlugin({
		    template: "./src/client/index.html",
		    filename: "./index.html"
		}),
		new MiniCssExtractPlugin({ filename: 'static/main.css' }),
	],
});
