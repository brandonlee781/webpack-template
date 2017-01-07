const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = merge(
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Heat Map'
      })
    ],
  },
  parts.lintCSS(PATHS.app),
  parts.lintJavascript(PATHS.app)
);

module.exports = function(env) {
  if (env === 'production') {
    return merge(
      common,
      parts.loadJavascript(PATHS.app),
      parts.extractBundles([]),
      parts.generateSourcemaps('source-map'),
      parts.extractCSS(),
      parts.purifyCSS(PATHS.app)
    )
  }

  return merge(
    common,
    {
      performance: {
        hints: false
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    },
    parts.clean(PATHS.build),
    parts.generateSourcemap('eval-source-map'),
    parts.loadCSS(),
    parts.devServer({
      host: process.env.HOST,
      port: process.env.PORT
    })
  );
};
