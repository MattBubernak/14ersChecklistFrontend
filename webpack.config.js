var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
		path.join(__dirname, '/js/index.js')
	],
	output: {
		path: path.join(__dirname, '/js/'),
		filename: 'bundle.js',
		publicPath: '/js/'
	},
	devtool: 'eval',
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
          test: /\.html$/,
          loader: 'file-loader?name=[name].[ext]',
      },
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
            presets: ['react', 'es2015']
        }
			}
		]
	},
	devServer: {
		hot: true,
		inline: true,
		contentBase: '.'
	},
plugins: [
    new webpack.NamedModulesPlugin(),
]
}
