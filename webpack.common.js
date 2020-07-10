/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const serverConfig = {
	// mode: 'production',
	mode: 'development',
	entry: './src/server/server.tsx',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.server.json',
						},
					}, 'eslint-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [{ loader: 'css-loader', options: { onlyLocals: true } }],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, 'dist'),
	},
	target: 'node',
	externals: [nodeExternals()],
	// node: {
	//     __dirname: false
	// },
	devtool: 'inline-source-map',
};
const clientConfig = {
	// mode: 'production',
	entry: './src/client/index.tsx',
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: 'static/main.js',
	},
	plugins: [
		// new HtmlWebPackPlugin({
		//     template: "./src/client/index.html",
		//     filename: "./index.html"
		// }),
		new MiniCssExtractPlugin({ filename: 'static/main.css' }),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
						},
					}, 'eslint-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'images',
				},
			},
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},
	devtool: 'inline-source-map',
};
module.exports = [serverConfig, clientConfig];
