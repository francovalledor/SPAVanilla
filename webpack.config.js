const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    resolve: {
      extensions: ['.js']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        })
    ],

    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
            }
          }
      ],
    },
}