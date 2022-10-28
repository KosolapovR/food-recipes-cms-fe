const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
	mope = 'production';
	target = 'browserslist';
}

const plugins = [
	new HtmlWebpackPlugin({
		template: path.join(__dirname, 'public', 'index.html'),
	}),
];

module.exports = {
	mode,
	target,
	entry: './src/index.tsx',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/[hash][ext][query]',
		clean: true,
	},
	devServer: {
		port: '5000',
		static: {
			directory: path.join(__dirname, 'public'),
		},
		hot: true,
		open: true,
		liveReload: true,
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node-modules/,
			},
			{
				test: /\.css?$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.svg$/,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	plugins,
};
