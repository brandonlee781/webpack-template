const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  }
}
