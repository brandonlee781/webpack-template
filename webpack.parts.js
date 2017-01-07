const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      hotOnly: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        // multiStep: true
      })
    ]
  };
};

exports.loadJavascript = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: paths,

          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      ]
    }
  };
};

exports.lintJavascript = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /.js$/,
          include: paths,
          use: 'eslint-loader',
          enforce: 'pre'
        }
      ]
    }
  };
};

exports.loadCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(css$|scss$)/,
          include: paths,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    }
  };
};

exports.extractCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(css$|scss$)/,
          include: paths,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  };
};

exports.purifyCSS = function(paths) {
  paths = Array.isArray(paths) ? paths : [paths];

  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: '/',
        paths: paths.map(path => `${path}/*`),
        resolveExtensions: ['.html']
      })
    ]
  };
};

exports.lintCSS = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(css$|sass$)/,
          include: paths,
          use: 'postcss-loader',
          enforce: 'pre' 
        }
      ]
    }
  }
}

exports.generateSourcemaps = function(type) {
  return {
    devtool: type
  };
};

exports.extractBundles = function(bundles, options) {
  const entry = {};
  const names = [];

  bundles.forEach(({name, entries}) => {
    if (entries) {
      entry[name] = entries;
    }

    names.push(name);
  });

  return {
    entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(
        Object.assign({}, options, { names })
      )
    ]
  }
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin(path)
    ]
  };
};
